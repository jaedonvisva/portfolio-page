import { NextResponse } from "next/server"

async function fetchCustomDescription(owner: string, repo: string, token: string) {
  try {
    // Try to get the .portfolio-description file
    const query = `
      query {
        repository(owner: "${owner}", name: "${repo}") {
          object(expression: "HEAD:.portfolio-description") {
            ... on Blob {
              text
            }
          }
        }
      }
    `

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const data = await response.json()
    const descriptionText = data.data.repository.object?.text

    // Return the custom description if found, otherwise null
    return descriptionText ? descriptionText.trim() : null
  } catch (error) {
    console.error(`Error fetching custom description for ${owner}/${repo}:`, error)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 })
  }

  try {
    // GraphQL query to fetch pinned repositories
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                owner {
                  login
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const data = await response.json()
    const repos = data.data.user.pinnedItems.nodes

    // Fetch custom descriptions for each repository
    const pinnedReposWithCustomDesc = await Promise.all(
      repos.map(async (repo: any) => {
        const customDescription = await fetchCustomDescription(repo.owner.login, repo.name, token)

        return {
          name: repo.name,
          description: customDescription || repo.description || "No description available",
          html_url: repo.url,
          homepage: repo.homepageUrl,
          topics: repo.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
          languages: repo.languages.nodes.map((lang: any) => lang.name),
        }
      }),
    )

    return NextResponse.json(pinnedReposWithCustomDesc)
  } catch (error) {
    console.error("Error fetching pinned repositories:", error)
    return NextResponse.json({ error: "Failed to fetch pinned repositories" }, { status: 500 })
  }
}

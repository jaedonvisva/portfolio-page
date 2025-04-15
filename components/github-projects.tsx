"use client"

import { useEffect, useState } from "react"
import { GithubIcon, ExternalLinkIcon, CodeIcon } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type Repository = {
  name: string
  description: string
  html_url: string
  homepage: string | null
  topics: string[]
  languages: string[]
}

export function GithubProjects({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPinnedRepos() {
      try {
        setLoading(true)
        // Fetch from our API route that uses GitHub GraphQL API
        const response = await fetch(`/api/github-pinned?username=${username}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch repositories")
        }

        const pinnedRepos = await response.json()
        setRepos(pinnedRepos)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load GitHub repositories")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchPinnedRepos()
    }
  }, [username])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2">Loading projects...</p>
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (repos.length === 0) {
    return <div className="text-center py-8">No pinned repositories found. Pin some repositories on GitHub!</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo, index) => (
        <AnimatedProject
          key={repo.name}
          title={repo.name.replace(/-/g, " ").replace(/_/g, " ")}
          description={repo.description}
          technologies={repo.topics || []}
          languages={repo.languages || []}
          github={repo.html_url}
          demo={repo.homepage}
          delay={index * 100}
        />
      ))}
    </div>
  )
}

function AnimatedProject({
  title,
  description,
  technologies,
  languages,
  github,
  demo,
  delay = 0,
}: {
  title: string
  description: string
  technologies: string[]
  languages: string[]
  github: string
  demo?: string | null
  delay?: number
}) {
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        "border border-gray-200 dark:border-gray-800 rounded-md p-4 hover:shadow-md dark:hover:border-gray-700 transition-all duration-700 ease-in-out",
        isInView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {technologies.map((tech, index) => (
          <span key={`tech-${index}`} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
            {tech}
          </span>
        ))}
      </div>

      {languages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map((lang, index) => (
            <span
              key={`lang-${index}`}
              className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center gap-1"
            >
              <CodeIcon className="w-3 h-3" />
              {lang}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 text-sm">
        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
          <GithubIcon className="w-4 h-4" />
          GitHub
        </a>
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <ExternalLinkIcon className="w-4 h-4" />
            Demo
          </a>
        )}
      </div>
    </div>
  )
}

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI ?? "https://jaedonvisva.co/callback"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    return Response.json({ error }, { status: 400 })
  }

  if (!code) {
    return Response.json({ error: "missing code" }, { status: 400 })
  }

  if (!client_id || !client_secret) {
    return Response.json({ error: "missing spotify credentials" }, { status: 500 })
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    return Response.json(data, { status: response.status })
  }

  return Response.json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  })
}

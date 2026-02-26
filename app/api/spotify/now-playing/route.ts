const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing"

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token ?? "",
    }),
  })

  return response.json()
}

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return Response.json({ isPlaying: false })
  }

  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 30 },
    })

    if (response.status === 204 || response.status > 400) {
      return Response.json({ isPlaying: false })
    }

    const data = await response.json()

    if (!data.item) {
      return Response.json({ isPlaying: false })
    }

    return Response.json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
      albumArt: data.item.album.images?.[2]?.url ?? data.item.album.images?.[0]?.url,
      songUrl: data.item.external_urls.spotify,
    })
  } catch {
    return Response.json({ isPlaying: false })
  }
}

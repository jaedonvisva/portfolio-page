import { NextResponse } from 'next/server'

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET

  if (!refresh_token || !client_id || !client_secret) {
    throw new Error('Missing required Spotify environment variables')
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get access token')
  }

  return response.json()
}

async function getCurrentlyPlaying(access_token: string) {
  const response = await fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })

  if (response.status === 204 || response.status > 400) {
    return null
  }

  return response.json()
}

async function getRecentlyPlayed(access_token: string) {
  const response = await fetch(`${SPOTIFY_API_BASE}/me/player/recently-played?limit=1`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.items?.[0] || null
}

async function getPlaylistName(access_token: string, playlistId: string) {
  try {
    const response = await fetch(`${SPOTIFY_API_BASE}/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    })
    
    if (!response.ok) {
      return null
    }
    
    const playlist = await response.json()
    return playlist.name
  } catch (error) {
    console.error('Error fetching playlist name:', error)
    return null
  }
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken()
    
    // First try to get currently playing
    let track = await getCurrentlyPlaying(access_token)
    
    // If nothing is currently playing, get the last played track
    if (!track) {
      track = await getRecentlyPlayed(access_token)
      if (track) {
        // Format recently played track to match currently playing structure
        track = {
          ...track,
          is_playing: false,
          item: track.track
        }
      }
    }

    if (!track || !track.item) {
      return NextResponse.json({ isPlaying: false })
    }

    // Check if the track is from a "guilty pleasures" playlist
    const context = track.context
    if (context && context.type === 'playlist') {
      // Extract playlist ID from URI (format: spotify:playlist:ID)
      const playlistId = context.uri?.split(':')[2]
      if (playlistId) {
        const playlistName = await getPlaylistName(access_token, playlistId)
        if (playlistName) {
          const lowerName = playlistName.toLowerCase()
          if (lowerName.includes('guilty') && lowerName.includes('pleasure')) {
            return NextResponse.json({ isPlaying: false })
          }
        }
      }
    }

    const song = track.item
    const isPlaying = track.is_playing || false
    const artists = song.artists.map((artist: any) => artist.name).join(', ')
    const albumImageUrl = song.album.images[0]?.url

    return NextResponse.json({
      isPlaying,
      title: song.name,
      artist: artists,
      album: song.album.name,
      albumImageUrl,
      songUrl: song.external_urls.spotify,
    })
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    return NextResponse.json({ isPlaying: false }, { status: 500 })
  }
}

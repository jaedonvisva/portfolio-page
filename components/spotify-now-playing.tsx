"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Music, ExternalLink } from 'lucide-react'

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify')
        const spotifyData = await response.json()
        setData(spotifyData)
      } catch (error) {
        console.error('Error fetching Spotify data:', error)
        setData({ isPlaying: false })
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="bg-[#faf8f3] dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data.isPlaying && !data.title) {
    return (
      <Card className="bg-[#faf8f3] dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
            <Music className="w-6 h-6" />
            <span className="text-sm">Not listening to anything</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#faf8f3] dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          {data.albumImageUrl && (
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={data.albumImageUrl}
                alt={`${data.album} cover`}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${data.isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {data.isPlaying ? 'Currently playing' : 'Last played'}
              </span>
            </div>
            
            <div className="font-medium text-sm truncate">{data.title}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
              by {data.artist}
            </div>
          </div>
          
          {data.songUrl && (
            <Link 
              href={data.songUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Code, Activity, Clock, TrendingUp } from 'lucide-react'

interface WakaTimeData {
  isCoding: boolean
  todayTotal: string
  weekTotal: string
  currentProject?: string
  currentLanguage?: string
  topLanguageToday?: {
    name: string
    time: string
    percent: number
  }
  topProjectToday?: {
    name: string
    time: string
    percent: number
  }
  weeklyAverage: string
}

export function WakaTimeStatus() {
  const [data, setData] = useState<WakaTimeData>({
    isCoding: false,
    todayTotal: '0 mins',
    weekTotal: '0 mins',
    weeklyAverage: '0 mins'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWakaTimeData = async () => {
      try {
        const response = await fetch('/api/wakatime')
        const wakaTimeData = await response.json()
        setData(wakaTimeData)
      } catch (error) {
        console.error('Error fetching WakaTime data:', error)
        setData({
          isCoding: false,
          todayTotal: '0 mins',
          weekTotal: '0 mins',
          weeklyAverage: '0 mins'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWakaTimeData()
    
    // Refresh every 2 minutes
    const interval = setInterval(fetchWakaTimeData, 120000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="bg-[#faf8f3] dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#faf8f3] dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${data.isCoding ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <span className="text-sm font-medium">
                {data.isCoding ? '🚀 In the zone' : '💤 Offline'}
              </span>
              {data.isCoding && (data.currentProject || data.currentLanguage) && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {data.currentProject && (
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full mr-2">
                      {data.currentProject}
                    </span>
                  )}
                  {data.currentLanguage && (
                    <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
                      {data.currentLanguage}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Today</span>
              </div>
              <div className="font-medium text-sm">{data.todayTotal}</div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">This Week</span>
              </div>
              <div className="font-medium text-sm">{data.weekTotal}</div>
            </div>
          </div>

          {/* Top Activity Today */}
          {(data.topLanguageToday || data.topProjectToday) && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Top today:</span>
                <div className="flex space-x-2">
                  {data.topLanguageToday && (
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-full">
                      {data.topLanguageToday.name}
                    </span>
                  )}
                  {data.topProjectToday && (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                      {data.topProjectToday.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

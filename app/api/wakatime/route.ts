import { NextResponse } from 'next/server'

const WAKATIME_API_BASE = 'https://wakatime.com/api/v1'

async function getWakaTimeStats() {
  const api_key = process.env.WAKATIME_API_KEY

  if (!api_key) {
    throw new Error('Missing WAKATIME_API_KEY environment variable')
  }

  // Get today's summaries
  const today = new Date().toISOString().split('T')[0]
  const todayResponse = await fetch(`${WAKATIME_API_BASE}/users/current/summaries?start=${today}&end=${today}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(api_key).toString('base64')}`,
    },
  })

  if (!todayResponse.ok) {
    const errorText = await todayResponse.text()
    console.error('WakaTime today stats error:', {
      status: todayResponse.status,
      statusText: todayResponse.statusText,
      body: errorText
    })
    throw new Error(`Failed to fetch WakaTime today stats: ${todayResponse.status} ${todayResponse.statusText}`)
  }

  const todayData = await todayResponse.json()

  // Get last 7 days summaries for more comprehensive data
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const weekResponse = await fetch(`${WAKATIME_API_BASE}/users/current/summaries?start=${sevenDaysAgo}&end=${today}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(api_key).toString('base64')}`,
    },
  })

  if (!weekResponse.ok) {
    const errorText = await weekResponse.text()
    console.error('WakaTime week stats error:', {
      status: weekResponse.status,
      statusText: weekResponse.statusText,
      body: errorText
    })
    throw new Error(`Failed to fetch WakaTime week stats: ${weekResponse.status} ${weekResponse.statusText}`)
  }

  const weekData = await weekResponse.json()

  return { 
    today: todayData.data && todayData.data.length > 0 ? todayData.data[0] : null, 
    week: weekData.data 
  }
}

async function getCurrentHeartbeat() {
  const api_key = process.env.WAKATIME_API_KEY

  if (!api_key) {
    throw new Error('Missing WAKATIME_API_KEY environment variable')
  }

  // Get current heartbeat (last activity)
  const response = await fetch(`${WAKATIME_API_BASE}/users/current/heartbeats?date=${new Date().toISOString().split('T')[0]}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(api_key).toString('base64')}`,
    },
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.data && data.data.length > 0 ? data.data[data.data.length - 1] : null
}

export async function GET() {
  try {
    const [stats, lastHeartbeat] = await Promise.all([
      getWakaTimeStats(),
      getCurrentHeartbeat()
    ])

    const todayStats = stats.today
    const weekStats = stats.week
    
    // Calculate total time for the week
    let weekTotal = 0
    let weekTotalText = '0 mins'
    if (weekStats && weekStats.length > 0) {
      weekTotal = weekStats.reduce((total, day) => total + day.grand_total.total_seconds, 0)
      const hours = Math.floor(weekTotal / 3600)
      const minutes = Math.floor((weekTotal % 3600) / 60)
      weekTotalText = hours > 0 ? `${hours} hrs ${minutes} mins` : `${minutes} mins`
    }

    // Check if currently coding (within last 15 minutes)
    const now = new Date()
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000)
    let isCoding = false
    let currentProject = null
    let currentLanguage = null

    if (lastHeartbeat) {
      const heartbeatTime = new Date(lastHeartbeat.time * 1000)
      isCoding = heartbeatTime > fifteenMinutesAgo
      currentProject = lastHeartbeat.project
      currentLanguage = lastHeartbeat.language
    }

    // Get top language and project from today's stats
    const topLanguageToday = todayStats && todayStats.languages && todayStats.languages.length > 0 
      ? todayStats.languages[0] 
      : null

    const topProjectToday = todayStats && todayStats.projects && todayStats.projects.length > 0 
      ? todayStats.projects[0] 
      : null

    // Get today's total time
    const todayTotalText = todayStats && todayStats.grand_total ? todayStats.grand_total.text : '0 mins'

    return NextResponse.json({
      isCoding,
      todayTotal: todayTotalText,
      weekTotal: weekTotalText,
      currentProject: isCoding ? currentProject : null,
      currentLanguage: isCoding ? currentLanguage : null,
      topLanguageToday: topLanguageToday ? {
        name: topLanguageToday.name,
        time: topLanguageToday.text,
        percent: topLanguageToday.percent
      } : null,
      topProjectToday: topProjectToday ? {
        name: topProjectToday.name,
        time: topProjectToday.text,
        percent: topProjectToday.percent
      } : null,
      weeklyAverage: weekTotalText,
    })
  } catch (error) {
    console.error('Error fetching WakaTime data:', error)
    return NextResponse.json({ 
      isCoding: false,
      todayTotal: '0 mins',
      weekTotal: '0 mins'
    }, { status: 500 })
  }
}

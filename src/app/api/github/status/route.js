import { NextResponse } from 'next/server'
import { getGitHubStats } from '@/lib/github'

export async function GET() {
  try {
    const stats = await getGitHubStats()

    if (!stats) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch GitHub stats',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch statistics',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
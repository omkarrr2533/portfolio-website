import { NextResponse } from 'next/server'
import { getGitHubRepos } from '@/lib/github'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sort = searchParams.get('sort') || 'updated'
    const perPage = parseInt(searchParams.get('per_page') || '100')

    const repos = await getGitHubRepos({ sort, per_page: perPage })

    return NextResponse.json({
      success: true,
      data: repos,
      count: repos.length,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch repositories',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import projectsData from '@/data/projects.json'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let projects = projectsData

    // Filter by category
    if (category && category !== 'All') {
      projects = projects.filter(p => p.category === category)
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      projects = projects.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.techStack.some(tech => tech.toLowerCase().includes(searchLower))
      )
    }

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
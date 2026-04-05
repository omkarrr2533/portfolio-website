import { NextResponse } from 'next/server'
import { getMergedPRs } from '@/lib/github'

export async function GET() {
  try {
    const data = await getMergedPRs()
    return NextResponse.json({ success: true, ...data })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
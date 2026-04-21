import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const getSecret = () =>
  new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || 'dev-only-secret-change-in-production'
  )

const PROTECTED = ['/api/upload']

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED.some(p => pathname.startsWith(p))

  if (!isProtected) return NextResponse.next()

  const cookie = request.cookies.get('admin_session')
  if (!cookie?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await jwtVerify(cookie.value, getSecret())
    return NextResponse.next()
  } catch {
    return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/upload/:path*'],
}
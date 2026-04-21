import { NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'

const getSecret = () =>
  new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || 'dev-only-secret-change-in-production'
  )

// ── POST /api/admin/auth  → login ────────────────────────
export async function POST(request) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin not configured on server.' },
        { status: 500 }
      )
    }

    // Timing-safe comparison
    const buf1 = Buffer.from(password || '')
    const buf2 = Buffer.from(adminPassword)
    let mismatch = buf1.length !== buf2.length
    const len = Math.max(buf1.length, buf2.length)
    for (let i = 0; i < len; i++) {
      if ((buf1[i] ?? 0) !== (buf2[i] ?? 0)) mismatch = true
    }

    if (mismatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid password.' },
        { status: 401 }
      )
    }

    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(getSecret())

    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 })
  }
}

// ── DELETE /api/admin/auth  → logout ────────────────────
export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_session')
  return res
}

// ── GET /api/admin/auth  → check session ────────────────
export async function GET(request) {
  try {
    const cookie = request.cookies.get('admin_session')
    if (!cookie?.value) return NextResponse.json({ isAdmin: false })
    await jwtVerify(cookie.value, getSecret())
    return NextResponse.json({ isAdmin: true })
  } catch {
    return NextResponse.json({ isAdmin: false })
  }
}

export const dynamic = 'force-dynamic'
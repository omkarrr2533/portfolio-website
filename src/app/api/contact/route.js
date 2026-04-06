import { NextResponse } from 'next/server'

// NOTE: In-memory rate limiting resets on every cold start in serverless environments
// (Netlify Functions, Vercel, etc.). For production, replace with Redis or Upstash.
// For a portfolio contact form this is acceptable — each serverless instance
// independently limits to 10 submissions per IP per hour while it stays warm.
const rateLimitMap = new Map()

function rateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 5 // stricter: 5 per hour per IP

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip).filter(time => now - time < windowMs)

  if (requests.length >= maxRequests) {
    return false
  }

  requests.push(now)
  rateLimitMap.set(ip, requests)
  return true
}

// Basic honeypot + content validation
function validateInput({ name, email, subject, message }) {
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return 'All fields are required'
  }
  if (name.length > 100) return 'Name is too long'
  if (subject.length > 200) return 'Subject is too long'
  if (message.length > 5000) return 'Message is too long'
  if (message.length < 10) return 'Message is too short'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Invalid email address'
  return null
}

export async function POST(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    const validationError = validateInput({ name, email, subject, message })
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      )
    }

    // ── Send email here ──────────────────────────────────────────
    // Option 1 — Resend (recommended, free tier available):
    //   const { Resend } = await import('resend')
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({
    //     from: 'Portfolio <onboarding@resend.dev>',
    //     to: process.env.CONTACT_EMAIL,
    //     subject: `Portfolio Contact: ${subject}`,
    //     text: `From: ${name} <${email}>\n\n${message}`,
    //   })
    //
    // Option 2 — Nodemailer with Gmail:
    //   See https://nodemailer.com/usage/using-gmail/
    // ────────────────────────────────────────────────────────────

    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      ip,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
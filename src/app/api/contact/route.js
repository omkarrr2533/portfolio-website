import { NextResponse } from 'next/server'

// In-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map()

function rateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 10

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip)
  const recentRequests = requests.filter(time => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return false
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true
}

export async function POST(request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required',
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
        },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, just log it
    console.log('Contact form submission:', { name, email, subject, message })

    // In production, you would send an email here:
    /*
    await sendEmail({
      to: process.env.CONTACT_EMAIL,
      from: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })
    */

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
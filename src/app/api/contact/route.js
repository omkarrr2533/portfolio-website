import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/* ─────────────────────────────────────────────────────────
   Rate limiting  (in-memory; resets on cold starts)
───────────────────────────────────────────────────────── */
const rateLimitMap = new Map()

function rateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 5

  const history = (rateLimitMap.get(ip) || []).filter(t => now - t < windowMs)
  if (history.length >= maxRequests) return false
  rateLimitMap.set(ip, [...history, now])
  return true
}

/* ─────────────────────────────────────────────────────────
   Input validation
───────────────────────────────────────────────────────── */
function validate({ name, email, subject, message }) {
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim())
    return 'All fields are required.'
  if (name.length > 100)    return 'Name is too long (max 100 chars).'
  if (subject.length > 200) return 'Subject is too long (max 200 chars).'
  if (message.length > 5000) return 'Message is too long (max 5000 chars).'
  if (message.length < 10)  return 'Message is too short.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address.'
  return null
}

/* ─────────────────────────────────────────────────────────
   Nodemailer transporter  (Gmail + App Password)
───────────────────────────────────────────────────────── */
function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

/* ─────────────────────────────────────────────────────────
   HTML template — notification email (to Om)
───────────────────────────────────────────────────────── */
function buildNotificationHtml({ name, email, subject, message }) {
  const escaped = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const msgHtml = escaped(message).replace(/\n/g, '<br>')
  const ts = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background:#060D1F;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060D1F;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#0F1C35;border:1px solid rgba(79,70,229,0.3);border-radius:16px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4F46E5,#7C3AED);padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="width:40px;height:40px;background:rgba(255,255,255,0.15);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;vertical-align:middle;text-align:center;line-height:40px;">OK</div>
                    <span style="color:#fff;font-weight:700;font-size:18px;margin-left:12px;vertical-align:middle;">Portfolio Contact</span>
                  </td>
                  <td align="right">
                    <span style="background:rgba(255,255,255,0.15);color:#fff;font-size:11px;font-family:monospace;padding:4px 10px;border-radius:99px;">NEW MESSAGE</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <p style="color:#8EA4C8;font-size:13px;margin:0 0 24px;font-family:monospace;">
                Received on ${ts} (IST)
              </p>

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:rgba(79,70,229,0.08);border:1px solid rgba(79,70,229,0.2);border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="color:#818CF8;font-size:10px;font-family:monospace;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">Sender Details</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#4A6080;font-size:12px;font-family:monospace;padding-right:12px;padding-bottom:8px;">NAME</td>
                        <td style="color:#E8F0FE;font-size:14px;font-weight:600;padding-bottom:8px;">${escaped(name)}</td>
                      </tr>
                      <tr>
                        <td style="color:#4A6080;font-size:12px;font-family:monospace;padding-right:12px;padding-bottom:8px;">EMAIL</td>
                        <td style="padding-bottom:8px;">
                          <a href="mailto:${escaped(email)}" style="color:#06B6D4;font-size:14px;font-weight:600;text-decoration:none;">${escaped(email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color:#4A6080;font-size:12px;font-family:monospace;padding-right:12px;">SUBJECT</td>
                        <td style="color:#E8F0FE;font-size:14px;font-weight:600;">${escaped(subject)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="color:#818CF8;font-size:10px;font-family:monospace;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;">Message</p>
              <div style="background:rgba(6,10,22,0.7);border:1px solid rgba(148,163,184,0.1);border-radius:10px;padding:20px 24px;margin-bottom:28px;">
                <p style="color:#C8D8F0;font-size:14px;line-height:1.8;margin:0;">${msgHtml}</p>
              </div>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escaped(email)}?subject=Re: ${escaped(subject)}"
                      style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#fff;font-size:14px;font-weight:700;padding:12px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;">
                      ↩ Reply to ${escaped(name)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid rgba(148,163,184,0.07);">
              <p style="color:#2A3F60;font-size:11px;font-family:monospace;margin:0;text-align:center;">
                Sent via portfolio contact form · omshripadkapale@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ─────────────────────────────────────────────────────────
   HTML template — auto-reply (to the sender)
───────────────────────────────────────────────────────── */
function buildAutoReplyHtml({ name, subject }) {
  const escaped = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thanks for reaching out!</title>
</head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 4px 24px rgba(79,70,229,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4F46E5,#7C3AED);padding:36px 32px;text-align:center;">
              <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:12px;display:inline-block;line-height:48px;font-weight:800;font-size:17px;color:#fff;margin-bottom:12px;">OK</div>
              <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0;letter-spacing:-0.02em;">Message Received!</h1>
              <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:8px 0 0;">I'll get back to you within 24 hours</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;">
              <p style="color:#1e293b;font-size:15px;margin:0 0 16px;">Hey <strong>${escaped(name)}</strong> 👋</p>
              <p style="color:#475569;font-size:14px;line-height:1.8;margin:0 0 16px;">
                Thanks for reaching out! I received your message about <strong>"${escaped(subject)}"</strong> and I'll review it shortly.
              </p>
              <p style="color:#475569;font-size:14px;line-height:1.8;margin:0 0 28px;">
                I typically respond within <strong style="color:#4F46E5;">24 hours</strong>. In the meantime, feel free to explore my work below.
              </p>

              <!-- Links -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8faff;border:1px solid #e0e7ff;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="color:#4F46E5;font-size:11px;font-family:monospace;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 14px;font-weight:700;">Explore My Work</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:10px;">
                          <a href="https://github.com/omkarrr2533" style="color:#4F46E5;font-size:13px;font-weight:600;text-decoration:none;">⭐ GitHub — @omkarrr2533</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:10px;">
                          <a href="https://www.linkedin.com/in/om-kapale-b861a228a" style="color:#4F46E5;font-size:13px;font-weight:600;text-decoration:none;">💼 LinkedIn — Om Kapale</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="color:#64748b;font-size:13px;">📍 GSoC 2026 Contributor · PEcAn Project</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="color:#94a3b8;font-size:13px;margin:0;">
                If you didn't send this message, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:#f8faff;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="color:#94a3b8;font-size:11px;margin:0;">
                Om Shripad Kapale · Mumbai, India · omshripadkapale@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ─────────────────────────────────────────────────────────
   POST  /api/contact
───────────────────────────────────────────────────────── */
export async function POST(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    const validationError = validate({ name, email, subject, message })
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 })
    }

    const ownerEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER

    // Check env vars — fail early with a clear message
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Contact email not configured: missing GMAIL_USER or GMAIL_APP_PASSWORD')
      return NextResponse.json(
        { success: false, error: 'Email service is not configured. Please contact me directly at omshripadkapale@gmail.com' },
        { status: 503 }
      )
    }

    const transporter = createTransporter()

    // Send both emails concurrently
    await Promise.all([
      // 1. Notification to Om
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: ownerEmail,
        replyTo: `"${name}" <${email}>`,
        subject: `[Portfolio] ${subject}`,
        html: buildNotificationHtml({ name, email, subject, message }),
        text: `New contact form message\n\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),

      // 2. Auto-reply to sender
      transporter.sendMail({
        from: `"Om Kapale" <${process.env.GMAIL_USER}>`,
        to: `"${name}" <${email}>`,
        subject: `Got your message! — ${subject}`,
        html: buildAutoReplyHtml({ name, subject }),
        text: `Hi ${name},\n\nThanks for reaching out! I received your message about "${subject}" and will get back to you within 24 hours.\n\nBest,\nOm Kapale\nomshripadkapale@gmail.com`,
      }),
    ])

    console.log(`Contact form: email delivered — from ${name} <${email}> | subject: "${subject}"`)

    return NextResponse.json({ success: true, message: 'Message sent! Check your inbox for a confirmation.' })

  } catch (error) {
    console.error('Contact form error:', error.message)

    // Distinguish config errors from runtime errors
    if (error.message?.includes('Missing GMAIL')) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Please reach out directly at omshripadkapale@gmail.com' },
        { status: 503 }
      )
    }
    if (error.code === 'EAUTH') {
      return NextResponse.json(
        { success: false, error: 'Email authentication failed. Please contact me directly at omshripadkapale@gmail.com' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again or email me directly.' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'

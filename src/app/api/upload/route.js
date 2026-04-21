import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { uploadBuffer } from '@/lib/cloudinary'

const getSecret = () =>
  new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || 'dev-only-secret-change-in-production'
  )

async function requireAdmin(request) {
  const cookie = request.cookies.get('admin_session')
  if (!cookie?.value) throw new Error('Unauthorized')
  await jwtVerify(cookie.value, getSecret())
}

export async function POST(request) {
  try {
    await requireAdmin(request)
  } catch {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!file) return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 })

    const mimeType = file.type
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Only images allowed.' }, { status: 400 })
    }

    const folder  = formData.get('folder')  || 'portfolio'
    const publicId = formData.get('public_id') || undefined

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await uploadBuffer(buffer, { folder, public_id: publicId })

    return NextResponse.json({
      success: true,
      url:      result.secure_url,
      publicId: result.public_id,
      width:    result.width,
      height:   result.height,
    })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ success: false, error: 'Upload failed.' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
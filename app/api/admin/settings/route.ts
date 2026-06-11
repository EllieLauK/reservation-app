import { NextRequest, NextResponse } from 'next/server'
import { parseSettings, type SiteSettings } from '@/lib/settings'

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get('site_settings')?.value
  const settings = parseSettings(cookieValue)
  return NextResponse.json(settings)
}

export async function POST(request: NextRequest) {
  const settings: SiteSettings = await request.json()
  const encoded = Buffer.from(JSON.stringify(settings)).toString('base64')
  const response = NextResponse.json({ success: true })
  response.cookies.set('site_settings', encoded, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })
  return response
}

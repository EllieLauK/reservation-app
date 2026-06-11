import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const validUsername = process.env.ADMIN_USERNAME ?? 'admin'
  const validPassword = process.env.ADMIN_PASSWORD ?? 'admin123'
  const sessionToken = process.env.ADMIN_SESSION_TOKEN ?? 'dev-session-token'

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return response
}

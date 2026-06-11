import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  if (acceptLanguage.includes('zh-TW') || acceptLanguage.includes('zh-Hant')) return 'zh-TW'
  if (/zh(-hans|-cn|-sg|-my)?([^-a-z]|$)/i.test(acceptLanguage)) return 'zh-CN'
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes (except login page and auth API)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionToken = process.env.ADMIN_SESSION_TOKEN ?? 'dev-session-token'
    const cookie = request.cookies.get('admin_session')
    if (!cookie || cookie.value !== sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    const res = NextResponse.next()
    res.headers.set('x-locale', 'en')
    return res
  }

  const currentLocale = locales.find(
    l => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )

  if (currentLocale) {
    const res = NextResponse.next()
    res.headers.set('x-locale', currentLocale)
    return res
  }

  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  const res = NextResponse.redirect(url)
  res.headers.set('x-locale', locale)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeLabels } from '@/lib/i18n'
import type { Locale, Dictionary } from '@/lib/i18n'

export default function Navbar({ dict, locale }: { dict: Dictionary['nav']; locale: string }) {
  const pathname = usePathname()

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/') || `/${newLocale}`
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-rose-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-xl font-semibold text-rose-700 tracking-tight">
          {dict.brand}
        </Link>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/#services`} className="text-sm text-stone-500 hover:text-rose-700 transition-colors hidden sm:block">
            {dict.services}
          </Link>
          <Link href={`/${locale}/#team`} className="text-sm text-stone-500 hover:text-rose-700 transition-colors hidden sm:block">
            {dict.team}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-1 border border-stone-200 rounded-full px-1 py-0.5">
            {locales.map(l => (
              <Link
                key={l}
                href={switchLocale(l)}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors
                  ${locale === l ? 'bg-rose-600 text-white' : 'text-stone-500 hover:text-rose-700'}`}
              >
                {localeLabels[l as Locale]}
              </Link>
            ))}
          </div>

          <Link
            href={`/${locale}/book`}
            className="bg-rose-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors"
          >
            {dict.bookNow}
          </Link>
        </div>
      </div>
    </nav>
  )
}

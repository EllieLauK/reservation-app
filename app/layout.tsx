import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { headers, cookies } from 'next/headers'
import { localeLang } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { parseSettings, getThemeStyle } from '@/lib/settings'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luxe Nails — Book Your Appointment',
  description: 'Online booking for Luxe Nails salon.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const locale = (h.get('x-locale') ?? 'en') as Locale
  const lang = localeLang[locale] ?? 'en'

  const cookieStore = await cookies()
  const settings = parseSettings(cookieStore.get('site_settings')?.value)
  const themeStyle = getThemeStyle(settings.theme)

  return (
    <html lang={lang} className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}

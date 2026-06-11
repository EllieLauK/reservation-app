import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { headers } from 'next/headers'
import { localeLang } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
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

  return (
    <html lang={lang} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}

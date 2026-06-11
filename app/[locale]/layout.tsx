import { cookies } from 'next/headers'
import { locales, getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { parseSettings } from '@/lib/settings'
import Navbar from '@/components/Navbar'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale as Locale)

  const cookieStore = await cookies()
  const settings = parseSettings(cookieStore.get('site_settings')?.value)
  const salonName = settings.salonName || dict.nav.brand
  const navDict = { ...dict.nav, brand: salonName }

  return (
    <>
      <Navbar dict={navDict} locale={locale} />
      {children}
    </>
  )
}

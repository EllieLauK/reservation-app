import { locales, getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
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

  return (
    <>
      <Navbar dict={dict.nav} locale={locale} />
      {children}
    </>
  )
}

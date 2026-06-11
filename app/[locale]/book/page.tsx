import BookingWizard from '@/components/BookingWizard'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale as Locale)

  return (
    <div className="flex-1 bg-rose-50/50">
      <BookingWizard dict={dict.booking} categories={dict.categories} locale={locale} />
    </div>
  )
}

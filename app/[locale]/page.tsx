import Link from 'next/link'
import { cookies } from 'next/headers'
import { services, staff, formatPrice, formatDuration } from '@/lib/data'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { parseSettings } from '@/lib/settings'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getDictionary(locale as Locale)

  const cookieStore = await cookies()
  const settings = parseSettings(cookieStore.get('site_settings')?.value)
  const ov = settings.content[locale as keyof typeof settings.content] ?? {}

  const h = {
    ...t.home,
    badge: settings.badge || t.home.badge,
    address: settings.address || t.home.address,
    phone: settings.phone || t.home.phone,
    heroTitle: ov.heroTitle ?? t.home.heroTitle,
    heroTitleAccent: ov.heroTitleAccent ?? t.home.heroTitleAccent,
    heroDesc: ov.heroDesc ?? t.home.heroDesc,
    heroCTA: ov.heroCTA ?? t.home.heroCTA,
    howItWorks: ov.howItWorks ?? t.home.howItWorks,
    steps: [
      { title: ov.step1Title ?? t.home.steps[0].title, desc: ov.step1Desc ?? t.home.steps[0].desc },
      { title: ov.step2Title ?? t.home.steps[1].title, desc: ov.step2Desc ?? t.home.steps[1].desc },
      { title: ov.step3Title ?? t.home.steps[2].title, desc: ov.step3Desc ?? t.home.steps[2].desc },
    ],
    servicesTitle: ov.servicesTitle ?? t.home.servicesTitle,
    servicesDesc: ov.servicesDesc ?? t.home.servicesDesc,
    bookService: ov.bookService ?? t.home.bookService,
    teamTitle: ov.teamTitle ?? t.home.teamTitle,
    teamDesc: ov.teamDesc ?? t.home.teamDesc,
    ctaTitle: ov.ctaTitle ?? t.home.ctaTitle,
    ctaDesc: ov.ctaDesc ?? t.home.ctaDesc,
    ctaButton: ov.ctaButton ?? t.home.ctaButton,
  }
  const cats = t.categories

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[var(--brand-from)] to-[var(--brand-to)] py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[var(--brand-600)] font-medium text-sm tracking-widest uppercase mb-4">{h.badge}</p>
          <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-6 text-center">
            {h.heroTitle}<br />
            <span className="text-[var(--brand-700)]">{h.heroTitleAccent}</span>
          </h1>
          <p className="text-lg text-stone-500 mb-10 max-w-md mx-auto">{h.heroDesc}</p>
          <Link
            href={`/${locale}/book`}
            className="inline-block bg-[var(--brand-700)] text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-[var(--brand-800)] transition-colors shadow-lg"
          >
            {h.heroCTA}
          </Link>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[var(--brand-100)] rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--brand-100)] rounded-full opacity-50 blur-3xl" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">{h.howItWorks}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {h.steps.map(({ title, desc }, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-100)] text-[var(--brand-800)] font-bold text-lg flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-stone-900 text-center">{title}</h3>
                <p className="text-sm text-stone-500 text-center">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-[var(--brand-50)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-2 text-center">{h.servicesTitle}</h2>
          <p className="text-stone-500 text-center mb-12">{h.servicesDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--brand-50)] hover:shadow-md transition-shadow">
                <span className="inline-block text-xs font-medium text-[var(--brand-700)] bg-[var(--brand-50)] px-2 py-0.5 rounded-full mb-3">
                  {cats[service.category]}
                </span>
                <h3 className="font-semibold text-stone-900 mb-1">{service.name}</h3>
                <p className="text-sm text-stone-500 mb-4">{service.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-400">{formatDuration(service.duration)}</span>
                  <span className="font-semibold text-stone-900">{formatPrice(service.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/book`} className="inline-block bg-[var(--brand-700)] text-white px-7 py-3 rounded-full font-medium hover:bg-[var(--brand-800)] transition-colors">
              {h.bookService}
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-2 text-center">{h.teamTitle}</h2>
          <p className="text-stone-500 mb-12 text-center">{h.teamDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {staff.map(member => (
              <div key={member.id} className="flex flex-col items-center gap-3">
                <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center text-2xl font-semibold text-white shadow-md`}>
                  {member.initials}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-stone-900">{member.name}</h3>
                  <p className="text-sm text-[var(--brand-700)] mb-2">{member.role}</p>
                  <p className="text-sm text-stone-500">{member.bio}</p>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.specialties.map(s => (
                    <span key={s} className="text-xs bg-[var(--brand-50)] text-[var(--brand-800)] px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--brand-700)] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{h.ctaTitle}</h2>
        <p className="text-[var(--brand-100)] mb-8 max-w-md mx-auto">{h.ctaDesc}</p>
        <Link href={`/${locale}/book`} className="inline-block bg-white text-[var(--brand-700)] px-8 py-3.5 rounded-full font-semibold hover:bg-[var(--brand-50)] transition-colors shadow-lg">
          {h.ctaButton}
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-6 text-center text-sm">
        <p className="font-semibold text-white mb-1">{h.badge}</p>
        <p>{h.address} &nbsp;·&nbsp; {h.phone}</p>
        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 border border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
          >
            <span>⚙</span> {h.admin}
          </Link>
        </div>
      </footer>
    </main>
  )
}

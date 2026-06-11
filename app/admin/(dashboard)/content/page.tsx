'use client'

import { useState, useEffect } from 'react'
import { services, staff } from '@/lib/data'
import type { Service, Staff } from '@/lib/data'
import { defaultSettings, THEMES } from '@/lib/settings'
import type { SiteSettings, Theme, LocaleContent } from '@/lib/settings'

type Tab = 'salon' | 'en' | 'zh-TW' | 'zh-CN' | 'services' | 'staff' | 'theme'
type Locale = 'en' | 'zh-TW' | 'zh-CN'
const CATEGORY_OPTIONS = ['manicure', 'pedicure', 'gel', 'nail-art', 'acrylic'] as const

/* ───────────── Helpers ───────────── */

function Field({
  label, value, onChange, multiline = false,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean
}) {
  const cls = 'w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white'
  return (
    <div>
      <label className="block text-xs font-medium text-stone-500 mb-1">{label}</label>
      {multiline
        ? <textarea rows={2} value={value} onChange={e => onChange(e.target.value)} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  )
}

function SaveBar({ onSave, saving, saved }: { onSave: () => void; saving: boolean; saved: boolean }) {
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-stone-100 mt-6">
      <button
        onClick={onSave}
        disabled={saving}
        className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
          saved ? 'bg-green-600 text-white' : 'bg-purple-700 text-white hover:bg-purple-800'
        }`}
      >
        {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Changes'}
      </button>
      <p className="text-xs text-stone-400">Changes apply site-wide after saving.</p>
    </div>
  )
}

/* ───────────── Salon Info ───────────── */

function SalonEditor({
  settings, onChange,
}: { settings: SiteSettings; onChange: (s: SiteSettings) => void }) {
  function set(field: keyof SiteSettings, value: string) {
    onChange({ ...settings, [field]: value })
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-500">Core info shown in the navbar, footer, and every language version.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Salon Name" value={settings.salonName} onChange={v => set('salonName', v)} />
        <Field label="Badge / Tagline" value={settings.badge} onChange={v => set('badge', v)} />
        <Field label="Address" value={settings.address} onChange={v => set('address', v)} />
        <Field label="Phone" value={settings.phone} onChange={v => set('phone', v)} />
      </div>
    </div>
  )
}

/* ───────────── Locale Content ───────────── */

const defaultContent: Record<Locale, LocaleContent> = {
  en: {
    heroTitle: 'Beautiful nails', heroTitleAccent: 'effortlessly booked',
    heroDesc: 'Reserve your appointment online in minutes. No calls, no waiting — just gorgeous nails.',
    heroCTA: 'Book an Appointment', howItWorks: 'How It Works',
    step1Title: 'Choose a Service', step1Desc: "Browse our menu and pick what you're in the mood for.",
    step2Title: 'Pick Your Stylist', step2Desc: 'Select your preferred nail tech and a time that works for you.',
    step3Title: 'Relax & Enjoy', step3Desc: 'Show up and let us take care of the rest.',
    servicesTitle: 'Our Services', servicesDesc: 'From a quick refresh to a full set — we have you covered.',
    bookService: 'Book a Service', teamTitle: 'Meet Our Team',
    teamDesc: 'Skilled, passionate, and here to make you feel great.',
    ctaTitle: 'Ready for beautiful nails?', ctaDesc: 'Book your appointment today — spots fill up fast!',
    ctaButton: 'Book Now',
  },
  'zh-TW': {
    heroTitle: '完美指甲', heroTitleAccent: '輕鬆預約',
    heroDesc: '幾分鐘內完成線上預約，無需電話，無需等待，只有精緻美甲。',
    heroCTA: '立即預約', howItWorks: '預約流程',
    step1Title: '選擇服務', step1Desc: '瀏覽我們的服務項目，選擇您喜歡的。',
    step2Title: '選擇美甲師', step2Desc: '選擇您偏好的美甲師及適合的時間。',
    step3Title: '放鬆享受', step3Desc: '準時到店，其餘交給我們。',
    servicesTitle: '服務項目', servicesDesc: '從快速補色到全套美甲，我們都能滿足您的需求。',
    bookService: '預約服務', teamTitle: '認識我們的團隊',
    teamDesc: '技術精湛、熱情專注，讓您感受最好的服務。',
    ctaTitle: '準備好擁有完美指甲了嗎？', ctaDesc: '立即預約，名額有限，先到先得！',
    ctaButton: '立即預約',
  },
  'zh-CN': {
    heroTitle: '完美指甲', heroTitleAccent: '轻松预约',
    heroDesc: '几分钟内完成线上预约，无需电话，无需等待，只有精致美甲。',
    heroCTA: '立即预约', howItWorks: '预约流程',
    step1Title: '选择服务', step1Desc: '浏览我们的服务项目，选择您喜欢的。',
    step2Title: '选择美甲师', step2Desc: '选择您偏好的美甲师及合适的时间。',
    step3Title: '放松享受', step3Desc: '准时到店，其余交给我们。',
    servicesTitle: '服务项目', servicesDesc: '从快速补色到全套美甲，我们都能满足您的需求。',
    bookService: '预约服务', teamTitle: '认识我们的团队',
    teamDesc: '技术精湛、热情专注，让您感受最好的服务。',
    ctaTitle: '准备好拥有完美指甲了吗？', ctaDesc: '立即预约，名额有限，先到先得！',
    ctaButton: '立即预约',
  },
}

function LocaleEditor({
  locale, settings, onChange,
}: { locale: Locale; settings: SiteSettings; onChange: (s: SiteSettings) => void }) {
  const content = { ...defaultContent[locale], ...settings.content[locale] }

  function set(key: keyof LocaleContent, value: string) {
    onChange({
      ...settings,
      content: {
        ...settings.content,
        [locale]: { ...settings.content[locale], [key]: value },
      },
    })
  }

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-3 pb-1 border-b border-stone-100">Hero</h3>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Headline (line 1)" value={content.heroTitle ?? ''} onChange={v => set('heroTitle', v)} />
          <Field label="Headline (line 2 — accent color)" value={content.heroTitleAccent ?? ''} onChange={v => set('heroTitleAccent', v)} />
          <Field label="Description" value={content.heroDesc ?? ''} onChange={v => set('heroDesc', v)} multiline />
          <Field label="CTA Button" value={content.heroCTA ?? ''} onChange={v => set('heroCTA', v)} />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-3 pb-1 border-b border-stone-100">How It Works</h3>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Section Title" value={content.howItWorks ?? ''} onChange={v => set('howItWorks', v)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Step 1 Title" value={content.step1Title ?? ''} onChange={v => set('step1Title', v)} />
            <Field label="Step 1 Description" value={content.step1Desc ?? ''} onChange={v => set('step1Desc', v)} />
            <Field label="Step 2 Title" value={content.step2Title ?? ''} onChange={v => set('step2Title', v)} />
            <Field label="Step 2 Description" value={content.step2Desc ?? ''} onChange={v => set('step2Desc', v)} />
            <Field label="Step 3 Title" value={content.step3Title ?? ''} onChange={v => set('step3Title', v)} />
            <Field label="Step 3 Description" value={content.step3Desc ?? ''} onChange={v => set('step3Desc', v)} />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-3 pb-1 border-b border-stone-100">Services Section</h3>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Section Title" value={content.servicesTitle ?? ''} onChange={v => set('servicesTitle', v)} />
          <Field label="Section Description" value={content.servicesDesc ?? ''} onChange={v => set('servicesDesc', v)} />
          <Field label="Book Button" value={content.bookService ?? ''} onChange={v => set('bookService', v)} />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-3 pb-1 border-b border-stone-100">Team Section</h3>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Section Title" value={content.teamTitle ?? ''} onChange={v => set('teamTitle', v)} />
          <Field label="Section Description" value={content.teamDesc ?? ''} onChange={v => set('teamDesc', v)} />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-3 pb-1 border-b border-stone-100">Call-to-Action Banner</h3>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Title" value={content.ctaTitle ?? ''} onChange={v => set('ctaTitle', v)} />
          <Field label="Description" value={content.ctaDesc ?? ''} onChange={v => set('ctaDesc', v)} />
          <Field label="Button" value={content.ctaButton ?? ''} onChange={v => set('ctaButton', v)} />
        </div>
      </section>
    </div>
  )
}

/* ───────────── Services ───────────── */

function ServicesEditor() {
  const [items, setItems] = useState<Service[]>(services)
  const [saved, setSaved] = useState(false)

  function update(id: string, field: keyof Service, value: string | number) {
    setItems(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-500">Edit service names, descriptions, durations, and prices.</p>
      <div className="space-y-3">
        {items.map(service => (
          <div key={service.id} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Name</label>
                <input type="text" value={service.name} onChange={e => update(service.id, 'name', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Category</label>
                <select value={service.category} onChange={e => update(service.id, 'category', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white">
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Price ($)</label>
                <input type="number" value={service.price} onChange={e => update(service.id, 'price', Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Duration (min)</label>
                <input type="number" value={service.duration} onChange={e => update(service.id, 'duration', Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Description</label>
              <input type="text" value={service.description} onChange={e => update(service.id, 'description', e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
        className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-purple-700 text-white hover:bg-purple-800'}`}>
        {saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </div>
  )
}

/* ───────────── Staff ───────────── */

function StaffEditor() {
  const [items, setItems] = useState<Staff[]>(staff)
  const [saved, setSaved] = useState(false)
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  function update(id: string, field: keyof Staff, value: string | string[] | number[]) {
    setItems(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-500">Edit staff names, roles, bios, and available days.</p>
      <div className="space-y-4">
        {items.map(member => (
          <div key={member.id} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {member.initials}
              </div>
              <p className="font-medium text-stone-900">{member.name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Name</label>
                <input type="text" value={member.name} onChange={e => update(member.id, 'name', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Role / Title</label>
                <input type="text" value={member.role} onChange={e => update(member.id, 'role', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-500 mb-1">Bio</label>
                <input type="text" value={member.bio} onChange={e => update(member.id, 'bio', e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-500 mb-1">Specialties (comma-separated)</label>
                <input type="text" value={member.specialties.join(', ')}
                  onChange={e => update(member.id, 'specialties', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-2">Available Days</label>
              <div className="flex gap-2 flex-wrap">
                {DAY_NAMES.map((day, i) => {
                  const active = member.availableDays.includes(i)
                  return (
                    <button key={day} onClick={() => {
                      const next = active ? member.availableDays.filter(d => d !== i) : [...member.availableDays, i].sort()
                      update(member.id, 'availableDays', next)
                    }}
                      className={`w-10 h-10 rounded-full text-xs font-medium transition-colors
                        ${active ? 'bg-purple-700 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-purple-300'}`}>
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
        className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-purple-700 text-white hover:bg-purple-800'}`}>
        {saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </div>
  )
}

/* ───────────── Theme ───────────── */

function ThemeEditor({
  settings, onChange,
}: { settings: SiteSettings; onChange: (s: SiteSettings) => void }) {
  const themes = Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]

  function selectTheme(theme: Theme) {
    onChange({ ...settings, theme })
    const vars = THEMES[theme].vars
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v)
    })
    if (theme === 'purple') {
      document.documentElement.style.setProperty('--background', '#faf5ff')
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-stone-500">Choose a color palette for your entire website. The preview updates instantly.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {themes.map(([key, theme]) => (
          <button
            key={key}
            onClick={() => selectTheme(key)}
            className={`rounded-2xl border-2 p-4 flex flex-col items-center gap-3 transition-all
              ${settings.theme === key
                ? 'border-stone-900 shadow-lg scale-105'
                : 'border-stone-200 hover:border-stone-400'}`}
          >
            <div
              className="w-14 h-14 rounded-full shadow-md"
              style={{ background: `linear-gradient(135deg, ${theme.vars['--brand-400']}, ${theme.vars['--brand-700']})` }}
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-stone-900">{theme.label}</p>
              <div className="flex gap-1 justify-center mt-2">
                {(['--brand-300', '--brand-500', '--brand-700', '--brand-900'] as const).map(v => (
                  <div key={v} className="w-3 h-3 rounded-full" style={{ background: theme.vars[v] }} />
                ))}
              </div>
            </div>
            {settings.theme === key && (
              <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">Active</span>
            )}
          </button>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Preview mode:</span> Theme changes are instantly visible on this device.
          Click Save Changes to publish them — they'll appear site-wide after connecting a database.
        </p>
      </div>
    </div>
  )
}

/* ───────────── Main Page ───────────── */

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>('salon')
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(s => { setSettings(s); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'salon', label: 'Salon Info' },
    { id: 'en', label: 'English' },
    { id: 'zh-TW', label: '繁中' },
    { id: 'zh-CN', label: '简中' },
    { id: 'services', label: 'Services' },
    { id: 'staff', label: 'Staff' },
    { id: 'theme', label: '🎨 Theme' },
  ]

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="text-stone-400 text-sm">Loading settings…</div>
      </div>
    )
  }

  const contentTabs: Locale[] = ['en', 'zh-TW', 'zh-CN']

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Content Editor</h1>
        <p className="text-stone-500 text-sm mt-1">Edit every piece of text and the color theme shown on your website.</p>
      </div>

      <div className="flex gap-1 bg-stone-100 rounded-xl p-1 w-fit mb-8 flex-wrap">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${tab === id ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6 max-w-3xl">
        {tab === 'salon' && <SalonEditor settings={settings} onChange={setSettings} />}
        {contentTabs.includes(tab as Locale) && (
          <LocaleEditor locale={tab as Locale} settings={settings} onChange={setSettings} />
        )}
        {tab === 'services' && <ServicesEditor />}
        {tab === 'staff' && <StaffEditor />}
        {tab === 'theme' && <ThemeEditor settings={settings} onChange={setSettings} />}

        {tab !== 'services' && tab !== 'staff' && (
          <SaveBar onSave={save} saving={saving} saved={saved} />
        )}
      </div>
    </div>
  )
}

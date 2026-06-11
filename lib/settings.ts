export type Theme = 'purple' | 'rose' | 'ocean' | 'sage' | 'ember'

export type LocaleContent = {
  heroTitle?: string
  heroTitleAccent?: string
  heroDesc?: string
  heroCTA?: string
  howItWorks?: string
  step1Title?: string; step1Desc?: string
  step2Title?: string; step2Desc?: string
  step3Title?: string; step3Desc?: string
  servicesTitle?: string; servicesDesc?: string
  bookService?: string
  teamTitle?: string; teamDesc?: string
  ctaTitle?: string; ctaDesc?: string; ctaButton?: string
}

export type SiteSettings = {
  theme: Theme
  salonName: string
  badge: string
  address: string
  phone: string
  content: {
    en: LocaleContent
    'zh-TW': LocaleContent
    'zh-CN': LocaleContent
  }
}

export const defaultSettings: SiteSettings = {
  theme: 'purple',
  salonName: 'Luxe Nails',
  badge: 'Premium Nail Salon',
  address: '123 Beauty Lane, Toronto, ON',
  phone: '(416) 555-0100',
  content: { en: {}, 'zh-TW': {}, 'zh-CN': {} },
}

export function parseSettings(cookieValue: string | undefined): SiteSettings {
  if (!cookieValue) return defaultSettings
  try {
    const json = Buffer.from(cookieValue, 'base64').toString('utf-8')
    const parsed = JSON.parse(json)
    return {
      ...defaultSettings,
      ...parsed,
      content: {
        en: { ...defaultSettings.content.en, ...(parsed.content?.en ?? {}) },
        'zh-TW': { ...defaultSettings.content['zh-TW'], ...(parsed.content?.['zh-TW'] ?? {}) },
        'zh-CN': { ...defaultSettings.content['zh-CN'], ...(parsed.content?.['zh-CN'] ?? {}) },
      },
    }
  } catch {
    return defaultSettings
  }
}

export const THEMES: Record<Theme, { label: string; swatch: string; vars: Record<string, string> }> = {
  purple: {
    label: 'Pantone Purple',
    swatch: '#7e22ce',
    vars: {
      '--brand-50': '#faf5ff', '--brand-100': '#f3e8ff', '--brand-200': '#e9d5ff',
      '--brand-300': '#d8b4fe', '--brand-400': '#c084fc', '--brand-500': '#a855f7',
      '--brand-600': '#9333ea', '--brand-700': '#7e22ce', '--brand-800': '#6b21a8',
      '--brand-900': '#581c87', '--brand-from': '#faf5ff', '--brand-to': '#fdf4ff',
      '--background': '#faf5ff',
    },
  },
  rose: {
    label: 'Rose',
    swatch: '#be185d',
    vars: {
      '--brand-50': '#fff1f2', '--brand-100': '#ffe4e6', '--brand-200': '#fecdd3',
      '--brand-300': '#fda4af', '--brand-400': '#fb7185', '--brand-500': '#f43f5e',
      '--brand-600': '#e11d48', '--brand-700': '#be185d', '--brand-800': '#9d174d',
      '--brand-900': '#881337', '--brand-from': '#fff1f2', '--brand-to': '#fdf2f8',
      '--background': '#fff8f8',
    },
  },
  ocean: {
    label: 'Ocean Blue',
    swatch: '#1d4ed8',
    vars: {
      '--brand-50': '#eff6ff', '--brand-100': '#dbeafe', '--brand-200': '#bfdbfe',
      '--brand-300': '#93c5fd', '--brand-400': '#60a5fa', '--brand-500': '#3b82f6',
      '--brand-600': '#2563eb', '--brand-700': '#1d4ed8', '--brand-800': '#1e40af',
      '--brand-900': '#1e3a8a', '--brand-from': '#eff6ff', '--brand-to': '#ecfeff',
      '--background': '#f0f9ff',
    },
  },
  sage: {
    label: 'Sage Green',
    swatch: '#15803d',
    vars: {
      '--brand-50': '#f0fdf4', '--brand-100': '#dcfce7', '--brand-200': '#bbf7d0',
      '--brand-300': '#86efac', '--brand-400': '#4ade80', '--brand-500': '#22c55e',
      '--brand-600': '#16a34a', '--brand-700': '#15803d', '--brand-800': '#166534',
      '--brand-900': '#14532d', '--brand-from': '#f0fdf4', '--brand-to': '#ecfdf5',
      '--background': '#f0fdf4',
    },
  },
  ember: {
    label: 'Ember',
    swatch: '#c2410c',
    vars: {
      '--brand-50': '#fff7ed', '--brand-100': '#ffedd5', '--brand-200': '#fed7aa',
      '--brand-300': '#fdba74', '--brand-400': '#fb923c', '--brand-500': '#f97316',
      '--brand-600': '#ea580c', '--brand-700': '#c2410c', '--brand-800': '#9a3412',
      '--brand-900': '#7c2d12', '--brand-from': '#fff7ed', '--brand-to': '#fefce8',
      '--background': '#fffbeb',
    },
  },
}

export function getThemeStyle(theme: Theme): string {
  const vars = THEMES[theme]?.vars ?? THEMES.purple.vars
  return `:root{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')}}`
}

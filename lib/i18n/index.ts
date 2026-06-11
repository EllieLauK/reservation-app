import { en } from './en'
import { zhTW } from './zh-TW'
import { zhCN } from './zh-CN'
import type { Dictionary } from './en'

export type { Dictionary }

export const locales = ['en', 'zh-TW', 'zh-CN'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

const dictionaries: Record<Locale, Dictionary> = { en, 'zh-TW': zhTW, 'zh-CN': zhCN }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en
}

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  'zh-TW': '繁中',
  'zh-CN': '简中',
}

export const localeLang: Record<Locale, string> = {
  en: 'en',
  'zh-TW': 'zh-Hant',
  'zh-CN': 'zh-Hans',
}

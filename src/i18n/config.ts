import { en, type Texts } from './locales/en'
import { es } from './locales/es'

export const LOCALES = ['en', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const messages: Record<Locale, Texts> = { en, es }

/** localStorage key that remembers the visitor's choice. */
export const LOCALE_STORAGE_KEY = 'locale'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/**
 * Initial locale: the stored choice first, then the browser language
 * (`es-CO` → `es`), then the default. Storage access is guarded because it can
 * throw in private mode or when site data is blocked.
 */
export function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // Storage unavailable: fall through to the browser language
  }
  const browser = typeof navigator === 'undefined' ? undefined : navigator.language?.slice(0, 2)
  return isLocale(browser) ? browser : DEFAULT_LOCALE
}

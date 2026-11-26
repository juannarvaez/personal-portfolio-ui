import { createContext } from 'react'
import type { Texts } from './locales/en'
import type { Locale } from './config'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Dictionary for the active locale, e.g. `dictionary.home.tagline`. */
  dictionary: Texts
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

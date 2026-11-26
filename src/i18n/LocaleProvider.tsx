import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocaleContext, type LocaleContextValue } from './LocaleContext'
import { detectLocale, LOCALE_STORAGE_KEY, messages, type Locale } from './config'

export interface LocaleProviderProps {
  children: ReactNode
  /** Forces the starting locale (tests, Storybook). Detected from storage/browser otherwise. */
  initialLocale?: Locale
}

/**
 * Holds the active locale, persists it to localStorage and keeps `<html lang>`
 * in sync so screen readers and the browser pick the right language.
 */
export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(() => initialLocale ?? detectLocale())

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // Storage unavailable: the choice just won't survive a reload
    }
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, dictionary: messages[locale] }),
    [locale],
  )

  return <LocaleContext value={value}>{children}</LocaleContext>
}

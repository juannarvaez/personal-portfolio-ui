import { useContext } from 'react'
import { LocaleContext, type LocaleContextValue } from './LocaleContext'

/** Active locale, its setter and the translated messages. Must be used under `LocaleProvider`. */
export function useI18n(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useI18n must be used within a LocaleProvider')
  return context
}

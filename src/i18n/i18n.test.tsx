import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '@/routes'
import { detectLocale, LOCALE_STORAGE_KEY } from './config'
import { en } from './locales/en'
import { es } from './locales/es'

function renderHome() {
  const router = createMemoryRouter(routes, { initialEntries: ['/'] })
  render(<RouterProvider router={router} />)
}

/** Collects every key path in a dictionary, e.g. `home.sections.contact.title`. */
function keyPaths(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null
      ? keyPaths(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  )
}

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('i18n', () => {
  it('keeps the Spanish dictionary in sync with the English one', () => {
    expect(keyPaths(es)).toEqual(keyPaths(en))
  })

  it('switches the home copy to Spanish and back', async () => {
    const user = userEvent.setup()
    renderHome()

    expect(screen.getByRole('heading', { name: 'I play support. Teams win.' })).toBeInTheDocument()

    await user.click(screen.getByRole('switch'))
    expect(
      screen.getByRole('heading', { name: 'Juego de soporte. El equipo gana.' }),
    ).toBeInTheDocument()
    expect(screen.getByText(es.home.sections.contact.title)).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('es')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('es')

    await user.click(screen.getByRole('switch'))
    expect(screen.getByRole('heading', { name: 'I play support. Teams win.' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
  })

  it('restores the stored locale on load', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'es')
    renderHome()
    expect(screen.getByRole('switch')).toBeChecked()
    expect(screen.getByText(es.home.tagline)).toBeInTheDocument()
  })

  describe('detectLocale', () => {
    it('prefers the stored choice over the browser language', () => {
      localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-CO')
      expect(detectLocale()).toBe('en')
    })

    it('falls back to the browser language', () => {
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-CO')
      expect(detectLocale()).toBe('es')
    })

    it('falls back to English for unsupported languages', () => {
      vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR')
      expect(detectLocale()).toBe('en')
    })
  })
})

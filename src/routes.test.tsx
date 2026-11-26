import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '@/routes'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

describe('routes', () => {
  it('renders the home page at /', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'I play support. Teams win.' })).toBeInTheDocument()
  })

  it('redirects unknown paths to /', async () => {
    const router = renderAt('/does-not-exist')
    expect(
      await screen.findByRole('heading', { name: 'I play support. Teams win.' }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })
})

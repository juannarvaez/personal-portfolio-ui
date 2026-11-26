import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '@/components/Switch'

describe('Switch', () => {
  it('toggles when uncontrolled', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Dark mode" onCheckedChange={onCheckedChange} />)
    const sw = screen.getByRole('switch', { name: 'Dark mode' })

    expect(sw).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(sw)
    expect(sw).toHaveAttribute('aria-checked', 'true')
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('respects the controlled value', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Spanish" checked={false} onCheckedChange={onCheckedChange} />)
    const sw = screen.getByRole('switch')

    await userEvent.click(sw)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(sw).toHaveAttribute('aria-checked', 'false')
  })

  it('renders both labels', () => {
    render(<Switch aria-label="Spanish" labels={{ off: 'EN', on: 'ES' }} />)
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('toggles with the keyboard', async () => {
    render(<Switch aria-label="Spanish" />)
    const sw = screen.getByRole('switch')
    sw.focus()
    await userEvent.keyboard(' ')
    expect(sw).toHaveAttribute('aria-checked', 'true')
  })

  it('does not toggle when disabled', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Spanish" disabled onCheckedChange={onCheckedChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})

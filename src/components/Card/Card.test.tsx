import { render, screen } from '@testing-library/react'
import { Card } from '@/components/Card'

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Hello glass</Card>)
    expect(screen.getByText('Hello glass')).toBeInTheDocument()
  })

  it('forwards extra props and classes', () => {
    render(
      <Card data-testid="card" className="w-80">
        x
      </Card>,
    )
    expect(screen.getByTestId('card')).toHaveClass('w-80')
  })
})

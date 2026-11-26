import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', onClick: fn() },
  decorators: [
    // Glass needs something behind it to refract
    (Story) => (
      <div className="flex min-h-48 items-center justify-center rounded-2xl bg-[radial-gradient(40%_60%_at_55%_15%,#f5b955,transparent_70%),linear-gradient(115deg,#0f3b47_0%,#4f6a5e_45%,#0b1d26_46%,#071118_100%)] p-12">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

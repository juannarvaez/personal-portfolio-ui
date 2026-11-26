import type { Meta, StoryObj } from '@storybook/react-vite'
import officeWorkspaceBg from '@/assets/images/office-workspace-bg.jpg'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    className: 'w-80',
    children: (
      <>
        <h3 className="text-xl font-semibold tracking-tight">Liquid Glass</h3>
        <p className="mt-2 text-sm text-text-secondary">
          A translucent surface that refracts and brightens whatever sits behind it.
        </p>
      </>
    ),
  },
  decorators: [
    // Glass needs something behind it to refract
    (Story) => (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-[radial-gradient(40%_60%_at_55%_15%,#f5b955,transparent_70%),linear-gradient(115deg,#0f3b47_0%,#4f6a5e_45%,#0b1d26_46%,#071118_100%)] p-12">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: { control: 'inline-radio', options: ['clear', 'smoked'] },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Clear: Story = {
  args: { variant: 'clear' },
}

export const Smoked: Story = {
  args: { variant: 'smoked' },
}

/** Refraction shows best over a detailed backdrop (Chromium only). */
export const Refraction: Story = {
  args: { refraction: 100, blur: 2, className: 'h-56 w-96' },
  argTypes: {
    refraction: { control: { type: 'range', min: 0, max: 150 } },
    blur: { control: { type: 'range', min: 0, max: 30 } },
  },
  decorators: [
    (Story) => (
      <div
        className="flex min-h-96 items-center justify-center rounded-2xl bg-cover bg-center p-12"
        style={{ backgroundImage: `url(${officeWorkspaceBg})` }}
      >
        <Story />
      </div>
    ),
  ],
}

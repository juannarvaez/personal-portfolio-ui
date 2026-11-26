import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { onCheckedChange: fn(), 'aria-label': 'Toggle' },
  decorators: [
    // Glass needs something behind it to refract
    (Story) => (
      <div className="flex min-h-48 items-center justify-center rounded-2xl bg-surface-mist bg-[radial-gradient(35%_55%_at_30%_30%,#9fb8f0,transparent_70%),radial-gradient(30%_50%_at_75%_70%,#c7d5f3,transparent_70%),radial-gradient(25%_40%_at_60%_20%,#f5f0e6,transparent_70%)] p-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {}

export const On: Story = {
  args: { defaultChecked: true },
}

export const WithLabels: Story = {
  args: {
    labels: { off: 'EN', on: 'ES' },
    'aria-label': 'Spanish',
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
}

/** Controlled usage: language picker driven by app state. */
export const Controlled: Story = {
  render: (args) => {
    const [lang, setLang] = useState<'en' | 'es'>('en')
    return (
      <div className="flex flex-col items-center gap-4">
        <Switch
          {...args}
          labels={{ off: 'EN', on: 'ES' }}
          aria-label="Spanish"
          checked={lang === 'es'}
          onCheckedChange={(on) => {
            setLang(on ? 'es' : 'en')
            args.onCheckedChange?.(on)
          }}
        />
        <p className="text-label text-text-muted">lang: {lang}</p>
      </div>
    )
  },
}

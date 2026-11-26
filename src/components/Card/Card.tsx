import type { HTMLAttributes } from 'react'
import { useLiquidGlass } from '@/components/glass/useLiquidGlass'

type Variant = 'clear' | 'smoked'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  /** How far (px) the backdrop bends at the edges. 0 disables it. Chromium only. */
  refraction?: number
  /** Backdrop blur in px. */
  blur?: number
}

/**
 * Liquid glass surface (iOS 26): a large rounded pane that refracts, blurs and
 * brightens what is behind it, with the same gradient rim (`glass-rim`,
 * defined in index.css), inner glow and floating shadow as the Button.
 */
const glassClasses = [
  'isolate overflow-hidden rounded-[2rem] p-6',
  '[text-shadow:0_1px_2px_rgb(0_0_0/0.2)]',
  // Inner glow + depth
  'shadow-[inset_0_0_40px_rgb(255_255_255/0.1),inset_0_1px_1px_rgb(255_255_255/0.3),0_24px_48px_-16px_rgb(0_0_0/0.5)]',
  'glass-rim',
  // Soft specular bloom in the top-left corner
  'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]',
  'before:bg-[radial-gradient(90%_70%_at_10%_0%,rgb(255_255_255/0.16),transparent_60%)]',
].join(' ')

const variantClasses: Record<Variant, string> = {
  clear: 'bg-white/[0.06] supports-[not(backdrop-filter:blur(0))]:bg-slate-700',
  smoked: 'bg-black/20 supports-[not(backdrop-filter:blur(0))]:bg-slate-900',
}

export function Card({
  variant = 'clear',
  refraction = 60,
  blur = 12,
  className = '',
  style,
  children,
  ...props
}: CardProps) {
  const { ref, style: glassStyle, filter } = useLiquidGlass<HTMLDivElement>({ refraction, blur })

  return (
    <div
      ref={ref}
      className={`${glassClasses} ${variantClasses[variant]} ${className}`}
      style={{ ...glassStyle, ...style }}
      {...props}
    >
      {filter}
      {children}
    </div>
  )
}

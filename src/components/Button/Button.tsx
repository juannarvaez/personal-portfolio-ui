import type { ButtonHTMLAttributes } from 'react'
import { useLiquidGlass } from '@/components/glass/useLiquidGlass'

type Variant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  /** How far (px) the backdrop bends at the edges. 0 disables it. Chromium only. */
  refraction?: number
  /** Backdrop blur in px. */
  blur?: number
}

/**
 * Liquid glass: an almost clear pane that bends, lightly blurs and brightens
 * what is behind it (see useLiquidGlass), a gradient rim catching light on
 * opposite corners (`glass-rim`, defined in index.css), a soft inner glow and
 * a floating drop shadow.
 */
const glassClasses = [
  'relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full',
  'px-8 py-4 text-lg font-semibold tracking-tight text-white',
  '[text-shadow:0_1px_2px_rgb(0_0_0/0.2)]',
  // Inner glow + depth
  'shadow-[inset_0_0_24px_rgb(255_255_255/0.12),inset_0_1px_1px_rgb(255_255_255/0.25),0_12px_32px_-12px_rgb(0_0_0/0.5)]',
  'glass-rim',
  // Soft specular bloom in the top-left corner
  'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]',
  'before:bg-[radial-gradient(120%_90%_at_15%_0%,rgb(255_255_255/0.18),transparent_60%)]',
  // Fluid interaction
  'transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
  'hover:-translate-y-px active:scale-[0.96]',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80',
  'disabled:pointer-events-none disabled:opacity-50',
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
].join(' ')

const variantClasses: Record<Variant, string> = {
  // Clear glass
  primary:
    'bg-white/[0.06] hover:bg-white/[0.12] supports-[not(backdrop-filter:blur(0))]:bg-slate-700',
  // Smoked glass
  secondary: 'bg-black/20 hover:bg-black/30 supports-[not(backdrop-filter:blur(0))]:bg-slate-900',
}

export function Button({
  variant = 'primary',
  refraction = 30,
  blur = 6,
  className = '',
  type = 'button',
  style,
  children,
  ...props
}: ButtonProps) {
  const {
    ref,
    style: glassStyle,
    filter,
  } = useLiquidGlass<HTMLButtonElement>({
    refraction,
    blur,
  })

  return (
    <button
      ref={ref}
      type={type}
      className={`${glassClasses} ${variantClasses[variant]} ${className}`}
      style={{ ...glassStyle, ...style }}
      {...props}
    >
      {filter}
      {children}
    </button>
  )
}

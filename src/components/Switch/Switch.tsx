import { useState, type ButtonHTMLAttributes, type MouseEvent } from 'react'
import { useLiquidGlass } from '@/components/glass/useLiquidGlass'

export interface SwitchLabels {
  /** Text of the left option, selected when the switch is off. */
  off: string
  /** Text of the right option, selected when the switch is on. */
  on: string
}

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'value' | 'defaultValue' | 'role'
> {
  /** Controlled state. Pair with `onCheckedChange`. */
  checked?: boolean
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean
  /** Called with the new state whenever the user toggles the switch. */
  onCheckedChange?: (checked: boolean) => void
  /**
   * Turns the switch into a two-option pill (e.g. EN / ES): both labels are
   * shown and the accent thumb slides under the selected one.
   * Without labels it renders the classic iOS 26 toggle.
   */
  labels?: SwitchLabels
  /** How far (px) the backdrop bends at the edges. 0 disables it. Chromium only. */
  refraction?: number
  /** Backdrop blur in px. */
  blur?: number
}

/**
 * Liquid glass track shared by both layouts: gradient rim (`glass-rim`,
 * defined in index.css), inner glow and a soft floating shadow, matching
 * Button and Card.
 *
 * The button itself carries no backdrop-filter: an element with one becomes a
 * "backdrop root", so the thumb's own glass would only see the track instead of
 * the page. The track's tint and blur live on a separate layer (`paneClasses`).
 */
const trackClasses = [
  'group relative isolate inline-grid shrink-0 cursor-pointer overflow-hidden rounded-full p-1',
  'shadow-[inset_0_0_16px_rgb(255_255_255/0.14),inset_0_1px_1px_rgb(255_255_255/0.3),0_8px_24px_-10px_rgb(0_0_0/0.35)]',
  'glass-rim',
  'transition-[box-shadow] duration-300 ease-out',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
  'disabled:pointer-events-none disabled:opacity-50',
].join(' ')

/** Track glass pane: tinted, blurred and refracting layer behind the thumb. */
const paneClasses = [
  'pointer-events-none absolute inset-0 -z-10 rounded-[inherit]',
  'transition-[background-color] duration-300 ease-out',
  'supports-[not(backdrop-filter:blur(0))]:bg-glass-panel',
].join(' ')

/**
 * The thumb glides with a springy overshoot; while pressed it stretches and
 * turns into clear glass, like the iOS 26 lens that lets the track show
 * through.
 */
const thumbClasses = [
  'pointer-events-none absolute rounded-full',
  'transition-[translate,scale,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
  'group-active:scale-x-[1.18] group-active:scale-y-[1.12]',
  'group-active:bg-white/25',
  'group-active:shadow-[inset_0_0_8px_rgb(255_255_255/0.6),inset_0_1px_1px_rgb(255_255_255/0.9),0_4px_12px_rgb(0_0_0/0.15)]',
  'motion-reduce:transition-none motion-reduce:group-active:scale-100',
].join(' ')

/**
 * Blue liquid glass thumb for the labeled pill, built with the Card recipe:
 * real backdrop blur + refraction (useLiquidGlass), a translucent accent tint
 * instead of Card's smoked black, inner glow, gradient rim, floating shadow and
 * the soft specular bloom in the top-left corner.
 */
const blueGlassThumbClasses = [
  'isolate overflow-hidden glass-rim',
  'bg-accent/50 supports-[not(backdrop-filter:blur(0))]:bg-accent',
  'shadow-[inset_0_0_14px_rgb(255_255_255/0.1),inset_0_1px_1px_rgb(255_255_255/0.3),0_8px_16px_-6px_rgb(0_0_0/0.4)]',
  'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]',
  'before:bg-[radial-gradient(90%_70%_at_10%_0%,rgb(255_255_255/0.16),transparent_60%)]',
].join(' ')

/** Opaque white thumb of the plain iOS toggle. */
const solidThumbShadow = 'shadow-[0_2px_8px_rgb(0_0_0/0.18),inset_0_1px_1px_rgb(255_255_255/0.5)]'

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  labels,
  refraction = 20,
  blur = 8,
  className = '',
  style,
  onClick,
  ...props
}: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isControlled = checked !== undefined
  const isOn = isControlled ? checked : internal

  const {
    ref: paneRef,
    style: paneStyle,
    filter: paneFilter,
  } = useLiquidGlass<HTMLSpanElement>({ refraction, blur })
  // Same lens as the home Cards (strong refraction, light blur), scaled to the small thumb
  const {
    ref: thumbRef,
    style: thumbStyle,
    filter: thumbFilter,
  } = useLiquidGlass<HTMLSpanElement>({ refraction: labels ? 30 : 0, blur: 4 })

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (!isControlled) setInternal(!isOn)
    onCheckedChange?.(!isOn)
  }

  // Labeled: two equal columns, the thumb covers one (50% minus the padding).
  // Plain: iOS 26 proportions, 64×28 track with a 38×24 pill thumb.
  const layout = labels ? 'h-11 grid-cols-2' : 'h-7 w-16'
  const paneTint = labels || !isOn ? 'bg-glass-control' : 'bg-accent'

  const thumbLayout = labels
    ? `top-1 left-1 h-9 w-[calc(50%-0.25rem)] ${blueGlassThumbClasses} ${isOn ? 'translate-x-full' : 'translate-x-0'}`
    : `top-0.5 left-0.5 h-6 w-[2.375rem] bg-surface-white ${solidThumbShadow} ${isOn ? 'translate-x-[1.375rem]' : 'translate-x-0'}`

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      className={`${trackClasses} ${layout} ${className}`}
      style={style}
      onClick={handleClick}
      {...props}
    >
      <span
        ref={paneRef}
        aria-hidden="true"
        className={`${paneClasses} ${paneTint}`}
        style={paneStyle}
      >
        {paneFilter}
      </span>
      <span
        ref={thumbRef}
        aria-hidden="true"
        className={`${thumbClasses} ${thumbLayout}`}
        style={labels ? thumbStyle : undefined}
      >
        {labels && thumbFilter}
      </span>
      {labels && (
        <>
          <SwitchLabel active={!isOn}>{labels.off}</SwitchLabel>
          <SwitchLabel active={isOn}>{labels.on}</SwitchLabel>
        </>
      )}
    </button>
  )
}

function SwitchLabel({ active, children }: { active: boolean; children: string }) {
  return (
    <span
      className={[
        'relative z-10 flex min-w-12 items-center justify-center px-3 text-control uppercase',
        // Same lift as Card text, keeps the cream label legible on the translucent thumb
        active && '[text-shadow:0_1px_2px_rgb(0_0_0/0.2)]',
        'transition-colors duration-300',
        // Pressed: thumb turns clear, so the selected label switches to ink
        active ? 'text-text-on-accent group-active:text-text-primary' : 'text-text-secondary',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

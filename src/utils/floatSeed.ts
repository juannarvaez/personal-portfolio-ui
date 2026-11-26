import type { CSSProperties } from 'react'

/**
 * Random starting point for `animate-float` / `animate-float-slow`.
 *
 * Sets `--float-seed` (0–1), which the animation turns into a negative delay,
 * so the element starts partway through the cycle instead of at 0%. Give each
 * element its own seed and they won't move in sync.
 *
 * Generate it once per element (e.g. in a `useState` initializer), not on
 * every render, or the animation will jump when the component re-renders.
 */
export function floatSeed(): CSSProperties {
  return { '--float-seed': Math.random().toFixed(3) } as CSSProperties
}

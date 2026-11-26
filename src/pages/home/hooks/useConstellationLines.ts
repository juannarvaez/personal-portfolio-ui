import { useLayoutEffect, useRef, useState } from 'react'

type Segment = { x1: number; y1: number; x2: number; y2: number }
type Box = { cx: number; cy: number; hw: number; hh: number }
type Point = { x: number; y: number }

/** Space (px) left between a card's border and where its line starts. */
const LINE_GAP = 10

/**
 * Distance from a box's center to its border along (dx, dy), as a fraction of
 * the (dx, dy) vector, padded by LINE_GAP so lines stop just outside the card.
 */
function exitFraction(box: Box, dx: number, dy: number) {
  const tx = dx === 0 ? Infinity : (box.hw + LINE_GAP) / Math.abs(dx)
  const ty = dy === 0 ? Infinity : (box.hh + LINE_GAP) / Math.abs(dy)
  return Math.min(tx, ty)
}

/**
 * Measures the cards and returns one line per card, all converging on a single
 * hub at the center of the constellation (the viewport center whenever the
 * page fits on screen). Lines stop just outside each card's border.
 */
export function useConstellationLines(count: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [segments, setSegments] = useState<Segment[]>([])
  const [hub, setHub] = useState<Point | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const measure = () => {
      const origin = container.getBoundingClientRect()
      const boxes = cardRefs.current.slice(0, count).map((el): Box | null => {
        const r = el?.getBoundingClientRect()
        return r
          ? {
              cx: r.left - origin.left + r.width / 2,
              cy: r.top - origin.top + r.height / 2,
              hw: r.width / 2,
              hh: r.height / 2,
            }
          : null
      })
      const center: Point = { x: origin.width / 2, y: origin.height / 2 }
      const next: Segment[] = []
      for (const box of boxes) {
        if (!box) continue
        // From the hub to the card's border, not into the card
        const dx = box.cx - center.x
        const dy = box.cy - center.y
        const end = 1 - exitFraction(box, dx, dy)
        if (end <= 0) continue // the hub sits under this card
        next.push({ x1: center.x, y1: center.y, x2: center.x + dx * end, y2: center.y + dy * end })
      }
      setHub(center)
      setSegments(next)
    }

    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [count])

  return { containerRef, cardRefs, segments, hub }
}

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

export interface LiquidGlassOptions {
  /**
   * How far (px) the backdrop bends at the edges, like a lens. 0 disables it.
   * Only Chromium supports SVG filters in `backdrop-filter`; other browsers
   * fall back to plain blur.
   */
  refraction: number
  /** Backdrop blur in px. */
  blur: number
}

// `navigator.userAgentData` only exists in Chromium, the only engine that
// renders `backdrop-filter: url(#svg-filter)`.
const supportsSvgBackdrop = typeof navigator !== 'undefined' && 'userAgentData' in navigator

/**
 * Displacement map for feDisplacementMap: red encodes x, blue encodes y.
 * The centre is neutral grey (no shift); towards each edge the colour moves
 * to 0 or 1, so pixels near the rim are pulled from further out — the
 * bending you see at the edge of a glass lens.
 */
function displacementMap(w: number, h: number, radius: number) {
  const r = Math.min(radius, w / 2, h / 2)
  const edge = Math.min(w, h) * 0.2
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
<linearGradient id="x" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#f00"/></linearGradient>
<linearGradient id="y" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#00f"/></linearGradient>
<filter id="b"><feGaussianBlur stdDeviation="${edge / 2}"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="#000"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#x)"/>
<rect width="${w}" height="${h}" rx="${r}" fill="url(#y)" style="mix-blend-mode:screen"/>
<rect x="${edge}" y="${edge}" width="${w - 2 * edge}" height="${h - 2 * edge}" rx="${Math.max(r - edge, 0)}" fill="rgb(128,128,128)" filter="url(#b)"/>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

type Box = { w: number; h: number; r: number }

/**
 * Liquid glass backdrop: blur + lens-like refraction at the edges.
 * Spread `style` on the glass element, attach `ref`, and render `filter`
 * inside it.
 */
export function useLiquidGlass<T extends HTMLElement>({ refraction, blur }: LiquidGlassOptions) {
  const ref = useRef<T>(null)
  const [box, setBox] = useState<Box | null>(null)
  const filterId = `glass-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const refracts = supportsSvgBackdrop && refraction > 0

  // The map is drawn in pixels, so it is rebuilt whenever the element resizes.
  useEffect(() => {
    const el = ref.current
    if (!refracts || !el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      const w = Math.round(el.offsetWidth)
      const h = Math.round(el.offsetHeight)
      const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0
      setBox((prev) => (prev?.w === w && prev.h === h && prev.r === r ? prev : { w, h, r }))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [refracts])

  const lens = refracts && box && box.w > 0 && box.h > 0
  const backdrop = `${lens ? `url(#${filterId}) ` : ''}blur(${blur}px) saturate(1.5) brightness(1.1)`
  const style: CSSProperties = { backdropFilter: backdrop, WebkitBackdropFilter: backdrop }

  const filter = lens ? (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter
        id={filterId}
        x="0"
        y="0"
        width={box.w}
        height={box.h}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={displacementMap(box.w, box.h, box.r)}
          x="0"
          y="0"
          width={box.w}
          height={box.h}
          preserveAspectRatio="none"
          result="map"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale={refraction}
          xChannelSelector="R"
          yChannelSelector="B"
        />
      </filter>
    </svg>
  ) : null

  return { ref, style, filter }
}

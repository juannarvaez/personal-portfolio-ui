import { useState } from 'react'
import officeWorkspaceBg from '@/assets/images/office-workspace-bg.jpg'
import profilePortrait from '@/assets/images/profile-portrait.png'
import { Card } from '@/components/Card'
import { floatSeed } from '@/utils/floatSeed'
import { sectionPreviews } from './contants/home.constants'
import { useConstellationLines } from './hooks/useConstellationLines'
import { Switch } from '@/components/Switch'
import { useI18n } from '@/i18n'

export function Home() {
  const { locale, setLocale, dictionary } = useI18n()
  const { containerRef, cardRefs, segments, hub } = useConstellationLines(sectionPreviews.length)
  // One random float phase per card, fixed for the lifetime of the page
  const [floatSeeds] = useState(() => sectionPreviews.map(() => floatSeed()))

  return (
    <div className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden">
      <Switch
        className="absolute! top-4 right-4"
        labels={{ off: 'EN', on: 'ES' }}
        aria-label={dictionary.languageSwitch.ariaLabel}
        checked={locale === 'es'}
        onCheckedChange={(on) => setLocale(on ? 'es' : 'en')}
      />
      {/* Full-screen blurred background; scaled up so the blur doesn't fade the edges */}
      <img
        src={officeWorkspaceBg}
        alt={dictionary.home.backgroundAlt}
        aria-hidden="true"
        decoding="async"
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full scale-110 object-cover blur-xs"
      />

      {/* Soft blue haze overlay (blurred orbs + specks) laid over the background at 30% opacity */}
      <svg
        aria-hidden="true"
        viewBox="0 0 780 486"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-30"
      >
        <defs>
          <radialGradient id="home-haze-base" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#d9dde5" />
            <stop offset="100%" stopColor="#c6d2e2" />
          </radialGradient>
          <radialGradient id="home-haze-orb-soft">
            <stop offset="0%" stopColor="#b4c8e6" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#b9cbe6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c6d2e2" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="home-haze-orb-deep">
            <stop offset="0%" stopColor="#8fa8d6" stopOpacity="1" />
            <stop offset="55%" stopColor="#9ab0db" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c6d2e2" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="home-haze-glow">
            <stop offset="0%" stopColor="#dde0e6" stopOpacity="1" />
            <stop offset="65%" stopColor="#dadee6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4dae3" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="780" height="486" fill="url(#home-haze-base)" />
        {/* Large pale orb, top-left */}
        <circle cx="120" cy="110" r="170" fill="url(#home-haze-orb-soft)" />
        {/* Central light glow */}
        <circle cx="420" cy="300" r="175" fill="url(#home-haze-glow)" />
        {/* Deeper blue orbs, top-right and bottom-right */}
        <circle cx="620" cy="65" r="115" fill="url(#home-haze-orb-deep)" />
        <circle cx="680" cy="390" r="110" fill="url(#home-haze-orb-deep)" />

        {/* Tiny scattered specks */}
        <g fill="#7f93bd">
          {[
            [94, 76],
            [258, 56],
            [484, 42],
            [62, 222],
            [702, 212],
            [272, 145],
            [515, 339],
            [320, 418],
            [476, 437],
            [726, 428],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.2} />
          ))}
        </g>
      </svg>

      <div
        ref={containerRef}
        className="relative grid min-h-screen w-full max-w-7xl grid-cols-1 content-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-x-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:grid-rows-[repeat(6,auto)] lg:gap-x-8 xl:gap-x-12"
      >
        {/* Constellation lines, drawn behind the cards */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          {segments.map((s, i) => (
            <line
              key={i}
              {...s}
              className="stroke-white/40"
              strokeWidth={1}
              strokeDasharray="2 6"
              strokeLinecap="round"
            />
          ))}
          {/* The point every line converges on */}
          {hub && <circle cx={hub.x} cy={hub.y} r={3} className="fill-white/70" />}
        </svg>

        {/* Hero: on lg+ it owns the middle column across all six rows, so the cards can only
            sit to its left and right. The grid is centered, so the hero stays at the
            container's center (the viewport center, same point as the constellation hub) */}
        <section className="relative flex flex-col items-center self-center text-center md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-6 lg:row-start-1 lg:max-w-sm xl:max-w-none">
          {/* Height scales with the viewport (55% of its height), floored at 18rem so it stays
              readable on short screens and capped at the source's native 760px to avoid upscaling */}
          <img
            src={profilePortrait}
            alt={dictionary.home.portraitAlt}
            width={431}
            height={760}
            decoding="async"
            className="pointer-events-none h-[clamp(18rem,55dvh,760px)] w-auto drop-shadow-xl select-none"
          />
          <h1 className="xl:whitespace-nowrap">
            {dictionary.home.headline.first}
            <br /> {dictionary.home.headline.second}
          </h1>
          <p>{dictionary.home.tagline}</p>
          <p>{dictionary.home.cta}</p>
        </section>

        {sectionPreviews.map((preview, i) => (
          <div
            key={preview.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className={`relative w-full max-w-64 ${preview.placement}`}
          >
            <Card
              className="relative flex h-40 w-full max-w-64 animate-float items-end transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:scale-105 motion-reduce:animate-none motion-reduce:transition-none"
              style={floatSeeds[i]}
              variant="smoked"
              refraction={100}
              blur={4}
            >
              <div>
                <h3 className="text-text-primary">{dictionary.home.sections[preview.id].title}</h3>
                <p className="text-label text-text-secondary">
                  {dictionary.home.sections[preview.id].body}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

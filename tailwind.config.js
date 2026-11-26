/**
 * Custom Tailwind configuration for the portfolio.
 *
 * Note: the project uses Tailwind v4, which does not read this file automatically.
 * It is loaded from `src/index.css` via the `@config` directive.
 * Everything under `theme.extend` is added on top of Tailwind's defaults
 * (it does not replace them), so `bg-slate-900`, etc. keep working.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      /*
       * Color palette (Figma → "Color — Juan Narváez · Liquid Glass").
       *
       * Token names mirror the Figma variables (`accent/default` → accent,
       * `text/primary` → text-primary, ...) → bg-accent, text-text-primary,
       * border-border-control, bg-glass-plate, bg-accent/50, ...
       * In custom CSS, read a token with --theme(--color-accent) or
       * @apply bg-accent. Tokens from this file are inlined, not emitted as
       * var(--color-*) variables.
       *
       * Usage rules:
       * 01 Blue is used sparingly: one primary button per view; accent marks
       *    links, versions and selected state. Never as a large background.
       * 02 No pure black or white text: text is navy ink (text-primary) and
       *    text on blue is cream (text-on-accent).
       * 03 More text, more opaque glass: card 18% → control 22% → panel 40% →
       *    plate 66%. Long text always sits on glass-plate.
       * 04 Blurred backgrounds never carry text: accent-bright, accent-soft,
       *    accent-mist and surface-paper only exist in the background blobs.
       * 05 Color is never the only signal: states, selection and errors always
       *    come with a word or an icon.
       * 06 Always use the token, never the raw hex.
       *
       * Contrast (WCAG) measured on surface-mist unless noted.
       */
      colors: {
        // Brand & background
        accent: {
          DEFAULT: '#1f4fc2', // accent/default · 6.0:1 · links, version tags, primary button, selected
          bright: '#2f5fd0', // accent/bright · background blobs and large blocks
          soft: '#9fb8f0', // accent/soft · background blobs
          mist: '#c7d5f3', // accent/mist · background blobs
        },
        brand: {
          navy: '#1a2747', // brand/navy · blocks and illustration, never text
        },
        surface: {
          mist: '#e6ecf5', // surface/mist · page background ("mist")
          paper: '#f5f0e6', // surface/paper · warm tone in the blobs
          white: '#ffffff', // surface/white · base for glass and plates
        },
        // Text
        text: {
          primary: '#121a2c', // text/primary · 14.6:1 · headings and body
          secondary: '#464e60', // text/secondary · 7.8:1 · supporting text, intros
          muted: '#5b6170', // text/muted · 5.2:1 · metadata, mono labels, hints
          'on-accent': '#fbf8f2', // text/on-accent · 6.7:1 on accent
        },
        // Glass: translucent white, four levels + rim
        glass: {
          card: 'rgb(255 255 255 / 0.18)', // glass/card · home cards
          control: 'rgb(255 255 255 / 0.22)', // glass/control · EN/ES switch, close, tabs
          panel: 'rgb(255 255 255 / 0.4)', // glass/panel · modal panels
          plate: 'rgb(255 255 255 / 0.66)', // glass/plate · plate under long text (16.4:1 with text-primary)
          rim: 'rgb(255 255 255 / 0.6)', // glass/rim · glass edge and highlight
        },
        // Borders & states
        border: {
          control: '#7d828f', // border/control · 3.2:1 · control borders
          hairline: 'rgb(18 26 44 / 0.08)', // border/hairline · text-primary at 8% · dividers inside plates
        },
        status: {
          success: '#1d7347', // status/success · 4.9:1 · confirmations
          warning: '#8a5a00', // status/warning · 5.8:1 · warnings
          danger: '#b3261e', // status/danger · 5.5:1 · errors
        },
      },
      fontFamily: {
        // → font-sans / font-display / font-mono
        // Fonts are loaded in src/index.css (@fontsource-variable/*).
        sans: ['"Instrument Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      /*
       * Type scale (Figma → "Tipografía — Juan Narváez · Liquid Glass").
       * Usage: one class per text style, e.g. text-h1, text-body, text-label.
       * This sets size / line height / tracking / weight; the font family for
       * each token is added in src/index.css (@utility text-*):
       *
       *   h1, h2, h3, h4, quote, brand → Fraunces
       *   lead, body, body-strong, small, button → Instrument Sans
       *   label, control → JetBrains Mono
       *
       * ⚠️ Approximate values: confirm exact px against the "Especificación"
       * column of the Figma frame.
       */
      fontSize: {
        h1: ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }], // 56
        h2: ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '400' }], // 40
        h3: ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '400' }], // 28
        h4: ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '400' }], // 22
        quote: ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '300' }], // 24 · Fraunces Light
        brand: ['1.125rem', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '400' }], // 18
        lead: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }], // 20
        body: ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }], // 16
        'body-strong': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '600' }], // 16 · SemiBold
        small: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }], // 14
        button: ['0.9375rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '500' }], // 15 · Medium
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '400' }], // 12 · mono
        control: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '500' }], // 13 · mono Medium
      },
      borderRadius: {
        glass: '1.75rem', // → rounded-glass
      },
      boxShadow: {
        glass: '0 8px 32px rgb(0 0 0 / 0.18), inset 0 1px 0 rgb(255 255 255 / 0.25)',
      },
      backdropBlur: {
        glass: '24px', // → backdrop-blur-glass
      },
      keyframes: {
        // Gentle float on X and Y (oval path, returns to origin)
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(6px, -8px)' },
          '50%': { transform: 'translate(0, -12px)' },
          '75%': { transform: 'translate(-6px, -8px)' },
        },
      },
      animation: {
        // → animate-float / animate-float-slow
        // Pair with motion-reduce:animate-none
        // --float-seed (0–1) offsets the starting point: a negative delay makes
        // the animation start already in progress. See src/utils/floatSeed.ts
        float: 'float 6s ease-in-out calc(var(--float-seed, 0) * -6s) infinite',
        'float-slow': 'float 9s ease-in-out calc(var(--float-seed, 0) * -9s) infinite',
      },
    },
  },
  plugins: [],
}

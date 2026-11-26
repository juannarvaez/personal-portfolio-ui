/**
 * English copy, the source of truth for the shape of every dictionary.
 * Other locales are typed against `Texts`, so a missing or extra key is a type error.
 */
export const en = {
  languageSwitch: {
    /** Describes the switch's "on" state (Spanish selected). */
    ariaLabel: 'Spanish',
  },
  home: {
    backgroundAlt: 'Background office picture',
    portraitAlt: 'Portrait of Juan Narváez',
    headline: {
      first: 'I play support.',
      second: 'Teams win.',
    },
    tagline: 'I turn engineering strategy into shipped work.',
    cta: 'Pick a star to explore',
    sections: {
      decisionLog: { title: 'Decision log', body: '4 decisions' },
      changelog: { title: 'Changelog', body: 'v0.x → v6.0-beta' },
      howIPlaySupport: { title: 'How I play support', body: 'the manual' },
      contact: { title: 'Contact', body: 'let’s talk' },
      testimonials: { title: 'What teammates say', body: 'from LinkedIn' },
    },
  },
}

export type Texts = typeof en

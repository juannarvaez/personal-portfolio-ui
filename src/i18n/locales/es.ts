import type { Texts } from './en'

/** Spanish copy. Must mirror the shape of `en` exactly. */
export const es: Texts = {
  languageSwitch: {
    ariaLabel: 'Español',
  },
  home: {
    backgroundAlt: 'Foto de fondo de una oficina',
    portraitAlt: 'Retrato de Juan Narváez',
    headline: {
      first: 'Juego de soporte.',
      second: 'El equipo gana.',
    },
    tagline: 'Convierto la estrategia de ingeniería en trabajo entregado.',
    cta: 'Elige una estrella para explorar',
    sections: {
      decisionLog: { title: 'Registro de decisiones', body: '4 decisiones' },
      changelog: { title: 'Historial de cambios', body: 'v0.x → v6.0-beta' },
      howIPlaySupport: { title: 'Cómo juego de soporte', body: 'el manual' },
      contact: { title: 'Contacto', body: 'hablemos' },
      testimonials: { title: 'Lo que dice mi equipo', body: 'desde LinkedIn' },
    },
  },
}

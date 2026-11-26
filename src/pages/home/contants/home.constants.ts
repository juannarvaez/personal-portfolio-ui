import type { Texts } from '@/i18n'

/** Key of a section's copy in `Texts['home']['sections']`. */
export type SectionId = keyof Texts['home']['sections']

/**
 * Condensed preview of a page section, shown on the home as a mini card.
 * Its title and body live in the i18n dictionaries under `home.sections[id]`.
 */
export interface SectionPreview {
  id: SectionId
  /**
   * Where the card sits in the home's constellation layout. Every card lives in its own grid
   * cell and is only nudged with self-alignment (never transforms or absolute
   * offsets), so cards can't touch each other or the hero at any viewport size.
   *  - mobile: one column under the hero, zig-zagging left/right
   *  - md: two columns under the hero, the right column dropped a bit
   *  - lg+: three columns (cards | hero | cards) over six rows. The hero spans
   *    all rows in the middle; each card spans two rows on one side. Left cards
   *    take rows 1-2, 3-4, 5-6 and right cards rows 2-3, 4-5, so the two sides
   *    interleave like a constellation.
   */
  placement: string
}

/** Shared by every card on lg+: undo the md offset and center within its rows. */
const LG_RESET = 'lg:mt-0 lg:row-span-2 lg:self-center'

export const sectionPreviews: SectionPreview[] = [
  {
    id: 'decisionLog',
    placement: `justify-self-start md:justify-self-start ${LG_RESET} lg:col-start-1 lg:row-start-1 lg:justify-self-end`,
  },
  {
    id: 'changelog',
    placement: `justify-self-end md:mt-16 md:justify-self-end ${LG_RESET} lg:col-start-3 lg:row-start-2 lg:justify-self-start`,
  },
  {
    id: 'howIPlaySupport',
    placement: `justify-self-start md:justify-self-start ${LG_RESET} lg:col-start-3 lg:row-start-4 lg:justify-self-end`,
  },
  {
    id: 'contact',
    placement: `justify-self-end md:mt-16 md:justify-self-end ${LG_RESET} lg:col-start-1 lg:row-start-5 lg:justify-self-end`,
  },
  {
    id: 'testimonials',
    placement: `justify-self-start md:justify-self-start ${LG_RESET} lg:col-start-1 lg:row-start-3 lg:justify-self-start`,
  },
]

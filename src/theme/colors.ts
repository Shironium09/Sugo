/**
 * Sugo Design Tokens — Color Palette
 *
 * Single source of truth for every color in the app.
 * Organized by role, not by raw hex, so renaming a shade
 * propagates everywhere without a grep-replace hunt.
 */

export const colors = {
  // ─── Surface ────────────────────────────────────────────────────────────────
  /** Page / screen background */
  background: '#F1F7FF',
  /** Card, input, and panel surfaces */
  surface: '#FFFFFF',
  /** Subtle panel tint — map panel, sticky headers */
  surfaceBlue: '#EAF3FF',
  /** Deeper blue surface — map interior */
  surfaceBlueDark: '#DDEBFF',
  /** Very-light grey surface — settings section labels, empty states */
  surfaceSubtle: '#F8FBFF',
  /** Disabled / locked surface */
  surfaceDisabled: '#E0E0E0',
  /** Tag badge surface in QuestCard */
  surfaceTag: '#F0F0F0',

  // ─── Ink ────────────────────────────────────────────────────────────────────
  /** Primary text and border color — the "ink" of the pixel aesthetic */
  ink: '#1B1F24',
  /** Secondary / muted text */
  inkMuted: '#58616B',
  /** Tertiary / de-emphasised text (requester names, captions) */
  inkSubtle: '#7A8793',
  /** Tag badge text in HomeScreen */
  inkTag: '#3A5070',

  // ─── Accent ─────────────────────────────────────────────────────────────────
  /** Active nav item, positive highlights */
  accent: '#7ED9B8',
  /** Mint tint — primary button background, resolved badge, Low-urgency */
  accentMint: '#E3F7F0',

  // ─── Semantic — Status ──────────────────────────────────────────────────────
  /** High-urgency pill background (HomeScreen inline) */
  urgencyHighBg: '#FFD0D0',
  /** High-urgency pill background (QuestCard variant) */
  urgencyHighBgAlt: '#FFD6D6',
  /** High-urgency pill border (QuestCard) */
  urgencyHighBorder: '#FF3B30',

  /** Medium-urgency pill background */
  urgencyMediumBg: '#FFF2B8',
  /** Medium-urgency pill border (QuestCard) */
  urgencyMediumBorder: '#FFCC00',

  /** Low-urgency pill background */
  urgencyLowBg: '#E3F7F0',
  /** Low-urgency pill border (QuestCard) */
  urgencyLowBorder: '#34C759',

  /** Warning / caution — logout button, "claim locked" notice, filter clear */
  warning: '#FFF2B8',
  /** Error / destructive text — form validation */
  error: '#B42318',

  // ─── Border ─────────────────────────────────────────────────────────────────
  /** Default border for un-selected chips, tag badges */
  borderSubtle: '#D0D8E0',
  /** Ghost button border */
  borderGhost: '#A0AEBB',
} as const;

export type ColorKey = keyof typeof colors;

# Sugo Design System
**Version 1.0** | Created: May 2026 | Maintained by: Homer (Feed Lead)

---

## 1. Vision & Aesthetic

**Primary Aesthetic**: Pixel-art inspired, playful, welcoming, minimalistic professionalism  
**Tone**: Friendly campus vibe with modern computer science energy  
**Target**: Quest management app for campus communities (Expo + React Native)  
**Platform**: Android-first (Android Studio), also iOS support

### Design Philosophy
- **Playful but Professional**: Use pixel typography and bright accents without sacrificing legibility
- **Minimalist Structure**: Clean layouts with clear hierarchies; whitespace is intentional
- **Accessible by Default**: High contrast text, readable fonts at all sizes, safe-area padding to avoid platform clipping
- **Consistent Micro-interactions**: Mint accent on active states; clear visual feedback on all interactions

---

## 2. Color Palette

### Primary Tokens
```
Cool Tech Blue Primary:    #6FB9FF (Sky blue, main accent, CTAs, highlights)
Cool Tech Blue Background: #F1F7FF (Light blue, default surface/section backgrounds)
Surface/Card White:        #FFFFFF (Primary content areas, elevated surfaces)
Text/Ink:                  #1B1F24 (Near-black, primary text, high contrast)
Muted/Secondary:           #58616B (Gray, secondary text, hints, disabled states)
Mint Accent:               #7ED9B8 (Green-teal, active states, success, emphasis)
```

### Usage Rules
| Token | Use Case | Examples |
|-------|----------|----------|
| Primary (#6FB9FF) | Links, focused states, section highlights | Active tab border, status bar background |
| Background (#F1F7FF) | Default screen/card background | Screen contentStyle, card backgrounds |
| Surface White | Foreground content, elevated cards | Quest cards, input fields, modal overlays |
| Text Ink | All body/heading text | Card titles, descriptions, labels |
| Muted | Metadata, secondary labels, disabled | Timestamps, "Sort: Newest", placeholder text |
| Mint (#7ED9B8) | Active/pressed states, CTAs, success | Bottom nav active item, button borders on press, "Claimed" badge |

### Semantic Colors (Future)
- **Success**: Mint (#7ED9B8) — Quest completed, verification passed
- **Warning**: TBD (consider gold/yellow tone if added later)
- **Error**: TBD (use muted + text override if needed)
- **Info**: Primary (#6FB9FF) — General information, hints

---

## 3. Typography System

### Font Families
```
Headers/UI Labels:  Pixelify Sans
  - Modern pixel font, not retro 8-bit
  - Clean edges, excellent readability
  - Used for all titles, buttons, status pills, UI labels
  - Weight: 400 (regular)

Body Text/Descriptions: IBM Plex Mono
  - Professional monospace font
  - Readable at small sizes
  - Used for card descriptions, metadata, form inputs
  - Pairs well with Pixelify Sans (complements pixel aesthetic)
  - Weight: 400 (regular)

App Name/Brand Accent: VT323
  - Retro computer feel
  - Sparingly used (AppHeader logo only)
  - Used in ICON logo box
```

### Type Scale (React Native: Pixel Values)

| Purpose | Font | Size | LineHeight | Example |
|---------|------|------|-----------|---------|
| Screen Title | Pixelify Sans | 24px | 32px | "Available Quests" heading |
| Card Title | Pixelify Sans | 16px | 24px | Quest card name "Fix the Bridge" |
| Body/Description | IBM Plex Mono | 14px | 20px | Quest description, card meta |
| Label/Metadata | IBM Plex Mono | 12px | 16px | "Reward: ₱500", timestamps |
| Button Text | Pixelify Sans | 14px | 20px | "Claim Quest", "Mark Done" |
| Status Pill | Pixelify Sans | 12px | 16px | "Open", "In Progress", "Verification" |
| Placeholder/Hint | IBM Plex Mono | 14px | 20px | Input placeholders |
| App Logo | VT323 | 18px | 24px | Header "ICON" |

### Font Loading
- Fonts loaded via Expo Google Fonts (`@expo-google-fonts/*` packages)
- Loading handled in `App.tsx` with `useFonts()` hook
- App shows loading state until fonts are available (prevents blank/fallback text)
- All screens inherit font definitions via parent StyleSheet

---

## 4. Spacing & Layout Grid

### Base Unit: 8px Grid
All spacing, padding, margins follow 8px multiples for consistency.

```
8px   - Small gaps (between elements within a card)
16px  - Standard padding (card content padding, form inputs)
24px  - Medium gaps (between sections)
32px  - Large gaps (between major sections)
```

### Screen Layout
```
HomeScreen: 40/60 Map + List Split (vertical)
  - Map Panel: 40% of screen height (top)
  - Quest List Panel: 60% of screen height (bottom)
  - Full-width "Current Quest" pill: Positioned above map (not overlay)
  - Safe area: Bottom inset for gesture bar, top inset for punch hole

Card Padding: 16px (content padding within quest cards)
Card Border: 2px solid #6FB9FF (outline style)
Card Background: #FFFFFF (white)
Card Margin: 8px horizontal, 8px vertical (in list)
```

### Safe Areas (Critical for Android/iOS)
```
Top Inset: Applied to AppHeader to avoid punch hole/notch
Bottom Inset: Applied to BottomNav to avoid gesture bar
Implemented via: react-native-safe-area-context
  - SafeAreaProvider wraps entire app
  - AppHeader uses SafeAreaView with top inset
  - BottomNav uses SafeAreaView with bottom inset
```

---

## 5. Component Patterns

### AppHeader
```
Structure: Bordered box with logo + navigation context
Border: 2px bottom border, Primary (#6FB9FF)
Background: #F1F7FF
Padding: 16px (with top inset applied)
Logo Font: VT323, 18px, Ink color (#1B1F24)
Height: ~56px (including inset)
Safe Area: Top inset applied to avoid punch hole
```

### BottomNav (3-item nav: Quests, +, Profile)
```
Structure: Flex row, 3 items with equal spacing
Height: 56px + bottom inset
Background: #FFFFFF (white)
Items: TouchableOpacity with icon + label

States:
  - Active: Label text Mint (#7ED9B8), icon highlighted
  - Inactive: Label text Muted (#58616B), icon grayed

Font: Pixelify Sans, 12px, line-height 16px
Padding: 16px + bottom inset
Gap: Evenly distributed
Safe Area: Bottom inset applied to avoid gesture bar
```

### PixelButton (CTA Button)
```
Structure: TouchableOpacity with borders
Border: 2px solid (depends on state)
Padding: 12px vertical, 24px horizontal
Border Radius: 4px (slight rounding, not fully rounded)
Font: Pixelify Sans, 14px, line-height 20px

States:
  - Default: Border Muted (#58616B), Text Ink (#1B1F24), Background white
  - Pressed/Active: Border Mint (#7ED9B8), Text Mint, Background tint of mint
  - Disabled: Border/Text Muted (#58616B), opacity 0.5

Feedback: Color transition on press, no animation needed (simple state swap)
```

### Quest Card (in HomeScreen list)
```
Structure: Vertical stack with title, status pill, description, meta
Background: #FFFFFF
Border: 2px solid #6FB9FF (outline)
Padding: 16px
Margin: 8px horizontal, 8px vertical
Border Radius: 4px

Content:
  - Title: Pixelify Sans, 16px, Ink (#1B1F24)
  - Status Pill: Pixelify Sans, 12px, outlined box, Mint accent if "Claimed"
  - Description: IBM Plex Mono, 14px, Muted text, ellipsis after 2 lines
  - Metadata: IBM Plex Mono, 12px, Muted, "Reward: ₱X | Location: Y"

States:
  - Normal: As above
  - Pressed: Light background tint (#F1F7FF), feedback on tap
  - Active/Claimed: Mint accent text/border
```

### Current Quest Pill (Full-width banner)
```
Structure: Full-width container above map on HomeScreen
Background: #F1F7FF (light blue) or accent (TBD yellow option)
Padding: 16px
Border: 2px bottom border, Primary (#6FB9FF)
Height: ~80px (flexible based on content)

Content:
  - Title: Pixelify Sans, 16px, Ink (#1B1F24)
  - Status: IBM Plex Mono, 12px, Muted
  - Action Button: PixelButton inline (e.g., "View Details")

Layout: Vertical stack, title + metadata + button

Note: Should NOT be positioned as overlay on map; must be separate full-width element above map panel
```

### Form Input (TextInput)
```
Structure: Flex container with label + input field
Label: Pixelify Sans, 14px, Ink (#1B1F24)
Input: IBM Plex Mono, 14px, Muted text
Border: 1px solid Muted (#58616B)
Border Radius: 4px
Padding: 12px
Background: #FFFFFF
Placeholder: IBM Plex Mono, 12px, Muted (#58616B), opacity 0.7

States:
  - Focus: Border color Primary (#6FB9FF), no shadow
  - Error: Border color + label highlight (TBD red tone)
  - Disabled: Background tint, border/text muted, opacity 0.5
```

### Status Pill (Badge)
```
Structure: Inline badge showing quest status
Options:
  - "Open" (outlined): Border Muted (#58616B), Text Ink
  - "In Progress" (outlined): Border Primary (#6FB9FF), Text Primary
  - "Verification" (outlined): Border Primary, Text Primary
  - "Claimed" (filled): Background Mint (#7ED9B8), Text white
  - "Resolved" (filled): Background Muted (#58616B), Text white

Font: Pixelify Sans, 12px
Padding: 6px 12px
Border Radius: 4px
Border: 1px (if outlined)

Rules: Use filled style for success/active states; outlined for neutral/pending
```

---

## 6. State & Interaction Patterns

### Active/Pressed States
```
Button Press: Border + text color shifts to Mint (#7ED9B8)
  - Visual feedback within 100ms (React Native native press handling)
  - No complex animations, simple color swap

Bottom Nav Active: Label text + icon highlight in Mint (#7ED9B8)
  - Active item determined by current route
  - Persistent until user navigates

Card Press: Light background tint (#F1F7FF) when tapped
  - Navigate to detail screen (CurrentQuestScreen)
  - Feedback necessary but minimal (no bounce animations)
```

### Form Validation
```
On Focus: Input border → Primary (#6FB9FF)
On Blur: Border → Muted (#58616B) if valid, or Error color if invalid (TBD)
On Error: Label text in red (TBD tone), border red, error message below field

Error Message Font: IBM Plex Mono, 12px, red (TBD), below input
Validation Trigger: On submit or on-change with debounce
```

### Loading/Empty States
```
Font Loading: Show #F1F7FF background while useFonts() resolves
Quest List Empty: Show "No quests available" text (Pixelify Sans, 16px, centered)
  - Centered on list area
  - Icon placeholder + text
  - Color: Muted (#58616B)
```

---

## 7. Safe Area Guidelines

### Why Safe Areas Matter
- **Android Punch Hole**: Status bar notch at top (Pixel devices)
- **Android Gesture Bar**: Navigation indicator at bottom (system gesture area)
- **iOS Notch/Dynamic Island**: Top system UI
- **iOS Home Indicator**: Bottom swipe area

### Implementation
```
Wrapper: SafeAreaProvider (wraps entire App in App.tsx)
  - Provides safe inset values via useSafeAreaInsets()

AppHeader: Applied top inset padding
  - Prevents logo/text clipping behind punch hole
  - Implementation: SafeAreaView or custom padding with insets

BottomNav: Applied bottom inset padding
  - Prevents nav items clipping into gesture bar
  - Implementation: SafeAreaView or custom padding with insets

General Rule: Any full-width element at screen edges must apply insets
  - Avoid paddingTop/paddingBottom on full-width containers
  - Use SafeAreaView or conditional inset-based padding instead
```

### Code Example
```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyComponent = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* content */}
    </View>
  );
};
```

---

## 8. Platform Considerations

### Android Specifics
- Primary development platform (Android Studio)
- Gesture navigation system (no hardware buttons)
- Bottom gesture bar must be avoided (inset applied)
- Punch hole on Pixel devices (inset applied)
- Status bar background: Use palette primary color

### iOS Specifics
- Dynamic Island or notch at top
- Home indicator gesture area at bottom
- Safe areas automatically respected by SafeAreaView
- Consistent color treatment across both platforms

### Expected Parity
- Both platforms use same font loading (expo-google-fonts)
- Both platforms use same color tokens
- Both platforms apply same insets via SafeAreaContext
- Navigation structure identical (React Navigation native-stack)

**Testing Protocol**: Test on both Android emulator + iOS simulator before major releases

---

## 9. Component Files & Locations

```
src/components/
  ├── AppHeader.tsx      → Top header with logo, border, safe-area top inset
  ├── BottomNav.tsx      → 3-item nav, safe-area bottom inset
  ├── PixelButton.tsx    → Reusable CTA button with mint accent on press
  
src/screens/
  ├── HomeScreen.tsx     → Main feed: 40/60 map+list, current quest pill (full-width above map)
  ├── CurrentQuestScreen.tsx → Quest detail view
  ├── CreateQuestScreen.tsx  → Quest creation form
  ├── [Auth screens]     → Landing, Welcome, Login, SignUp, Verification, etc.
  
src/navigation/
  ├── AppNavigator.tsx   → Stack navigator config, screen registry

src/data/
  ├── questStore.tsx     → React Context state management (QuestProvider, useQuestStore)

App.tsx                   → Root component, SafeAreaProvider wrapper, font loading
```

---

## 10. Color Token Code Reference

### React Native StyleSheet
```tsx
const colors = {
  primary: '#6FB9FF',
  background: '#F1F7FF',
  surface: '#FFFFFF',
  text: '#1B1F24',
  muted: '#58616B',
  mint: '#7ED9B8',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontFamily: 'Pixelify Sans',
    fontSize: 24,
    lineHeight: 32,
  },
  body: {
    color: colors.muted,
    fontFamily: 'IBM Plex Mono',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    borderColor: colors.mint,
    borderWidth: 2,
  },
});
```

**Note**: Currently, colors are defined inline in each screen file. Future refactor: Extract to shared `constants/colors.ts` or `theme.ts` for single source of truth.

---

## 11. Future Enhancements / Decisions Pending

### Yellow Accent Investigation
- User suggested exploring "something along the yellow side of things"
- Potential use cases: Warnings, high-priority quests, limited-time offers
- Pending: Decision on tone (#FFD60A, #FFC107, #FFED4E) and placement
- Action: Propose mockup with current quest using yellow background (test contrast)

### Typography Scale Fine-tuning
- User requested "bigger and clearer" fonts
- Pending: Specific targets identified after visual testing
- Likely: Increase base sizes (body 14px → 16px, labels 12px → 14px)
- Action: Run on emulator, gather feedback on readability

### Component Naming Convention
- Current: Mixed naming (e.g., "statusPill" vs "StatusBadge")
- Future: Standardize naming across codebase for consistency

### Design Tokens Refactor
- Extract color + typography definitions to shared config file
- Build reusable style objects (e.g., `textStyles.heading1`)
- Centralize spacing constants (8px grid multiples)

### Dark Mode Support (Future Phase)
- Currently: Light mode only
- Future consideration: Dark mode color overrides
- Palette needed: Dark background, light text, adjusted accent contrast

### Accessibility Audit
- Verify contrast ratios (WCAG AA minimum 4.5:1 for normal text)
- Test keyboard navigation on Android
- Test screen reader compatibility (TalkBack, VoiceOver)

---

## 12. Decision Log

| Date | Decision | Rationale | Owner |
|------|----------|-----------|-------|
| May 2026 | Cool Tech Blue + Mint palette | Bright, friendly, high contrast. Blue for trust, mint for action/success. | Homer |
| May 2026 | Pixelify Sans (headers) + IBM Plex Mono (body) | Modern pixel font paired with readable mono body. Playful but professional. | Homer |
| May 2026 | VT323 for app logo only | Retro computer feel reserved for brand accent, not overused. | Homer |
| May 2026 | 40/60 map+list layout on HomeScreen | Balance map navigation with content consumption; map first for spatial context. | Homer |
| May 2026 | Current quest as full-width banner (not overlay) | Clearer visual hierarchy; easier to read; doesn't obscure map. | Homer |
| May 2026 | SafeAreaContext for all edges | Prevent system UI clipping on Android/iOS; professional appearance. | Homer |
| TBD | Yellow accent placement & tone | Pending user feedback + mockup testing. | Homer |

---

## 13. Design Review Checklist

Use this checklist before shipping new screens or major UI updates:

- [ ] Colors use palette tokens (primary, background, text, muted, mint)
- [ ] Typography uses Pixelify Sans (headers) or IBM Plex Mono (body)
- [ ] Font sizes follow type scale (24px for titles, 14px for body, etc.)
- [ ] Spacing follows 8px grid multiples
- [ ] Safe areas applied (top inset for header, bottom inset for nav)
- [ ] All interactive elements (buttons, cards) use appropriate state colors
- [ ] Form inputs use palette colors + consistent border styling
- [ ] Active/pressed states show Mint (#7ED9B8) feedback
- [ ] Text contrast checked (dark ink on light backgrounds, light text on dark)
- [ ] Component files located in correct directory
- [ ] No hardcoded color values (except in constant definitions)
- [ ] Tested on Android emulator at minimum

---

## 14. Contact & Maintenance

**Document Owner**: Homer (Feed Lead)  
**Last Updated**: May 2026  
**Next Review**: TBD (recommend after yellow accent + font size decisions)

**Questions / Contributions**:
- Reach out to Homer for design guidance or token additions
- Update this document whenever new decisions are made
- Link to this doc when onboarding new team members

---

**End of Design System Document**

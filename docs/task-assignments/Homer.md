# Task Assignment — Homer (Feed + Completion)

## Scope
- Own the Home feed and the quest completion surface.
- Keep the UI consistent with the locked decisions in the design log.

## Tasks
- Keep the 40/60 Home layout: map placeholder above, scrollable quest list below.
- Preserve the expandable Current Quest pill overlay on the Home map area.
- Keep quest cards aligned with the decided content order: title, status, meta, requester, teaser.
- Maintain the full quest detail flow with claim, mark done, and confirm resolved actions.
- Keep loading, empty, and invalid-action states obvious but lightweight for the POC.
- Show mock verification/payment state in the detail view without introducing real backend logic.

## Integration notes
- Use the current local quest store contract from `questStore.tsx`.
- The feed entry point is Home; do not depend on a separate auth gate.
- Keep the Profile hub behavior aligned with `SettingsScreen.tsx` and the bottom-nav decision.

## Out of scope
- Live maps or live location services.
- Real-time chat or backend sync.

## AI handoff (short)
- Goal: keep the feed and quest completion experience demo-ready.
- Follow the locked quest-card, urgency, and tag decisions.
- Stay compatible with the current Home-first navigation.

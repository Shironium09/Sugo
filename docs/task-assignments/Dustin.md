# Task Assignment — Dustin (Navigation + Create Quest)

## Scope (high level)
- Own the app flow that starts at Home and stays simple for the demo.
- Keep create-quest and navigation wiring consistent with the current stack layout.

## Tasks
- Keep the root navigation Home-first with all screens registered in one stack.
- Preserve the auth screens as lightweight demo routes, but do not gate the app behind them.
- Keep the create quest flow wired to the quest store and navigate back into the current quest flow after submit.
- Keep bottom navigation behavior aligned with the current decision log: Quests, +Create, Profile/Settings.
- Maintain any screen typing or route usage so cross-stack navigation does not regress.

## Integration notes
- Route names should match `AppNavigator.tsx` exactly.
- Do not restore the old auth split or rely on stack switching for the happy path.
- Coordinate with Homer so Home, Current Quest, and Settings stay reachable from the same root stack.

## Out of scope
- Real authentication or session persistence.
- Backend-backed account creation.

## AI handoff (short)
- Goal: keep navigation frictionless for the POC.
- The app should open straight to Home and treat auth as optional demo content.

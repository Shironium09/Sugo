# Homer's Module — Code Cleanup Blueprint

**Date**: May 1, 2026
**Lead Developer**: Homer
**Architect**: Kairou
**Domain**: `HomeScreen.tsx`, `CreateQuestScreen.tsx`, `AppHeader.tsx`
**Trigger**: Post-SafeAreaView migration audit + QoL plan conflict resolution.

---

## Context

This plan covers **cleanup only** — bug fixes, state correctness, styling, and minor performance work
within *existing* component boundaries. No new screens, data models, or filter features are included.

Major QoL features (filter bar, tags, urgency field, My Quests screen) are tracked separately in
`logs/Homer/phase-breakdown/qol-plan.md` and are **explicitly deferred** until this pass is done.

---

## Design Standards (Source of Truth)

Merged from `ui-ux-integration-log.md`:

| Token      | Value     | Usage                          |
| :--------- | :-------- | :----------------------------- |
| Blue       | `#6FB9FF` | Primary interactive            |
| Mint       | `#7ED9B8` | Active states / open status    |
| Yellow     | `#FFF2B8` | In-progress status             |
| Grey       | `#F0F0F0` | Resolved / inactive status     |
| Background | `#F1F7FF` | Screen background              |
| Ink        | `#1B1F24` | All text and borders           |
| Font H     | `Pixelify Sans` | Headings, labels, scannable |
| Font B     | `IBM Plex Mono` | Body, meta, descriptions   |
| Font Mark  | `VT323`   | App brand mark / logo          |

UI Constraints:
- Touch targets minimum `44px` height.
- Strong `2px` borders define structure.
- Safe-area padding must be present in `AppHeader` and `BottomNav`.

---

## Scope Boundary

```
INCLUDED IN THIS PASS             DEFERRED TO QoL PASS
──────────────────────────────    ──────────────────────────────────
Fix createQuest navigation        Filter bar (Recency + Urgency + Tag)
Clear error on retry              Tag field on CreateQuestScreen
Sync expand state                 Due time / deadline field
Status color mapping              My Quests screen
Remove requesterId from feed      In-progress quest detail rework
Remove redundant Back button      Empty state redesign
Memoize renderItem                Urgency computation logic
Replace AppHeader placeholder
Filter in_progress from feed *
```

> `*` — Filtering `in_progress` quests from the public feed is included here because it is a
> single-predicate change (1 line) and is a correctness fix per the QoL locked decisions,
> not a new feature.

---

## Atomic Task List

Tasks are ordered by dependency. Execute top-to-bottom within each phase.

---

### PHASE 1 — Critical: Creation Flow (File: `CreateQuestScreen.tsx`)

#### TASK C-01 — Capture createQuest return value and navigate to detail

**What**: `createQuest` returns the new quest's `id` (see `questStore.tsx` L207) but
`CreateQuestScreen` discards it and navigates blindly to `Home`.

**Where**: `CreateQuestScreen.tsx` L43–55

**Current code**:
```tsx
createQuest({
  title: title.trim(),
  ...
});
// state resets...
navigation.navigate('Home');
```

**Target code**:
```tsx
const newId = createQuest({
  title: title.trim(),
  description: description.trim(),
  location: location.trim(),
  rewardPhp: rewardValue,
});
setTitle(''); setDescription(''); setLocation(''); setRewardPhp('');
setError(null);
navigation.navigate('CurrentQuest', { questId: newId });
```

**Verify**: Create a quest → lands on CurrentQuestScreen for that quest.

---

### PHASE 2 — Logic & State Correctness

#### TASK S-01 — Clear error at top of handleSubmit (File: `CreateQuestScreen.tsx`)

**What**: Error state is only cleared on success, causing the old error to flash briefly
on a resubmission before new validation runs.

**Where**: `CreateQuestScreen.tsx` L21

**Change**: Insert `setError(null);` as the very first line inside `handleSubmit`.

**Verify**: Enter an invalid form → get error → fix it → resubmit → no flash of old error.

---

#### TASK S-02 — Sync expanded panel state to currentQuest (File: `HomeScreen.tsx`)

**What**: If a user expands the Current Quest panel and then the in-progress quest gets
resolved, `currentQuest` becomes null but the panel stays open and shows the empty message.

**Where**: `HomeScreen.tsx` — after L36 (after `currentQuest` useMemo)

**Change**: Add:
```tsx
React.useEffect(() => {
  if (!currentQuest) setIsCurrentExpanded(false);
}, [currentQuest]);
```

**Verify**: Mark a quest resolved (or claim it as done) → panel auto-collapses.

---

#### TASK S-03 — Filter in_progress quests from public feed (File: `HomeScreen.tsx`)

**What**: Per the QoL locked decisions, the main feed should show only `open` quests.
Currently the filter only excludes `resolved`. In-progress quests still appear.

**Where**: `HomeScreen.tsx` L23–26

**Current code**:
```tsx
const availableQuests = React.useMemo(
  () => quests.filter((quest) => quest.status !== 'resolved'),
  [quests]
);
```

**Target code**:
```tsx
const availableQuests = React.useMemo(
  () => quests.filter((quest) => quest.status === 'open'),
  [quests]
);
```

**Verify**: Claim a quest → it disappears from the main feed immediately.

---

### PHASE 3 — Visual & Privacy Refinement (File: `HomeScreen.tsx`)

#### TASK V-01 — Add dynamic status color mapping

**What**: All status pills currently have a hardcoded `backgroundColor: '#E3F7F0'`. This
gives no visual affordance — `open`, `in_progress`, and `resolved` look identical.

**Where**: `HomeScreen.tsx` — module scope (after `statusLabel` on L13)

**Change**: Add a new const map:
```tsx
const statusColor: Record<Quest['status'], string> = {
  open: '#E3F7F0',       // mint tint — open/available
  in_progress: '#FFF2B8', // yellow tint — active
  resolved: '#F0F0F0',    // grey — done
};
```

Then in `renderItem`, replace the static style:
```tsx
// Before
<View style={styles.statusPill}>

// After
<View style={[styles.statusPill, { backgroundColor: statusColor[item.status] }]}>
```

Also remove the hardcoded `backgroundColor: '#E3F7F0'` from `styles.statusPill` in
`StyleSheet.create`.

**Verify**: Quests with different statuses show visually distinct pill colors.

---

#### TASK V-02 — Remove requesterId from public feed cards

**What**: `{item.requesterName} - {item.requesterId}` leaks raw student IDs in the public
feed. Only the name should appear for fulfillers.

**Where**: `HomeScreen.tsx` L66

**Change**:
```tsx
// Before
<Text style={styles.requesterText}>{item.requesterName} - {item.requesterId}</Text>

// After
<Text style={styles.requesterText}>{item.requesterName}</Text>
```

**Verify**: Feed cards show name only — no numeric ID visible.

---

#### TASK V-03 — Remove ALL explicit back buttons from CreateQuestScreen (File: `CreateQuestScreen.tsx`)

**Rationale**: `BottomNav` is already present on `CreateQuestScreen`. The user has a
one-tap path to `Home` (Quests tab) and `Profile` at all times. Both text back buttons
are therefore redundant, waste vertical space, and conflict with the navigation model.

**Navigation pattern rule (locked)**:
- `PixelButton` = actions only (Create Quest, Claim, Resolve, Confirm).
- Root navigation = `BottomNav` tabs.
- Nested back navigation (future, e.g. My Quests → CreateQuest) = header icon button, not `PixelButton`.

**Where**:
- L62: `<PixelButton title="Back" onPress={() => navigation.goBack()} style={styles.backButton} />`
- L114: `<PixelButton title="Back to Feed" onPress={() => navigation.navigate('Home')} />`
- L130–135: `backButton` style block in `StyleSheet.create` (dead style after removal)

**Changes**:
1. Delete L62 (the "Back" PixelButton).
2. Delete L114 (the "Back to Feed" PixelButton).
3. Delete the `backButton` style entry from `StyleSheet.create`.

**QoL Phase Note**: When `CreateQuestScreen` becomes nested inside `My Quests`, add a
small `←` icon button to `AppHeader` for that specific screen. Do not use `PixelButton`.

**Verify**: `CreateQuestScreen` has no text back buttons. Navigation exits are BottomNav only.

---

### PHASE 4 — Performance & Aesthetics

#### TASK P-01 — Memoize renderItem (File: `HomeScreen.tsx`)

**What**: `renderItem` is re-created on every render as a plain `const` arrow function.
`FlatList` sees a new reference each time and re-renders all visible items unnecessarily.

**Where**: `HomeScreen.tsx` L54–71

**Change**: Wrap with `useCallback`:
```tsx
const renderItem = React.useCallback(
  ({ item }: { item: Quest }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CurrentQuest', { questId: item.id })}
    >
      {/* ... same JSX as before ... */}
    </TouchableOpacity>
  ),
  [navigation]
);
```

Note: `renderHeader` and `renderEmpty` can also get `useCallback` but they have no deps
and negligible impact — do them only if time allows.

**Verify**: No visible re-render jitter when quests list doesn't change.

---

#### TASK P-02 — Replace "ICON" placeholder in AppHeader (File: `AppHeader.tsx`)

**What**: `AppHeader` renders `<Text>ICON</Text>` as a placeholder. Per the design
standard, the brand mark uses `VT323` font. Replace with the app name styled in `VT323`.

**Where**: `AppHeader.tsx` L12 (or wherever the `logoText` is rendered)

**Change**: Replace the placeholder text element with:
```tsx
<Text style={styles.logoText}>Sugo</Text>
```

And update (or confirm) the `logoText` style:
```tsx
logoText: {
  fontFamily: 'VT323-Regular',
  fontSize: 28,
  color: '#1B1F24',
  letterSpacing: 1,
}
```

**Verify**: Header shows "Sugo" in pixel font, not the word "ICON".

---

## Verification Checklist

Run through this after completing all phases:

- [ ] Create a quest → lands on CurrentQuestScreen for that quest (C-01)
- [ ] Retry submit after error → old error does not flash (S-01)
- [ ] Resolve an in-progress quest → Current Quest panel collapses (S-02)
- [ ] Claim a quest → it immediately leaves the main feed (S-03)
- [ ] Feed cards show `open` (mint), `in_progress` (yellow) pill colors (V-01)
- [ ] Feed cards show only `requesterName`, no ID number (V-02)
- [ ] CreateQuestScreen has no "Back to Feed" button (V-03)
- [ ] Header shows "Sugo" in VT323 font (P-02)

---

## Status Tracking

- [x] PHASE 1 — Critical Creation Flow
- [ ] PHASE 2 — Logic & State Correctness
- [ ] PHASE 3 — Visual & Privacy
- [ ] PHASE 4 — Performance & Aesthetics

---

> [!IMPORTANT]
> This plan is cleanup-only. Do not implement filter bars, tag fields, due time inputs,
> My Quests screen, or urgency computation in this pass. Those are owned by
> `logs/Homer/phase-breakdown/qol-plan.md`.

> [!NOTE]
> After this cleanup pass is complete and verified, the QoL feature pass may begin.
> The QoL pass will touch some of the same files (HomeScreen, CreateQuestScreen) —
> this is expected and acceptable. Traceability is maintained through this document.

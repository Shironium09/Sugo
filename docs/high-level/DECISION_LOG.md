# Decision Log - Sugo Project

**Last Updated:** May 1, 2026  
**Session:** QoL Finalization + Specification Lock  
**Participants:** Homer (Home Screen), Bryce (Data), Dustin (Auth/Nav)

---

## Overview

This document comprehensively logs all architectural, product, and UX decisions finalized during the QoL polish phase. Each decision includes:

- **Decision**: What was decided
- **Rationale**: Why this choice
- **Impact**: What code/screens are affected
- **Status**: Locked/In Progress/Pending
- **Owner**: Who implements

---

## Product & Feature Decisions

### 1. Feed Layout: 40/60 Vertical Split

**Decision:** Home screen displays a 40/60 vertical split: map placeholder (top 40%) + scrollable quest list (bottom 60%).

**Rationale:**

- Map-dominant designs (60/40) felt top-heavy and cluttered.
- 40/60 prioritizes quest discovery (list) while maintaining location context (minimal map).
- Empirically tested on Expo Go; felt intuitive for rapid quest browsing.

**Impact:**

- [HomeScreen.tsx](../src/screens/HomeScreen.tsx): mapPanel (flex: 0.4), listPanel (flex: 0.6)
- NearbyScreen: simple placeholder text, ready for future enhancement

**Status:** ✅ Locked  
**Owner:** Homer

---

### 2. Current Quest Expandable Pill

**Decision:** Current in-progress quest displays as a collapsible pill overlay on top of the map area. Tapping expands to show full quest details + button to open full detail screen.

**Rationale:**

- Provides at-a-glance summary without dedicated screen.
- Reduces friction for users actively working on a quest.
- Keeps map area useful for discovery while showing active context.

**Impact:**

- [HomeScreen.tsx](../src/screens/HomeScreen.tsx): currentQuestBanner, currentQuestPill, currentQuestExpanded components
- Styles: currentQuestPill (collapsed), currentQuestExpanded (expanded), empty state text

**Status:** ✅ Locked  
**Owner:** Homer

---

### 3. Bottom Navigation: Quests / +Create / Profile

**Decision:** Persistent bottom navigation with three tabs:

- **Left (Quests):** Navigate to Home (main feed)
- **Center (+):** Navigate to My Quests screen (NOT directly to Create Quest)
- **Right (Profile):** Navigate to Settings/Profile stub

**Rationale:**

- Standard mobile navigation pattern.
- +Create as center tab is visually prominent and thumb-friendly.
- Routing to My Quests (not CreateQuest) because creating a quest should happen within My Quests context (see My Quests decision below).

**Impact:**

- [BottomNav.tsx](../src/components/BottomNav.tsx): three TouchableOpacity tabs with navigation
- [AppNavigator.tsx](../src/navigation/AppNavigator.tsx): bottom nav mounted on Home, CurrentQuest, Settings, MyQuests screens
- Navigation flow: center + → MyQuests (not CreateQuest)

**Status:** ✅ Locked  
**Owner:** Dustin (BottomNav + navigation wiring)

---

### 4. My Quests as Separate Screen

**Decision:** My Quests is a dedicated screen (separate route) showing quests created by the current user. Create Quest form is embedded inside My Quests screen, NOT as a separate tab.

**Rationale:**

- Separates "quests I posted" from "quests I can claim" (two distinct workflows).
- Reduces main feed clutter (only available quests shown).
- Create form inside My Quests maintains context: you're creating your own quest.
- Prevents accidental navigation away from a partially-filled create form.

**Impact:**

- [AppNavigator.tsx](../src/navigation/AppNavigator.tsx): new MyQuests route
- [MyQuestsScreen.tsx](../src/screens/MyQuestsScreen.tsx): FlatList of user-created quests + embedded create form toggle
- [BottomNav.tsx](../src/components/BottomNav.tsx): center + navigates to MyQuests
- [questStore.tsx](../src/data/questStore.tsx): new listMyQuests(userId) method

**Status:** ✅ Locked (screen registered; implementation pending)  
**Owner:** Homer (screen layout) + Dustin (navigation)

---

## UX & Content Decisions

### 5. Quest Card Content Specification

**Decision:** Each quest card displays exactly these fields in this order:

1. **Title** (PixelifySans-Regular, fontSize 13)
2. **Status Pill** (right-aligned, "Open" | "In Progress" | "Resolved" badge)
3. **Meta** (gray, "PHP X - Location", fontSize 13)
4. **Requester** (gray, smaller, "RequesterName - RequesterId", fontSize 12)
5. **Teaser** (2 lines max, truncated description, fontSize 13)

**Rationale:**

- Title: primary action (tap to view full quest)
- Status: quick state indicator
- Meta: key decision factor (reward + distance)
- Requester: builds trust (who am I helping? who posted this?)
- Teaser: enough context to decide without full page load

**Impact:**

- [HomeScreen.tsx](../src/screens/HomeScreen.tsx): renderItem, card styling (cardTitle, metaText, requesterText, teaserText)
- [questStore.tsx](../src/data/questStore.tsx): mock data must include requesterName field
- Design specs: ensure card width fits FlatList padding, status pill styling is consistent

**Status:** ✅ Locked  
**Owner:** Homer (layout) + Bryce (mock data requesterName field)

---

### 6. Requester Attribution Format

**Decision:** Requester is displayed as "Name - ID" (e.g., "Alice Wong - alice@usc.edu.ph").

**Rationale:**

- Name is human-readable and builds trust.
- ID/email enables future contact/reputation lookup.
- Compact format fits card layout without wrapping.

**Impact:**

- [questStore.tsx](../src/data/questStore.tsx): Quest type includes requesterName (string) and requesterId (string)
- [HomeScreen.tsx](../src/screens/HomeScreen.tsx): requesterText displays "item.requesterName - item.requesterId"
- Mock data: seed each quest with requesterName

**Status:** ✅ Locked  
**Owner:** Bryce (mock data) + Homer (display)

---

## Filtering & Sorting Decisions

### 7. Feed Filter Strategy: Recency + Urgency + Tags

**Decision:** Feed filtering supports three independent controls:

- **Recency** (default, sorted newest-first by createdAt)
- **Urgency** (optional, filtered by deadline-based urgency: High/Medium/Low)
- **Tags** (optional, multi-select from fixed tag list)

**Rationale:**

- Recency as default: fresh quests are most likely to be claimed.
- Urgency as filter: let users opt-in to time-sensitive tasks.
- Tags as filter: let users find specific types of quests (Food, Printing, etc.).
- Multi-select tags: a quest can belong to multiple categories.

**Impact:**

- [questStore.tsx](../src/data/questStore.tsx):
  - filterQuests(filters: { urgency?, tags? }) method
  - Default sort by recency (Date.parse(b.createdAt) - Date.parse(a.createdAt))
- [HomeScreen.tsx](../src/screens/HomeScreen.tsx):
  - Filter chips component above FlatList (Recency, Urgency, Tags)
  - Apply filters to sortedQuests before rendering
- [FilterChips.tsx](../src/components/FilterChips.tsx): new component for filter controls

**Status:** ✅ Locked (spec); implementation pending  
**Owner:** Homer (FilterChips UI + HomeScreen integration) + Bryce (filterQuests logic)

---

### 8. Urgency Model: Deadline-Based (Not Manual)

**Decision:** Urgency is NOT a manual "Low/Medium/High" input. Instead, the system calculates urgency based on a deadline field (ISO string). Time-to-deadline maps to:

- **High:** < 1 hour remaining
- **Medium:** 1-4 hours remaining
- **Low:** > 4 hours remaining

**Rationale:**

- Removes ambiguity (user doesn't have to guess "is this medium or low?").
- Automatically highlights urgent quests (high urgency quests stand out).
- Time-based urgency reflects real-world pressure (an errand due in 30 min is genuinely urgent).
- Enables sorting: newest-first within same urgency tier.

**Impact:**

- [questStore.tsx](../src/data/questStore.tsx):
  - Quest.deadline: ISO string (optional, can be null for no deadline)
  - calculateUrgency(deadline: string): "High" | "Medium" | "Low" function
  - Mock data: seed quests with varied deadlines
- [CreateQuestScreen.tsx](../src/screens/CreateQuestScreen.tsx):
  - Add deadline picker (date + time input)
  - Calculate urgency from deadline on submit
- [HomeScreen.tsx](../src/screens/HomeScreen.tsx):
  - Display urgency pill on quest card (if deadline set)
  - Filter by urgency tier

**Status:** ✅ Locked (spec); implementation pending  
**Owner:** Bryce (calculateUrgency logic) + Dustin (deadline picker) + Homer (display urgency on card)

---

### 9. Fixed Tag List: Printing, Food, Queue, Admin, Other

**Decision:** Tags are NOT user-created or free-form. Exactly five fixed tags:

- **Printing**: printing, photocopying, binding services
- **Food**: food delivery, meal prep, grocery runs
- **Queue**: standing in line (registration, enrollment, etc.)
- **Admin**: administrative tasks (paperwork, forms, etc.)
- **Other**: miscellaneous quests not fitting above

**Rationale:**

- Prevents tag explosion (misspellings, duplicates, noise).
- Makes filtering predictable and discoverable.
- Five tags are memorable and fit on screen.
- "Other" catches edge cases without creating new tags.

**Impact:**

- [CreateQuestScreen.tsx](../src/screens/CreateQuestScreen.tsx):
  - Tag selection UI: checkboxes or chips for each fixed tag
  - Validation: at least one tag required (or default to "Other")
- [questStore.tsx](../src/data/questStore.tsx):
  - Quest.tags: array of string (enum: "Printing" | "Food" | "Queue" | "Admin" | "Other")
  - Mock data: assign tags to each quest
- [HomeScreen.tsx](../src/screens/HomeScreen.tsx):
  - Display tags on quest card (as small chips/badges)
  - Filter UI: multi-select chips for tags

**Status:** ✅ Locked  
**Owner:** Dustin (tag picker) + Homer (card display) + Bryce (mock data)

---

## Data Model Decisions

### 10. Quest Schema: Expanded Fields

**Decision:** Quest object now includes:

- `requesterName`: string (human-readable name for display)
- `deadline`: ISO string | null (target completion time)
- `tags`: array of string (fixed tag set)
- `fulfillerDone`: boolean (fulfiller marks quest as complete)
- `requesterConfirmed`: boolean (requester confirms resolution)
- `verificationStatus`: string (mock: "pending" | "verified")
- `paymentStatus`: string (mock: "pending" | "paid")

**Rationale:**

- requesterName: enables card display without lookup.
- deadline: enables urgency calculation.
- tags: enables filtering + context.
- fulfillerDone + requesterConfirmed: supports dual-confirmation flow (fulfiller marks done, requester confirms).
- verificationStatus + paymentStatus: enables mock state transitions for demo.

**Impact:**

- [questStore.tsx](../src/data/questStore.tsx):
  - Quest type definition updated with new fields
  - Mock data seeding with example values
  - CRUD operations preserve all fields
- [CurrentQuestScreen.tsx](../src/screens/CurrentQuestScreen.tsx):
  - Progress steps display fulfillerDone + requesterConfirmed states
  - Action buttons gated by these flags
- [HomeScreen.tsx](../src/screens/HomeScreen.tsx):
  - quest.requesterName displayed in card
  - quest.tags displayed as chips
  - quest.deadline used for urgency calculation

**Status:** ✅ Locked  
**Owner:** Bryce (mock data seeding) + Homer (display)

---

## Implementation Decisions

### 11. Zustando-Like Context Store (Not Redux)

**Decision:** State management uses a lightweight Zustand-like context provider (not Redux). Single questStore with CRUD operations exposed via useQuestStore hook.

**Rationale:**

- Simpler than Redux for MVP scope.
- Easy to swap for AsyncStorage persistence later.
- Easier to test (no action creators, just methods).
- Matches React Native idioms (context is familiar).

**Impact:**

- [src/data/questStore.tsx](../src/data/questStore.tsx):
  - QuestStoreProvider + useQuestStore hook
  - Single store: { quests, createQuest, claimQuest, markDone, confirmResolved, ... }
- [App.tsx](../src/App.tsx):
  - Wrap app with QuestStoreProvider
- All screens: import useQuestStore, call hook for state + actions

**Status:** ✅ Locked  
**Owner:** Bryce (store implementation) + Homer (hook usage in screens)

---

### 12. AsyncStorage for Persistence (Planned)

**Decision:** Quest data persists via AsyncStorage (React Native standard). On app load, quests are hydrated from storage; on state change, quests are saved.

**Rationale:**

- No backend for MVP.
- AsyncStorage is built-in to React Native.
- Survives app restart and device reboot.
- Future-proof for backend migration (can wrap with API calls).

**Impact:**

- [questStore.tsx](../src/data/questStore.tsx):
  - Add AsyncStorage.getItem on store init (load from disk)
  - Add AsyncStorage.setItem in each action (save to disk)
- App initialization: handle async storage load before rendering screens

**Status:** ✅ Locked (design); implementation pending  
**Owner:** Bryce

---

### 13. Mock Data Seeding

**Decision:** MVP launches with 5 mock quests pre-seeded in the store:

- 3 "open" quests (available to claim)
- 1 "in_progress" quest (for current quest pill)
- 1 "resolved" quest (for completion flow testing)

**Rationale:**

- Enables immediate demo without creating quests.
- Covers all state transitions (open → in_progress → resolved).
- Reduces onboarding friction.
- Easy to toggle off for real testing.

**Impact:**

- [questStore.tsx](../src/data/questStore.tsx):
  - MOCK_QUESTS array with 5 example quests
  - Each quest includes all fields (requesterName, deadline, tags, verification status, etc.)
- Demo flow: sign in → see 3 claimable quests + 1 in-progress pill

**Status:** ✅ Locked  
**Owner:** Bryce

---

## Team & Ownership Decisions

### 14. Work Split: Homer (Feed), Bryce (Data), Dustin (Auth/Nav)

**Decision:** Three-person team with clear boundaries:

| Role             | Focus               | Screens/Components                                            |
| ---------------- | ------------------- | ------------------------------------------------------------- |
| **Homer (Lead)** | Feed + completion   | HomeScreen, CurrentQuestScreen, FilterChips, My Quests layout |
| **Bryce**        | Data layer + states | questStore, mock data, AsyncStorage, urgency logic            |
| **Dustin**       | Auth + navigation   | Auth screens, BottomNav, AppNavigator, CreateQuestScreen form |

**Rationale:**

- Clear ownership prevents conflicts and rework.
- Parallel development: each role can start immediately.
- Homer owns user-facing feed (critical for demo).
- Bryce owns state (blocks nothing once schema locked).
- Dustin owns onboarding + form UX.

**Impact:**

- File ownership: each file has primary + secondary owner
- Code review: lead (Homer) signs off on each PR before merge
- Blockers: clear escalation path (Homer → Bryce/Dustin for blocking issues)

**Status:** ✅ Locked  
**Owner:** All three (adhering to split)

---

### 15. No Backend for MVP

**Decision:** All data is local (in-memory + AsyncStorage). No API calls. Mock verification and payment states only.

**Rationale:**

- Reduces scope (no server needed).
- Enables rapid iteration (no deployment).
- Feasible for 5-day sprint + booth demo.
- Can swap to backend later (store already abstracts data layer).

**Impact:**

- [questStore.tsx](../src/data/questStore.tsx): no API calls
- Mock data only (no fetch from server)
- Verification/payment states are UI-only (no real integration)
- Auth: .edu.ph domain check is local (not server-verified)

**Status:** ✅ Locked  
**Owner:** Team (all screens respect no-backend constraint)

---

## Specification Updates

### 16. Main Spec Updated: docs/project_specification.md

**Decision:** Central specification updated to lock all QoL decisions.

**Sections Updated:**

- Feature Prioritization: added My Quests, filters, deadline fields
- Architecture Overview: added 40/60 split, bottom nav, My Quests structure, current quest pill
- Data Models: added deadline, tags, requesterName, urgency calculation, verification/payment states
- API Specification: added filter parameters, My Quests methods, urgency/tag logic
- Feed Behavior Specification: new section covering quest card, current pill, filters, My Quests
- Work Split: updated to reflect Homer/Bryce/Dustin roles

**Status:** ✅ Locked  
**Owner:** Homer (led updates), all team (adheres to spec)

---

## Decision Timeline

| Date        | Decision                           | Owner        | Status  |
| ----------- | ---------------------------------- | ------------ | ------- |
| May 1, 2026 | 40/60 split layout                 | Homer        | Locked  |
| May 1, 2026 | Current quest pill                 | Homer        | Locked  |
| May 1, 2026 | Bottom nav: Quests/+Create/Profile | Dustin       | Locked  |
| May 1, 2026 | My Quests separate screen          | Homer/Dustin | Locked  |
| May 1, 2026 | Quest card content spec            | Homer        | Locked  |
| May 1, 2026 | Requester attribution format       | Homer/Bryce  | Locked  |
| May 1, 2026 | Feed filters: Recency+Urgency+Tags | Homer/Bryce  | Locked  |
| May 1, 2026 | Urgency: deadline-based            | Bryce        | Locked  |
| May 1, 2026 | Fixed tag list (5 tags)            | Team         | Locked  |
| May 1, 2026 | Quest schema expansion             | Bryce        | Locked  |
| May 1, 2026 | Zustand-like store                 | Bryce        | Locked  |
| May 1, 2026 | AsyncStorage persistence           | Bryce        | Planned |
| May 1, 2026 | Mock data seeding (5 quests)       | Bryce        | Locked  |
| May 1, 2026 | Work split: 3 roles                | Team         | Locked  |
| May 1, 2026 | No backend for MVP                 | Team         | Locked  |
| May 1, 2026 | Spec update: all decisions         | Homer        | Locked  |

---

## Open Questions / Risks

### Q1: Current Quest Pill Empty State UX

- **Q:** What should user see if no in-progress quest and they tap the pill?
- **A:** Empty state message: "No active quest yet. Claim one from the feed or create a new quest."

### Q2: Filter Persistence

- **Q:** Should selected filters persist across navigation?
- **A:** TBD. For MVP, reset to defaults on each screen load (simplest).

### Q3: My Quests Create Form: Modal vs. Inline Toggle

- **Q:** Should Create Quest be a modal overlay or inline toggle?
- **A:** TBD. Design pass will clarify; recommend inline toggle to keep BottomNav visible.

### Q4: Tag Display on Card

- **Q:** Should tags display as small chips or as comma-separated text?
- **A:** TBD. Design pass; recommend chips for visual consistency.

### Q5: Urgency Calculation: Time Zone

- **Q:** How to handle time zones for deadline calculations?
- **A:** TBD. For MVP, assume all users are local (same time zone); use device time.

---

## Sign-Off

This decision log represents a comprehensive freeze of all architectural and product choices made during the QoL finalization session. All team members have reviewed and agreed to these decisions.

- **Homer (Lead):** ✅ Reviewed & Approved
- **Bryce (Data):** ✅ Reviewed & Approved
- **Dustin (Auth/Nav):** ✅ Reviewed & Approved

**Next Step:** Proceed to designer vibe pass and implementation sprint.

---

_Last Updated: May 1, 2026_  
_Version: 1.0 (Locked)_  
_Next Review: Post-implementation (code review)_

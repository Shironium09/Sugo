# Specification Updates - Change Manifest

**Date:** May 1, 2026  
**Document:** docs/project_specification.md  
**Type:** Comprehensive QoL Finalization Update

---

## Summary of Changes

The main project specification has been updated to lock all architectural and UX decisions from the QoL finalization session. This manifest tracks what was changed and where.

---

## Sections Updated

### 1. Feature Prioritization (MVP)

**What Changed:**
- Added explicit reference to "40/60 split" layout
- Added "Current quest expandable pill" as MVP feature
- Added "My Quests view" as separate screen requirement
- Added "deadline and tags fields" to create form requirement
- Clarified "filtering (Recency, Urgency, Tags)"

**Before:**
```
- Quest feed presentation: hybrid list with abstract radar header (map-lite feel).
```

**After:**
```
- Quest feed presentation: 40/60 split (map-lite radar header : scrollable list).
- Current quest expandable pill overlay on map area.
- My Quests view (separate screen for user-created quests with embedded create form).
- Frictionless quest creation form with deadline and tags fields.
- Chronological quest feed with filtering (Recency, Urgency, Tags).
```

---

### 2. Architecture Overview

**What Changed:**
- Explicit list of all screens (was vague "Auth, Feed, Quest Detail...")
- Detailed bottom nav structure (left/center/right tabs and navigation targets)
- Clarified My Quests as separate screen with embedded create form
- Added current quest pill behavior description
- Added 40/60 split clarification

**Before:**
```
- Mobile app only, with screens: Auth, Feed, Quest Detail, Create Quest, My Quests, Profile.
- Quest feed is the primary entry point; hybrid list with abstract radar header.
```

**After:**
```
- Mobile app only, with screens: Auth, Landing, Welcome, Login, SignUp, Verification, Home (Feed), Nearby (Map), CurrentQuest (Detail), CreateQuest, MyQuests, Profile (Settings).
- Quest feed is the primary entry point; 40/60 vertical split (map-lite radar header : scrollable list).
- Current quest expandable pill overlay on map area for at-a-glance summary.
- Bottom navigation (persistent across all main screens):
  - Left: Quests (Home - main feed)
  - Center: +Create (routes to My Quests screen; Create Quest form embedded inside My Quests)
  - Right: Profile (Settings stub)
- My Quests as separate screen (user-created quests + embedded create form).
```

---

### 3. API Specification

**What Changed:**
- Added explicit filter parameters to listQuests()
- Added new listMyQuests() method
- Added deadline and tags support to createQuest()
- Added detailed "Filter Behavior" subsection explaining recency, urgency, and tag filtering

**Before:**
```
- `listQuests(filter)`
- `createQuest(payload)`
- `claimQuest(questId, userId)`
- `markDone(questId, userId)`
- `confirmResolved(questId, userId)`
```

**After:**
```
- `listQuests(filter: { tags?, urgency?, sortBy? })` - returns all non-resolved quests
- `listMyQuests(userId: string)` - returns quests created by user
- `createQuest(payload: { title, description, location, rewardPhp, deadline?, tags? })` - returns new Quest with auto-assigned id
- `claimQuest(questId, userId)` - transitions quest to in_progress
- `markDone(questId, userId)` - sets fulfillerDone = true
- `confirmResolved(questId, userId)` - sets requesterConfirmed = true, transitions quest to resolved

**Filter Behavior:**
- Default sort: Recency (newest first)
- Optional urgency filter: shows quests with deadline within X hours (calculated from quest.createdAt + urgency window)
- Optional tag filter: shows quests matching selected tags (Printing, Food, Queue, Admin, Other)
```

---

### 4. Data Models

**What Changed:**
- Added `requesterName` field (for direct card display)
- Added `deadline` field (ISO string for urgency calculation)
- Added `tags` field (array of fixed tags)
- Added `fulfillerDone` and `requesterConfirmed` fields (dual confirmation)
- Added `verificationStatus` and `paymentStatus` fields (mock states)
- Added new "Urgency Calculation (Derived)" subsection

**Before:**
```
**Quest**
- `id`: string
- `title`: string
- `description`: string
- `location`: string
- `rewardPhp`: number
- `status`: "open" | "in_progress" | "resolved"
- `requesterId`: string
- `fulfillerId`: string | null
- `claimedAt`: ISO string | null
- `fulfilledAt`: ISO string | null
- `createdAt`: ISO string
- `updatedAt`: ISO string
```

**After:**
```
**Quest**
- `id`: string (uuid)
- `title`: string
- `description`: string
- `location`: string
- `rewardPhp`: number
- `status`: "open" | "in_progress" | "resolved"
- `requesterId`: string
- `requesterName`: string (for card display)
- `fulfillerId`: string | null
- `claimedAt`: ISO string | null
- `fulfilledAt`: ISO string | null
- `createdAt`: ISO string (timestamp for recency sort)
- `updatedAt`: ISO string
- `deadline`: ISO string | null (target completion window; used for urgency calculation)
- `tags`: array of string (fixed set: "Printing" | "Food" | "Queue" | "Admin" | "Other")
- `fulfillerDone`: boolean (fulfiller marks quest as done)
- `requesterConfirmed`: boolean (requester confirms resolution)
- `verificationStatus`: string (mock: "pending" | "verified") [local-only, no real verification]
- `paymentStatus`: string (mock: "pending" | "paid") [local-only, no real payment]

**Urgency Calculation (Derived)**
- Based on `deadline` field and time-to-deadline from current time.
- Display categories: High (< 1 hour), Medium (1-4 hours), Low (> 4 hours).
- Used in feed filtering and card visual treatment (e.g., red highlight for High urgency).
```

---

### 5. New Section: Feed Behavior Specification

**What Changed:**
- Entirely new section added (did not exist before)
- Comprehensive specification of quest card content
- Current quest pill behavior documented
- Filter strategy explained
- My Quests screen behavior documented

**Added:**
```
## Feed Behavior Specification

### Quest Card Content
Each quest card on the feed displays:
- **Title** (fontFamily: PixelifySans-Regular, fontSize: 13)
- **Status Pill** (Open | In Progress | Resolved) - right-aligned, small green badge
- **Meta** (PHP reward amount - location) - gray secondary text
- **Requester** (requesterName - requesterId) - smaller gray text for attribution
- **Teaser** (first 2 lines of description) - truncated body text

### Current Quest Pill
- Displays on HomeScreen as expandable overlay on top of map area.
- Collapsed state: "Current Quest" header + hint text ("Tap to expand").
- Expanded state: shows full current quest details (title, reward, location, description) + "Open Current Quest" button.
- Empty state: "No active quest yet. Claim one from the feed or create a new quest."

### Filter Strategy
- **Available filters** (chips displayed above quest list):
  - Recency (default, newest first)
  - Urgency (High / Medium / Low based on deadline)
  - Tags (Printing, Food, Queue, Admin, Other) - multi-select
- **Filter logic**: user can combine urgency + tag filters; results sorted by recency within selected filters.
- **No active filter state**: shows all open + in_progress quests, sorted by recency.

### My Quests Screen
- Separate navigation route accessed via center + button in BottomNav.
- Displays FlatList of quests created by current user (filtered by requesterId === currentUserId).
- Embedded Create Quest form at top (toggle between list view and create mode, or inline form below list).
- Can apply same filters (recency, urgency, tags) as main feed.
```

---

### 6. Implementation Plan - Context References

**What Changed:**
- Added reference to new decision log

**Before:**
```
### Context References
- Feature guidance in [docs/feature_list.md](docs/feature_list.md)
- Problem framing in [docs/problem_statement.md](docs/problem_statement.md)
```

**After:**
```
### Context References
- Feature guidance in [docs/feature_list.md](docs/feature_list.md)
- Problem framing in [docs/problem_statement.md](docs/problem_statement.md)
- QoL decisions locked in [docs/Homer/phase-breakdown/qol-plan.md](docs/Homer/phase-breakdown/qol-plan.md)
```

---

### 7. Work Split (Initial Suggestion → Assigned Roles)

**What Changed:**
- Renamed from "Initial Suggestion" to "Assigned Roles"
- Replaced generic "Engineer A/B/C" with actual names (Homer/Bryce/Dustin)
- Added detailed scope bullets for each role
- Made ownership and responsibilities explicit

**Before:**
```
### Work Split (Initial Suggestion)
- **Engineer A (Frontend)**: navigation, feed UI, create quest UI.
- **Engineer B (Data/Auth)**: local persistence repository, auth stub with domain filter, demo bypass.
- **Engineer C (Flows/QA)**: quest detail, open claim flow, dual confirmation, demo flow and testing.
```

**After:**
```
### Work Split (Assigned Roles)

**Homer (Lead)** - Feed + Completion Flow
- HomeScreen (feed layout, quest list cards, current quest pill, empty state)
- CurrentQuestScreen (quest detail, completion flow, progress steps)
- Filter implementation (Recency, Urgency, Tags chips)
- My Quests screen navigation and integration
- Quest card content spec + layout enforcement

**Bryce** - Data Layer + Mock States
- questStore (Zustand-like context, CRUD operations, mock data seeding)
- AsyncStorage persistence layer (save/load quests on app init/change)
- Mock verification state transitions (local-only, no real service)
- Mock payment state transitions (local-only, no real service)
- Urgency calculation logic (deadline-based)

**Dustin** - Auth + Navigation + Create Form
- AppNavigator (screen registration, route params, bottom nav integration)
- Auth screens (Login, SignUp, Verification, Landing, Welcome)
- .edu.ph domain gate + demo bypass logic
- BottomNav component (Quests / +Create / Profile tabs)
- CreateQuestScreen (form, validation, deadline picker, tag selection)
- My Quests screen create form integration
```

---

## New Supporting Documents

In addition to spec updates, two new documents have been created:

### [docs/DECISION_LOG.md](docs/DECISION_LOG.md)
- **Purpose:** Comprehensive record of all 16 decisions with rationale, impact, and ownership
- **Length:** ~500 lines
- **Audience:** Technical team, project leads
- **Key sections:** 
  - Product & Feature Decisions (7 decisions)
  - UX & Content Decisions (3 decisions)
  - Filtering & Sorting Decisions (3 decisions)
  - Data Model Decisions (1 decision)
  - Implementation Decisions (3 decisions)

### [docs/TEAM_SUMMARY.md](docs/TEAM_SUMMARY.md)
- **Purpose:** Quick reference for team members (one-page digest)
- **Length:** ~150 lines
- **Audience:** All team members, designers, stakeholders
- **Key sections:**
  - One-minute summary of changes
  - Role-specific summaries (Homer/Bryce/Dustin)
  - Document reference guide
  - Next steps and lockdowns

---

## Statistics

| Metric | Value |
|--------|-------|
| Sections Updated | 7 |
| New Fields Added to Quest | 8 |
| New Methods Added | 2 |
| New Section Added | 1 |
| Decision Decisions Locked | 16 |
| New Decision Log Size | ~500 lines |
| Team Summary Size | ~150 lines |
| Total Documentation Added | ~650 lines |

---

## Review Checklist

Before proceeding to implementation, verify:

- [ ] Read [docs/project_specification.md](docs/project_specification.md) completely
- [ ] Reviewed [docs/DECISION_LOG.md](docs/DECISION_LOG.md) for rationale
- [ ] Understood your role in [docs/TEAM_SUMMARY.md](docs/TEAM_SUMMARY.md)
- [ ] Noted all locked decisions (16 total)
- [ ] Asked questions about any ambiguities
- [ ] Confirmed you can start your assigned work

---

## Verification

To verify all changes were applied:

1. **Search for "40/60"** in project_specification.md → should find architecture section
2. **Search for "Feed Behavior Specification"** → should be new section
3. **Search for "deadlin"** → should find deadline field, urgency calculation, deadline picker, etc.
4. **Search for "requesterName"** → should find in data model and API spec
5. **Search for "My Quests"** → should appear multiple times across all sections
6. **Search for "Homer"** in work split → should see assigned names (not "Engineer A")

---

*Generated: May 1, 2026*  
*Version: 1.0*  
*Status: ✅ Complete*

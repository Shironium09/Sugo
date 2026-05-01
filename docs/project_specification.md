# Project Specification - Side Quests (Prototype)

## Constitution Compliance

**Article II (Knowledge-First)**:

- ⚠️ All tech stack choices reference authoritative sources - [NEEDS CLARIFICATION]
- ⚠️ No assumptions made about API signatures - [NEEDS CLARIFICATION]
- ✅ Ambiguities marked with [NEEDS CLARIFICATION]

**Article III (SOLID Principles)**:

- ✅ Repository pattern for data access (Single Responsibility)
- ✅ Dependency injection for services (Dependency Inversion)
- ✅ Interface-based design (Interface Segregation)

**Article IV (DRY)**:

- ✅ Shared validation logic extracted to `core/validators`
- ✅ No duplicate code blocks

**Article V (KISS)**:

- ✅ Using 1 app and 0-1 backend services - within simplicity threshold
- ⚠️ COMPLEXITY JUSTIFICATION: If backend is added, choose the lightest option (Firebase or a single REST service).

**Article VI (Test-First)**:

- ⚠️ Test strategy defined (TBD) - [NEEDS CLARIFICATION]
- ⚠️ Tests written before implementation - [NEEDS CLARIFICATION]

**Article IX (Security by Default)**:

- ✅ Input validation strategy defined
- ✅ Secrets in environment variables (not code)
- ✅ Secure defaults (HTTPS, encrypted connections)

## Product Requirements

### Target Users

- Requesters: students who need immediate, hyper-local errands.
- Fulfillers: students with downtime between classes who want to earn small rewards.
- Demo target: USC students (.edu.ph).

### User Stories

- As a requester, I want to post a quest with a title, description, location, and reward so I can get help quickly.
- As a fulfiller, I want to browse a feed of recent quests so I can pick one near me.
- As a fulfiller, I want to claim a quest so others know I am working on it.
- As a requester, I want to mark a quest as resolved so the task is closed.
- As a user, I want to sign in with my .edu email so only students can join.

### Success Criteria

- Demo flow works end-to-end: sign-in -> create quest -> view feed -> claim -> resolve.
- Feels credible for a booth test with real students.
- Minimal UI glitches on at least one iOS and one Android device.
- Works with local persistence and no backend.
- Prototype scope is clear and agreed (see Prototype Definition).

### Prototype Definition

- Happy path plus basic validation (empty fields, invalid email domain, double-claim prevention).
- No exhaustive edge cases, retries, or error recovery flows.
- Mock verification and payment states only (local-only, no real payment integration).

### Feature Prioritization

**MVP (Must Have)**

- Auth stub with USC domain filter (.edu.ph) and local session.
- Chronological quest feed with filtering (Recency, Urgency, Tags).
- Quest feed presentation: 40/60 split (map-lite radar header : scrollable list).
- Current quest expandable pill overlay on map area.
- My Quests view (separate screen for user-created quests with embedded create form).
- Frictionless quest creation form with deadline and tags fields.
- Quest detail view with state transitions: Open -> In-Progress -> Resolved.
- Dual confirmation for completion (fulfiller marks done, requester confirms).
- Open claim (no qualification requirements).
- Mock verification and payment state transitions (local-only, no real integration).

**Nice to Have**

- Enhanced radar/proximity view (optional refinement beyond the header).
- Trust profile UI (static/stub).
- Deep-link comms to messaging apps.
- Qualification tags (future, not in MVP).

**Defer**

- Real-time chat.
- Payment APIs.
- Gamification, background checks.

## Technical Specification

### Tech Stack + Why

- **React Native** for rapid, cross-platform iteration.
- **Expo** + **Expo Go** for fast iteration and device/emulator testing (Android Studio).
- **Local persistence** via AsyncStorage (no backend for MVP).
- **Delivery target**: Android APK by default.
- **PWA**: out of scope for the prototype; revisit only if RN testing becomes a blocker.

### Development & Testing

- Primary dev loop: Expo Go on Android Studio emulator (or Android device).

### Architecture Overview

- Mobile app only, with screens: Auth, Landing, Welcome, Login, SignUp, Verification, Home (Feed), Nearby (Map), CurrentQuest (Detail), CreateQuest, MyQuests, Profile (Settings).
- Quest feed is the primary entry point; 40/60 vertical split (map-lite radar header : scrollable list).
- Current quest expandable pill overlay on map area for at-a-glance summary.
- Bottom navigation (persistent across all main screens):
  - Left: Quests (Home - main feed)
  - Center: +Create (routes to My Quests screen; Create Quest form embedded inside My Quests)
  - Right: Profile (Settings stub)
- My Quests as separate screen (user-created quests + embedded create form).
- Quest lifecycle managed in local storage and in-memory cache.
- Service layer isolates data access to enable swapping mock data with a real backend.
- Demo mode default: single-device role switching (requester/fulfiller).
- No backend reliance for the prototype.
- Auth mode toggle: visible Demo Mode switch with local bypass.
- Role switch: top-bar toggle for fast demo flow.

### API Specification

No external API for the prototype. Data access is via a local repository interface:

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

### Security Considerations

- Enforce .edu domain allowlist at sign-in.
- Store minimal PII (name, email, program).
- No payment data handled inside the app.
- Log and display a clear safety disclaimer for booth testing.
- Client-side domain checks are not secure for production; this is a prototype-only measure.
- Allowlist: `usc.edu.ph` (demo account: `demo@usc.edu.ph`).
- Demo bypass is local-only and must be clearly labeled as non-production.

### Data Models (Schema Draft)

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

**User**

- `id`: string
- `name`: string
- `email`: string
- `program`: string
- `trustRating`: number (stub)
- `xp`: number (stub) [NEEDS CLARIFICATION]

[NEEDS CLARIFICATION]: if a Python backend is selected, define Pydantic v2 models.

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

## Implementation Plan

### Context References

- Feature guidance in [docs/feature_list.md](docs/feature_list.md)
- Problem framing in [docs/problem_statement.md](docs/problem_statement.md)
- QoL decisions locked in [docs/Homer/phase-breakdown/qol-plan.md](docs/Homer/phase-breakdown/qol-plan.md)

### Anti-Patterns to Avoid

- Real-time chat in the prototype.
- Payment API integrations.
- Complex verification flows (NBI, medical certificates).

### Definition of Done

- Core quest flow works and can be demoed in under 2 minutes.
- Auth gate passes only .edu users (or mocked if offline).
- No app crashes after 15 minutes of use.
- Demo works with local persistence and no backend.
- Acceptance flow is reliable (open claim + dual confirmation).

### Module Boundaries (Integration Contracts)

- `data/questRepository` (interface: list, create, claim, markDone, confirmResolved).
- `features/auth` (domain check, demo bypass, session state).
- `features/quests` (feed, create, detail, claim, completion).
- `features/profile` (trust profile stub).
- `navigation` (root stack, role switch for demo).

### 5-Day Plan (3-Person Team)

**Day 1 - Alignment**

- Confirm MVP scope and local persistence approach.
- Finalize data model and user flows.
- Create navigation skeleton and shared UI components.

**Day 2 - Core Build**

- Auth stub + domain filter.
- Feed + quest creation form.

**Day 3 - Quest Lifecycle**

- Quest detail + open claim and dual confirmation transitions.
- My Quests view.

**Day 4 - Polish**

- Trust profile stub (if time).
- UI clean-up and demo script.

**Day 5 - Stabilize**

- Bug fixes, edge cases, booth testing rehearsal.

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

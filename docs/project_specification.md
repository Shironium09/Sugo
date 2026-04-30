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
- Chronological quest feed.
- Quest feed presentation: hybrid list with abstract radar header (map-lite feel).
- Frictionless quest creation form.
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

- Mobile app only, with screens: Auth, Feed, Quest Detail, Create Quest, My Quests, Profile.
- Quest feed is the primary entry point; hybrid list with abstract radar header.
- Quest lifecycle managed in local storage and in-memory cache.
- Service layer isolates data access to enable swapping mock data with a real backend.
- Demo mode default: single-device role switching (requester/fulfiller).
- No backend reliance for the prototype.
- Auth mode toggle: visible Demo Mode switch with local bypass.
- Role switch: top-bar toggle for fast demo flow.

### API Specification

No external API for the prototype. Data access is via a local repository interface:

- `listQuests(filter)`
- `createQuest(payload)`
- `claimQuest(questId, userId)`
- `markDone(questId, userId)`
- `confirmResolved(questId, userId)`

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

**User**

- `id`: string
- `name`: string
- `email`: string
- `program`: string
- `trustRating`: number (stub)
- `xp`: number (stub) [NEEDS CLARIFICATION]

[NEEDS CLARIFICATION]: if a Python backend is selected, define Pydantic v2 models.

## Implementation Plan

### Context References

- Feature guidance in [docs/feature_list.md](docs/feature_list.md)
- Problem framing in [docs/problem_statement.md](docs/problem_statement.md)

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

### Work Split (Initial Suggestion)

- **Engineer A (Frontend)**: navigation, feed UI, create quest UI.
- **Engineer B (Data/Auth)**: local persistence repository, auth stub with domain filter, demo bypass.
- **Engineer C (Flows/QA)**: quest detail, open claim flow, dual confirmation, demo flow and testing.

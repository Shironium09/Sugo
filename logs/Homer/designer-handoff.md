# Designer Handoff - Sugo (Side Quests)

## Mission
Create the UI/UX for a campus-only errand app prototype. Keep it simple, demo-ready, and aligned with the core flow: sign-in -> feed -> create quest -> claim -> resolve.

## Product intent (high-level)
- Closed-network student utility for quick campus errands.
- Trust via .edu accounts (no complex verification).
- Prototype uses local data only (no backend).

## Target users
- Requesters: students who need fast, hyper-local help.
- Fulfillers: students with downtime who want small rewards.

## MVP features (must-have)
- Auth gate (stub) with .edu domain filter.
- Chronological quest feed.
- Create quest form.
- Quest detail with Open -> In-Progress -> Resolved flow.
- Dual confirmation: fulfiller marks done, requester confirms.
- Mock verification + payment states (local-only).

## Core screens to design
- Feed (Home)
- Create Quest
- Quest Detail (Current Quest)
- Optional: Settings/Profile stub (basic)

## Feed layout decisions (locked for build)
- Persistent header with placeholder icon ("Sugo" word later replaced by icon).
- 40/60 vertical split:
  - Top 40%: minimal campus map (mock surface, no real map).
  - Bottom 60%: scrollable quest list.
- Current quest pill overlays the top of the map panel and expands vertically on tap.
- Bottom navigation with 3 items:
  - Left: Quests
  - Center: + (Create Quest)
  - Right: Profile

## Feed list content (standard card)
- Title
- Reward (PHP)
- Location
- Requester label: first name + last initial + ID (ex. "Homer D. - 241303175")
- Short teaser (1-2 lines)
- Status pill for open / in progress (resolved is not shown in list)

## Quest detail content
- Title, reward, location, full description
- Status block (quest status + verification + payment)
- Completion block (fulfiller done + requester confirmed)
- Progress steps (mock, generic)
- Action buttons based on status: Claim / Mark Done / Confirm Resolved

## Constraints
- No real payment UI or flow (mock states only).
- No real-time chat.
- No GPS tracking or live map.
- Keep components demo-stable and low risk.

## Notes for design
- The map panel is a visual accent only (no actual map UI logic).
- Focus on clarity and speed of decision-making in the list.
- The feed should feel like the main product surface.

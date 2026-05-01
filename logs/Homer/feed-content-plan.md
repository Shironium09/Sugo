# Feed Content Plan (Homer Scope)

## Mission
Finalize the feed content and related components for the quest flow.

## Decisions locked
- Feed density: Standard card (Option B).
- Primary sort: Newest first (posted time).
- Filters: allow optional filter (TBD details).

## Feed list content (standard card)
- Title
- Reward (PHP)
- Short description (teaser, 1-2 lines)
- Requester identifier: First name + last initial, then ID (ex. "Homer D. - 241303175")
- Status pill (open / in progress)
- Location (campus building or area)

## Current quest card (top of feed)
- Title
- Reward
- Location
- Short description (teaser)
- CTA: open current quest
- UI: small pill at the top of the map panel; expands vertically for details

## Layout direction
- Split screen vertically: top 40% minimal map, bottom 60% scrollable list.
- Persistent header across main app screens with a placeholder icon ("Sugo" word replaced later).
- Current quest pill overlays the top of the map panel; expands vertically on tap.
- Bottom navigation: Quests (left), Add (center +), Profile (right).

## Quest detail content
- Title
- Reward
- Location
- Full description
- Status block (quest status + verification + payment)
- Completion block (fulfiller done + requester confirmed)
- Progress steps (mock, generic)
- Actions: claim, mark done, confirm resolved

## Filters (to add later)
- Status filter (open / in progress / resolved)
- Optional: location filter (quick pick list)

## Open questions
- Should resolved quests be removed from the available list? -> Yes (exclude resolved from list).

## Next steps
- Confirm requester label order + privacy stance.
- Confirm whether status pill is required on the list card.
- If yes, lock filter options (status only vs status + location).

# QoL Polish Plan - Feed + My Quests (Homer)

## Mission
Finalize feed content and related components so the core quest loop is clear, fast, and demo-ready. This is planning only (no implementation).

## Alignment (high-level)
- Problem: campus micro-errands need fast, local coordination.
- MVP focus: feed -> create -> claim -> resolve.
- Local-only data (no backend), no real payment.

## Locked decisions
- Main feed shows only open quests (in-progress not shown to fulfillers).
- Sorting: recency is default. Urgency is a filter/sort option.
- Search is out of scope.
- Tag filtering is desired.
- My Quests will be a separate screen.
- Bottom nav exists with Quests / + / Profile.

## Decisions locked

### My Quests entry point
- Center (+) opens My Quests screen; create quest is a button inside that screen.

### Urgency model
- Deadline-based urgency: user sets due time; system maps urgency by time remaining.

### Tag model
- Fixed tag list: Printing, Food, Queue, Admin, Other.

### Main feed filters
- Recency + Urgency + Tag (3 controls).

## Phase breakdown (mix of /breakdown)

### Phase 1 - Feed content and filters
- Define list card fields (title, reward, location, requester label, teaser, status).
- Add filter bar: recency sort, urgency sort, tag filter.
- Define urgency sort based on due time.
- Verify that in-progress and resolved quests do not appear in the main list.

### Phase 2 - Tag and urgency fields
- Add tag selection to Create Quest (fixed tag list + Other).
- Add due time input (deadline-based urgency).
- Ensure tags/urgency display on list cards.

### Phase 3 - My Quests screen
- Create a My Quests list with quests posted by the current user.
- Center (+) routes to My Quests; Create Quest entry lives inside My Quests.
- Show quest status and completion steps on My Quests list.

### Phase 4 - QoL states
- Empty states for Feed and My Quests.
- Inline validation and hint text in Create Quest.
- Consistent back behavior + bottom nav presence.

## Definition of done
- A new user can understand how to find a quest, claim it, and complete it in under 2 minutes.
- Feed shows only open quests and supports recency + at least one extra filter.
- My Quests cleanly separates user-created quests from the public feed.

## Notes
- Keep UI text concise and clear; no heavy microcopy.
- Use mock data only; no external APIs.

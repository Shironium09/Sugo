# Task Assignment — Lead (Feed + Completion)

## Scope 

- Build the main quest feed (hybrid list + abstract radar header).
- Build quest detail and the full completion flow.
- Keep UI clear and demo-ready.

## Tasks (detailed)

- Feed screen layout with radar header + scrollable list.
- List item UI: title, reward, location string, status pill, short teaser.
- Empty and loading states.
- Quest detail screen: full info + action buttons.
- State actions: claim, mark done, confirm resolved.
- Show mock verification and payment states in the detail view.
- Guard UI actions based on current status (disable invalid actions).

## Integration notes

- Use the quest repository API from Dev B (AsyncStorage).
- Use navigation routes from Dev C (feed as the main entry point).
- Expect local-only data and mock states (no real payment).

## Out of scope

- Real payments or live location.
- Real-time chat.

## AI handoff (short)

- Goal: build feed + completion UI in React Native.
- Data comes from local repository (no backend).
- Feed is a list with an abstract radar header.
- Completion flow uses mock verification/payment states.
- Keep it simple and stable for a demo.

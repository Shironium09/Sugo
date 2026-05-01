# Sugo QoL Finalization - Team Summary

**Date:** May 1, 2026  
**Status:** ✅ All decisions locked and specifications updated  

---

## What Changed?

All QoL (Quality of Life) polish decisions for the feed and quest lifecycle have been **finalized, documented, and locked into the main specification**. This means:

- ✅ [docs/project_specification.md](docs/project_specification.md) is now the single source of truth
- ✅ [docs/DECISION_LOG.md](docs/DECISION_LOG.md) provides detailed rationale for every decision
- ✅ All team members have clear ownership (work split is final)
- ✅ Ready to hand off to designer for vibe pass
- ✅ Ready to begin implementation

---

## One-Minute Summary

### Feed Layout
- **40/60 split:** map placeholder (top 40%) + scrollable quest list (bottom 60%)
- **Current quest pill:** expandable overlay on map area
- **Quest cards:** show title, status, reward+location, requester name/ID, description teaser

### Bottom Navigation (Persistent)
- **Left:** Quests (main feed)
- **Center:** +Create (opens My Quests screen)
- **Right:** Profile (settings stub)

### Filtering
- **Default:** Recency (newest first)
- **Optional filters:** Urgency (deadline-based), Tags (fixed list of 5)

### My Quests
- **Separate screen** accessed via center + button
- **Shows:** quests you created
- **Includes:** embedded create form

### Tags (Fixed Set)
- Printing
- Food
- Queue
- Admin
- Other

### Urgency (Deadline-Based)
- **High:** < 1 hour
- **Medium:** 1-4 hours
- **Low:** > 4 hours

---

## For Each Role

### Homer (Lead) - Feed + Completion

**Your screens:**
- HomeScreen (feed, filters, current quest pill)
- CurrentQuestScreen (detail, completion flow)
- MyQuestsScreen (user-created quests + create embedded)

**Key deliverables:**
- Quest card layout (title, status, meta, requester, teaser)
- Filter chips (Recency, Urgency, Tags)
- Current quest pill (expanded/collapsed states)
- Empty states

**Start:** Read [docs/Homer/phase-breakdown/qol-plan.md](docs/Homer/phase-breakdown/qol-plan.md) for phase breakdown.

---

### Bryce (Data) - Data Layer + Mock States

**Your components:**
- questStore (CRUD + state actions)
- Mock data seeding (5 quests)
- AsyncStorage persistence
- Urgency calculation logic

**Key deliverables:**
- questStore with CRUD operations
- Mock data with requesterName, deadline, tags, verification/payment states
- calculateUrgency() function
- AsyncStorage load/save

**Start:** [questStore.tsx](src/data/questStore.tsx) is ready for expansion.

---

### Dustin (Auth/Nav) - Auth + Navigation + Forms

**Your screens:**
- Auth flow (Login, SignUp, Verification, Landing, Welcome)
- CreateQuestScreen (form with deadline picker, tag selector)
- MyQuestsScreen (navigation)
- BottomNav (component)

**Key deliverables:**
- BottomNav component (3 tabs)
- AppNavigator (new MyQuests route + CurrentQuest param)
- CreateQuestScreen (form validation, deadline picker, tag selection)
- .edu.ph domain gate + demo bypass

**Start:** [BottomNav.tsx](src/components/BottomNav.tsx) and [AppNavigator.tsx](src/navigation/AppNavigator.tsx) are ready for refinement.

---

## Where to Find Everything

| Document | Purpose |
|----------|---------|
| [docs/project_specification.md](docs/project_specification.md) | **Central spec** - read this first |
| [docs/DECISION_LOG.md](docs/DECISION_LOG.md) | **Detailed rationale** for all 16 decisions |
| [docs/Homer/phase-breakdown/qol-plan.md](docs/Homer/phase-breakdown/qol-plan.md) | Homer's phase breakdown |
| [docs/designer-handoff.md](docs/designer-handoff.md) | Designer vibe pass checklist |
| [docs/task-assignments/Lead.md](docs/task-assignments/Lead.md) | Homer's scope |
| [docs/task-assignments/Bryce.md](docs/task-assignments/Bryce.md) | Bryce's scope |
| [docs/task-assignments/Dustin.md](docs/task-assignments/Dustin.md) | Dustin's scope |

---

## Next Steps

### Immediate (Today)

1. **Designers:** Use [docs/designer-handoff.md](docs/designer-handoff.md) to begin visual polish pass (colors, fonts, animations, icons).
2. **Homer:** Start on HomeScreen filters + My Quests layout.
3. **Bryce:** Expand questStore with new fields + mock data seeding.
4. **Dustin:** Build BottomNav + deadline picker + tag selector.

### Week 1

- Merge all screens with locked spec
- Designer vibe pass complete
- Full quest lifecycle testable (open → claim → done → resolved)
- AsyncStorage persistence working

### End of Sprint

- Booth demo ready
- No crashes after 15 min of use
- Core flow < 2 minutes to demo

---

## Key Lockdowns

🔒 **These are FINAL and should not change without explicit team sync:**

1. 40/60 feed layout
2. Bottom nav: Quests / +Create / Profile
3. My Quests as separate screen
4. Fixed tag list (5 tags only)
5. Deadline-based urgency (not manual Low/Med/High)
6. Current quest expandable pill
7. Quest card fields (title, status, meta, requester, teaser)
8. No backend (local-only MVP)
9. Zustand-like store (not Redux)
10. Three-person work split

---

## Questions?

- **Architecture / design questions:** Ask Homer
- **Data layer / store questions:** Ask Bryce
- **Auth / navigation questions:** Ask Dustin
- **All decisions:** Refer to [docs/DECISION_LOG.md](docs/DECISION_LOG.md)

---

**Status:** ✅ Ready to build. All decisions locked. Specifications frozen.

*Generated: May 1, 2026*

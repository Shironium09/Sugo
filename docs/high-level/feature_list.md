| Must Have (The MVP Core)                                                                                                                                    | Would Be Nice (The Polish)                                                                                                                                  | If Only We Have Time (The Graveyard)                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| .eduAuth Gate: Google OAuth strictly filtered to your university's domain. This is your entire security model. If they aren't a student, they don't get in. | Enhanced radar/proximity view: Optional refinement beyond the abstract radar header.                                                                        | In-App Real-Time Chat: Building WebSockets or Firebase chat sync in a week is begging for a broken demo.   |
| Chronological Quest Feed: Scrollable list of active requests with an abstract radar header (map-lite feel). Sorted by recency or urgency.                   | Deep-Link Comms: Instead of an in-app chat, a button that simply opens Messenger, Telegram, or WhatsApp using the fulfiller's provided handle.              | Gamification / EXP: Leaderboards and life points are ego-driven bloat. The reward is getting the job done. |
| Frictionless Input Form: Title, Description, Building/Room Location, and a static Reward (in PHP).                                                          | Trust Profiles: A static UI view showing the user's name, degree/program, and a dummy "Trust Rating" to show judges where itwouldlive.                      | No mock NBI or medical certificate uploads. The.eduemail handles the trust.                                |
| 3-State Transaction Engine: The database heartbeat. A task exists in only three strict states:Open,In-Progress,Resolved.                                    | One-Click Payment Routing: A dummy button that simply deep-links to the GCash app, assuming manual peer-to-peer transfer.                                   | Payment APIs: Integrating Dragonpay or GCash APIs requires business documentation you don't have.          |
| Mock Verification + Payment States: Local-only step indicators for verification and payment milestones (no real integration).                               | Verification status UI polish: badges or timeline treatment.                                                                                                | Manual verification workflows (NBI, medical certificates, age checks).                                     |

CORE FEATURES TO FLESH OUT

Quest feed: hybrid list + abstract radar header (map-lite feel).

Possible sort or filter signals:

* urgency
* exp  — life points (how much u helped ppl)
* History of tasks/side quests you contributed to

privacy ?

* Terms and conditions

  * You might die
* Verification (NBI clearance, med ce rt)

  * Age limits (>18 for the task fulfiller)
  * Manual verification of tasks

Payment process (mock only): local state update on completion; no real integration.

# ORYA Motion and Interaction Upgrade Plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Move hero motion off the React render path | HIGH | DONE |
| 002 | Rebuild the mobile menu as an accessible dialog | HIGH | DONE |
| 003 | Fix mobile platform details | HIGH | DONE |
| 004 | Polish state feedback and content cohesion | MEDIUM | DONE |

## Recommended execution order

Execute **001**, **002**, **003**, then **004**. Plan 003 depends on the state classes introduced in Plan 002 for its mobile-menu reduced-motion rules. Plan 004 should run after the shared motion tokens from Plan 003 are available.

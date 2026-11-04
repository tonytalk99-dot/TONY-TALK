# Smart Lock Website Handoff

This folder is the handoff package for the smart-lock manufacturer website.

## Workflow
1. **Gemini** supplies the approved visual designs, original page source, responsive layouts, and asset references.
2. **ChatGPT** reviews the source and design specifications, identifies gaps, and prepares the implementation plan.
3. **Codex** implements and tests the approved website.

## Directory map
- `source-code/index.html` — homepage source from Gemini.
- `source-code/products.html` — product listing source from Gemini.
- `source-code/mobile-responsive.html` — responsive/mobile source from Gemini.
- `assets/placeholders.md` — inventory of images, icons, fonts, and placeholder assets.
- `design-specifications/tokens-and-specs.md` — design tokens and component specifications.

## Import status
This repository currently contains the handoff scaffold only. The HTML files are marked as import placeholders; they are **not** the final Gemini implementation. Replace them with Gemini's actual exported source before asking Codex to build from them.

## Import instructions
1. Export/download the complete source from Gemini.
2. Preserve the approved design and interactions; do not regenerate or redesign during import.
3. Replace the corresponding files under `source-code/` with the actual exported files.
4. Copy image, icon, and font assets into `assets/` (preserve filenames and relative paths where possible).
5. Update the asset inventory and design tokens using Gemini's actual values. Mark unknown values as `TBD`; do not invent product specifications, certifications, or functionality.
6. Upload desktop and mobile full-page screenshots into `screenshots/desktop/` and `screenshots/mobile/` when available. (Create these folders when adding screenshots.)
7. Ask ChatGPT to review the complete handoff, then give the reviewed implementation brief to Codex.

## Important
- The approved Gemini output is the source of truth for visual appearance.
- Do not treat placeholder content or inferred values as approved design decisions.
- Keep desktop and mobile behavior consistent with Gemini's approved layouts.
- Do not publish product claims, certifications, prices, reviews, or technical specifications unless verified by the site owner.

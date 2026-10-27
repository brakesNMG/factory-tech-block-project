# Cottonopolis: notes for Claude Code

A school project (9th grade, Industrial Revolution museum exhibit, graded on a 30-point rubric: topic knowledge 15,
literature analysis 10, organization and engagement with an MLA Works Cited 5). The people editing this are students,
and some are not technical. Explain changes in plain English and never ask them to edit JavaScript by hand.

## Where things are
- All content is in `src/data/`: `stations.js` (8 machine exhibits), `literature.js` (Blake and Dickens), `sources.js` (MLA Works Cited).
- `CONTENT_GUIDE.md` explains the data format. Read it before editing content.
- Game code is in `src/scenes/`. Only touch it if the student asks for a feature change.

## When a student asks for a content change
- Edit only the text in `src/data/`. Keep the structure and quotes valid JavaScript (escape apostrophes as `\'`).
- Keep each lesson page under about 600 characters, quiz questions under 90 characters, options under 80, and exactly 3 options per question.
- Quote passages exactly. Do not invent facts, quotes or sources. If unsure, say so and ask the student to check.
- Works Cited entries must be real sources the student actually used. Never add one just to fill the list.
- After changes run `npm run build` to confirm it still works, and `npm run cites` if `sources.js` changed.
- The student should understand and be able to explain what they submit, so offer to explain the literature analysis rather than just rewriting it.

## Working together
- Make changes on a branch (for example `friend/edits`), commit, and open a pull request so the other student can review.
- Pull the latest `main` before starting, to avoid conflicts in `src/data/`.

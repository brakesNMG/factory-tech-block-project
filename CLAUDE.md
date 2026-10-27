# Cottonopolis: notes for Claude Code

A school project (9th grade, Industrial Revolution museum exhibit, graded on a 30-point rubric: topic knowledge 15,
literature analysis 10, organization and engagement with an MLA Works Cited 5). The people editing this are students,
and some are not technical. Explain changes in plain English and never ask them to edit JavaScript by hand.

## Where things are
- All content is plain-text Markdown in `content/`: `exhibits/*.md` (8 machine exhibits, then Blake and Dickens) and `works-cited.md`.
- `content/README.md` explains the file format. Read it before editing content. `src/data/parse.js` is the parser.
- Game code is in `src/scenes/`. Only touch it if the student asks for a feature change.

## When a student asks for a content change
- Edit only the files in `content/`. Keep the format from `content/README.md` (`## Page:`, `## Quiz`, `- [x]`). No JavaScript is needed.
- Keep each lesson page under about 600 characters, quiz questions under 90 characters, options under 80, and exactly 3 options per question.
- Quote passages exactly. Do not invent facts, quotes or sources. If unsure, say so and ask the student to check.
- Works Cited entries must be real sources the student actually used. Never add one just to fill the list.
- After changes run `npm run check` (plain-English errors), and `npm run cites` if `works-cited.md` changed.
- The student should understand and be able to explain what they submit, so offer to explain the literature analysis rather than just rewriting it.

## Working together
- Make changes on a branch (for example `friend/edits`), commit, and open a pull request so the other student can review.
- Pull the latest `main` before starting, to avoid conflicts in `content/`.

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
Two students work on this, each on their own branch, and `main` always holds the version to present.
- Each student has their own branch (for example `you/edits` and `friend/edits`). Commit and push to your own branch, never straight to `main`.
- Before starting work, bring the latest `main` into your branch (`git pull origin main`) so you are not editing an old copy.
- When a chunk of work is done and `npm run check` passes, merge your branch into `main` yourself. No review is needed. Merging on GitHub (open a pull request and click Merge) or locally both work.
- Split the exhibits between you to avoid conflicts, and do not both edit `content/works-cited.md` at the same time.
- If a merge conflict happens, resolve it by keeping both people's text where possible and explain what you did in plain English.

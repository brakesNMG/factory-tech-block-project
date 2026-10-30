# Content guide: how to edit the exhibit

## Editing (plain text, no code)

All the words live in the `content/` folder as simple text files. Read `content/README.md` for the format.

| What you want to change | File |
| --- | --- |
| A machine exhibit (lesson pages + quizzes) | `content/exhibits/01-iron.md` to `08-factoryact.md` |
| The Darwin and Carlyle literature exhibits | `content/exhibits/09-darwin.md`, `10-carlyle.md` |
| The Works Cited list | `content/works-cited.md` |

Edit a file on GitHub (pencil icon) or on your computer, then run `npm run check` for a plain-English check, and
`npm run dev` to see it in the game.

## Making the literature analysis yours

The analysis in `content/exhibits/09-darwin.md` and `10-carlyle.md` is a starting draft. Before you present it:

1. Read the full poem and the full essay, then read each analysis page and check it against the text.
2. Rewrite each technique page in your own words. Keep one quoted example per technique.
3. Add or swap a technique if you spotted something better (for Darwin: the word "flying-chariot"; for Carlyle: the capital letters on "Age" and "Machinery").
4. Be ready to explain every page out loud, because the rubric asks for *accurate* techniques.

## Works Cited

`content/works-cited.md` lists the sources in MLA 9. These are standard references on the period that the
lesson content follows, but you must check them before you hand in:

- Delete any entry you did not actually read or use.
- Add the edition, page numbers, or website access details for the copy you used.
- Keep the list alphabetical. `*Asterisks*` make italics.
- Run `npm run cites` to write `WORKS_CITED.md`, which you can paste into a document with italics intact.

## Adding or moving an exhibit

Copy an existing exhibit file into `content/exhibits/` and give it the next number. `tile: x, y` sets its position in the town
(the map is 40 by 24 tiles). `art` picks the drawing (`lectern` for a literature exhibit). The game counts exhibits automatically.

## Editing with Claude Code (no JavaScript needed)

This repo has a `CLAUDE.md` that tells Claude Code how to edit the content safely. Open the project in Claude Code and
ask in plain English, for example:

- "Rewrite the Water Frame lesson pages at a simpler reading level."
- "Add a third quiz question about the Spinning Jenny."
- "Explain the Carlyle repetition page so I can present it, then help me rewrite it in my own words."
- "Update Works Cited: I read pages 40-60 of Hudson, add that."

Each of you works on your own branch (for example `you/edits` and `friend/edits`). Before you start, bring the latest `main`
into your branch. When a chunk of work is done and `npm run check` passes, merge your branch into `main` yourself. No
review is needed. Split the exhibits between you, and don't both edit `content/works-cited.md` at the same time.

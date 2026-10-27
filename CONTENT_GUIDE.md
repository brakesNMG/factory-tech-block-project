# Content guide: how to edit the exhibit

You do not need to know how to code. All the words live in three files in `src/data/`.
Change the text between the quote marks, save, and the game updates (`npm run dev`).

| What you want to change | File |
| --- | --- |
| The 8 machine exhibits (lessons + quizzes) | `src/data/stations.js` |
| The 2 literature exhibits (Blake, Dickens) | `src/data/literature.js` |
| The Works Cited list | `src/data/sources.js` |

## Rubric map (30 points)

| Rubric row | Where it is in the game |
| --- | --- |
| Knowledge of topic (15) | Each machine has 4 pages: what it was, how it worked, why it mattered, **who paid the price**. Two quiz questions each. The ending shows the bottleneck chain. |
| Literature analysis (10) | Two exhibits: Blake's "Jerusalem" (1808) and Dickens's *Hard Times* (1854). Each has the quoted passage, 3 technique pages with examples, a link back to the machines, and a technique quiz. |
| Organization and engagement (5) | Museum framing on the title screen, placards on every exhibit, a walkable town, a pressure mini-game, a journal, and an MLA Works Cited screen (press **C**). |

## Editing a lesson

```js
pages: [
  { title: 'Short page title', text: 'First paragraph.\n\nSecond paragraph.' },
],
```

- `\n\n` makes a blank line. Put a `\` before an apostrophe inside single quotes: `Kay\'s`.
- Keep a page to about 600 characters. The game shows about 16 lines per page.
- Technique words in the literature exhibits are in CAPITALS so they stand out.

## Editing a quiz

```js
{
  q: 'The question?',
  options: ['Answer A', 'Answer B', 'Answer C'],   // always exactly 3
  answer: 1,                                         // 0 = first option, 1 = second, 2 = third
  explain: 'Shown after a correct answer.',
}
```

Keep the question under about 90 characters and each option under about 80 so they fit.

## Making the literature analysis yours

The analysis in `literature.js` is a starting draft. Before you present it:

1. Read the full poem or chapter, then read each analysis page and check it against the text.
2. Rewrite each technique page in your own words. Keep one quoted example per technique.
3. Add or swap a technique if you spotted something better (for Blake: rhythm and rhyme, the word "builded"; for Dickens: the contrast between "machinery" and "melancholy").
4. Be ready to explain every page out loud, because the rubric asks for *accurate* techniques.

## Works Cited

`src/data/sources.js` lists the sources in MLA 9. These are standard references on the period that the
lesson content follows, but you must check them before you hand in:

- Delete any entry you did not actually read or use.
- Add the edition, page numbers, or website access details for the copy you used.
- Keep the list alphabetical. `*Asterisks*` make italics.
- Run `npm run cites` to write `WORKS_CITED.md`, which you can paste into a document with italics intact.

## Adding or moving an exhibit

Copy an existing entry. `tile: [x, y]` sets its position in the town (the map is 40 by 24 tiles). `art`
picks the drawing (`lectern` for a literature exhibit). The game counts exhibits automatically.

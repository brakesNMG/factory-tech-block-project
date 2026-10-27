# Edit the exhibit text here

Every word in the game is in this folder. You do not need to code. Open a file, change the text, save.

- `exhibits/` has one file per exhibit (8 machines, then Blake and Dickens). The number at the start of the file name is the order.
- `works-cited.md` is the MLA Works Cited list.

On GitHub you can click a file, press the pencil icon, edit, and commit. To see the game with your changes, run
`npm install` once, then `npm run dev`. `npm run check` tells you in plain English if something is wrong.

## What an exhibit file looks like

```
# Flying Shuttle                        <- the exhibit's name
year: 1733                              <- details (leave the labels alone, change the words after them)
by: John Kay
summary: One sentence shown on the placard.
tile: 5, 7                              <- where it stands in the town (leave alone unless moving it)
art: shuttle                            <- which drawing to use (leave alone)

## Page: Weaving before the shuttle     <- one lesson page. The title goes after "Page:"
Write the page here. Leave a blank line to start a new paragraph.
Do not press Enter in the middle of a sentence to make it fit; the game wraps lines for you.

## Page: Another page
More text.

## Quiz                                 <- one quiz question
Q: What problem did the Flying Shuttle solve?
- [ ] A wrong answer
- [x] The right answer (put an x in the box)
- [ ] Another wrong answer
Explain: Shown after the player gets it right.
```

## Rules
- Each quiz needs exactly **3** answers and exactly one `[x]`.
- Add as many `## Page:` sections as you like. About 600 characters per page fits on screen.
- Keep quiz questions under about 90 characters and answers under about 80.
- To add a quiz question, add another `## Quiz` section. To remove a page, delete its `## Page:` section.
- Technique words in the literature exhibits are in CAPITALS on purpose, so they stand out.
- Quote passages exactly, and only list sources in `works-cited.md` that you really used.

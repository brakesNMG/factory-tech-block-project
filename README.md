# Cottonopolis: A Tale of Steam & Spindles

A pixel-art educational game built with [Phaser 3](https://phaser.io) about factory technology in the
**First Industrial Revolution** (Britain, 1709-1834).

Built as a school museum exhibit. Walk the fictional Lancashire mill town of Millbrook (1834), visit eight
real inventions and two literature exhibits (Erasmus Darwin's steam poem and Thomas Carlyle's "Signs of the Times"), read short
lessons that include the human cost of each technology, try a hands-on activity, and pass quizzes to fill in
your journal. A Works Cited screen (MLA 9) is built in. **To edit the content, read `CONTENT_GUIDE.md`.**

| Station | Year | Idea taught |
| --- | --- | --- |
| Coke & Iron | 1709 / 1783 | Why coal-based ironmaking and puddling mattered |
| Flying Shuttle | 1733 | Solving one bottleneck exposes the next |
| Spinning Jenny | 1764 | Multi-spindle hand spinning |
| Water Frame | 1769 | Water power and the first factories |
| Steam Engine | 1776 | Watt's separate condenser, power anywhere (**pressure mini-game**) |
| Power Loom | 1785 | Mechanised weaving and its social cost |
| Locomotive | 1829 | Rocket and the Liverpool & Manchester Railway |
| Factory Notice | 1833 | The Factory Act and the first inspectors |
| Darwin: Steam Poem | 1791 | Literature: personification, prediction, rhyme, alliteration, tone |
| Carlyle: Mechanical Age | 1829 | Literature: a list and a reveal, double meaning, repetition, tone |

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in docs/ (commit it; GitHub Pages serves it)
```

Controls: **WASD / arrows** walk, **E / Space** examine, **J** journal, **C** works cited, **M** mute, **Esc** closes a lesson.
Progress is saved in `localStorage` (press **R** on the title screen to reset).

## Playing it online

GitHub Pages serves the built game from the `docs/` folder on `main` (repo Settings, Pages, Deploy from a branch,
`main`, `/docs`). After changing any text in `content/`, run `npm run build` and commit the updated `docs/` folder,
then merge into `main`. The live link is `https://<github-user>.github.io/factory-tech-block-project/`.

## How it is put together

- **No image files.** All pixel art is drawn in code at startup (`src/art/`) from one shared palette, so
  everything stays cohesive and easy to tweak. Tiles are 16x16; the game renders at 640x360 and scales up
  with nearest-neighbour filtering.
- `content/` holds **all the text** as plain Markdown files (lessons, quizzes, literature, Works Cited). Edit these to change the teaching (see `content/README.md`).
- `src/scenes/`: `Boot` (generates art) -> `Menu` -> `Town` (+ `HUD`) with `Lesson`, `Journal` and `Ending` overlays.
- Sound effects are synthesized with WebAudio (`src/util/sfx.js`).

## Adding a new station

1. Draw its machine in `src/art/machines.js` (and add its size to `MACHINE_SIZE`).
2. Add a new file in `content/exhibits/` (set `tile` to a free spot in the town; see `content/README.md`).
3. Optional: give it an `activity` and add a builder to `src/scenes/Lesson.js` (see the steam engine).

## Further reading

Lesson content follows standard histories of the period. To go deeper, visit Cromford Mill, the Ironbridge
Gorge museums, or the Science and Industry Museum in Manchester, or read their online collections.

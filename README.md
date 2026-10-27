# Cottonopolis: A Tale of Steam & Spindles

A pixel-art educational game built with [Phaser 3](https://phaser.io) about factory technology in the
**First Industrial Revolution** (Britain, 1709-1834).

You are an apprentice in the fictional Lancashire mill town of Millbrook, 1834. Walk the town, examine
eight real inventions, read short lessons, try a hands-on activity, and pass a quiz to fill in your
engineer's journal.

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

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

Controls: **WASD / arrows** walk, **E / Space** examine, **J** journal, **M** mute, **Esc** closes a lesson.
Progress is saved in `localStorage` (press **R** on the title screen to reset).

## How it is put together

- **No image files.** All pixel art is drawn in code at startup (`src/art/`) from one shared palette, so
  everything stays cohesive and easy to tweak. Tiles are 16x16; the game renders at 640x360 and scales up
  with nearest-neighbour filtering.
- `src/data/stations.js` holds **all lesson content** (pages, quiz, dates). Edit this to change the teaching.
- `src/scenes/`: `Boot` (generates art) -> `Menu` -> `Town` (+ `HUD`) with `Lesson`, `Journal` and `Ending` overlays.
- Sound effects are synthesized with WebAudio (`src/util/sfx.js`).

## Adding a new station

1. Draw its machine in `src/art/machines.js` (and add its size to `MACHINE_SIZE`).
2. Add an entry to `STATIONS` in `src/data/stations.js` (set `tile` to a free spot in the town).
3. Optional: give it an `activity` and add a builder to `src/scenes/Lesson.js` (see the steam engine).

## Further reading

Lesson content follows standard histories of the period. To go deeper, visit Cromford Mill, the Ironbridge
Gorge museums, or the Science and Industry Museum in Manchester, or read their online collections.

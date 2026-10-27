import { PAL, R, disc, makeTexture, rng } from './palette.js';
import { MACHINES, MACHINE_SIZE } from './machines.js';

const T = 16; // tile size

// ---------- hand-authored sprites (one hex character per pixel, '.' = transparent) ----------
// 0-f / r s w n t refer to PAL in palette.js.
const PLAYER = {
  down: [
    '................',
    '.....000000.....',
    '....02222220....',
    '...0222222220...',
    '...0000000000...',
    '....04444440....',
    '....04044040....',
    '....04444440....',
    '.....000000.....',
    '...0999999990...',
    '..04099999940...',
    '..04099999940...',
    '...0099999900...',
    '....0ffffff0....',
    '....0ff00ff0....',
    '....000..000....',
  ],
  up: [
    '................',
    '.....000000.....',
    '....02222220....',
    '...0222222220...',
    '...0222222220...',
    '....02222220....',
    '....02222220....',
    '....04444440....',
    '.....000000.....',
    '...0999999990...',
    '..04099999940...',
    '..04099999940...',
    '...0099999900...',
    '....0ffffff0....',
    '....0ff00ff0....',
    '....000..000....',
  ],
  side: [
    '................',
    '.....000000.....',
    '....02222220....',
    '...0222222220...',
    '...0000000000...',
    '....04444440....',
    '....04444040....',
    '....04444440....',
    '.....000000.....',
    '....09999990....',
    '....04099940....',
    '....04099940....',
    '....00999900....',
    '.....0ffff0.....',
    '.....0ffff0.....',
    '.....00000......',
  ],
};

function drawRows(ctx, rows) {
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch !== '.') R(ctx, ch, x, y);
    });
  });
}

// ---------- procedural tiles ----------
function grassTile(seed) {
  return (ctx) => {
    R(ctx, '6', 0, 0, T, T);
    const r = rng(seed);
    for (let i = 0; i < 14; i++) R(ctx, r() > 0.5 ? '5' : '7', Math.floor(r() * T), Math.floor(r() * T), 1, 1);
    for (let i = 0; i < 3; i++) {
      const x = Math.floor(r() * 13) + 1, y = Math.floor(r() * 13) + 1;
      R(ctx, '5', x, y, 1, 2);
    }
  };
}

function cobbleTile(seed) {
  return (ctx) => {
    R(ctx, 'e', 0, 0, T, T);
    const r = rng(seed);
    // staggered cobbles
    for (let row = 0; row < 4; row++) {
      const off = row % 2 ? 4 : 0;
      for (let col = -1; col < 3; col++) {
        const x = col * 8 + off, y = row * 4;
        R(ctx, r() > 0.5 ? 'd' : 'e', x + 1, y + 1, 6, 2);
        R(ctx, 'f', x, y + 3, 8, 1);
        R(ctx, 'f', x + 7, y, 1, 4);
      }
    }
    // pixels outside 0..15 wrap fine because canvas clips
  };
}

function dirtTile(seed) {
  return (ctx) => {
    R(ctx, 't', 0, 0, T, T);
    const r = rng(seed);
    for (let i = 0; i < 16; i++) R(ctx, r() > 0.5 ? 'w' : 'd', Math.floor(r() * T), Math.floor(r() * T), 1, 1);
  };
}

function waterTile(frame) {
  return (ctx) => {
    R(ctx, '9', 0, 0, T, T);
    const r = rng(77);
    for (let i = 0; i < 6; i++) {
      const x = Math.floor(r() * 12), y = Math.floor(r() * 14);
      const sx = (x + frame * 3) % 13;
      R(ctx, 'a', sx, y, 4, 1);
      R(ctx, 'b', sx + 1, y, 1, 1);
    }
  };
}

function bridgeTile(ctx) {
  R(ctx, 'w', 0, 0, T, T);
  for (let y = 0; y < T; y += 4) { R(ctx, 'n', 0, y + 3, T, 1); R(ctx, 't', 0, y, T, 1); }
  R(ctx, 'n', 0, 0, T, 1); R(ctx, 'n', 0, 15, T, 1);
}

function trackTile(ctx) {
  R(ctx, 't', 0, 0, T, T);
  for (let x = 1; x < T; x += 5) R(ctx, 'n', x, 1, 3, 14);      // sleepers
  R(ctx, 'e', 0, 3, T, 2); R(ctx, 'd', 0, 3, T, 1);             // rails
  R(ctx, 'e', 0, 11, T, 2); R(ctx, 'd', 0, 11, T, 1);
}

function fenceTile(ctx) {
  R(ctx, 'w', 1, 6, 14, 2); R(ctx, 'w', 1, 11, 14, 2);
  R(ctx, 'n', 1, 5, 2, 10); R(ctx, 'n', 13, 5, 2, 10);
  R(ctx, 't', 1, 5, 2, 1); R(ctx, 't', 13, 5, 2, 1);
}

function crateTile(ctx) {
  R(ctx, '0', 1, 3, 14, 13); R(ctx, 'w', 2, 4, 12, 11);
  R(ctx, 'n', 2, 9, 12, 1); R(ctx, 'n', 7, 4, 2, 11); R(ctx, 't', 2, 4, 12, 1);
}

function barrelTile(ctx) {
  R(ctx, '0', 3, 2, 10, 14); R(ctx, 'w', 4, 3, 8, 12);
  R(ctx, 'n', 3, 5, 10, 1); R(ctx, 'n', 3, 12, 10, 1); R(ctx, 't', 5, 3, 2, 12);
}

function bush(ctx) {
  disc(ctx, '0', 8, 10, 7); disc(ctx, '7', 8, 10, 6);
  disc(ctx, '6', 6, 8, 3); disc(ctx, '5', 5, 7, 1);
}

function tree(ctx) {
  R(ctx, 'n', 7, 14, 3, 10); R(ctx, '0', 6, 14, 1, 10); R(ctx, '0', 10, 14, 1, 10);
  disc(ctx, '0', 8, 9, 9); disc(ctx, '7', 8, 9, 8);
  disc(ctx, '6', 6, 7, 5); disc(ctx, '5', 5, 5, 2);
}

// ---------- buildings ----------
function building(tw, th, { roof = 'e', wall = 'r', chimneys = [], door = true, windows = true, mill = false } = {}) {
  return (ctx, W, H) => {
    const roofH = mill ? 16 : 14;
    // wall
    R(ctx, '0', 0, roofH - 2, W, H - roofH + 2);
    R(ctx, wall, 1, roofH - 1, W - 2, H - roofH);
    for (let y = roofH; y < H; y += 4) {
      R(ctx, wall === 'r' ? 's' : 'f', 1, y + 3, W - 2, 1);
      for (let x = (y / 4) % 2 ? 2 : 6; x < W - 1; x += 8) R(ctx, wall === 'r' ? 's' : 'f', x, y, 1, 3);
    }
    // roof
    R(ctx, '0', 0, 0, W, roofH);
    R(ctx, roof, 1, 1, W - 2, roofH - 3);
    for (let y = 3; y < roofH - 2; y += 3) R(ctx, roof === 'e' ? 'f' : '1', 1, y, W - 2, 1);
    R(ctx, 'd', 1, 1, W - 2, 1);
    // windows
    if (windows) {
      const cols = Math.max(1, tw - 1);
      const rows = th > 3 ? 2 : 1;
      for (let rr = 0; rr < rows; rr++) {
        for (let c = 0; c < cols; c++) {
          const cx = Math.floor(((c + 0.5) * W) / cols);
          const y = roofH + 3 + rr * 14;
          if (y + 10 > H - 2) continue;
          if (door && rr === rows - 1 && Math.abs(cx - W / 2) < 10) continue; // leave room for the door
          const x = cx - 4;
          R(ctx, '0', x - 1, y - 1, 10, 11); R(ctx, 'a', x, y, 8, 9);
          R(ctx, 'b', x + 1, y + 1, 2, 3); R(ctx, '0', x + 4, y, 1, 9); R(ctx, '0', x, y + 4, 8, 1);
        }
      }
    }
    if (door) {
      const dx = Math.floor(W / 2) - 4;
      R(ctx, '0', dx - 1, H - 14, 10, 14); R(ctx, 'n', dx, H - 13, 8, 13); R(ctx, 'w', dx + 1, H - 12, 3, 11);
      R(ctx, '4', dx + 6, H - 7, 1, 2);
    }
    // chimneys sit on the roof
    chimneys.forEach((cx) => { R(ctx, '0', cx - 1, 0, 8, 6); R(ctx, 'r', cx, 0, 6, 5); R(ctx, 's', cx, 0, 6, 1); });
  };
}

// ---------- title/menu backdrop pieces ----------
function chimneyTower(ctx) {
  for (let y = 0; y < 64; y++) {
    const half = 3 + Math.floor(y / 16);
    R(ctx, y % 6 < 3 ? 'r' : 's', 8 - half, y, half * 2, 1);
    R(ctx, '0', 8 - half, y, 1, 1); R(ctx, '0', 8 + half - 1, y, 1, 1);
  }
  R(ctx, '0', 4, 0, 8, 2);
}

function smokePuff(ctx) {
  disc(ctx, 'd', 4, 4, 3); R(ctx, 'c', 2, 2, 2, 1); R(ctx, 'c', 2, 3, 1, 1);
}

function sparkle(ctx) {
  R(ctx, '4', 3, 0, 1, 7); R(ctx, '4', 0, 3, 7, 1); R(ctx, 'c', 3, 3, 1, 1);
}

function marker(ctx) {
  R(ctx, '0', 1, 0, 5, 9); R(ctx, '4', 2, 1, 3, 7);
  R(ctx, '0', 1, 10, 5, 4); R(ctx, '4', 2, 11, 3, 2);
  R(ctx, 'c', 2, 1, 1, 5);
}

function cursor(ctx) {
  R(ctx, '4', 0, 0, 2, 7); R(ctx, '4', 2, 1, 2, 5); R(ctx, '4', 4, 2, 2, 3); R(ctx, '4', 6, 3, 1, 1);
}

function stationGlow(ctx, w, h) {
  // soft pixel-art "pad" under each station: a dithered ring of light
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (x - w / 2) / (w / 2), dy = (y - h / 2) / (h / 2);
      const d = dx * dx + dy * dy;
      if (d < 1 && d > 0.7 && (x + y) % 2 === 0) R(ctx, '4', x, y);
      else if (d <= 0.7 && (x + y) % 4 === 0) R(ctx, '3', x, y);
    }
  }
}

export function generateAllArt(scene) {
  Object.entries(PLAYER).forEach(([k, rows]) => makeTexture(scene, `player_${k}`, 16, 16, (c) => drawRows(c, rows)));

  makeTexture(scene, 'grass1', T, T, grassTile(11));
  makeTexture(scene, 'grass2', T, T, grassTile(23));
  makeTexture(scene, 'grass3', T, T, grassTile(37));
  makeTexture(scene, 'cobble1', T, T, cobbleTile(5));
  makeTexture(scene, 'cobble2', T, T, cobbleTile(9));
  makeTexture(scene, 'dirt', T, T, dirtTile(3));
  makeTexture(scene, 'water0', T, T, waterTile(0));
  makeTexture(scene, 'water1', T, T, waterTile(1));
  makeTexture(scene, 'bridge', T, T, bridgeTile);
  makeTexture(scene, 'track', T, T, trackTile);
  makeTexture(scene, 'fence', T, T, fenceTile);
  makeTexture(scene, 'crate', T, T, crateTile);
  makeTexture(scene, 'barrel', T, T, barrelTile);
  makeTexture(scene, 'bush', T, T, bush);
  makeTexture(scene, 'tree', T, 24, tree);

  makeTexture(scene, 'house_a', 4 * T, 4 * T, building(4, 4, { roof: 'e', chimneys: [8] }));
  makeTexture(scene, 'house_b', 3 * T, 3 * T, building(3, 3, { roof: '2', chimneys: [34] }));
  makeTexture(scene, 'house_c', 3 * T, 3 * T, building(3, 3, { roof: 'e', wall: 'r', chimneys: [8] }));
  makeTexture(scene, 'mill', 7 * T, 5 * T, building(7, 5, { roof: 'e', mill: true, chimneys: [] }));
  makeTexture(scene, 'chimney', 16, 64, chimneyTower);
  makeTexture(scene, 'smoke', 8, 8, smokePuff);
  makeTexture(scene, 'sparkle', 7, 7, sparkle);
  makeTexture(scene, 'marker', 7, 14, marker);
  makeTexture(scene, 'cursor', 7, 7, cursor);
  makeTexture(scene, 'glow', 40, 20, (c) => stationGlow(c, 40, 20));

  Object.entries(MACHINES).forEach(([k, fn]) => {
    const [w, h] = MACHINE_SIZE[k];
    makeTexture(scene, `machine_${k}`, w, h, (c) => fn(c));
  });
}

export { PAL };

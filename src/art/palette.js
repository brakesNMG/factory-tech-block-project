// A single shared palette keeps all the pixel art cohesive.
// Based on the Sweetie-16 palette, plus brick, wood and soot tones for the period.
export const PAL = {
  0: '#1a1c2c', // near-black outline
  1: '#5d275d', // plum
  2: '#b13e53', // red
  3: '#ef7d57', // orange
  4: '#ffcd75', // yellow / skin
  5: '#a7f070', // light green
  6: '#38b764', // green
  7: '#257179', // teal
  8: '#29366f', // navy
  9: '#3b5dc9', // blue
  a: '#41a6f6', // sky blue
  b: '#73eff7', // cyan
  c: '#f4f4f4', // white
  d: '#94b0c2', // light grey
  e: '#566c86', // mid grey
  f: '#333c57', // dark grey
  r: '#8e3b2f', // brick
  s: '#6b2a24', // dark brick
  w: '#9b6a3a', // wood
  n: '#5c3b20', // dark wood
  t: '#c9a36b', // straw / light wood
};

export const hex = (c) => parseInt(PAL[c].slice(1), 16);

// ---- tiny drawing helpers working on a 2D canvas context, 1 unit = 1 pixel ----

export function R(ctx, c, x, y, w = 1, h = 1) {
  ctx.fillStyle = PAL[c];
  ctx.fillRect(x, y, w, h);
}

export function disc(ctx, c, cx, cy, r) {
  ctx.fillStyle = PAL[c];
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      if (x * x + y * y <= r * r + r * 0.6) ctx.fillRect(cx + x, cy + y, 1, 1);
    }
  }
}

export function ring(ctx, c, cx, cy, r, t = 1) {
  ctx.fillStyle = PAL[c];
  const inner = (r - t) * (r - t);
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      const d = x * x + y * y;
      if (d <= r * r + r * 0.6 && d >= inner) ctx.fillRect(cx + x, cy + y, 1, 1);
    }
  }
}

export function line(ctx, c, x0, y0, x1, y1) {
  ctx.fillStyle = PAL[c];
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  for (;;) {
    ctx.fillRect(x0, y0, 1, 1);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
}

// Deterministic pseudo-random so the generated art is identical every run.
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Create a crisp canvas texture of w*h pixels and draw into it.
export function makeTexture(scene, key, w, h, draw) {
  if (scene.textures.exists(key)) scene.textures.remove(key);
  const tex = scene.textures.createCanvas(key, w, h);
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;
  draw(ctx, w, h);
  tex.refresh();
  return tex;
}

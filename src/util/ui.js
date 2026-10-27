import { PAL } from '../art/palette.js';

export const FONT = '"Press Start 2P", monospace';
export const W = 640;
export const H = 360;

export const COLORS = {
  ink: PAL[0], panel: '#1f2238', edge: PAL.e, light: PAL.c, gold: PAL[4],
  good: PAL[5], bad: PAL[3], mute: PAL.d,
};

// Pixel-font text with sensible defaults. `wrap` is in pixels.
export function txt(scene, x, y, str, { size = 8, color = COLORS.light, wrap, align = 'left', spacing = 4, origin = [0, 0], shadow = true } = {}) {
  const t = scene.add.text(x, y, str, {
    fontFamily: FONT,
    fontSize: `${size}px`,
    color,
    align,
    lineSpacing: spacing,
    wordWrap: wrap ? { width: wrap, useAdvancedWrap: true } : undefined,
  });
  t.setOrigin(origin[0], origin[1]);
  if (shadow) t.setShadow(1, 1, PAL[0], 0, false, true);
  return t;
}

// A chunky pixel-art panel: dark outline, light bevel, dark fill.
export function panel(scene, x, y, w, h, fill = COLORS.panel) {
  const g = scene.add.graphics();
  g.fillStyle(0x1a1c2c, 1).fillRect(x, y, w, h);
  g.fillStyle(0x566c86, 1).fillRect(x + 1, y + 1, w - 2, h - 2);
  g.fillStyle(0x333c57, 1).fillRect(x + 3, y + 3, w - 6, h - 6);
  g.fillStyle(parseInt(fill.slice(1), 16), 1).fillRect(x + 4, y + 4, w - 8, h - 8);
  // notch the corners for a pixel-art feel
  g.fillStyle(0x1a1c2c, 1);
  [[x, y], [x + w - 2, y], [x, y + h - 2], [x + w - 2, y + h - 2]].forEach(([cx, cy]) => g.fillRect(cx, cy, 2, 2));
  return g;
}

// A button: returns a container with `.setActive`. Hit area is the rectangle.
export function button(scene, x, y, w, h, label, onClick, { color = COLORS.gold } = {}) {
  const g = scene.add.graphics();
  const t = txt(scene, x + w / 2, y + h / 2 + 1, label, { color: COLORS.ink, origin: [0.5, 0.5], shadow: false });
  const draw = (hover) => {
    g.clear();
    g.fillStyle(0x1a1c2c, 1).fillRect(x, y, w, h);
    g.fillStyle(hover ? 0xffffff : parseInt(color.slice(1), 16), 1).fillRect(x + 1, y + 1, w - 2, h - 2);
    g.fillStyle(0x000000, 0.2).fillRect(x + 1, y + h - 3, w - 2, 2);
  };
  draw(false);
  const zone = scene.add.zone(x, y, w, h).setOrigin(0).setInteractive({ useHandCursor: true });
  zone.on('pointerover', () => draw(true));
  zone.on('pointerout', () => draw(false));
  zone.on('pointerdown', onClick);
  const c = scene.add.container(0, 0, [g, t, zone]);
  return c;
}

import Phaser from 'phaser';
import { SOURCES } from '../data/sources.js';
import { txt, panel, COLORS, W, H } from '../util/ui.js';
import { sfx } from '../util/sfx.js';

const X = 40;
const WRAP = 548;
const TOP = 62;
const BOTTOM = 314;

// The museum's Works Cited screen (MLA), opened with C from the title screen or the town.
export default class Sources extends Phaser.Scene {
  constructor() { super('Sources'); }

  init(data) { this.from = data?.from || 'town'; }

  create() {
    this.openedAt = this.time.now;
    this.add.rectangle(0, 0, W, H, 0x0e0f1a, 0.85).setOrigin(0).setInteractive();
    panel(this, 20, 12, 600, 336);
    txt(this, 36, 24, 'WORKS CITED', { size: 16, color: COLORS.gold });
    txt(this, 604, 28, 'MLA 9', { color: COLORS.mute, origin: [1, 0] });
    this.add.rectangle(36, 46, 568, 2, 0x566c86).setOrigin(0);

    // lay the entries out onto pages that fit the panel
    this.pages = [[]];
    let y = TOP;
    SOURCES.forEach((s) => {
      const t = txt(this, X, y, s.mla.replace(/\*/g, ''), { wrap: WRAP, spacing: 5 });
      if (y + t.height > BOTTOM && this.pages[this.pages.length - 1].length) {
        this.pages.push([]);
        y = TOP;
        t.setY(y);
      }
      t.setVisible(false);
      this.pages[this.pages.length - 1].push(t);
      y += t.height + 8;
    });

    this.pageLabel = txt(this, W / 2, 330, '', { color: COLORS.mute, origin: [0.5, 0] });
    this.idx = 0;
    this.show();

    const kb = this.input.keyboard;
    kb.on('keydown-RIGHT', () => this.turn(1));
    kb.on('keydown-LEFT', () => this.turn(-1));
    kb.on('keydown-DOWN', () => this.turn(1));
    kb.on('keydown-UP', () => this.turn(-1));
    ['ESC', 'C', 'SPACE', 'ENTER'].forEach((k) => kb.on(`keydown-${k}`, () => this.close()));
    this.input.on('pointerdown', () => (this.idx < this.pages.length - 1 ? this.turn(1) : this.close()));
  }

  turn(d) {
    const n = this.idx + d;
    if (n < 0 || n >= this.pages.length) return;
    sfx.page();
    this.idx = n;
    this.show();
  }

  show() {
    this.pages.forEach((p, i) => p.forEach((t) => t.setVisible(i === this.idx)));
    this.pageLabel.setText(`< ${this.idx + 1} / ${this.pages.length} >    ESC or C to close`);
  }

  close() {
    if (this.time.now - this.openedAt < 200) return;
    if (this.from === 'menu') this.scene.resume('Menu');
    else this.game.events.emit('lessonClosed', {});
    this.scene.stop();
  }
}

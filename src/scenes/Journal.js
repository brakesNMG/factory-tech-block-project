import Phaser from 'phaser';
import { STATIONS } from '../data/stations.js';
import { txt, panel, COLORS, W, H } from '../util/ui.js';
import { progress } from '../util/state.js';
import { sfx } from '../util/sfx.js';

// The engineer's journal: a timeline of every invention, filled in as you learn it.
export default class Journal extends Phaser.Scene {
  constructor() { super('Journal'); }

  create() {
    this.entries = [...STATIONS].sort((a, b) => a.year - b.year);
    this.sel = 0;
    this.openedAt = this.time.now;
    this.add.rectangle(0, 0, W, H, 0x0e0f1a, 0.78).setOrigin(0).setInteractive();
    panel(this, 20, 12, 600, 336);
    txt(this, 36, 24, "ENGINEER'S JOURNAL", { size: 16, color: COLORS.gold });
    txt(this, 604, 28, `${progress.count()}/${STATIONS.length} learned`, { color: COLORS.good, origin: [1, 0] });
    this.add.rectangle(36, 46, 568, 2, 0x566c86).setOrigin(0);

    this.listG = this.add.graphics();
    this.rows = this.entries.map((e, i) => {
      const y = 56 + i * 27;
      const done = progress.has(e.id);
      const t = txt(this, 46, y + 3, done ? `${e.year}\n${e.name}` : '????  ???', { color: done ? COLORS.light : COLORS.mute, spacing: 1 });
      const z = this.add.zone(36, y, 190, 25).setOrigin(0).setInteractive({ useHandCursor: true });
      z.on('pointerdown', () => { this.sel = i; this.render(); sfx.blip(); });
      return { t, y };
    });
    this.detail = this.add.container(0, 0);

    txt(this, 36, 334, 'UP/DOWN browse    J or ESC close', { color: COLORS.mute });
    const kb = this.input.keyboard;
    kb.on('keydown-UP', () => { this.sel = (this.sel + this.entries.length - 1) % this.entries.length; sfx.blip(); this.render(); });
    kb.on('keydown-DOWN', () => { this.sel = (this.sel + 1) % this.entries.length; sfx.blip(); this.render(); });
    ['ESC', 'J'].forEach((k) => kb.on(`keydown-${k}`, () => this.close()));
    this.render();
  }

  render() {
    this.listG.clear();
    this.rows.forEach((r, i) => {
      const sel = i === this.sel;
      this.listG.fillStyle(0x1a1c2c, 1).fillRect(36, r.y, 190, 25);
      this.listG.fillStyle(sel ? 0xffcd75 : 0x333c57, 1).fillRect(37, r.y + 1, 188, 23);
      this.listG.fillStyle(sel ? 0x29366f : 0x1f2238, 1).fillRect(39, r.y + 3, 184, 19);
      if (progress.has(this.entries[i].id)) this.listG.fillStyle(0xa7f070, 1).fillRect(210, r.y + 9, 8, 8);
    });
    this.detail.removeAll(true);
    const e = this.entries[this.sel];
    const done = progress.has(e.id);
    const x = 250, w = 354;
    if (!done) {
      this.detail.add([
        txt(this, x, 64, '???', { size: 16, color: COLORS.mute }),
        txt(this, x, 96, 'You have not studied this invention yet.\n\nWalk Millbrook and look for the bobbing ! markers. Stand next to a machine and press E.', { wrap: w, spacing: 6, color: COLORS.mute }),
      ]);
      return;
    }
    this.detail.add([
      txt(this, x, 60, e.name, { size: 16 }),
      txt(this, x, 84, `${e.year}  -  ${e.inventor}`, { color: COLORS.gold, wrap: w }),
      txt(this, x, 112, e.summary, { wrap: w, spacing: 6 }),
      txt(this, x, 172, 'REMEMBER', { color: COLORS.good }),
      txt(this, x, 186, e.quiz.map((q) => q.explain).join('\n\n'), { wrap: w, spacing: 6, color: COLORS.mute }),
    ]);
  }

  close() {
    if (this.time.now - this.openedAt < 150) return;
    this.game.events.emit('lessonClosed', {});
    this.scene.stop();
  }
}

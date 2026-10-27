import Phaser from 'phaser';
import { txt, panel, COLORS, W, H } from '../util/ui.js';
import { sfx } from '../util/sfx.js';

const CHAIN = [
  ['1709', 'Coke smelting: cheap iron for machines'],
  ['1733', 'Flying shuttle: weaving speeds up...'],
  ['1764', '...so spinners need the Spinning Jenny'],
  ['1769', 'Water frame: strong thread, first factories'],
  ['1776', 'Watt engine: mills can stand anywhere'],
  ['1785', 'Power loom: weaving catches up'],
  ['1829', 'Rocket: steam moves goods and people'],
  ['1833', 'Factory Act: the first limits on child labour'],
];

export default class Ending extends Phaser.Scene {
  constructor() { super('Ending'); }

  create() {
    this.openedAt = this.time.now;
    sfx.win();
    this.add.rectangle(0, 0, W, H, 0x0e0f1a, 0.85).setOrigin(0).setInteractive();
    panel(this, 30, 12, 580, 336);
    txt(this, W / 2, 26, 'MASTER ENGINEER!', { size: 16, color: COLORS.gold, origin: [0.5, 0] });
    txt(this, W / 2, 50, 'Each invention solved one bottleneck and exposed the next.', { color: COLORS.mute, origin: [0.5, 0] });
    CHAIN.forEach(([y, t], i) => {
      txt(this, 56, 78 + i * 20, y, { color: COLORS.gold });
      txt(this, 104, 78 + i * 20, t);
    });
    txt(this, 56, 246, 'SEE IT FOR REAL', { color: COLORS.good });
    txt(this, 56, 260, 'Cromford Mill (Derbyshire)  -  Ironbridge Gorge (Shropshire)\nScience and Industry Museum (Manchester)', { color: COLORS.mute, spacing: 6, wrap: 520 });
    const p = txt(this, W / 2, 316, 'PRESS SPACE TO KEEP EXPLORING', { origin: [0.5, 0] });
    this.tweens.add({ targets: p, alpha: 0.25, yoyo: true, repeat: -1, duration: 600 });
    const done = () => {
      if (this.time.now - this.openedAt < 400) return;
      this.game.events.emit('lessonClosed', {});
      this.scene.stop();
    };
    this.input.keyboard.on('keydown-SPACE', done);
    this.input.keyboard.on('keydown-ENTER', done);
    this.input.keyboard.on('keydown-ESC', done);
    this.input.on('pointerdown', done);
  }
}

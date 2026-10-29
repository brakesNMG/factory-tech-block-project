import Phaser from 'phaser';
import { txt, panel, COLORS, W, H } from '../util/ui.js';
import { progress } from '../util/state.js';
import { STATIONS } from '../data/stations.js';
import { sfx } from '../util/sfx.js';

const STORY =
  'WELCOME TO THE COTTONOPOLIS MUSEUM OF FACTORY TECHNOLOGY\n\n' +
  'This exhibit is set in Millbrook, Lancashire, 1834: a village of cottage weavers that became a mill town.\n\n' +
  'Visit 8 machine exhibits. Learn how each invention worked, who it helped, ' +
  'and who paid the price. Big idea: each invention solved one problem and created the next.';

export default class Menu extends Phaser.Scene {
  constructor() { super('Menu'); }

  create() {
    this.step = 0;
    this.drawSky();

    this.title = this.add.container(0, 0);
    const t1 = txt(this, W / 2, 62, 'COTTONOPOLIS', { size: 32, color: COLORS.gold, origin: [0.5, 0] });
    const t2 = txt(this, W / 2, 106, 'Museum of Factory Technology', { size: 8, color: COLORS.light, origin: [0.5, 0] });
    const t3 = txt(this, W / 2, 122, 'A Tale of Steam & Spindles  -  Britain, 1709-1834', { size: 8, color: COLORS.mute, origin: [0.5, 0] });
    const pbox = panel(this, W / 2 - 130, 176, 260, 26);
    this.prompt = txt(this, W / 2, 185, 'PRESS SPACE OR CLICK TO BEGIN', { size: 8, color: COLORS.light, origin: [0.5, 0] });
    this.tweens.add({ targets: this.prompt, alpha: 0.2, yoyo: true, repeat: -1, duration: 600 });
    const t4 = txt(this, W / 2, 148, 'Press C for Works Cited', { size: 8, color: COLORS.mute, origin: [0.5, 0] });
    this.title.add([t1, t2, t3, t4, pbox, this.prompt]);

    if (progress.count() > 0) {
      this.saved = txt(this, W / 2, 214, `Saved progress: ${progress.count()}/${STATIONS.length} inventions learned\nPress R to start over`, { size: 8, color: COLORS.good, origin: [0.5, 0], align: 'center' });
    }

    this.storyBox = this.add.container(0, 0).setVisible(false);
    this.storyBox.add([
      panel(this, 60, 40, W - 120, 280),
      txt(this, 84, 62, STORY, { wrap: W - 168, spacing: 6 }),
      txt(this, 84, 196,
        'HOW TO PLAY\n' +
        'Arrows / WASD ... walk\n' +
        'E or SPACE ...... examine a machine\n' +
        'J ............... open your journal\n' +
        'C ............... works cited (sources)\n' +
        'M ............... mute sound', { color: COLORS.gold, spacing: 6 }),
      txt(this, W / 2, 298, 'PRESS SPACE TO ENTER THE MUSEUM', { color: COLORS.good, origin: [0.5, 0] }),
    ]);

    this.input.keyboard.on('keydown-SPACE', () => this.next());
    this.input.keyboard.on('keydown-ENTER', () => this.next());
    this.input.on('pointerdown', () => this.next());
    this.input.keyboard.on('keydown-C', () => {
      if (this.scene.isPaused()) return;
      sfx.open();
      this.scene.pause();
      this.scene.launch('Sources', { from: 'menu' });
    });
    this.input.keyboard.on('keydown-R', () => {
      if (this.step === 0 && progress.count() > 0) { progress.reset(); this.scene.restart(); }
    });
  }

  next() {
    sfx.open();
    if (this.step === 0) {
      this.step = 1;
      this.title.setVisible(false);
      if (this.saved) this.saved.setVisible(false);
      this.storyBox.setVisible(true);
    } else {
      this.scene.start('Town');
    }
  }

  drawSky() {
    const g = this.add.graphics();
    const bands = [0x29366f, 0x3b5dc9, 0x566c86, 0x94b0c2, 0xb7a58b];
    bands.forEach((c, i) => g.fillStyle(c, 1).fillRect(0, i * 56, W, 56));
    // dithered haze where the bands meet
    for (let i = 1; i < bands.length; i++) {
      g.fillStyle(bands[i], 1);
      for (let x = 0; x < W; x += 4) g.fillRect(x + ((x / 4) % 2) * 2, i * 56 - 4 + ((x / 4) % 2) * 2, 2, 2);
    }
    // skyline of mills with tall chimneys
    const r = (n) => ((n * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < 12; i++) {
      const w = 40 + Math.floor(r(i + 3) * 40), h = 50 + Math.floor(r(i + 7) * 60);
      const x = i * 56 - 10;
      g.fillStyle(0x1a1c2c, 1).fillRect(x, H - h, w, h);
      g.fillStyle(0x333c57, 1).fillRect(x + 2, H - h + 2, w - 4, h - 2);
      for (let wy = H - h + 8; wy < H - 10; wy += 12) {
        for (let wx = x + 6; wx < x + w - 8; wx += 12) {
          g.fillStyle(r(wx + wy) > 0.55 ? 0xffcd75 : 0x1a1c2c, 1).fillRect(wx, wy, 5, 6);
        }
      }
      if (i % 2 === 0) {
        const cx = x + w - 10, ch = h + 40 + Math.floor(r(i) * 30);
        g.fillStyle(0x1a1c2c, 1).fillRect(cx, H - ch, 9, ch);
        g.fillStyle(0x6b2a24, 1).fillRect(cx + 1, H - ch, 7, ch);
        g.fillStyle(0x1a1c2c, 1).fillRect(cx - 1, H - ch, 11, 3);
        this.time.addEvent({
          delay: 700 + i * 90, loop: true,
          callback: () => {
            const p = this.add.image(cx + 4, H - ch - 2, 'smoke').setAlpha(0.8).setScale(1.5).setTint(i % 4 === 0 ? 0xf4f4f4 : 0x94b0c2);
            this.tweens.add({ targets: p, y: p.y - 70, x: p.x + 24, scale: 4, alpha: 0, duration: 4000, onComplete: () => p.destroy() });
          },
        });
      }
    }
    // cobbled street along the bottom
    g.fillStyle(0x1a1c2c, 1).fillRect(0, H - 10, W, 10);
    g.fillStyle(0x566c86, 1).fillRect(0, H - 8, W, 8);
    for (let x = 0; x < W; x += 8) g.fillStyle(0x333c57, 1).fillRect(x, H - 4 + ((x / 8) % 2) * 2, 4, 2);
  }
}

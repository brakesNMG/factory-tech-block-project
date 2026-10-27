import Phaser from 'phaser';
import { txt, panel, COLORS, W, H } from '../util/ui.js';
import { STATIONS } from '../data/stations.js';
import { progress } from '../util/state.js';
import { isMuted } from '../util/sfx.js';

// Heads-up display drawn over the town at native 640x360 resolution.
export default class HUD extends Phaser.Scene {
  constructor() { super('HUD'); }

  create() {
    // sooty haze + vignette give the town its smoggy industrial mood
    this.add.rectangle(0, 0, W, H, 0x4a3320, 0.12).setOrigin(0);
    if (!this.textures.exists('vignette')) {
      const vig = this.textures.createCanvas('vignette', W, H);
      const ctx = vig.getContext();
      const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, W * 0.62);
      grad.addColorStop(0, 'rgba(26,28,44,0)');
      grad.addColorStop(1, 'rgba(26,28,44,0.55)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      vig.refresh();
    }
    this.add.image(0, 0, 'vignette').setOrigin(0);

    // progress strip
    panel(this, 6, 6, 152, 30);
    txt(this, 14, 12, 'KNOWLEDGE', { color: COLORS.gold });
    this.pips = STATIONS.map((_, i) => this.add.rectangle(14 + i * 13, 26, 10, 6, 0x333c57).setOrigin(0).setStrokeStyle(1, 0x1a1c2c));
    this.count = txt(this, 150, 12, '', { origin: [1, 0] });

    // interaction prompt
    this.promptBox = this.add.container(W / 2, H - 40);
    const bg = panel(this, -170, -12, 340, 24);
    this.promptText = txt(this, 0, 0, '', { origin: [0.5, 0.5] });
    this.promptBox.add([bg, this.promptText]).setVisible(false);

    // controls
    this.hint = txt(this, W - 8, H - 12, 'WASD move   E examine   J journal   C sources   M sound', { color: COLORS.mute, origin: [1, 0] });
    this.muteLabel = txt(this, W - 8, 10, '', { color: COLORS.bad, origin: [1, 0] });

    this.refresh();
    const on = (evt, fn) => {
      this.game.events.on(evt, fn, this);
      this.events.once('shutdown', () => this.game.events.off(evt, fn, this));
    };
    on('progress', () => this.refresh());
    on('muted', (m) => this.muteLabel.setText(m ? 'SOUND OFF' : ''));
    on('nearby', (s) => {
      if (!s) { this.promptBox.setVisible(false); return; }
      const done = progress.has(s.id);
      this.promptText.setText(`[E] ${done ? 'Review' : 'Examine'}: ${s.name} (${s.year})`);
      this.promptBox.setVisible(true);
    });
    if (isMuted()) this.muteLabel.setText('SOUND OFF');
  }

  refresh() {
    STATIONS.forEach((s, i) => this.pips[i].setFillStyle(progress.has(s.id) ? 0xa7f070 : 0x333c57));
    this.count.setText(`${progress.count()}/${STATIONS.length}`);
  }
}

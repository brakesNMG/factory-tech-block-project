import Phaser from 'phaser';
import { generateAllArt } from '../art/index.js';
import { initAudio } from '../util/sfx.js';
import { FONT, W, H } from '../util/ui.js';

export default class Boot extends Phaser.Scene {
  constructor() { super('Boot'); }

  async create() {
    const label = this.add.text(W / 2, H / 2, 'Loading...', { fontFamily: 'monospace', fontSize: '8px', color: '#f4f4f4' }).setOrigin(0.5);
    // Make sure the pixel font is ready before any text is drawn.
    try { await document.fonts.load(`8px ${FONT}`); await document.fonts.load(`16px ${FONT}`); } catch { /* fall back to monospace */ }
    generateAllArt(this);
    initAudio(this.game);
    label.destroy();
    this.scene.start('Menu');
  }
}

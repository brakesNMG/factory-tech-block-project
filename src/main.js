import '@fontsource/press-start-2p';
import Phaser from 'phaser';
import Boot from './scenes/Boot.js';
import Menu from './scenes/Menu.js';
import Town from './scenes/Town.js';
import HUD from './scenes/HUD.js';
import Lesson from './scenes/Lesson.js';
import Journal from './scenes/Journal.js';
import Ending from './scenes/Ending.js';
import { W, H } from './util/ui.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: W,
  height: H,
  backgroundColor: '#1a1c2c',
  pixelArt: true,      // nearest-neighbour scaling keeps pixel art crisp
  roundPixels: true,
  physics: { default: 'arcade', arcade: { debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [Boot, Menu, Town, HUD, Lesson, Journal, Ending],
});

// Handy for debugging / automated tests.
window.__game = game;

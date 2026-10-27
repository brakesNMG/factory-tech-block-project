import Phaser from 'phaser';
import { STATIONS } from '../data/stations.js';
import { MACHINE_SIZE } from '../art/machines.js';
import { rng } from '../art/palette.js';
import { progress } from '../util/state.js';
import { sfx, toggleMute } from '../util/sfx.js';

const T = 16;
const MAP_W = 40;
const MAP_H = 24;
const SPEED = 72;

// Map layout (tile coordinates)
const ROAD_ROWS = [11, 12];
const ROAD_COLS = [19, 20];
const RIVER_COLS = [30, 31];
const TRACK_ROW = 17;

const BUILDINGS = [
  { key: 'mill', tx: 21, ty: 0, w: 7, h: 5 },
  { key: 'house_a', tx: 2, ty: 1, w: 4, h: 4 },
  { key: 'house_c', tx: 8, ty: 2, w: 3, h: 3 },
  { key: 'house_b', tx: 13, ty: 2, w: 3, h: 3 },
  { key: 'house_c', tx: 34, ty: 2, w: 3, h: 3 },
  { key: 'house_a', tx: 34, ty: 6, w: 4, h: 4 },
  { key: 'house_b', tx: 1, ty: 20, w: 3, h: 3 },
  { key: 'house_c', tx: 10, ty: 20, w: 3, h: 3 },
  { key: 'house_a', tx: 23, ty: 20, w: 4, h: 4 },
  { key: 'house_b', tx: 35, ty: 20, w: 3, h: 3 },
];

export default class Town extends Phaser.Scene {
  constructor() { super('Town'); }

  create() {
    this.nearby = null;
    this.walkClock = 0;
    this.lockUntil = 0; // stops the keypress that closed a lesson from reopening it
    this.physics.world.setBounds(0, 0, MAP_W * T, MAP_H * T);
    this.cameras.main.setZoom(2).setBounds(0, 0, MAP_W * T, MAP_H * T);

    this.occ = Array.from({ length: MAP_H }, () => Array(MAP_W).fill(false));
    this.solids = this.physics.add.staticGroup();
    this.waterImages = [];

    this.buildGround();
    this.buildBuildings();
    this.buildProps();
    this.buildStations();
    this.buildTrees();
    this.buildPlayer();
    this.startAmbience();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    ['E', 'SPACE', 'ENTER'].forEach((k) => this.input.keyboard.on(`keydown-${k}`, () => this.interact()));
    this.input.keyboard.on('keydown-J', () => this.openJournal());
    this.input.keyboard.on('keydown-M', () => this.game.events.emit('muted', toggleMute()));

    this.scene.launch('HUD');
    this.game.events.on('lessonClosed', this.onLessonClosed, this);
    this.events.once('shutdown', () => this.game.events.off('lessonClosed', this.onLessonClosed, this));
    this.game.events.emit('progress');
  }

  // ---------- world construction ----------
  buildGround() {
    const r = rng(2024);
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        let key = ['grass1', 'grass2', 'grass3'][Math.floor(r() * 3)];
        const isRoad = ROAD_ROWS.includes(y) || ROAD_COLS.includes(x);
        const isRiver = RIVER_COLS.includes(x);
        if (isRiver) key = 'water0';
        if (isRiver && ROAD_ROWS.includes(y)) key = 'bridge';
        else if (isRoad) key = r() > 0.5 ? 'cobble1' : 'cobble2';
        const img = this.add.image(x * T, y * T, key).setOrigin(0).setDepth(0);
        if (key === 'water0') this.waterImages.push(img);
        if (isRoad || isRiver) this.occ[y][x] = true;
        if (isRiver && !ROAD_ROWS.includes(y)) this.addSolid(x * T, y * T, T, T);
      }
    }
    // railway line east of the river
    for (let x = 32; x < MAP_W; x++) {
      this.add.image(x * T, TRACK_ROW * T, 'track').setOrigin(0).setDepth(1);
      this.occ[TRACK_ROW][x] = true;
    }
    // animate the river
    this.time.addEvent({
      delay: 450, loop: true,
      callback: () => {
        this.waterFrame = this.waterFrame ? 0 : 1;
        this.waterImages.forEach((im) => im.setTexture(`water${this.waterFrame}`));
      },
    });
    // the river banks: low stone wall on the bridge sides is implied by water collision
  }

  addSolid(x, y, w, h) {
    const z = this.add.zone(x + w / 2, y + h / 2, w, h);
    this.physics.add.existing(z, true);
    this.solids.add(z);
  }

  markOcc(tx, ty, w, h, pad = 0) {
    for (let y = ty - pad; y < ty + h + pad; y++) {
      for (let x = tx - pad; x < tx + w + pad; x++) {
        if (this.occ[y] && x >= 0 && x < MAP_W) this.occ[y][x] = true;
      }
    }
  }

  buildBuildings() {
    BUILDINGS.forEach((b) => {
      const px = b.tx * T, py = b.ty * T;
      this.add.image(px, py, b.key).setOrigin(0).setDepth(py + b.h * T);
      this.addSolid(px, py + 12, b.w * T, b.h * T - 12);
      this.markOcc(b.tx, b.ty, b.w, b.h + 1, 1);
    });
    // mill chimney with smoke
    const cx = 28 * T + 8, bottom = 5 * T;
    this.add.image(cx, bottom, 'chimney').setOrigin(0.5, 1).setDepth(bottom);
    this.addSolid(cx - 6, bottom - 10, 12, 10);
    this.markOcc(28, 1, 1, 5, 1);
    this.smokeSources = [{ x: cx, y: bottom - 64 }];
  }

  buildProps() {
    const crates = [[29, 5], [20, 6], [22, 6], [4, 10], [16, 14], [26, 13], [32, 14]];
    crates.forEach(([tx, ty], i) => {
      const key = i % 2 ? 'barrel' : 'crate';
      this.add.image(tx * T, ty * T, key).setOrigin(0).setDepth(ty * T + T);
      this.addSolid(tx * T + 2, ty * T + 6, 12, 10);
      this.occ[ty][tx] = true;
    });
    // fence along the railway
    for (let x = 32; x < MAP_W; x++) {
      this.add.image(x * T, (TRACK_ROW + 1) * T, 'fence').setOrigin(0).setDepth((TRACK_ROW + 2) * T);
      this.addSolid(x * T, (TRACK_ROW + 1) * T + 4, T, 10);
      this.occ[TRACK_ROW + 1][x] = true;
    }
  }

  buildStations() {
    this.stations = [];
    STATIONS.forEach((s) => {
      const [w, h] = MACHINE_SIZE[s.art];
      const cx = s.tile[0] * T + 8;
      let bottom = (s.tile[1] + 1) * T;
      if (s.art === 'railway') bottom = TRACK_ROW * T + 13;
      this.markOcc(s.tile[0] - 2, s.tile[1] - 1, 5, 4, 1);

      if (s.art !== 'railway') {
        this.add.image(cx, bottom - 5, 'glow').setDepth(2);
      }
      const img = this.add.image(cx, bottom, `machine_${s.art}`).setOrigin(0.5, 1).setDepth(bottom);
      this.addSolid(cx - w / 2 + 2, bottom - 8, w - 4, 8);

      const marker = this.add.image(cx, bottom - h - 6, 'marker').setDepth(9999);
      const done = progress.has(s.id);
      const st = { data: s, img, marker, cx, bottom, w, h, zone: new Phaser.Geom.Rectangle(cx - w / 2 - 14, bottom - 20, w + 28, 40) };
      this.stations.push(st);
      this.styleMarker(st, done);
      this.tweens.add({ targets: marker, y: marker.y - 3, yoyo: true, repeat: -1, duration: 500, ease: 'Sine.inOut' });

      if (s.id === 'steam') this.smokeSources.push({ x: cx + 1, y: bottom - h });
    });
  }

  styleMarker(st, done) {
    if (done) st.marker.setTexture('sparkle').setTint(0xa7f070);
    else st.marker.setTexture('marker').clearTint();
  }

  buildTrees() {
    const r = rng(99);
    let placed = 0;
    for (let tries = 0; tries < 400 && placed < 70; tries++) {
      const tx = Math.floor(r() * MAP_W), ty = Math.floor(r() * MAP_H);
      const around = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];
      if (around.some(([dx, dy]) => !this.occ[ty + dy] || this.occ[ty + dy][tx + dx] !== false)) continue;
      if (Math.abs(tx - 19) < 3 && Math.abs(ty - 13) < 3) continue; // spawn clearing
      const kind = r() > 0.25 ? 'tree' : 'bush';
      const px = tx * T, py = (ty + 1) * T;
      if (kind === 'tree') {
        this.add.image(px, py, 'tree').setOrigin(0, 1).setDepth(py);
        this.addSolid(px + 5, py - 6, 6, 6);
      } else {
        this.add.image(px, py, 'bush').setOrigin(0, 1).setDepth(py);
      }
      this.occ[ty][tx] = true;
      placed++;
    }
  }

  buildPlayer() {
    this.player = this.physics.add.sprite(19 * T + 8, 13 * T, 'player_down').setOrigin(0.5, 1);
    this.player.body.setSize(8, 6).setOffset(4, 10);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.solids);
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);
    this.facing = 'down';
  }

  startAmbience() {
    this.time.addEvent({
      delay: 650, loop: true,
      callback: () => {
        this.smokeSources.forEach((s) => {
          const p = this.add.image(s.x + Phaser.Math.Between(-1, 1), s.y, 'smoke').setDepth(99999).setAlpha(0.85);
          this.tweens.add({
            targets: p, y: p.y - 38, x: p.x + Phaser.Math.Between(6, 16), scale: 2.2, alpha: 0,
            duration: 2800, onComplete: () => p.destroy(),
          });
        });
      },
    });
  }

  // ---------- gameplay ----------
  update(_, delta) {
    const k = this.cursors, w = this.wasd;
    let vx = 0, vy = 0;
    if (k.left.isDown || w.A.isDown) vx -= 1;
    if (k.right.isDown || w.D.isDown) vx += 1;
    if (k.up.isDown || w.W.isDown) vy -= 1;
    if (k.down.isDown || w.S.isDown) vy += 1;
    const v = new Phaser.Math.Vector2(vx, vy).normalize().scale(SPEED);
    this.player.setVelocity(v.x, v.y);

    if (vx || vy) {
      if (Math.abs(vx) > Math.abs(vy) || (vx && !vy)) { this.facing = 'side'; this.player.setFlipX(vx < 0); }
      else this.facing = vy < 0 ? 'up' : 'down';
      this.player.setTexture(`player_${this.facing}`);
      this.walkClock += delta;
      // a two-step bob stands in for a walk cycle
      this.player.setScale(1, Math.floor(this.walkClock / 130) % 2 ? 0.94 : 1);
    } else {
      this.player.setScale(1, 1);
      this.walkClock = 0;
    }
    this.player.setDepth(this.player.y);

    // which station (if any) are we standing next to?
    let near = null;
    for (const st of this.stations) {
      if (Phaser.Geom.Rectangle.Contains(st.zone, this.player.x, this.player.y)) { near = st; break; }
    }
    if (near !== this.nearby) {
      this.nearby = near;
      this.game.events.emit('nearby', near ? near.data : null);
    }
  }

  interact() {
    if (this.nearby && Date.now() > this.lockUntil) this.openLesson(this.nearby.data);
  }

  openLesson(station) {
    sfx.open();
    this.player.setVelocity(0, 0);
    this.scene.pause();
    this.scene.launch('Lesson', { id: station.id });
  }

  openJournal() {
    if (this.scene.isPaused()) return;
    sfx.open();
    this.player.setVelocity(0, 0);
    this.scene.pause();
    this.scene.launch('Journal');
  }

  onLessonClosed({ id, completed } = {}) {
    this.scene.resume();
    this.input.keyboard.resetKeys();
    this.lockUntil = Date.now() + 350;
    if (completed) {
      const st = this.stations.find((s) => s.data.id === id);
      if (st) this.styleMarker(st, true);
    }
    this.game.events.emit('progress');
    if (completed && progress.count() === STATIONS.length && !this.endingShown) {
      this.endingShown = true;
      this.time.delayedCall(350, () => {
        this.scene.pause();
        this.scene.launch('Ending');
      });
    }
  }
}

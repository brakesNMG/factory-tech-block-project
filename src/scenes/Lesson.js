import Phaser from 'phaser';
import { STATION_BY_ID } from '../data/stations.js';
import { MACHINE_SIZE } from '../art/machines.js';
import { txt, panel, button, COLORS, W, H } from '../util/ui.js';
import { progress } from '../util/state.js';
import { sfx } from '../util/sfx.js';

const RX = 200;      // x of the right-hand content column
const RW = 400;      // its width
const CY = 58;       // content top

// The lesson overlay: read the pages, try the hands-on activity, then answer a quiz.
export default class Lesson extends Phaser.Scene {
  constructor() { super('Lesson'); }

  init(data) {
    this.station = STATION_BY_ID[data.id];
    this.reviewing = progress.has(this.station.id);
    this.newly = false;
    this.quiz = null;
    this.qi = 0; // which quiz question we are on
  }

  create() {
    const s = this.station;
    this.openedAt = this.time.now;
    this.steps = [
      ...s.pages.map((p) => ({ type: 'page', p })),
      ...(s.activity && !this.reviewing ? [{ type: 'activity', kind: s.activity }] : []),
      ...(this.reviewing ? [] : [{ type: 'quiz' }]),
    ];
    this.idx = 0;
    this.view = null;
    this.activity = null;

    // dim backdrop that swallows clicks
    this.add.rectangle(0, 0, W, H, 0x0e0f1a, 0.78).setOrigin(0).setInteractive();
    panel(this, 20, 12, 600, 336);

    txt(this, 36, 24, s.name, { size: 16, color: COLORS.light });
    txt(this, 604, 24, String(s.year), { size: 16, color: COLORS.gold, origin: [1, 0] });
    this.add.rectangle(36, 46, 568, 2, 0x566c86).setOrigin(0);
    if (this.reviewing) txt(this, 604, 8, 'REVIEW', { color: COLORS.good, origin: [1, 0] });

    // left column: the machine, who made it, and a one-line summary
    this.add.rectangle(36, 58, 144, 120, 0x29366f).setOrigin(0).setStrokeStyle(2, 0x1a1c2c);
    this.add.rectangle(36, 150, 144, 28, 0x566c86).setOrigin(0);
    const [mw, mh] = MACHINE_SIZE[s.art];
    const scale = Math.max(1, Math.min(Math.floor(136 / mw), Math.floor(100 / mh)));
    this.add.image(108, 158, `machine_${s.art}`).setOrigin(0.5, 1).setScale(scale);
    txt(this, 36, 188, 'BY', { color: COLORS.gold });
    txt(this, 36, 200, s.inventor, { wrap: 144, spacing: 4 });
    txt(this, 36, 244, 'IN SHORT', { color: COLORS.gold });
    txt(this, 36, 256, s.summary, { wrap: 144, color: COLORS.mute, spacing: 4 });

    // footer controls
    this.backBtn = button(this, RX, 318, 72, 20, '< BACK', () => this.go(-1), { color: '#94b0c2' });
    this.nextBtn = button(this, 504, 318, 100, 20, 'NEXT >', () => this.next());
    this.nextLabel = this.nextBtn.list[1];
    this.dots = this.add.graphics();

    const kb = this.input.keyboard;
    kb.on('keydown-ESC', () => this.close());
    kb.on('keydown-RIGHT', () => this.view?.type !== 'quiz' && this.next());
    kb.on('keydown-LEFT', () => this.go(-1));
    ['SPACE', 'ENTER'].forEach((k) => kb.on(`keydown-${k}`, () => this.onConfirm()));
    ['ONE', 'TWO', 'THREE'].forEach((k, i) => kb.on(`keydown-${k}`, () => this.pick(i)));
    kb.on('keydown-UP', () => this.moveSel(-1));
    kb.on('keydown-DOWN', () => this.moveSel(1));
    this.keys = kb.addKeys('SPACE,UP,DOWN,W,S');

    this.show(0);
  }

  // ---------- navigation ----------
  ready() { return this.time.now - this.openedAt > 250; } // ignore the keypress that opened us

  go(d) {
    const n = this.idx + d;
    if (n < 0 || n >= this.steps.length) return;
    sfx.page();
    this.show(n);
  }

  next() {
    if (!this.ready()) return;
    const step = this.steps[this.idx];
    if (step.type === 'activity' && !this.activity?.done) return;
    if (step.type === 'quiz') {
      if (!this.quiz?.solved) return;
      if (this.qi < this.station.quiz.length - 1) { this.qi++; sfx.page(); this.show(this.idx); } else this.close();
      return;
    }
    if (this.idx === this.steps.length - 1) { this.close(); return; }
    this.go(1);
  }

  onConfirm() {
    if (!this.ready()) return;
    const step = this.steps[this.idx];
    if (step.type === 'quiz' && !this.quiz.solved) this.pick(this.quiz.sel);
    else if (step.type !== 'activity') this.next();
    else if (this.activity?.done) this.next();
  }

  close() {
    this.game.events.emit('lessonClosed', { id: this.station.id, completed: this.newly });
    this.scene.stop();
  }

  // ---------- rendering of the current step ----------
  show(i) {
    this.idx = i;
    if (this.view) this.view.root.destroy();
    this.activity = null;
    const step = this.steps[i];
    const root = this.add.container(0, 0);
    this.view = { type: step.type, root };

    if (step.type === 'page') this.buildPage(root, step.p);
    if (step.type === 'activity') this.buildSteam(root);
    if (step.type === 'quiz') this.buildQuiz(root);
    this.refreshFooter();
  }

  refreshFooter() {
    const last = this.idx === this.steps.length - 1;
    const step = this.steps[this.idx];
    this.backBtn.setVisible(this.idx > 0);
    let label = last ? (this.reviewing ? 'CLOSE' : 'FINISH') : 'NEXT >';
    if (step.type === 'quiz') label = this.qi < this.station.quiz.length - 1 ? 'NEXT >' : 'FINISH';
    this.nextLabel.setText(label);
    const blocked = (step.type === 'quiz' && !this.quiz?.solved) || (step.type === 'activity' && !this.activity?.done);
    this.nextBtn.setVisible(!blocked);

    this.dots.clear();
    const total = this.steps.length;
    const x0 = 420 - (total * 10) / 2 - 20;
    for (let k = 0; k < total; k++) {
      this.dots.fillStyle(k === this.idx ? 0xffcd75 : 0x566c86, 1).fillRect(x0 + k * 10, 326, 6, 6);
    }
  }

  buildPage(root, p) {
    root.add(txt(this, RX, CY, p.title.toUpperCase(), { color: COLORS.gold, wrap: RW }));
    root.add(this.add.rectangle(RX, CY + 14, 60, 2, 0xffcd75).setOrigin(0));
    root.add(txt(this, RX, CY + 26, p.text, { wrap: RW, spacing: 6 }));
  }

  // ---------- quiz ----------
  buildQuiz(root) {
    const total = this.station.quiz.length;
    const q = this.station.quiz[this.qi];
    this.quiz = { sel: 0, solved: false, boxes: [], tries: 0 };
    root.add(txt(this, RX, CY, `CHECK YOUR KNOWLEDGE  ${this.qi + 1}/${total}`, { color: COLORS.gold }));
    root.add(txt(this, RX, CY + 16, q.q, { wrap: RW, spacing: 6 }));
    q.options.forEach((opt, i) => {
      const y = 106 + i * 44;
      const g = this.add.graphics();
      const label = txt(this, RX + 28, y + 8, opt, { wrap: RW - 40, spacing: 4 });
      const num = txt(this, RX + 10, y + 8, String(i + 1), { color: COLORS.gold });
      const zone = this.add.zone(RX, y, RW, 40).setOrigin(0).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.pick(i));
      zone.on('pointerover', () => { if (!this.quiz.solved) { this.quiz.sel = i; this.drawQuiz(); } });
      root.add([g, label, num, zone]);
      this.quiz.boxes.push({ g, y, state: 'idle' });
    });
    this.quiz.feedback = txt(this, RX, 246, '', { wrap: RW, spacing: 6 });
    root.add(this.quiz.feedback);
    this.drawQuiz();
  }

  drawQuiz() {
    this.quiz.boxes.forEach((b, i) => {
      const sel = i === this.quiz.sel && !this.quiz.solved;
      const fill = { idle: 0x29366f, wrong: 0x7a2a3a, right: 0x257179 }[b.state];
      b.g.clear();
      b.g.fillStyle(0x1a1c2c, 1).fillRect(RX, b.y, RW, 40);
      b.g.fillStyle(sel ? 0xffcd75 : 0x566c86, 1).fillRect(RX + 1, b.y + 1, RW - 2, 38);
      b.g.fillStyle(fill, 1).fillRect(RX + 3, b.y + 3, RW - 6, 34);
    });
  }

  moveSel(d) {
    if (this.view?.type !== 'quiz' || this.quiz.solved) return;
    this.quiz.sel = (this.quiz.sel + d + 3) % 3;
    sfx.blip();
    this.drawQuiz();
  }

  pick(i) {
    if (this.view?.type !== 'quiz' || this.quiz.solved || !this.ready()) return;
    const q = this.station.quiz[this.qi];
    const box = this.quiz.boxes[i];
    if (!box) return;
    this.quiz.sel = i;
    if (i === q.answer) {
      box.state = 'right';
      this.quiz.solved = true;
      const lastQ = this.qi === this.station.quiz.length - 1;
      if (lastQ && !progress.has(this.station.id)) { progress.add(this.station.id); this.newly = true; }
      this.quiz.feedback.setText(`CORRECT!  ${q.explain}`).setColor(COLORS.good);
      sfx.ok();
      this.cameras.main.flash(250, 167, 240, 112);
      this.spawnSparkles();
      this.refreshFooter();
    } else {
      box.state = 'wrong';
      this.quiz.tries++;
      this.quiz.feedback.setText('Not quite! Use < BACK to re-read the pages, or try another answer.').setColor(COLORS.bad);
      sfx.bad();
      this.tweens.add({ targets: box.g, x: { from: -4, to: 0 }, duration: 160, ease: 'Bounce' });
    }
    this.drawQuiz();
  }

  spawnSparkles() {
    for (let k = 0; k < 14; k++) {
      const p = this.add.image(Phaser.Math.Between(40, 600), Phaser.Math.Between(260, 320), 'sparkle').setAlpha(0.9);
      this.tweens.add({ targets: p, y: p.y - Phaser.Math.Between(30, 80), alpha: 0, duration: 900 + k * 40, onComplete: () => p.destroy() });
    }
  }

  // ---------- steam pressure activity ----------
  buildSteam(root) {
    const a = {
      p: 50, progress: 0, t: 0, spike: 0, nextSpike: 4, angle: 0, done: false, stalled: false,
      stoke: false, vent: false, msg: '',
    };
    this.activity = a;
    root.add(txt(this, RX, CY, 'HANDS ON: BE THE ENGINEER', { color: COLORS.gold }));
    root.add(txt(this, RX, CY + 16,
      'Machines drain steam. Keep the needle in the GREEN band so the engine runs smoothly.\n' +
      'Hold SPACE to stoke the fire (up). Hold DOWN to open the vent (down).', { wrap: RW, spacing: 6 }));

    a.gauge = this.add.graphics();
    a.wheel = this.add.graphics();
    a.bar = this.add.graphics();
    a.status = txt(this, RX, 262, '', { wrap: RW, spacing: 6 });
    a.label = txt(this, RX + 2, 246, 'PSI', { color: COLORS.mute });
    root.add([a.gauge, a.wheel, a.bar, a.status, a.label,
      txt(this, 310, 252, 'MILL OUTPUT', { color: COLORS.mute })]);

    const mk = (x, y, label, color, flag) => {
      const b = button(this, x, y, 90, 30, label, () => {}, { color });
      const z = this.add.zone(x, y, 90, 30).setOrigin(0).setInteractive({ useHandCursor: true });
      z.on('pointerdown', () => { a[flag] = true; });
      ['pointerup', 'pointerout'].forEach((e) => z.on(e, () => { a[flag] = false; }));
      root.add([b, z]);
    };
    mk(500, 150, 'STOKE', '#ef7d57', 'stoke');
    mk(500, 190, 'VENT', '#73eff7', 'vent');
    this.drawSteam();
  }

  updateSteam(dt) {
    const a = this.activity;
    if (!a || a.done) return;
    a.t += dt;
    const k = this.keys;
    const stoke = a.stoke || k.SPACE.isDown || k.UP.isDown || k.W.isDown;
    const vent = a.vent || k.DOWN.isDown || k.S.isDown;

    a.nextSpike -= dt;
    if (a.nextSpike <= 0 && a.spike <= 0) { a.spike = 2.2; a.nextSpike = 5 + Math.random() * 3; a.msg = 'Another loom starts up! More steam is drawn off.'; }
    if (a.spike > 0) a.spike -= dt;
    const load = 9 + 4 * Math.sin(a.t * 0.9) + (a.spike > 0 ? 12 : 0);

    a.p += (-load + (stoke ? 36 : 0) - (vent ? 42 : 0)) * dt;
    if (vent) sfx.hiss();

    if (a.p >= 95) { a.p = 62; a.progress = Math.max(0, a.progress - 0.12); a.msg = 'SAFETY VALVE POPPED! Too much pressure risks a boiler explosion.'; sfx.bad(); this.cameras.main.shake(150, 0.004); }
    if (a.p <= 0) { a.p = 0; if (!a.stalled) { a.stalled = true; a.progress = Math.max(0, a.progress - 0.1); a.msg = 'The engine stalled: not enough steam!'; sfx.bad(); } }
    if (a.p > 25) a.stalled = false;

    if (a.p >= 40 && a.p <= 70) { a.progress += dt / 9; if (a.spike <= 0 && a.msg.startsWith('Another')) a.msg = ''; }
    else if (a.p > 85 || a.p < 20) a.progress = Math.max(0, a.progress - dt / 25);

    a.angle += (a.p > 8 ? (a.p / 100) * 7 : 0) * dt;

    if (a.progress >= 1) {
      a.progress = 1;
      a.done = true;
      a.msg = 'STEADY! Real engines used Watt\'s centrifugal governor to regulate this automatically.';
      sfx.ok();
      this.refreshFooter();
    }
    this.drawSteam();
  }

  drawSteam() {
    const a = this.activity;
    // gauge
    const gx = 236, gy = 134, gw = 36, gh = 122;
    const zones = [[0, 20, 0x7a2a3a], [20, 40, 0xc9a02a], [40, 70, 0x38b764], [70, 85, 0xc9a02a], [85, 100, 0xb13e53]];
    a.gauge.clear();
    a.gauge.fillStyle(0x1a1c2c, 1).fillRect(gx - 3, gy - 3, gw + 6, gh + 6);
    zones.forEach(([lo, hi, c]) => {
      a.gauge.fillStyle(c, 1).fillRect(gx, gy + gh - (hi / 100) * gh, gw, ((hi - lo) / 100) * gh);
    });
    const ny = gy + gh - (Math.min(100, Math.max(0, a.p)) / 100) * gh;
    a.gauge.fillStyle(0xf4f4f4, 1).fillRect(gx - 8, ny - 1, gw + 16, 3);
    a.gauge.fillStyle(0xffcd75, 1).fillTriangle(gx + gw + 8, ny, gx + gw + 18, ny - 5, gx + gw + 18, ny + 5);

    // flywheel
    const cx = 390, cy = 196, r = 46;
    a.wheel.clear();
    a.wheel.fillStyle(0x1a1c2c, 1).fillCircle(cx, cy, r + 3);
    a.wheel.fillStyle(0x566c86, 1).fillCircle(cx, cy, r);
    a.wheel.fillStyle(0x333c57, 1).fillCircle(cx, cy, r - 7);
    a.wheel.lineStyle(3, 0x94b0c2, 1);
    for (let i = 0; i < 6; i++) {
      const ang = a.angle + (i * Math.PI) / 3;
      a.wheel.lineBetween(cx, cy, cx + Math.cos(ang) * (r - 6), cy + Math.sin(ang) * (r - 6));
    }
    a.wheel.fillStyle(0xffcd75, 1).fillCircle(cx, cy, 5);
    a.wheel.fillStyle(0xef7d57, 1).fillCircle(cx + Math.cos(a.angle) * (r - 3), cy + Math.sin(a.angle) * (r - 3), 3);

    // output bar
    a.bar.clear();
    a.bar.fillStyle(0x1a1c2c, 1).fillRect(308, 262, 184, 14);
    a.bar.fillStyle(0x333c57, 1).fillRect(310, 264, 180, 10);
    a.bar.fillStyle(0xa7f070, 1).fillRect(310, 264, 180 * a.progress, 10);

    const state = a.p >= 40 && a.p <= 70 ? 'STEADY' : a.p > 85 ? 'DANGER' : a.p < 20 ? 'LOW' : 'DRIFTING';
    a.status.setText(`${a.msg ? a.msg + '\n' : ''}PRESSURE ${Math.round(a.p)}%  -  ${state}`);
    a.status.setColor(a.done ? COLORS.good : COLORS.light);
    a.status.setY(a.msg ? 280 : 292);
  }

  update(_, delta) {
    this.updateSteam(Math.min(delta, 50) / 1000);
  }
}

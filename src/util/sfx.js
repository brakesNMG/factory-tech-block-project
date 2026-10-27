// Tiny synthesized sound effects (no audio files). Uses Phaser's WebAudio context when present.
let ctx = null;
let muted = false;

export function initAudio(game) {
  ctx = game.sound && game.sound.context ? game.sound.context : null;
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

export const isMuted = () => muted;

function tone(freq, dur = 0.08, type = 'square', vol = 0.04, delay = 0) {
  if (!ctx || muted) return;
  try {
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  } catch {
    /* audio is optional */
  }
}

export const sfx = {
  blip: () => tone(660, 0.05),
  open: () => { tone(392, 0.07); tone(523, 0.09, 'square', 0.04, 0.07); },
  page: () => tone(520, 0.05, 'triangle', 0.05),
  ok: () => { tone(523, 0.1); tone(659, 0.1, 'square', 0.04, 0.1); tone(784, 0.18, 'square', 0.04, 0.2); },
  bad: () => { tone(160, 0.18, 'sawtooth', 0.04); },
  win: () => [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.14, 'square', 0.04, i * 0.12)),
  hiss: () => tone(90, 0.12, 'sawtooth', 0.02),
};

// Web Audio API DTMF Synthesizer for 155261 Toll-Free IVR Feature Phone Simulator

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// DTMF Frequency Table (Row Hz + Column Hz)
const DTMF_FREQS = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477]
};

/**
 * Play an authentic dual-tone telephone beep for a dialed key
 * @param {string} key - '0'-'9', '*', '#'
 * @param {number} durationMs - tone duration (default 180ms)
 */
export function playDtmfTone(key, durationMs = 180) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freqs = DTMF_FREQS[key] || [770, 1336];
    const duration = durationMs / 1000;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freqs[0], now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freqs[1], now);

    // Smooth envelope attack and release
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gainNode.gain.setValueAtTime(0.18, now + duration - 0.03);
    gainNode.gain.linearRampToValueAtTime(0.001, now + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    console.warn('Audio tone error:', e);
  }
}

let ringInterval = null;

/**
 * Play a telecom ringback tone (Indian cadence: 0.4s on, 0.2s off, 0.4s on, 2.0s off)
 */
export function startRingTone() {
  stopRingTone();
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playBursts = () => {
      const now = ctx.currentTime;
      [0, 0.6].forEach(offset => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.value = 400;
        osc2.frequency.value = 450;
        gain.gain.setValueAtTime(0.12, now + offset);
        gain.gain.setValueAtTime(0.001, now + offset + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now + offset);
        osc2.start(now + offset);
        osc1.stop(now + offset + 0.4);
        osc2.stop(now + offset + 0.4);
      });
    };

    playBursts();
    ringInterval = setInterval(playBursts, 3000);
  } catch (e) {
    console.warn('Ring tone error:', e);
  }
}

export function stopRingTone() {
  if (ringInterval) {
    clearInterval(ringInterval);
    ringInterval = null;
  }
}

/**
 * Play a call ended disconnect beep
 */
export function playDisconnectTone() {
  stopRingTone();
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.35, 0.7].forEach(offset => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 480;
      gain.gain.setValueAtTime(0.15, now + offset);
      gain.gain.setValueAtTime(0.001, now + offset + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.22);
    });
  } catch (e) {}
}

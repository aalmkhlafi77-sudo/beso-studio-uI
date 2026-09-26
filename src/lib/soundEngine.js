// lib/soundEngine.js - Lightweight Pure Web Audio Synthesizer Library (20 Presets)
let audioCtx = null;
let isSoundEnabled = true;

export const STANDARD_SOUND_PRESETS = [
  { id: "soft-click", label: "🎵 نقر ناعم (Soft Glass Click)" },
  { id: "send-swoosh", label: "🚀 صوت إرسال (Send Swoosh)" },
  { id: "open-pop", label: "✨ صوت فتح وتوسع (Open Pop)" },
  { id: "close-snap", label: "🔒 صوت إغلاق (Close Snap)" },
  { id: "cyber-neon", label: "⚡ صوت نيون سايبر (Cyber Neon)" },
  { id: "success-chime", label: "🎉 صوت نجاح وتأكيد (Success Chime)" },
  { id: "space-warp", label: "🌌 صوت انتقال فضائي (Space Warp)" },
  { id: "toggle-switch", label: "🔘 صوت تبديل زر (Tactile Switch)" },
  { id: "hover-tick", label: "💧 صوت تلميح ناعم (Hover Tick)" },
  { id: "heart-beat", label: "💓 صوت نبض (Heartbeat Pulse)" },
];

export const LUXURY_SOUND_PRESETS = [
  { id: "crystal-drop", label: "💎 لحن القطرة البلورية (Crystal Drop)" },
  { id: "velvet-touch", label: "🕊️ لحن اللمسة المخملية (Velvet Touch)" },
  { id: "golden-bell", label: "🔔 لحن الجرس الذهبي (Golden Bell)" },
  { id: "ether-pulse", label: "🌌 لحن النبض الأثيري (Ether Pulse)" },
  { id: "cyber-glass", label: "🔮 لحن الزجاج السايبر (Cyber Glass)" },
  { id: "silk-slide", label: "🎗️ لحن الانزلاق الحريري (Silk Slide)" },
  { id: "champagne-pop", label: "🍾 لحن الشامبانيا المضيء (Champagne Pop)" },
  { id: "cosmic-shimmer", label: "✨ لحن الوهج الكوني (Cosmic Shimmer)" },
  { id: "diamond-click", label: "👑 لحن النقر الألماسي (Diamond Click)" },
  { id: "zen-bowl", label: "🧘‍♂️ لحن النغمة التأملية (Zen Bowl)" },
];

export const SOUND_PRESETS = [
  ...STANDARD_SOUND_PRESETS,
  ...LUXURY_SOUND_PRESETS,
];

export const toggleSound = (enabled) => {
  if (typeof enabled === 'boolean') {
    isSoundEnabled = enabled;
  } else {
    isSoundEnabled = !isSoundEnabled;
  }
  return isSoundEnabled;
};

export const getSoundState = () => isSoundEnabled;

export const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const playPresetSound = (presetName = "soft-click", enabled = isSoundEnabled) => {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    switch (presetName) {
      // 1. STANDARD: SEND SWOOSH
      case "send-swoosh": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.16);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        break;
      }

      // 2. STANDARD: OPEN POP
      case "open-pop": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.06);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      // 3. STANDARD: CLOSE SNAP
      case "close-snap": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(950, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      // 4. STANDARD: CYBER NEON
      case "cyber-neon": {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc2.type = "sawtooth";
        osc1.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(884, now);
        osc1.frequency.exponentialRampToValueAtTime(660, now + 0.1);
        osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.1);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.1);
        osc2.stop(now + 0.1);
        break;
      }

      // 5. STANDARD: SUCCESS CHIME
      case "success-chime": {
        const playChimeTone = (freq, delay, dur) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + delay);

          gain.gain.setValueAtTime(0.05, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + dur);
        };
        playChimeTone(1046.5, 0, 0.12);
        playChimeTone(1318.5, 0.06, 0.16);
        break;
      }

      // 6. STANDARD: SPACE WARP
      case "space-warp": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(1500, now + 0.12);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
        break;
      }

      // 7. STANDARD: TOGGLE SWITCH
      case "toggle-switch": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(250, now + 0.03);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }

      // 8. STANDARD: HOVER TICK
      case "hover-tick": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.015);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.015);
        break;
      }

      // 9. STANDARD: HEART BEAT
      case "heart-beat": {
        const playThump = (freq, delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + delay);
          osc.frequency.exponentialRampToValueAtTime(35, now + delay + 0.08);

          gain.gain.setValueAtTime(0.08, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        };
        playThump(75, 0);
        playThump(60, 0.1);
        break;
      }

      // 11. LUXURY: CRYSTAL DROP
      case "crystal-drop": {
        [1760, 2637.02].forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now + idx * 0.02);
          osc.frequency.exponentialRampToValueAtTime(f * 0.5, now + idx * 0.02 + 0.1);

          gain.gain.setValueAtTime(0.04, now + idx * 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.02 + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.02);
          osc.stop(now + idx * 0.02 + 0.12);
        });
        break;
      }

      // 12. LUXURY: VELVET TOUCH
      case "velvet-touch": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      // 13. LUXURY: GOLDEN BELL
      case "golden-bell": {
        [880, 1423.6].forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now);

          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.18);
        });
        break;
      }

      // 14. LUXURY: ETHER PULSE
      case "ether-pulse": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.16);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        break;
      }

      // 15. LUXURY: CYBER GLASS
      case "cyber-glass": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.04);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      // 16. LUXURY: SILK SLIDE
      case "silk-slide": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      // 17. LUXURY: CHAMPAGNE POP
      case "champagne-pop": {
        [480, 1120].forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now + idx * 0.025);
          osc.frequency.exponentialRampToValueAtTime(f * 2.2, now + idx * 0.025 + 0.04);

          gain.gain.setValueAtTime(0.06, now + idx * 0.025);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.025 + 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.025);
          osc.stop(now + idx * 0.025 + 0.05);
        });
        break;
      }

      // 18. LUXURY: COSMIC SHIMMER
      case "cosmic-shimmer": {
        const freqs = [523.25, 659.25, 783.99]; // C5 - E5 - G5
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now + idx * 0.03);

          gain.gain.setValueAtTime(0.04, now + idx * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.03 + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.03);
          osc.stop(now + idx * 0.03 + 0.12);
        });
        break;
      }

      // 19. LUXURY: DIAMOND CLICK
      case "diamond-click": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.025);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      // 20. LUXURY: ZEN BOWL
      case "zen-bowl": {
        [432, 864].forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now);

          gain.gain.setValueAtTime(0.035 / (idx + 1), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
        });
        break;
      }

      // DEFAULT: SOFT CLICK
      case "soft-click":
      default: {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
    }
  } catch (e) {
    // Silent fail if audio context is blocked
  }
};

export const playSoftClick = () => playPresetSound("soft-click");
export const playHoverTone = () => playPresetSound("hover-tick");

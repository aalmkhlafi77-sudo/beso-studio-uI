import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toggleSound,
  getSoundState,
  playSoftClick,
  playHoverTone,
  playPresetSound,
  SOUND_PRESETS,
  STANDARD_SOUND_PRESETS,
  LUXURY_SOUND_PRESETS,
} from '../src/lib/soundEngine.js';

test('sound engine defaults to enabled and can be toggled', () => {
  assert.equal(getSoundState(), true);

  toggleSound(false);
  assert.equal(getSoundState(), false);

  toggleSound(true);
  assert.equal(getSoundState(), true);

  toggleSound();
  assert.equal(getSoundState(), false);

  toggleSound(true);
  assert.equal(getSoundState(), true);
});

test('sound engine exports exactly 20 high-quality UI audio presets (10 Standard + 10 Luxury)', () => {
  assert.equal(STANDARD_SOUND_PRESETS.length, 10);
  assert.equal(LUXURY_SOUND_PRESETS.length, 10);
  assert.equal(SOUND_PRESETS.length, 20);

  const standardIds = STANDARD_SOUND_PRESETS.map((p) => p.id);
  assert.deepEqual(standardIds, [
    "soft-click",
    "send-swoosh",
    "open-pop",
    "close-snap",
    "cyber-neon",
    "success-chime",
    "space-warp",
    "toggle-switch",
    "hover-tick",
    "heart-beat"
  ]);

  const luxuryIds = LUXURY_SOUND_PRESETS.map((p) => p.id);
  assert.deepEqual(luxuryIds, [
    "crystal-drop",
    "velvet-touch",
    "golden-bell",
    "ether-pulse",
    "cyber-glass",
    "silk-slide",
    "champagne-pop",
    "cosmic-shimmer",
    "diamond-click",
    "zen-bowl"
  ]);
});

test('all 20 sound presets execute safely in any environment without throwing', () => {
  SOUND_PRESETS.forEach((preset) => {
    assert.doesNotThrow(() => {
      playPresetSound(preset.id, true);
    });
  });

  assert.doesNotThrow(() => {
    playSoftClick();
    playHoverTone();
  });

  toggleSound(false);
  SOUND_PRESETS.forEach((preset) => {
    assert.doesNotThrow(() => {
      playPresetSound(preset.id, false);
    });
  });

  toggleSound(true);
});



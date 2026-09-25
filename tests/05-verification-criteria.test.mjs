import test from 'node:test';
import assert from 'node:assert/strict';
import { generateElementCode } from '../src/lib/generateCode.js';
import { createInitialWorkspaceState } from '../src/data/elementsRegistry.js';

test('1. Height and Padding controls directly resize and space preview elements', () => {
  const state = createInitialWorkspaceState();
  state.dimensions.height = 75;
  state.dimensions.padding = 36;

  // Test on card
  const cardCode = generateElementCode('card', state);
  assert.match(cardCode.css, /height:\s*75px/);
  assert.match(cardCode.css, /padding:\s*36px/);

  // Test on button
  const btnCode = generateElementCode('button', state);
  assert.match(btnCode.css, /height:\s*75px/);
  assert.match(btnCode.css, /padding:\s*21px\s*48px/);

  // Test on input
  const inputCode = generateElementCode('input', state);
  assert.match(inputCode.css, /height:\s*75px/);
  assert.match(inputCode.css, /padding:\s*18px\s*18px/);

  // Test on badge
  const badgeCode = generateElementCode('badge', state);
  assert.match(badgeCode.css, /height:\s*75px/);
  assert.match(badgeCode.css, /padding:\s*13px\s*32px/);
});

test('2. Material presets directly change element render styles', () => {
  const state = createInitialWorkspaceState();

  // Glass preset
  state.globalParams.surfaceStyle = 'glass';
  const glassCard = generateElementCode('card', state);
  assert.match(glassCard.css, /backdrop-filter:\s*blur\(20px\)/);

  // Metal preset
  state.globalParams.surfaceStyle = 'metal';
  const metalCard = generateElementCode('card', state);
  assert.match(metalCard.css, /linear-gradient\(145deg/);
  assert.match(metalCard.css, /inset 0 1px 2px/);

  // Ivory preset
  state.globalParams.surfaceStyle = 'ivory';
  const ivoryCard = generateElementCode('card', state);
  assert.match(ivoryCard.css, /background:\s*#eae5d9/);

  // Neon preset
  state.globalParams.surfaceStyle = 'neon';
  const neonCard = generateElementCode('card', state);
  assert.match(neonCard.css, /box-shadow:[\s\S]*0 0 20px/);
});

test('3. Entrance animations execute distinct visual physics keyframes', () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode('button', state);
  assert.match(code.css, /@keyframes besoEntrance-fadeUp[\s\S]*translateY\(28px\)/);
  assert.match(code.css, /@keyframes besoEntrance-zoomIn[\s\S]*scale\(0\.75\)/);
  assert.match(code.css, /@keyframes besoEntrance-slideDown[\s\S]*translateY\(-32px\)/);
  assert.match(code.css, /@keyframes besoEntrance-pulseGlow[\s\S]*scale\(0\.9\)/);
});

test('4. Hover effects execute distinct visual physics', () => {
  const state = createInitialWorkspaceState();

  // Lift & Scale
  state.animations.hoverEffect = 'liftScale';
  const liftBtn = generateElementCode('button', state);
  assert.match(liftBtn.css, /\.beso-btn:hover[\s\S]*translateY\(-4px\)/);

  // Glow Expand
  state.animations.hoverEffect = 'glowExpand';
  const glowBtn = generateElementCode('button', state);
  assert.match(glowBtn.css, /\.beso-btn:hover[\s\S]*filter:\s*brightness\(1\.12\)/);

  // Tilt 3D
  state.animations.hoverEffect = 'tilt3d';
  const tiltBtn = generateElementCode('button', state);
  assert.match(tiltBtn.css, /\.beso-btn:hover[\s\S]*perspective\(600px\)/);

  // Neon Pulse
  state.animations.hoverEffect = 'neonPulse';
  const neonBtn = generateElementCode('button', state);
  assert.match(neonBtn.css, /\.beso-btn:hover[\s\S]*inset 0 0 14px/);
});

test('5. Title and Description colors operate independently', () => {
  const state = createInitialWorkspaceState();
  state.typography.titleColor = '#ff2255';
  state.typography.descColor = '#22ff88';

  const cardCode = generateElementCode('card', state);
  assert.match(cardCode.css, /\.beso-card-title\s*\{[^}]*color:\s*#ff2255/);
  assert.match(cardCode.css, /\.beso-card-desc\s*\{[^}]*color:\s*#22ff88/);
});

test('6. Surface Opacity works dynamically across ALL 4 materials (Glass, Metal, Ivory, Neon)', () => {
  const state = createInitialWorkspaceState();
  state.dimensions.surfaceOpacity = 0.42;

  // Glass
  state.globalParams.surfaceStyle = 'glass';
  const glassCode = generateElementCode('card', state);
  assert.match(glassCode.css, /rgba\(13,\s*59,\s*46,\s*0\.42\)/);

  // Metal
  state.globalParams.surfaceStyle = 'metal';
  const metalCode = generateElementCode('card', state);
  assert.match(metalCode.css, /rgba\(255,\s*255,\s*255,\s*0\.189\)/); // 0.45 * 0.42

  // Ivory
  state.globalParams.surfaceStyle = 'ivory';
  const ivoryCode = generateElementCode('card', state);
  assert.match(ivoryCode.css, /rgba\(234,\s*229,\s*217,\s*0\.42\)/);

  // Neon
  state.globalParams.surfaceStyle = 'neon';
  const neonCode = generateElementCode('card', state);
  assert.match(neonCode.css, /rgba\(\d+,\s*\d+,\s*\d+,\s*0\.105\)/); // 0.25 * 0.42
});

test('7. Bevel Depth controls inner highlights and 3D bevel depths across ALL materials', () => {
  const state = createInitialWorkspaceState();
  state.lighting.bevelDepth = 8;

  // Glass
  state.globalParams.surfaceStyle = 'glass';
  const glassCode = generateElementCode('card', state);
  assert.match(glassCode.css, /inset 0 1px 8px/);
  assert.match(glassCode.css, /inset 0 -8px 16px/);

  // Metal
  state.globalParams.surfaceStyle = 'metal';
  const metalCode = generateElementCode('card', state);
  assert.match(metalCode.css, /inset 0 2px 4px rgba\(255, 255, 255, 0\.85\)/);
  assert.match(metalCode.css, /inset 0 -4px 8px rgba\(0, 0, 0, 0\.8\)/);
  assert.match(metalCode.css, /0 16px 32px rgba\(0, 0, 0, 0\.55\)/);

  // Ivory
  state.globalParams.surfaceStyle = 'ivory';
  const ivoryCode = generateElementCode('card', state);
  assert.match(ivoryCode.css, /inset 0 1px 8px rgba\(255, 255, 255, 0\.9\)/);
  assert.match(ivoryCode.css, /inset 0 -4px 8px rgba\(0, 0, 0, 0\.12\)/);
  assert.match(ivoryCode.css, /8px 8px 24px rgba\(0, 0, 0, 0\.25\)/);

  // Neon
  state.globalParams.surfaceStyle = 'neon';
  const neonCode = generateElementCode('card', state);
  assert.match(neonCode.css, /inset 0 1px 8px rgba\(255, 255, 255, 0\.7\)/);
  assert.match(neonCode.css, /inset 0 -4px 16px rgba\(0, 0, 0, 0\.75\)/);
  assert.match(neonCode.css, /0 16px 32px rgba\(0, 0, 0, 0\.5\)/);
  assert.match(neonCode.css, /inset 0 0 24px/);
});

test('8. Gradient Colors and Angle are fully customizable across Metal, Ivory, Neon, and Glass', () => {
  const state = createInitialWorkspaceState();
  state.lighting.gradientAngle = 215;
  state.lighting.colorStop1 = '#123456';
  state.lighting.colorStop2 = '#654321';
  state.lighting.colorStop3 = '#abcdef';

  // Glass
  state.globalParams.surfaceStyle = 'glass';
  const glassCode = generateElementCode('card', state);
  assert.match(glassCode.css, /linear-gradient\(215deg/);
  assert.match(glassCode.css, /rgba\(18, 52, 86,/);

  // Metal
  state.globalParams.surfaceStyle = 'metal';
  const metalCode = generateElementCode('card', state);
  assert.match(metalCode.css, /linear-gradient\(215deg/);
  assert.match(metalCode.css, /rgba\(18, 52, 86,/);
  assert.match(metalCode.css, /rgba\(171, 205, 239,/);

  // Ivory
  state.globalParams.surfaceStyle = 'ivory';
  const ivoryCode = generateElementCode('card', state);
  assert.match(ivoryCode.css, /linear-gradient\(215deg/);
  assert.match(ivoryCode.css, /rgba\(18, 52, 86,/);

  // Neon
  state.globalParams.surfaceStyle = 'neon';
  const neonCode = generateElementCode('card', state);
  assert.match(neonCode.css, /linear-gradient\(215deg/);
  assert.match(neonCode.css, /rgba\(18, 52, 86,/);
});


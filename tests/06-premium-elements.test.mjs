import test from 'node:test';
import assert from 'node:assert/strict';
import { generateElementCode } from '../src/lib/generateCode.js';
import { createInitialWorkspaceState } from '../src/data/elementsRegistry.js';

test('1. Premium Element: Cyber 3D Tilt Card (Pure CSS Tracker Grid)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'cyber-card';
  state.typography.titleText = 'سايبر نيون 3D';
  state.typography.descText = 'وصف تجربة ثلاثية الأبعاد';

  const code = generateElementCode('cyber-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-3d-container">/);
  assert.match(code.html, /<div class="canvas">/);
  for (let i = 1; i <= 9; i++) {
    assert.match(code.html, new RegExp(`<div class="tracker tr-${i}"></div>`));
  }
  assert.match(code.html, /<div id="card">/);
  assert.match(code.html, /<h3 class="title">سايبر نيون 3D<\/h3>/);
  assert.match(code.html, /<p class="subtitle">وصف تجربة ثلاثية الأبعاد<\/p>/);
  assert.match(code.html, /<div class="glowing-elements">\s*<div class="glow-1"><\/div>\s*<\/div>/);

  // CSS checks
  assert.match(code.css, /perspective:\s*1000px/);
  assert.match(code.css, /grid-template-columns:\s*repeat\(3,\s*1fr\)/);
  assert.match(code.css, /\.tr-1:hover ~ #card\s*\{\s*transform:\s*rotateX\(15deg\)\s*rotateY\(-15deg\)/);
  assert.match(code.css, /\.tr-5:hover ~ #card\s*\{\s*transform:\s*rotateX\(0deg\)\s*rotateY\(0deg\)/);
  assert.match(code.css, /\.tr-9:hover ~ #card\s*\{\s*transform:\s*rotateX\(-15deg\)\s*rotateY\(15deg\)/);
  assert.match(code.css, /transform-style:\s*preserve-3d/);
  assert.match(code.css, /#card \.title\s*\{[^}]*transform:\s*translateZ\(35px\)/);
});

test('2. Premium Element: Action Send Button (Multi-State Animation)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'action-send-btn';
  state.typography.titleText = 'إرسال';

  const code = generateElementCode('action-send-btn', state);

  // HTML checks
  assert.match(code.html, /<button type="button" class="beso-action-btn">/);
  assert.match(code.html, /<div class="state state--default">/);
  assert.match(code.html, /<div class="icon-wrapper plane-icon">/);
  assert.match(code.html, /<span style="--i:1">إ<\/span>/);
  assert.match(code.html, /<span style="--i:2">ر<\/span>/);
  assert.match(code.html, /<div class="state state--sent">/);
  assert.match(code.html, /<div class="icon-wrapper check-icon">/);

  // CSS checks
  assert.match(code.css, /\.beso-action-btn:hover \.label span\s*\{[^}]*animation:\s*wave/);
  assert.match(code.css, /@keyframes wave\s*\{/);
  assert.match(code.css, /@keyframes takeOff\s*\{/);
  assert.match(code.css, /@keyframes slideDown\s*\{/);
  assert.match(code.css, /\.beso-action-btn:active \.state--default/);
  assert.match(code.css, /\.beso-action-btn:active \.state--sent/);
});

test('3. Premium Element: Conic Glow Button (Spinning Gradient Edge)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'conic-glow-btn';
  state.typography.titleText = 'هالة النور الذهبية';

  const code = generateElementCode('conic-glow-btn', state);

  // HTML checks
  assert.match(code.html, /<button type="button" class="conic-gradient-btn">/);
  assert.match(code.html, /<span class="gradient-text">هالة النور الذهبية<\/span>/);

  // CSS checks
  assert.match(code.css, /\.conic-gradient-btn::before\s*\{[^}]*conic-gradient/);
  assert.match(code.css, /animation:\s*rotateConic 2s linear infinite/);
  assert.match(code.css, /\.conic-gradient-btn::after\s*\{[^}]*position:\s*absolute/);
  assert.match(code.css, /\.conic-gradient-btn \.gradient-text\s*\{[^}]*background-clip:\s*text/);
  assert.match(code.css, /@keyframes rotateConic\s*\{/);
  assert.match(code.css, /@keyframes textHue\s*\{/);
});

test('4. Premium Element: Frutiger Aero Glass Button (Shimmer Reflection)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'frutiger-aero-btn';
  state.typography.titleText = 'زجاج أيرو';

  const code = generateElementCode('frutiger-aero-btn', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-frutiger-btn">/);
  assert.match(code.html, /<div class="inner-glass">/);
  assert.match(code.html, /<div class="top-specular-light"><\/div>/);
  assert.match(code.html, /<span class="text-glow">زجاج أيرو<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-frutiger-btn\s*\{[^}]*background:\s*linear-gradient\(180deg,\s*#006caa,\s*#00c3ff\)/);
  assert.match(code.css, /\.beso-frutiger-btn \.inner-glass\s*\{[^}]*radial-gradient/);
  assert.match(code.css, /\.beso-frutiger-btn \.inner-glass::before\s*\{[^}]*animation:\s*aeroShimmer/);
  assert.match(code.css, /\.beso-frutiger-btn \.top-specular-light\s*\{/);
  assert.match(code.css, /@keyframes aeroShimmer\s*\{/);
});

test('5. Premium Element: Space Galaxy Orbit Button (Cosmic Glow & Stars)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'space-orbit-btn';
  state.typography.titleText = 'الفضاء العميق';

  const code = generateElementCode('space-orbit-btn', state);

  // HTML checks
  assert.match(code.html, /<button type="button" class="beso-space-btn">/);
  assert.match(code.html, /<strong class="space-title">الفضاء العميق<\/strong>/);
  assert.match(code.html, /<div id="container-stars">/);
  assert.match(code.html, /<div id="stars-particle-layer"><\/div>/);
  assert.match(code.html, /<div id="glow-aura">/);
  assert.match(code.html, /<div class="glow-circle-1"><\/div>/);
  assert.match(code.html, /<div class="glow-circle-2"><\/div>/);

  // CSS checks
  assert.match(code.css, /\.beso-space-btn\s*\{[^}]*linear-gradient\(137deg,\s*#ffdb3b,\s*#fe53bb,\s*#8f51ea,\s*#0044ff\)/);
  assert.match(code.css, /@keyframes spaceGradientShift\s*\{/);
  assert.match(code.css, /@keyframes starRotation\s*\{/);
  assert.match(code.css, /@keyframes neonPulse\s*\{/);
  assert.match(code.css, /\.beso-space-btn #stars-particle-layer\s*\{[^}]*radial-gradient/);
});

test('6. Premium Element: Adaptive Morphing Shell (Horizontal Reveal)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'adaptive-morph-btn';
  state.typography.titleText = 'المزيد';

  const code = generateElementCode('adaptive-morph-btn', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-morph-btn">/);
  assert.match(code.html, /<div class="sign-icon">/);
  assert.match(code.html, /<svg viewBox="0 0 512 512"/);
  assert.match(code.html, /<div class="morph-text">المزيد<\/div>/);

  // CSS checks
  assert.match(code.css, /\.beso-morph-btn\s*\{[^}]*width:\s*48px;\s*height:\s*48px;\s*border-radius:\s*50%/);
  assert.match(code.css, /\.beso-morph-btn:hover\s*\{[^}]*width:\s*150px;\s*border-radius:\s*30px/);
  assert.match(code.css, /\.beso-morph-btn \.morph-text\s*\{[^}]*opacity:\s*0/);
  assert.match(code.css, /\.beso-morph-btn:hover \.morph-text\s*\{[^}]*opacity:\s*1/);
});


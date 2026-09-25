import test from 'node:test';
import assert from 'node:assert/strict';
import { generateFinalCode, generateMaterialCSS } from '../src/lib/generateCode.js';
import { createInitialEffectState } from '../src/data/effects.js';

test('Material: Glassmorphism generates backdrop-filter, border, and specular highlight', () => {
  const css = generateMaterialCSS('glass', {
    mainColor: '#16157f',
    accentColor: '#d4af37',
    textColor: '#ffffff',
    borderRadius: 14,
    bevelDepth: 4,
  });
  assert.match(css, /backdrop-filter: blur\(20px\)/);
  assert.match(css, /inset 0 1px 0 rgba\(255, 255, 255, 0\.3\)/);
  assert.match(css, /border-radius: 14px/);
});

test('Material: Brushed Metal generates gradient, bevel depth, and highlights', () => {
  const css = generateMaterialCSS('metal', {
    mainColor: '#16157f',
    accentColor: '#d4af37',
    textColor: '#ffffff',
    borderRadius: 12,
    bevelDepth: 4,
  });
  assert.match(css, /linear-gradient\(145deg/);
  assert.match(css, /inset 0 1px 2px/);
  assert.match(css, /inset 0 -2px 4px/);
  assert.match(css, /text-shadow:/);
});

test('Material: Soft Ivory generates Neumorphic dual physical shadows', () => {
  const css = generateMaterialCSS('ivory', {
    mainColor: '#eae5d9',
    accentColor: '#d4af37',
    textColor: '#1e2022',
    borderRadius: 16,
    bevelDepth: 4,
  });
  assert.match(css, /background: #eae5d9/);
  assert.match(css, /rgba\(255, 255, 255, 0\.85\)/);
  assert.match(css, /rgba\(0, 0, 0, 0\.25\)/);
});

test('Material: Cyber Neon generates multi-layer neon glow and text shadow', () => {
  const css = generateMaterialCSS('neon', {
    mainColor: '#16157f',
    accentColor: '#00ffcc',
    textColor: '#ffffff',
    borderRadius: 10,
    bevelDepth: 4,
  });
  assert.match(css, /border: 2px solid #00ffcc/);
  assert.match(css, /box-shadow:[\s\S]*0 0 20px/);
  assert.match(css, /text-shadow: 0 0 8px/);
});

test('Button code generation includes tactile click and hover physics', () => {
  const state = createInitialEffectState();
  const code = generateFinalCode(state);
  assert.match(code.html, /class="beso-btn"/);
  assert.match(code.css, /\.beso-btn\s*\{/);
  assert.match(code.css, /\.beso-btn:hover\s*\{[^}]*transform: translateY\(-4px\)/);
  assert.match(code.css, /\.beso-btn:active\s*\{[^}]*transform: translateY\(2px\)/);
});

test('button text color and accent color are independently applied', () => {
  const state = createInitialEffectState();
  state.globalParams.mainColor = '#0d3b2e';
  state.globalParams.accentColor = '#ffcc00';
  state.globalParams.textColor = '#ffeecc';
  const code = generateFinalCode(state);
  assert.match(code.css, /color: #ffeecc;/);
  assert.match(code.css, /rgba\(255, 204, 0,/);
});

test('font size and font weight are independently applied', () => {
  const state = createInitialEffectState();
  state.globalParams.fontSize = 22;
  state.globalParams.fontWeight = 700;
  const code = generateFinalCode(state);
  assert.match(code.css, /font-size: 22px;/);
  assert.match(code.css, /font-weight: 700;/);
});

test('inline icons render with chosen position and disabling icon removes markup and CSS', () => {
  const state = createInitialEffectState();
  state.buttonParams.text = 'زر اختباري';
  state.buttonParams.showIcon = true;
  state.globalParams.iconPosition = 'before';
  let code = generateFinalCode(state);
  assert.ok(code.html.indexOf('<svg') < code.html.indexOf('<span>زر اختباري</span>'));
  assert.match(code.css, /\.beso-btn-icon/);

  state.buttonParams.showIcon = false;
  code = generateFinalCode(state);
  assert.doesNotMatch(code.html, /<svg/);
  assert.doesNotMatch(code.css, /\.beso-btn-icon/);
});

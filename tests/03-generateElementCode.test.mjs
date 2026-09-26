import test from 'node:test';
import assert from 'node:assert/strict';
import { generateElementCode } from '../src/lib/generateCode.js';
import { createInitialWorkspaceState } from '../src/data/elementsRegistry.js';

test('the button module continues to use its existing HTML and CSS generator', () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode('button', state);
  assert.match(code.html, /<button[^>]*class="beso-btn"/);
  assert.match(code.css, /\.beso-btn\s*\{/);
});

test('card module exports a matching semantic preview and style', () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode('card', state);
  assert.match(code.html, /<article class="beso-card">/);
  assert.match(code.html, /بطاقة Beso/);
  assert.match(code.css, /\.beso-card\s*\{/);
});

test('input module exports a labeled control and matching style', () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode('input', state);
  assert.match(code.html, /class="beso-field/);
  assert.match(code.html, /placeholder="ادخل بريدك هنا\.\.\."/);
  assert.match(code.css, /\.beso-input\s*\{/);
});

test('badge module exports a compact status element and matching style', () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode('badge', state);
  assert.match(code.html, /<span class="beso-badge">/);
  assert.match(code.html, /VIP/);
  assert.match(code.css, /\.beso-badge\s*\{/);
});

test('social module exports interactive social media dock and matching style', () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode('social', state);
  assert.match(code.html, /class="beso-social-dock"/);
  assert.match(code.css, /\.beso-social-dock\s*\{/);
  assert.match(code.css, /\.beso-social-btn\s*\{/);
});

test('module-specific edits flow to HTML and CSS without affecting other module defaults', () => {
  const state = createInitialWorkspaceState();
  state.cardParams.title = 'واجهة <Beso>';
  state.globalParams.borderRadius = 28;
  const card = generateElementCode('card', state);
  assert.match(card.html, /واجهة &lt;Beso&gt;/);
  assert.match(card.css, /border-radius: 28px/);

  state.inputParams.placeholder = 'اكتب "نصًا"';
  const input = generateElementCode('input', state);
  assert.match(input.html, /placeholder="اكتب &quot;نصًا&quot;"/);
});

test('each core module has isolated, valid output with no inactive module selectors', () => {
  const state = createInitialWorkspaceState();
  for (const id of ['card', 'input', 'badge', 'social']) {
    const code = generateElementCode(id, state);
    assert.ok(code.html.length > 0);
    assert.ok(code.css.length > 0);
    assert.doesNotMatch(code.css, /undefined|NaN|;;/);
  }
  assert.doesNotMatch(generateElementCode('card', state).css, /\.beso-social-dock/);
});

test('quantum portal hero canvas generates valid HTML and CSS with particles', () => {
  const state = createInitialWorkspaceState();
  state.animations.particleOverlay = 'particles-cyber-mesh';
  const code = generateElementCode('hero-quantum-portal', state);
  assert.match(code.html, /beso-hero-portal-wrapper/);
  assert.match(code.html, /portal-core-singularity/);
  assert.match(code.html, /beso-particle-layer/);
  assert.match(code.css, /\.beso-hero-portal-wrapper/);
});

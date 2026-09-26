import test from 'node:test';
import assert from 'node:assert/strict';
import { ELEMENTS_CONFIG, createInitialWorkspaceState } from '../src/data/elementsRegistry.js';

test('workspace exposes the planned core elements and keeps later engines visible', () => {
  assert.deepEqual(
    ELEMENTS_CONFIG.filter((element) => element.status === 'active').map((element) => element.id),
    ['cyber-card', 'action-send-btn', 'conic-glow-btn', 'frutiger-aero-btn', 'space-orbit-btn', 'adaptive-morph-btn', 'like-heart-btn', 'multi-layer-diff-btn', 'figma-vector-frame', 'ripple-wave-btn', 'cyber-glimmer-card', 'holographic-3d-ring', 'cyber-matrix-badge', 'glass-morph-card-3d', 'glowing-border-button', 'biometric-auth-card', 'quantum-toggle-switch', 'holographic-price-card', 'cyber-truck-card', 'anime-treadmill-card', 'ticker-tape-card', 'slot-machine-card', 'retro-crt-glitch', 'audio-equalizer-card', 'kinetic-cart-slide', 'quick-quantity-counter', 'liquid-tote-fill', 'wa-pulse-glow', 'wa-continuous-spin', 'wa-expandable-badge', 'hero-cyber-grid', 'hero-aurora-wave', 'hero-cosmic-particles', 'hero-quantum-portal', 'hero-hyper-vortex', 'hero-glass-prism', 'button', 'card', 'input', 'badge', 'social']
  );
  assert.deepEqual(
    ELEMENTS_CONFIG.filter((element) => element.status === 'coming_soon').map((element) => element.id),
    ['hero', 'particles']
  );
});

test('workspace defaults select the cyber-card and keep independent module values', () => {
  const first = createInitialWorkspaceState();
  first.elementParams.card.title = 'Changed';
  const second = createInitialWorkspaceState();

  assert.equal(first.activeElement, 'cyber-card');
  assert.equal(second.elementParams.card.title, 'بطاقة Beso الفاخرة');
  assert.equal(second.elementParams.input.placeholder, 'ادخل بريدك هنا...');
  assert.equal(second.elementParams.badge.label, 'عنصر فاخر VIP');
});

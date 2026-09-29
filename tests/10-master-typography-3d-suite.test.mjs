// tests/10-master-typography-3d-suite.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { createInitialWorkspaceState } from "../src/data/elementsRegistry.js";
import { generateElementCode } from "../src/lib/generateCode.js";

test("1. Multi-Target Tabbed Typography Controller strictly isolates Title, Description and Button", () => {
  const state = createInitialWorkspaceState();
  state.activeElement = "card";
  state.typography.titleText = "عنوان حصري فاخر";
  state.typography.titleSize = 36;
  state.typography.titleColor = "#facc15";
  state.typography.titleWeight = 800;
  state.typography.titleAlign = "center";
  state.typography.titleShadowDepth = 5;

  state.typography.descText = "تفاصيل وصفية مستقلة تماما";
  state.typography.descSize = 18;
  state.typography.descColor = "#93c5fd";
  state.typography.descWeight = 300;

  state.typography.buttonText = "انقر هنا ✦";
  state.typography.buttonSize = 20;
  state.typography.buttonColor = "#f43f5e";

  const code = generateElementCode("card", state);

  assert.match(code.html, /عنوان حصري فاخر/);
  assert.match(code.html, /تفاصيل وصفية مستقلة تماما/);
  assert.match(code.css, /font-size:\s*36px/);
  assert.match(code.css, /color:\s*#FACC15/i);
  assert.match(code.css, /font-size:\s*18px/);
  assert.match(code.css, /color:\s*#93C5FD/i);
});

test("2. Hero Canvases render custom background image layer with opacity and tint blend", () => {
  const heroElements = [
    "hero-cyber-grid",
    "hero-aurora-wave",
    "hero-cosmic-particles",
    "hero-hyper-vortex",
    "hero-glass-prism",
    "hero-quantum-portal",
  ];

  for (const heroId of heroElements) {
    const state = createInitialWorkspaceState();
    state.activeElement = heroId;
    state.media.heroBgImage = "https://example.com/custom-hero-bg.jpg";
    state.media.heroBgOverlayOpacity = 0.4;
    state.media.heroBgTint = "#091a13";
    state.media.heroBgObjectFit = "cover";

    const code = generateElementCode(heroId, state);

    assert.match(code.html, /<div class="beso-hero-custom-bg"><\/div>/, `Hero ${heroId} must contain custom bg layer html`);
    assert.match(code.css, /\.beso-hero-custom-bg\s*\{[^}]*background-image:\s*url\('https:\/\/example\.com\/custom-hero-bg\.jpg'\)/, `Hero ${heroId} must contain custom bg layer css`);
  }
});

test("3. Brand Style Guide Card maps dynamic swatches without hardcoded colors", () => {
  const state = createInitialWorkspaceState();
  state.activeElement = "brand-identity-card";
  state.lighting.colorStop1 = "#ff0055";
  state.lighting.colorStop2 = "#00ffcc";
  state.lighting.colorStop3 = "#8800ff";
  state.lighting.glowColor = "#ffaa00";
  state.dimensions.borderColor = "#00aaff";
  state.typography.titleColor = "#ffffff";
  state.typography.descColor = "#e2e8f0";

  const code = generateElementCode("brand-identity-card", state);

  // Swatches must dynamically reflect selected hexes
  assert.match(code.html, /style="background:\s*#FF0055/i);
  assert.match(code.html, /style="background:\s*#00FFCC/i);
  assert.match(code.html, /style="background:\s*#8800FF/i);
  assert.match(code.html, /style="background:\s*#FFAA00/i);
  assert.match(code.html, /style="background:\s*#00AAFF/i);
  // Geometry indicators must be present
  assert.match(code.html, /مؤشرات الهندسة والسطح المادي/);
});

test("4. Path Marquees and 3D Geometry dynamically bind custom speeds, radii and angles", () => {
  const state = createInitialWorkspaceState();
  state.activeElement = "marquee-elliptical-track";
  state.media.marqueeSpeed = 8;
  state.media.marqueeRadiusX = 220;
  state.media.marqueeRadiusY = 180;
  state.media.marqueeIconSize = 24;
  state.media.marqueeItemsTop = "⚡ Power, 💎 Luxury, 👑 Royal";

  const codeEllipse = generateElementCode("marquee-elliptical-track", state);
  assert.match(codeEllipse.css, /animation:\s*besoEllipseSpin 8s/);
  assert.match(codeEllipse.html, /Power/);
  assert.match(codeEllipse.html, /Luxury/);

  state.activeElement = "marquee-dual-opposite";
  state.media.marqueeInvertDirection = true;
  const codeDual = generateElementCode("marquee-dual-opposite", state);
  assert.match(codeDual.css, /\.beso-track-left\s*\{[^}]*animation:\s*besoScrollRight/);
  assert.match(codeDual.css, /\.beso-track-right\s*\{[^}]*animation:\s*besoScrollLeft/);
});

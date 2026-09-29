import { test } from "node:test";
import assert from "node:assert/strict";
import { generateElementCode } from "../src/lib/generateCode.js";
import { createInitialEffectState } from "../src/data/effects.js";

test("Hero Backdrop: direct opacity, z-index layering and clear visibility without blend obstruction", () => {
  const heroElements = [
    "hero-cyber-grid",
    "hero-aurora-wave",
    "hero-cosmic-particles",
    "hero-hyper-vortex",
    "hero-glass-prism",
    "hero-quantum-portal",
  ];

  for (const heroId of heroElements) {
    const state = createInitialEffectState();
    state.activeElement = heroId;
    state.media = {
      ...state.media,
      heroBgImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      heroBgOverlayOpacity: 0.9,
      heroBgTint: "#051e15",
      heroBgObjectFit: "cover",
      heroBgBlur: 2,
    };

    const code = generateElementCode(heroId, state);

    // 1. Layer HTML presence
    assert.match(code.html, /<div class="beso-hero-custom-bg"><\/div>/, `${heroId} must have custom hero backdrop HTML element`);

    // 2. No mix-blend-mode: overlay (which crushes dark backgrounds)
    assert.ok(!code.css.includes("mix-blend-mode: overlay"), `${heroId} must not have mix-blend-mode: overlay which hides the image`);

    // 3. Direct positive opacity (0.9, NOT 1 - 0.9 = 0.1)
    assert.match(code.css, /opacity:\s*0\.9/, `${heroId} must have direct positive opacity 0.9`);

    // 4. Blur filter applied
    assert.match(code.css, /filter:\s*blur\(2px\)/, `${heroId} must have blur filter`);

    // 5. Proper z-index layering (z-index: 1)
    assert.match(code.css, /z-index:\s*1;/, `${heroId} custom bg layer must have z-index: 1`);

    // 6. Content layer in front (z-index: 10)
    assert.match(code.css, /\.hero-content-layer\s*\{[^}]*z-index:\s*10;/s, `${heroId} content must have z-index: 10`);
  }
});

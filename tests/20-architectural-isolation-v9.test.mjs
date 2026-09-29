// tests/20-architectural-isolation-v9.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import {
  CATEGORY_DEFINITIONS,
  COMPONENT_ALLOWED_CATEGORIES,
  getComponentCategories,
  getComponentAllowedCategories,
} from "../src/data/effects.js";
import {
  sanitizeParams,
  generateElementCode,
} from "../src/utils/codeGenerator.js";

test("V9 Architecture: LAYER 1 - CATEGORY_DEFINITIONS & getComponentCategories", () => {
  // Validate Category Definitions
  assert.ok(CATEGORY_DEFINITIONS.typography, "typography definition exists");
  assert.ok(CATEGORY_DEFINITIONS.kinetic_tracks, "kinetic_tracks definition exists");
  assert.ok(CATEGORY_DEFINITIONS.bento_glow, "bento_glow definition exists");
  assert.ok(CATEGORY_DEFINITIONS.materials, "materials definition exists");

  // getComponentCategories works with string ID
  const heroCats = getComponentCategories("hero-kinetic-dual-track");
  assert.ok(Array.isArray(heroCats));
  assert.ok(heroCats.includes("kinetic_tracks"));
  assert.ok(!heroCats.includes("bento_glow"));

  // getComponentCategories works with object
  const bentoCats = getComponentCategories({ id: "magic-bento-card" });
  assert.ok(Array.isArray(bentoCats));
  assert.ok(bentoCats.includes("bento_glow"));
  assert.ok(!bentoCats.includes("kinetic_tracks"));

  // Fallback for unknown element
  const fallbackCats = getComponentCategories("unknown-custom-component");
  assert.deepEqual(fallbackCats, ["typography", "materials", "lighting", "dimensions"]);

  // getComponentAllowedCategories alias
  assert.equal(typeof getComponentAllowedCategories, "function");
});

test("V9 Architecture: LAYER 2 - sanitizeParams strips non-allowed categories", () => {
  const dirtyParams = {
    typography: { fontSize: 24, color: "#ffffff" },
    kinetic_tracks: { speed: 12, direction: "normal" },
    bento_glow: { glowColor: "#ff00ea", spread: 250 },
    carousel_3d: { faceCount: 6 },
    materials: { bg: "rgba(0,0,0,0.8)", radius: 16 },
  };

  // hero-kinetic-dual-track does NOT allow bento_glow or carousel_3d
  const sanitizedHero = sanitizeParams("hero-kinetic-dual-track", dirtyParams);
  assert.ok(sanitizedHero.typography, "typography should remain");
  assert.ok(sanitizedHero.kinetic_tracks, "kinetic_tracks should remain");
  assert.equal(sanitizedHero.bento_glow, undefined, "bento_glow MUST be stripped");
  assert.equal(sanitizedHero.carousel_3d, undefined, "carousel_3d MUST be stripped");

  // magic-bento-card does NOT allow kinetic_tracks
  const sanitizedBento = sanitizeParams("magic-bento-card", dirtyParams);
  assert.ok(sanitizedBento.typography, "typography should remain");
  assert.ok(sanitizedBento.bento_glow, "bento_glow should remain");
  assert.equal(sanitizedBento.kinetic_tracks, undefined, "kinetic_tracks MUST be stripped");
});

test("V9 Architecture: LAYER 2 - Pure Code Generator (src/utils/codeGenerator.js)", () => {
  const result = generateElementCode(
    { id: "hero-kinetic-dual-track", name: "المسار الحركي" },
    {
      typography: { fontSize: 32, fontWeight: 800, color: "#10b981", text: "عنوان مخصص" },
      kinetic_tracks: { speed: 18, direction: "reverse" },
      bento_glow: { glowColor: "rgba(255,0,0,1)", spread: 300 }, // Illegal parameter for hero
    }
  );

  assert.ok(result.html.includes("hero-kinetic-dual-track-wrapper"));
  assert.ok(result.html.includes("عنوان مخصص"));
  assert.ok(result.css.includes("--track-speed: 18s;"));
  assert.ok(result.css.includes("--track-dir: reverse;"));
  // Ensure bento_glow properties were NOT injected
  assert.ok(!result.css.includes("--glow-spread"), "Illegal bento property must not exist in CSS");
  assert.equal(result.js, "", "hero-kinetic-dual-track should have no spotlight JS");

  // Test bento card code generator includes spotlight JS
  const bentoResult = generateElementCode(
    { id: "magic-bento-card", name: "بينتو ماجيك" },
    {
      typography: { fontSize: 20, color: "#facc15" },
      bento_glow: { glowColor: "rgba(234, 179, 8, 0.2)", spread: 180 },
    }
  );
  assert.ok(bentoResult.css.includes("--glow-color: rgba(234, 179, 8, 0.2);"));
  assert.ok(bentoResult.js.includes("Beso Studio Interactive Spotlight Effect"));
});

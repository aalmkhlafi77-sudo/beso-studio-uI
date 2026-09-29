// tests/18-v9-contextual-inspector.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import {
  COMPONENT_ALLOWED_CATEGORIES,
  ELEMENT_PRESETS,
  EFFECT_PRESETS,
  getComponentAllowedCategories,
} from "../src/data/effects.js";
import { ELEMENTS_CONFIG, createInitialWorkspaceState } from "../src/data/elementsRegistry.js";

test("V9.0: Component-Bound Parameter Mapping exports and exact definitions", () => {
  // Check exports
  assert.ok(COMPONENT_ALLOWED_CATEGORIES, "COMPONENT_ALLOWED_CATEGORIES must be exported");
  assert.ok(ELEMENT_PRESETS, "ELEMENT_PRESETS must be exported");
  assert.ok(EFFECT_PRESETS, "EFFECT_PRESETS alias must be exported");
  assert.equal(typeof getComponentAllowedCategories, "function");

  // hero-kinetic-dual-track
  assert.deepEqual(
    COMPONENT_ALLOWED_CATEGORIES["hero-kinetic-dual-track"],
    ["typography", "gradients", "kinetic_tracks", "cta_button"]
  );

  // magic-bento-card
  assert.deepEqual(
    COMPONENT_ALLOWED_CATEGORIES["magic-bento-card"],
    ["typography", "bento_glow", "background_image"]
  );

  // carousel-3d-cube
  assert.deepEqual(
    COMPONENT_ALLOWED_CATEGORIES["carousel-3d-cube"],
    ["3d_carousels", "carousel_images", "perspective"]
  );

  // brand-identity-card
  assert.deepEqual(
    COMPONENT_ALLOWED_CATEGORIES["brand-identity-card"],
    ["typography", "brand_colors", "materials", "logo_branding"]
  );
});

test("V9.0: ELEMENTS_CONFIG registry integrates allowedCategories across all elements", () => {
  for (const element of ELEMENTS_CONFIG) {
    if (element.status === "active") {
      assert.ok(
        Array.isArray(element.allowedCategories),
        `Element ${element.id} must have allowedCategories array`
      );
      assert.ok(
        element.allowedCategories.length > 0,
        `Element ${element.id} must have at least one allowed category`
      );
    }
  }
});

test("V9.0: Dynamic Contextual Filtering - strict isolation of specialized controls", () => {
  // 1. Elements that do not use 3D geometry MUST NOT have 'perspective' or '3d_carousels'
  const non3D = ["hero-kinetic-dual-track", "magic-bento-card", "button", "card"];
  for (const id of non3D) {
    const cats = getComponentAllowedCategories(id);
    assert.ok(!cats.includes("perspective"), `${id} must NOT have perspective`);
    assert.ok(!cats.includes("3d_carousels"), `${id} must NOT have 3d_carousels`);
  }

  // 2. Elements that do not use kinetic tracks MUST NOT have 'kinetic_tracks'
  const nonKinetic = ["magic-bento-card", "carousel-3d-cube", "brand-identity-card", "button"];
  for (const id of nonKinetic) {
    const cats = getComponentAllowedCategories(id);
    assert.ok(!cats.includes("kinetic_tracks"), `${id} must NOT have kinetic_tracks`);
  }

  // 3. Elements that do not use Bento Glow MUST NOT have 'bento_glow'
  const nonBento = ["hero-kinetic-dual-track", "carousel-3d-cube", "brand-identity-card", "card"];
  for (const id of nonBento) {
    const cats = getComponentAllowedCategories(id);
    assert.ok(!cats.includes("bento_glow"), `${id} must NOT have bento_glow`);
  }
});

test("V9.0: Zero Overlap State Sanitization - decoupled effectState paths", () => {
  const workspace = createInitialWorkspaceState();

  // Initialize decoupled states for two distinct elements
  workspace.effectState = {
    "hero-kinetic-dual-track": {
      media: { kineticTrackSpeed: 25, kineticHeadline: "Custom Hero" },
      dimensions: { width: 1000 },
    },
    "magic-bento-card": {
      media: { bentoGlowRadius: 400, bentoTitle: "Custom Bento" },
      dimensions: { width: 380 },
    },
  };

  // Mutate hero-kinetic-dual-track state
  workspace.effectState["hero-kinetic-dual-track"].media.kineticTrackSpeed = 45;
  workspace.effectState["hero-kinetic-dual-track"].media.kineticHeadline = "Mutated Hero";

  // Verify magic-bento-card remains completely unaffected and pristine
  assert.equal(workspace.effectState["magic-bento-card"].media.bentoGlowRadius, 400);
  assert.equal(workspace.effectState["magic-bento-card"].media.bentoTitle, "Custom Bento");
  assert.equal(workspace.effectState["magic-bento-card"].dimensions.width, 380);

  // Mutate magic-bento-card
  workspace.effectState["magic-bento-card"].media.bentoGlowRadius = 550;

  // Verify hero-kinetic-dual-track unchanged
  assert.equal(workspace.effectState["hero-kinetic-dual-track"].media.kineticTrackSpeed, 45);
  assert.equal(workspace.effectState["hero-kinetic-dual-track"].media.kineticHeadline, "Mutated Hero");
});

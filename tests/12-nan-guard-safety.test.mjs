import test from "node:test";
import assert from "node:assert/strict";
import { initialDimensions, initialLighting, initialTypography, initialAnimations, initialMediaParams } from "../src/data/effects.js";
import { generateElementCode } from "../src/lib/generateCode.js";

test("V6.1.1: NaN Guard & Parameter Normalization Safety", async (t) => {
  await t.test("1. Initial state objects contain finite numbers for all slider metrics", () => {
    assert.strictEqual(Number.isFinite(initialDimensions.shadowDepth), true);
    assert.strictEqual(Number.isFinite(initialDimensions.shadowBlur), true);
    assert.strictEqual(Number.isFinite(initialDimensions.borderRadius), true);
    assert.strictEqual(Number.isFinite(initialDimensions.padding), true);
    assert.strictEqual(Number.isFinite(initialTypography.titleShadowDepth), true);
    assert.strictEqual(Number.isFinite(initialTypography.titleShadowBlur), true);
    assert.strictEqual(Number.isFinite(initialTypography.descShadowDepth), true);
    assert.strictEqual(Number.isFinite(initialTypography.descShadowBlur), true);
    assert.strictEqual(Number.isFinite(initialTypography.buttonShadowDepth), true);
    assert.strictEqual(Number.isFinite(initialTypography.buttonShadowBlur), true);
  });

  await t.test("2. Code generator handles empty/undefined dimensions and typography without NaN output", () => {
    const code = generateElementCode("brand-identity-card", {
      dimensions: {},
      lighting: {},
      typography: {},
      animations: {},
      media: {},
      globalParams: {},
    });

    assert.ok(code.html);
    assert.ok(code.css);
    assert.strictEqual(code.html.includes("NaN"), false, "HTML should not contain NaN");
    assert.strictEqual(code.css.includes("NaN"), false, "CSS should not contain NaN");
  });

  await t.test("3. Code generator for standard cards and buttons handles nullish props without NaN", () => {
    const cardCode = generateElementCode("card", {
      dimensions: { width: undefined, height: undefined, borderRadius: undefined },
      typography: { titleShadowDepth: undefined },
    });
    assert.strictEqual(cardCode.css.includes("NaN"), false);

    const btnCode = generateElementCode("button", {
      dimensions: {},
      typography: {},
    });
    assert.strictEqual(btnCode.css.includes("NaN"), false);
  });
});

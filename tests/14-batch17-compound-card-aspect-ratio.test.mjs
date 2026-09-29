import test from "node:test";
import assert from "node:assert/strict";
import { ELEMENTS_CONFIG, createInitialWorkspaceState } from "../src/data/elementsRegistry.js";
import { initialMediaParams } from "../src/data/effects.js";
import { generateElementCode } from "../src/lib/generateCode.js";

test("Batch 17: Compound Media Card is registered in ELEMENTS_CONFIG", () => {
  const compoundCard = ELEMENTS_CONFIG.find((el) => el.id === "compound-media-card");
  assert.ok(compoundCard, "compound-media-card should be registered");
  assert.equal(compoundCard.category, "premium");
  assert.equal(compoundCard.status, "active");
  assert.ok(compoundCard.label.includes("بطاقة الوسائط المركبة"));
});

test("Batch 17: initialMediaParams exports default aspect ratio engine fields", () => {
  assert.equal(typeof initialMediaParams.imageWidth, "number");
  assert.equal(typeof initialMediaParams.imageHeight, "number");
  assert.equal(typeof initialMediaParams.isAspectLocked, "boolean");
  assert.equal(typeof initialMediaParams.aspectRatio, "string");
  assert.equal(typeof initialMediaParams.customImgUrl, "string");
  assert.equal(typeof initialMediaParams.objectFit, "string");
});

test("Batch 17: generateElementCode generates compound-media-card with expected HTML structure and CSS physics", () => {
  const state = createInitialWorkspaceState();
  state.activeElement = "compound-media-card";
  state.media.customImgUrl = "https://example.com/demo.jpg";
  state.media.imageWidth = 400;
  state.media.imageHeight = 225;
  state.typography.titleText = "عنوان فخم للبطاقة المركبة";
  state.typography.descText = "وصف تفصيلي للبطاقة بخصائص زجاجية";
  state.typography.buttonText = "استكشف التفاصيل ✦";

  const { html, css } = generateElementCode("compound-media-card", state);

  // HTML Structure Assertions
  assert.ok(html.includes('class="beso-compound-card material-'), "HTML should contain beso-compound-card");
  assert.ok(html.includes('class="media-frame-wrapper"'), "HTML should contain media-frame-wrapper");
  assert.ok(html.includes('src="https://example.com/demo.jpg"'), "HTML should include custom image URL");
  assert.ok(html.includes('class="compound-img"'), "HTML should contain compound-img class");
  assert.ok(html.includes('class="img-overlay-glow"'), "HTML should contain img-overlay-glow");
  assert.ok(html.includes('class="compound-card-content"'), "HTML should contain compound-card-content");
  assert.ok(html.includes('class="compound-badge"'), "HTML should contain compound-badge");
  assert.ok(html.includes('class="compound-title"'), "HTML should contain compound-title");
  assert.ok(html.includes('class="compound-desc"'), "HTML should contain compound-desc");
  assert.ok(html.includes('class="compound-action-btn"'), "HTML should contain compound-action-btn");
  assert.ok(html.includes('عنوان فخم للبطاقة المركبة'), "HTML should bind custom titleText");

  // CSS Physics Assertions
  assert.ok(css.includes('.beso-compound-card:hover .compound-img'), "CSS should contain hover zoom rule");
  assert.ok(css.includes('transform: scale(1.06)'), "CSS should implement transform scale 1.06");
  assert.ok(css.includes('400px'), "CSS should bind image width");
  assert.ok(css.includes('225px'), "CSS should bind image height");
});

test("Batch 17: generateElementCode handles nullish media params without NaN", () => {
  const result = generateElementCode("compound-media-card", {
    media: null,
    typography: null,
    dimensions: null,
    lighting: null,
  });

  assert.ok(result.html, "HTML should be generated without error");
  assert.ok(result.css, "CSS should be generated without error");
  assert.ok(!result.css.includes("NaN"), "CSS should not contain NaN");
  assert.ok(!result.html.includes("NaN"), "HTML should not contain NaN");
});

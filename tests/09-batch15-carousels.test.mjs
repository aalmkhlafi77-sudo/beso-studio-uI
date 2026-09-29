// tests/09-batch15-carousels.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { generateElementCode } from "../src/lib/generateCode.js";
import { createInitialWorkspaceState, ELEMENTS_CONFIG } from "../src/data/elementsRegistry.js";

test("1. Batch 15 elements are registered in ELEMENTS_CONFIG", () => {
  const cube = ELEMENTS_CONFIG.find((e) => e.id === "carousel-3d-cube");
  const hex = ELEMENTS_CONFIG.find((e) => e.id === "carousel-3d-hexagon");
  const octa = ELEMENTS_CONFIG.find((e) => e.id === "carousel-3d-octagon");
  const sphere = ELEMENTS_CONFIG.find((e) => e.id === "carousel-3d-sphere");
  const ellipse = ELEMENTS_CONFIG.find((e) => e.id === "marquee-elliptical-track");
  const dual = ELEMENTS_CONFIG.find((e) => e.id === "marquee-dual-opposite");
  const brand = ELEMENTS_CONFIG.find((e) => e.id === "brand-identity-card");

  assert.ok(cube, "carousel-3d-cube registered");
  assert.ok(hex, "carousel-3d-hexagon registered");
  assert.ok(octa, "carousel-3d-octagon registered");
  assert.ok(sphere, "carousel-3d-sphere registered");
  assert.ok(ellipse, "marquee-elliptical-track registered");
  assert.ok(dual, "marquee-dual-opposite registered");
  assert.ok(brand, "brand-identity-card registered");
});

test("2. Carousel 3D Cube generates 4 faces with 3D rotation physics", () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode("carousel-3d-cube", state);

  assert.ok(code.html.includes("beso-cube-stage"), "stage present");
  assert.ok(code.html.includes("beso-cube-face-1"), "face 1 present");
  assert.ok(code.html.includes("beso-cube-face-4"), "face 4 present");
  assert.ok(code.css.includes("transform-style: preserve-3d"), "3d preservation present");
  assert.ok(code.css.includes("rotateY(270deg)"), "90-degree step present");
  assert.ok(code.css.includes("@keyframes besoCubeSpin"), "spin keyframe present");
});

test("3. Carousel 3D Hexagon generates 6 faces with 60-degree increments", () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode("carousel-3d-hexagon", state);

  assert.ok(code.html.includes("beso-hex-stage"), "hex stage present");
  assert.ok(code.html.includes("rotateY(0deg)"), "0 deg face");
  assert.ok(code.html.includes("rotateY(300deg)"), "300 deg face");
  assert.ok(code.css.includes("@keyframes besoHexSpin"), "hex spin keyframe present");
});

test("4. Carousel 3D Octagon generates 8 faces with 45-degree increments", () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode("carousel-3d-octagon", state);

  assert.ok(code.html.includes("beso-octa-stage"), "octa stage present");
  assert.ok(code.html.includes("rotateY(315deg)"), "315 deg face");
  assert.ok(code.css.includes("@keyframes besoOctaSpin"), "octa spin keyframe present");
});

test("5. Carousel 3D Sphere generates orbital rings and celestial satellites", () => {
  const state = createInitialWorkspaceState();
  const code = generateElementCode("carousel-3d-sphere", state);

  assert.ok(code.html.includes("beso-sphere-rings"), "sphere rings present");
  assert.ok(code.html.includes("beso-sphere-center"), "sphere center present");
  assert.ok(code.css.includes("@keyframes besoRingOrbit"), "orbit animation present");
});

test("6. Marquee Elliptical Track & Dual Opposite Marquee generate smooth trajectory loops", () => {
  const state = createInitialWorkspaceState();
  const ellipse = generateElementCode("marquee-elliptical-track", state);
  const dual = generateElementCode("marquee-dual-opposite", state);

  assert.ok(ellipse.html.includes("beso-ellipse-track"), "ellipse track present");
  assert.ok(ellipse.css.includes("@keyframes besoEllipseSpin"), "ellipse spin present");

  assert.ok(dual.html.includes("beso-track-left"), "left track present");
  assert.ok(dual.html.includes("beso-track-right"), "right track present");
  assert.ok(dual.css.includes("@keyframes besoScrollLeft"), "scroll left keyframe");
  assert.ok(dual.css.includes("@keyframes besoScrollRight"), "scroll right keyframe");
});

test("7. Brand Style Guide Card generates 6 material themes and typography hierarchy", () => {
  const state = createInitialWorkspaceState();
  const brand = generateElementCode("brand-identity-card", state);

  assert.ok(brand.html.includes("beso-brand-guide-card"), "brand guide card present");
  assert.ok(brand.html.includes("beso-materials-grid"), "materials grid present");
  assert.ok(brand.html.includes("beso-typo-hierarchy"), "typography hierarchy present");
  assert.ok(brand.html.includes("beso-color-swatches"), "color swatches present");
});

test("8. Carousel custom images render dynamically on cube faces", () => {
  const state = createInitialWorkspaceState();
  state.media = {
    ...state.media,
    carouselImages: [
      "https://images.unsplash.com/photo-1",
      "https://images.unsplash.com/photo-2",
      "",
      "",
    ],
  };
  const code = generateElementCode("carousel-3d-cube", state);

  assert.ok(code.html.includes('src="https://images.unsplash.com/photo-1"'), "custom image 1 rendered");
  assert.ok(code.html.includes('src="https://images.unsplash.com/photo-2"'), "custom image 2 rendered");
  assert.ok(code.html.includes("لوح صور 3"), "fallback for face 3 rendered");
});

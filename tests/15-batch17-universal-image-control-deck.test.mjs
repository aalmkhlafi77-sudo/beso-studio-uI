import { test } from "node:test";
import assert from "node:assert/strict";
import { initialMediaParams } from "../src/data/effects.js";
import { generateElementCode } from "../src/lib/generateCode.js";

test("Universal Image Control Deck V7.5: initialMediaParams default export integrity", () => {
  assert.equal(initialMediaParams.imageWidth, 360);
  assert.equal(initialMediaParams.imageHeight, 200);
  assert.equal(initialMediaParams.isAspectLocked, true);
  assert.equal(initialMediaParams.aspectRatio, "16:9");
  assert.equal(initialMediaParams.objectFit, "cover");
  assert.equal(initialMediaParams.heroBgObjectFit, "cover");
  assert.equal(initialMediaParams.logoWidth, 64);
  assert.equal(initialMediaParams.logoHeight, 64);
});

test("Universal Image Control Deck V7.5: Hero Background Images & Patterns binding", () => {
  const state = {
    activeElement: "hero-cyber-grid",
    media: {
      heroBgImage: "https://example.com/hero-backdrop.jpg",
      heroBgObjectFit: "contain",
      imageWidth: 600,
      imageHeight: 400,
      heroBgOverlayOpacity: 0.75,
      heroBgTint: "#051a10",
    },
  };

  const code = generateElementCode("hero-cyber-grid", state);
  assert.ok(code.css.includes(".beso-hero-custom-bg"));
  assert.ok(code.css.includes("background-size: contain"));
  assert.ok(code.css.includes(".beso-hero-bg-img"));
  assert.ok(code.css.includes("object-fit: contain"));
  assert.ok(!code.css.includes("NaN"));
});

test("Universal Image Control Deck V7.5: Brand Logo Deck width, height & object-fit binding", () => {
  const state = {
    activeElement: "brand-identity-card",
    media: {
      logoUrl: "https://example.com/logo.png",
      logoWidth: 120,
      logoHeight: 80,
      logoKeepAspect: true,
      logoObjectFit: "contain",
    },
  };

  const code = generateElementCode("brand-identity-card", state);
  assert.ok(code.css.includes("width: 120px;"));
  assert.ok(code.css.includes("height: 80px;"));
  assert.ok(code.css.includes("object-fit: contain;"));
  assert.ok(!code.css.includes("NaN"));
});

test("Universal Image Control Deck V7.5: 3D Polyhedral Carousel face images object-fit binding", () => {
  const stateCube = {
    activeElement: "carousel-3d-cube",
    media: {
      objectFit: "contain",
    },
  };

  const codeCube = generateElementCode("carousel-3d-cube", stateCube);
  assert.ok(codeCube.css.includes(".beso-cube-face img, .beso-carousel-face img"));
  assert.ok(codeCube.css.includes("object-fit: contain;"));

  const stateHex = {
    activeElement: "carousel-3d-hexagon",
    media: {
      objectFit: "fill",
    },
  };

  const codeHex = generateElementCode("carousel-3d-hexagon", stateHex);
  assert.ok(codeHex.css.includes(".beso-hex-face img, .beso-carousel-face img"));
  assert.ok(codeHex.css.includes("object-fit: fill;"));
});

test("Universal Image Control Deck V7.5: Compound Media Card universal wiring", () => {
  const state = {
    activeElement: "compound-media-card",
    media: {
      customImgUrl: "https://example.com/card.jpg",
      imageWidth: 450,
      imageHeight: 280,
      objectFit: "cover",
    },
  };

  const code = generateElementCode("compound-media-card", state);
  assert.ok(code.html.includes('style="width: 450px; height: 280px;"'));
  assert.ok(code.html.includes('style="object-fit: cover;"'));
  assert.ok(code.css.includes("width: 450px;"));
  assert.ok(code.css.includes("height: 280px;"));
  assert.ok(code.css.includes("object-fit: cover;"));
  assert.ok(!code.css.includes("NaN"));
});

test("Universal Image Control Deck V7.5: Range bounds clamping up to 1200px", () => {
  const state = {
    activeElement: "compound-media-card",
    media: {
      imageWidth: 1600,
      imageHeight: 1400,
      logoWidth: 1500,
      logoHeight: 1300,
    },
  };

  const code = generateElementCode("compound-media-card", state);
  assert.ok(code.css.includes("width: 1200px;"));
  assert.ok(code.css.includes("height: 1200px;"));
  assert.ok(!code.css.includes("1600px"));
  assert.ok(!code.css.includes("NaN"));
});

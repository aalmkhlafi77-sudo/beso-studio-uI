import { test } from "node:test";
import assert from "node:assert/strict";
import { generateElementCode, generateElementJs } from "../src/lib/generateCode.js";
import { initialMediaParams } from "../src/data/effects.js";
import { SoundLibrary } from "../src/lib/soundEngine.js";

test("Batch 18: initialMediaParams exports default parameters for kinetic hero and magic bento", () => {
  assert.equal(typeof initialMediaParams.kineticTrackSpeed, "number");
  assert.equal(initialMediaParams.kineticPillTag, "حلول رقمية مخصصة للأعمال");
  assert.equal(initialMediaParams.kineticHighlightWord, "عــــلامتك");
  assert.ok(initialMediaParams.kineticClipPath.includes("polygon("));
  assert.equal(Array.isArray(initialMediaParams.kineticTrackTopImages), true);
  assert.equal(Array.isArray(initialMediaParams.kineticTrackBottomImages), true);

  assert.equal(initialMediaParams.bentoStep, "04");
  assert.equal(initialMediaParams.bentoCategory, "منهجية العمل");
  assert.equal(initialMediaParams.bentoTitle, "التطوير");
  assert.equal(typeof initialMediaParams.bentoGlowRadius, "number");
  assert.equal(typeof initialMediaParams.bentoGlowIntensity, "number");
});

test("Batch 18: hero-kinetic-dual-track generates dual tracks, polygon clip-path, and sparkle CTA button", () => {
  const result = generateElementCode("hero-kinetic-dual-track", {
    media: {
      kineticTrackSpeed: 25,
      kineticPillTag: "حلول رقمية رائدة",
      kineticHeadline: "نبني تجارب استثنائية",
      kineticHighlightWord: "لمشروعك",
      kineticCtaText: "انطلق معنا الآن ✦",
    },
    typography: {
      titleSize: 42,
    },
  });

  assert.ok(result.html, "HTML should be generated");
  assert.ok(result.css, "CSS should be generated");
  assert.ok(result.js, "JS should be generated");

  // HTML structure checks
  assert.ok(result.html.includes("beso-kinetic-hero-wrapper"));
  assert.ok(result.html.includes("beso-kinetic-track-top"));
  assert.ok(result.html.includes("beso-kinetic-track-bottom"));
  assert.ok(result.html.includes("hero-pill-badge"));
  assert.ok(result.html.includes("حلول رقمية رائدة"));
  assert.ok(result.html.includes("beso-polygon-highlight"));
  assert.ok(result.html.includes("لمشروعك"));
  assert.ok(result.html.includes("sparkle-btn"));
  assert.ok(result.html.includes("انطلق معنا الآن ✦"));

  // CSS physics checks
  assert.ok(result.css.includes("kineticTrackLeft 25s linear infinite"));
  assert.ok(result.css.includes("kineticTrackRight 25s linear infinite"));
  assert.ok(result.css.includes("clip-path: polygon("));
  assert.ok(result.css.includes(".sparkle-btn:hover"));
});

test("Batch 18: hero-kinetic-dual-track direction toggle inverts top and bottom track keyframes", () => {
  const result = generateElementCode("hero-kinetic-dual-track", {
    media: {
      kineticTrackSpeed: 30,
      kineticTrackInvert: true,
    },
  });

  // When inverted, top track uses kineticTrackRight and bottom uses kineticTrackLeft
  assert.ok(result.css.includes(".beso-kinetic-track-top"));
  assert.ok(result.css.includes("kineticTrackRight 30s linear infinite"));
  assert.ok(result.css.includes(".beso-kinetic-track-bottom"));
  assert.ok(result.css.includes("kineticTrackLeft 30s linear infinite"));
});

test("Batch 18: magic-bento-card generates card with step badge, category tag, and CSS glow variables", () => {
  const result = generateElementCode("magic-bento-card", {
    media: {
      bentoStep: "07",
      bentoCategory: "استراتيجية النمو",
      bentoTitle: "التحليلات الذكية",
      bentoDescription: "نظام لوحات بيانات متقدم مع مؤشرات أداء وتتبع تفصيلي للتحويلات.",
      bentoGlowRadius: 350,
      bentoGlowIntensity: 0.9,
      bentoGlowColor: "rgba(16, 185, 129, 0.4)",
    },
  });

  assert.ok(result.html, "HTML should be generated");
  assert.ok(result.css, "CSS should be generated");
  assert.ok(result.js, "JS should be generated");

  // Structure checks
  assert.ok(result.html.includes("magic-bento-card"));
  assert.ok(result.html.includes("magic-bento-card--glow"));
  assert.ok(result.html.includes("bento-step-badge"));
  assert.ok(result.html.includes("07"));
  assert.ok(result.html.includes("bento-category-tag"));
  assert.ok(result.html.includes("استراتيجية النمو"));
  assert.ok(result.html.includes("التحليلات الذكية"));
  assert.ok(result.html.includes("bento-bg-layer"));
  assert.ok(result.html.includes("--glow-radius: 350px"));

  // CSS variables and pseudo-element spotlight
  assert.ok(result.css.includes("--glow-x: 50%"));
  assert.ok(result.css.includes("--glow-y: 50%"));
  assert.ok(result.css.includes("--glow-intensity: 0"));
  assert.ok(result.css.includes(".magic-bento-card--glow::before"));
  assert.ok(result.css.includes("radial-gradient"));
});

test("Batch 18: generateElementCode generates auto-generated Beso Studio JS Engine with audio and spotlight tracking", () => {
  const jsOutput = generateElementJs("magic-bento-card", {});

  assert.ok(jsOutput.includes("// Auto-Generated Beso Studio JS Engine"));
  assert.ok(jsOutput.includes("DOMContentLoaded"));
  assert.ok(jsOutput.includes(".sparkle-btn"));
  assert.ok(jsOutput.includes(".magic-bento-card"));
  assert.ok(jsOutput.includes("SoundLibrary.play('neon_click')"));
  assert.ok(jsOutput.includes("--glow-x"));
  assert.ok(jsOutput.includes("--glow-y"));
  assert.ok(jsOutput.includes("--glow-intensity"));
});

test("Batch 18: SoundLibrary is exported and plays neon_click sound preset", () => {
  assert.equal(typeof SoundLibrary.play, "function");
  // Calling SoundLibrary.play should execute without throwing error in Node environment
  assert.doesNotThrow(() => {
    SoundLibrary.play("neon_click");
    SoundLibrary.play("soft-click");
  });
});

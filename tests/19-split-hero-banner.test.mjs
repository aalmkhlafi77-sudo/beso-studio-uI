// tests/19-split-hero-banner.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import {
  COMPONENT_ALLOWED_CATEGORIES,
  initialMediaParams,
} from "../src/data/effects.js";
import { generateElementCode, generateElementJs } from "../src/lib/generateCode.js";

test("Split Hero Banner: COMPONENT_ALLOWED_CATEGORIES and initialMediaParams validation", () => {
  assert.deepEqual(
    COMPONENT_ALLOWED_CATEGORIES["split-hero-banner"],
    ["split_slider", "typography", "dimensions"]
  );

  assert.equal(initialMediaParams.splitHeroBrand, "BESO");
  assert.equal(initialMediaParams.splitHeroDiscountBadge, "خصم");
  assert.equal(initialMediaParams.splitHeroDiscountTitle, "حتى 70%");
  assert.equal(initialMediaParams.splitHeroSubtext, "عروض منتصف الموسم لفترة محدودة");
  assert.equal(Array.isArray(initialMediaParams.splitHeroRightImages), true);
  assert.equal(initialMediaParams.splitHeroRightImages.length, 3);
  assert.equal(Array.isArray(initialMediaParams.splitHeroLeftImages), true);
  assert.equal(initialMediaParams.splitHeroLeftImages.length, 3);
  assert.equal(initialMediaParams.splitHeroBrandSize, 38);
  assert.equal(initialMediaParams.splitHeroBadgeSize, 15);
  assert.equal(initialMediaParams.splitHeroTitleSize, 42);
  assert.equal(initialMediaParams.splitHeroSubtextSize, 13);
  assert.equal(initialMediaParams.splitHeroInterval, 2.0);
  assert.equal(initialMediaParams.splitHeroOverlayBlur, 0);
  assert.equal(initialMediaParams.splitHeroOverlayBg, "transparent");
});

test("Split Hero Banner: generateElementCode outputs dynamic HTML, CSS, and JS", () => {
  const customState = {
    activeElement: "split-hero-banner",
    dimensions: {
      width: 1200,
      height: 520,
      borderRadius: 24,
    },
    media: {
      splitHeroBrand: "ZARA LUXE",
      splitHeroBrandSize: 60,
      splitHeroBrandColor: "#ff0055",
      splitHeroBrandWeight: 800,
      splitHeroDiscountBadge: "تخفيضات كبرى",
      splitHeroBadgeSize: 26,
      splitHeroBadgeColor: "#ffffff",
      splitHeroDiscountTitle: "خصم 80%",
      splitHeroTitleSize: 64,
      splitHeroTitleColor: "#ff0055",
      splitHeroSubtext: "أحدث صيحات الموضة للأسبوع الحالي",
      splitHeroSubtextSize: 18,
      splitHeroSubtextColor: "#222222",
      splitHeroAlign: "center",
      splitHeroInterval: 3.5,
      splitHeroOverlayBlur: 14,
      splitHeroOverlayBg: "rgba(255, 250, 240, 0.9)",
      splitHeroRightImages: [
        "https://example.com/r1.jpg",
        "https://example.com/r2.jpg",
        "https://example.com/r3.jpg",
      ],
      splitHeroLeftImages: [
        "https://example.com/l1.jpg",
        "https://example.com/l2.jpg",
        "https://example.com/l3.jpg",
      ],
    },
  };

  const code = generateElementCode("split-hero-banner", customState);

  // HTML checks
  assert.ok(code.html.includes("ZARA LUXE"), "HTML should contain custom brand logo");
  assert.ok(code.html.includes("تخفيضات كبرى"), "HTML should contain custom discount badge");
  assert.ok(code.html.includes("خصم 80%"), "HTML should contain custom discount title");
  assert.ok(code.html.includes("أحدث صيحات الموضة للأسبوع الحالي"), "HTML should contain custom subtext");
  assert.ok(code.html.includes("https://example.com/r1.jpg"), "HTML should contain right image 1");
  assert.ok(code.html.includes("https://example.com/l1.jpg"), "HTML should contain left image 1");

  // CSS checks
  assert.ok(code.css.includes("max-width: 1200px;"), "CSS should contain custom width");
  assert.ok(code.css.includes("height: 520px;"), "CSS should contain custom height");
  assert.ok(code.css.includes("border-radius: 24px;"), "CSS should contain custom border radius");
  assert.ok(code.css.includes("font-size: 60px;"), "CSS should contain custom brand font size");
  assert.ok(code.css.includes("color: #ff0055;"), "CSS should contain custom brand color");
  assert.ok(code.css.includes("backdrop-filter: blur(14px);"), "CSS should contain custom overlay blur");
  assert.ok(code.css.includes("background: rgba(255, 250, 240, 0.9);"), "CSS should contain custom overlay background");

  // JS checks
  const js = generateElementJs("split-hero-banner", customState);
  assert.ok(js.includes("split-hero-banner"), "JS should contain split-hero-banner selector");
  assert.ok(js.includes("3500"), "JS should contain interval in milliseconds (3.5s -> 3500ms)");
});

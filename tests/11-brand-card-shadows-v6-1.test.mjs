// tests/11-brand-card-shadows-v6-1.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { createInitialWorkspaceState } from "../src/data/elementsRegistry.js";
import { generateElementCode } from "../src/lib/generateCode.js";

test("V6.1: Brand Identity Card prop bindings & dynamic shadow deck", async (t) => {
  await t.test("1. brand-identity-card respects custom textAlign and fontFamily", () => {
    const state = createInitialWorkspaceState("brand-identity-card");
    state.typography = {
      ...state.typography,
      textAlign: "center",
      titleAlign: "center",
      descAlign: "center",
      fontFamily: "'Cairo', sans-serif",
      titleFontFamily: "'Cairo', sans-serif",
      descFontFamily: "'Cairo', sans-serif",
      titleText: "هوية بيسو للتصميم",
      descText: "نظام شامل للمصممين والمطورين",
      titleColor: "#f3e5ab",
      descColor: "#a3c2c2",
    };

    const code = generateElementCode("brand-identity-card", state);
    assert.ok(code.html.includes("هوية بيسو للتصميم"));
    assert.ok(code.html.includes("نظام شامل للمصممين والمطورين"));
    
    // Check CSS contains text-align and font-family
    assert.match(code.css, /text-align:\s*center/);
    assert.match(code.css, /font-family:\s*'?Cairo'?,?\s*sans-serif/);
  });

  await t.test("2. brand-identity-card binds logo dimensions to symbol container", () => {
    const state = createInitialWorkspaceState("brand-identity-card");
    state.media = {
      ...state.media,
      logoWidth: 72,
      logoHeight: 56,
      logoUrl: "https://example.com/logo.svg",
    };

    const code = generateElementCode("brand-identity-card", state);
    assert.match(code.css, /width:\s*72px/);
    assert.match(code.css, /height:\s*56px/);
    assert.ok(code.html.includes("https://example.com/logo.svg"));
    assert.ok(code.html.includes("beso-brand-logo-symbol") || code.html.includes("brand-logo-symbol"));
  });

  await t.test("3. brand-identity-card decouples text colors from ambient glowColor", () => {
    const state = createInitialWorkspaceState("brand-identity-card");
    state.lighting = {
      ...state.lighting,
      glowColor: "#ff007f", // hot neon pink
    };
    state.typography = {
      ...state.typography,
      titleColor: "#ffffff",
      descColor: "#8899aa",
    };

    const code = generateElementCode("brand-identity-card", state);
    // .beso-brand-subtitle should have descColor #8899aa
    assert.match(code.css, /\.beso-brand-subtitle\s*\{[^}]*color:\s*#8899aa/);
    // .beso-brand-title should have titleColor #ffffff
    assert.match(code.css, /\.beso-brand-title\s*\{[^}]*color:\s*#ffffff/);
    // .beso-geom-lbl should have descColor #8899aa
    assert.match(code.css, /\.beso-geom-lbl\s*\{[^}]*color:\s*#8899aa/);
  });

  await t.test("4. Box shadow deck injects dynamic shadowDepth, shadowBlur, shadowColor", () => {
    const state = createInitialWorkspaceState("glass-card");
    state.dimensions = {
      ...state.dimensions,
      shadowDepth: 18,
      shadowBlur: 35,
      shadowColor: "rgba(10, 20, 30, 0.75)",
    };

    const code = generateElementCode("glass-card", state);
    assert.match(code.css, /0px\s+18px\s+35px\s+rgba\(10,\s*20,\s*30,\s*0\.75\)/);
  });

  await t.test("5. Dynamic text shadow depth, blur and color injection", () => {
    const state = createInitialWorkspaceState("brand-identity-card");
    state.typography = {
      ...state.typography,
      titleShadowDepth: 5,
      titleShadowBlur: 14,
      titleShadowColor: "rgba(0, 0, 0, 0.9)",
      descShadowDepth: 3,
      descShadowBlur: 8,
      descShadowColor: "rgba(0, 0, 0, 0.6)",
    };

    const code = generateElementCode("brand-identity-card", state);
    assert.match(code.css, /text-shadow:\s*0px\s+5px\s+14px\s+rgba\(0,\s*0,\s*0,\s*0\.9\)/);
    assert.match(code.css, /text-shadow:\s*0px\s+3px\s+8px\s+rgba\(0,\s*0,\s*0,\s*0\.6\)/);
  });
});

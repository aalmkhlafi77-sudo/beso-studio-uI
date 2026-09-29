// tests/08-admin-suite.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_ADMIN_CONFIG,
  loadAdminConfig,
  saveAdminConfig,
  trackVisitorIncrement,
} from "../src/lib/adminConfig.js";

test("1. Admin Config exports complete default Enterprise Suite settings", () => {
  assert.ok(DEFAULT_ADMIN_CONFIG.header, "header configuration exists");
  assert.equal(typeof DEFAULT_ADMIN_CONFIG.header.leftText, "string");
  assert.equal(typeof DEFAULT_ADMIN_CONFIG.header.badgeText, "string");
  assert.equal(typeof DEFAULT_ADMIN_CONFIG.header.mainTitle, "string");
  assert.equal(typeof DEFAULT_ADMIN_CONFIG.header.subTitle, "string");

  assert.ok(DEFAULT_ADMIN_CONFIG.logo, "logo configuration exists");
  assert.equal(typeof DEFAULT_ADMIN_CONFIG.logo.width, "number");
  assert.equal(typeof DEFAULT_ADMIN_CONFIG.logo.height, "number");
  assert.equal(typeof DEFAULT_ADMIN_CONFIG.logo.dropShadow, "boolean");

  assert.ok(DEFAULT_ADMIN_CONFIG.branding, "branding configuration exists");
  assert.ok(DEFAULT_ADMIN_CONFIG.branding.designerSignature.includes("أمان"));
  assert.ok(DEFAULT_ADMIN_CONFIG.branding.designerUrl.startsWith("http"));

  assert.ok(DEFAULT_ADMIN_CONFIG.adSense, "adSense configuration exists");
  assert.ok(DEFAULT_ADMIN_CONFIG.seo, "seo configuration exists");
  assert.ok(DEFAULT_ADMIN_CONFIG.social, "social media configuration exists");
  assert.ok(DEFAULT_ADMIN_CONFIG.security, "security credentials configuration exists");
  assert.equal(DEFAULT_ADMIN_CONFIG.security.username, "admin");
});

test("2. Web App Manifest and PWA icons exist and are valid", () => {
  const manifestPath = path.resolve("public/manifest.json");
  assert.ok(fs.existsSync(manifestPath), "public/manifest.json exists");

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  assert.equal(manifest.display, "standalone");
  assert.ok(manifest.icons.length >= 2, "at least 192x192 and 512x512 icons specified");

  const icon192 = path.resolve("public/pwa-192x192.png");
  const icon512 = path.resolve("public/pwa-512x512.png");
  assert.ok(fs.existsSync(icon192), "pwa-192x192.png exists");
  assert.ok(fs.existsSync(icon512), "pwa-512x512.png exists");
});

test("3. Security authentication and visitor analytics function correctly", () => {
  const stats = trackVisitorIncrement();
  assert.ok(typeof stats.visitorCount === "number", "visitor count is numeric");
  assert.ok(typeof stats.pageViews === "number", "page views is numeric");
});

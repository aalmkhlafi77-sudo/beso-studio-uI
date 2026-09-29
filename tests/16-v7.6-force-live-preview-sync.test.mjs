import { test } from "node:test";
import assert from "node:assert/strict";
import { generateElementCode } from "../src/lib/generateCode.js";

test("V7.6: Logo controls mutate state and reflect real-time dimension and object-fit changes", () => {
  const state = {
    activeElement: "brand-identity-card",
    branding: {
      logoWidth: 120,
      logoHeight: 120,
      logoObjectFit: "contain",
      isLogoAspectLocked: true,
      logoUrl: "https://example.com/logo.png",
    },
    media: {
      logoWidth: 120,
      logoHeight: 120,
      logoObjectFit: "contain",
      isLogoAspectLocked: true,
      logoUrl: "https://example.com/logo.png",
    },
  };

  const code1 = generateElementCode("brand-identity-card", state);
  assert.match(code1.css, /width:\s*120px/);
  assert.match(code1.css, /height:\s*120px/);
  assert.match(code1.css, /object-fit:\s*contain/);

  // Mutate logo dimensions and object-fit
  state.branding.logoWidth = 240;
  state.branding.logoHeight = 180;
  state.branding.logoObjectFit = "cover";
  state.media.logoWidth = 240;
  state.media.logoHeight = 180;
  state.media.logoObjectFit = "cover";

  const code2 = generateElementCode("brand-identity-card", state);
  assert.match(code2.css, /width:\s*240px/);
  assert.match(code2.css, /height:\s*180px/);
  assert.match(code2.css, /object-fit:\s*cover/);
});

test("V7.6: Hero Image controls mutate state and reflect real-time object-fit and dimension changes", () => {
  const state = {
    activeElement: "hero-cyber-grid",
    media: {
      heroBgUrl: "https://images.unsplash.com/photo-hero.jpg",
      heroBgImage: "https://images.unsplash.com/photo-hero.jpg",
      heroBgWidth: 800,
      heroBgHeight: 500,
      heroBgObjectFit: "contain",
      isHeroAspectLocked: true,
      heroBgOverlayOpacity: 0.9,
    },
  };

  const code1 = generateElementCode("hero-cyber-grid", state);
  assert.match(code1.css, /object-fit:\s*contain/);
  assert.match(code1.css, /width:\s*800px/);
  assert.match(code1.css, /height:\s*500px/);

  // Mutate hero bg object-fit and dimensions
  state.media.heroBgObjectFit = "fill";
  state.media.heroBgWidth = 1000;
  state.media.heroBgHeight = 600;

  const code2 = generateElementCode("hero-cyber-grid", state);
  assert.match(code2.css, /object-fit:\s*fill/);
  assert.match(code2.css, /width:\s*1000px/);
  assert.match(code2.css, /height:\s*600px/);
});

test("V7.6: 3D Carousel controls mutate state and re-render face dimensions and object-fit in real-time", () => {
  const state = {
    activeElement: "carousel-3d-cube",
    media: {
      carouselImgWidth: 300,
      carouselImgHeight: 400,
      carouselObjectFit: "contain",
      isCarouselAspectLocked: false,
    },
  };

  const code1 = generateElementCode("carousel-3d-cube", state);
  assert.match(code1.css, /width:\s*300px/);
  assert.match(code1.css, /height:\s*400px/);
  assert.match(code1.css, /object-fit:\s*contain/);

  // Mutate carousel dimensions and fit
  state.media.carouselImgWidth = 450;
  state.media.carouselImgHeight = 350;
  state.media.carouselObjectFit = "cover";

  const code2 = generateElementCode("carousel-3d-cube", state);
  assert.match(code2.css, /width:\s*450px/);
  assert.match(code2.css, /height:\s*350px/);
  assert.match(code2.css, /object-fit:\s*cover/);
});

test("V7.6: Compound Card controls mutate state and re-render image frame dimensions and object-fit", () => {
  const state = {
    activeElement: "compound-media-card",
    branding: {
      imgWidth: 400,
      imgHeight: 250,
      objectFit: "fill",
    },
    media: {
      imageWidth: 400,
      imageHeight: 250,
      objectFit: "fill",
    },
  };

  const code1 = generateElementCode("compound-media-card", state);
  assert.match(code1.css, /width:\s*400px/);
  assert.match(code1.css, /height:\s*250px/);
  assert.match(code1.css, /object-fit:\s*fill/);

  // Mutate compound card dimensions and fit
  state.branding.imgWidth = 600;
  state.branding.imgHeight = 300;
  state.branding.objectFit = "contain";
  state.media.imageWidth = 600;
  state.media.imageHeight = 300;
  state.media.objectFit = "contain";

  const code2 = generateElementCode("compound-media-card", state);
  assert.match(code2.css, /width:\s*600px/);
  assert.match(code2.css, /height:\s*300px/);
  assert.match(code2.css, /object-fit:\s*contain/);
});

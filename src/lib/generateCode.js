// lib/generateCode.js

const DEFAULT_MAIN_COLOR = "#16157f";
const DEFAULT_ACCENT_COLOR = "#d4af37";
const DEFAULT_TEXT_COLOR = "#ffffff";

export const SVG_ICONS = {
  "arrow-left": `<svg class="beso-btn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  star: `<svg class="beso-btn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  plus: `<svg class="beso-btn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  download: `<svg class="beso-btn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>`,
  check: `<svg class="beso-btn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>`,
};

export function normalizeHex(hex, fallback = DEFAULT_ACCENT_COLOR) {
  if (typeof hex !== "string") return fallback;
  const value = hex.trim();
  if (/^#[\da-f]{3}$/i.test(value)) {
    return `#${value.slice(1).split("").map((part) => part + part).join("")}`;
  }
  return /^#[\da-f]{6}$/i.test(value) ? value : fallback;
}

export function hexToRgba(hex, alpha = 1) {
  const normalized = normalizeHex(hex, "#3b82f6").slice(1);
  const number = Number.parseInt(normalized, 16);
  const safeAlpha = Math.min(1, Math.max(0, Number(alpha) || 0));
  return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${safeAlpha})`;
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value)));

export const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character]));

/**
 * Generates tactile luxury physical material styles for standalone tests and presets.
 */
export function generateMaterialCSS(surfaceStyle, params = {}) {
  const mainColor = normalizeHex(params.mainColor || params.color || DEFAULT_MAIN_COLOR);
  const accentColor = normalizeHex(params.accentColor || DEFAULT_ACCENT_COLOR);
  const textColor = normalizeHex(params.textColor || DEFAULT_TEXT_COLOR);
  const borderRadius = clamp(params.borderRadius ?? 14, 0, 99);
  const bevelDepth = clamp(params.bevelDepth ?? 4, 0, 16);
  const surfaceOpacity = clamp(params.surfaceOpacity ?? 0.85, 0.1, 1);
  const gradientAngle = clamp(params.gradientAngle ?? 145, 0, 360);
  const colorStop1 = normalizeHex(params.colorStop1 || mainColor);
  const colorStop2 = normalizeHex(params.colorStop2 || DEFAULT_MAIN_COLOR);
  const colorStop3 = normalizeHex(params.colorStop3 || params.color || "#4a154b");

  const bevelHighlight = Math.max(1, Math.round(bevelDepth / 4));
  const bevelBlur = Math.max(1, Math.round(bevelDepth / 2));
  const bevelShadowDepth = Math.max(1, Math.round(bevelDepth / 2));
  const bevelShadowBlur = Math.max(2, bevelDepth);

  switch (surfaceStyle) {
    case "metal":
      return `  background: linear-gradient(${gradientAngle}deg, ${hexToRgba("#ffffff", 0.35 * surfaceOpacity)} 0%, ${hexToRgba(colorStop1, surfaceOpacity)} 45%, ${hexToRgba(colorStop2, 0.75 * surfaceOpacity)} 100%);
  border: 1px solid ${accentColor};
  border-radius: ${borderRadius}px;
  color: ${accentColor};
  box-shadow: 
    inset 0 ${bevelHighlight}px ${bevelBlur}px ${hexToRgba("#ffffff", 0.85)},
    inset 0 -${bevelShadowDepth}px ${bevelShadowBlur}px ${hexToRgba("#000000", 0.8)},
    0 ${bevelDepth * 2}px ${bevelDepth * 4}px rgba(0, 0, 0, 0.55);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85);`;

    case "ivory":
      return `  background: #eae5d9;
  background: linear-gradient(${gradientAngle}deg, ${hexToRgba(colorStop1, 0.25 * surfaceOpacity)} 0%, ${hexToRgba("#eae5d9", surfaceOpacity)} 50%, ${hexToRgba(colorStop2, 0.2 * surfaceOpacity)} 100%);
  border: 1px solid #ffffff;
  border-radius: ${borderRadius}px;
  color: #1e2022;
  box-shadow: 
    inset 0 1px ${Math.max(1, bevelDepth)}px rgba(255, 255, 255, 0.9),
    inset 0 -${Math.max(1, Math.round(bevelDepth / 2))}px ${Math.max(2, bevelDepth)}px rgba(0, 0, 0, 0.12),
    ${bevelDepth}px ${bevelDepth}px ${bevelDepth * 3}px rgba(0, 0, 0, 0.25),
    -${bevelDepth}px -${bevelDepth}px ${bevelDepth * 3}px rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);`;

    case "neon":
      return `  background: ${hexToRgba(colorStop1, 0.25 * surfaceOpacity)};
  background: linear-gradient(${gradientAngle}deg, ${hexToRgba(colorStop1, 0.35 * surfaceOpacity)} 0%, ${hexToRgba(colorStop2, 0.25 * surfaceOpacity)} 100%);
  border: 2px solid ${accentColor};
  border-radius: ${borderRadius}px;
  color: ${textColor};
  box-shadow: 
    inset 0 1px ${Math.max(1, bevelDepth)}px rgba(255, 255, 255, 0.7),
    inset 0 -${Math.max(1, Math.round(bevelDepth / 2))}px ${Math.max(2, bevelDepth * 2)}px rgba(0, 0, 0, 0.75),
    0 0 20px ${hexToRgba(accentColor, 0.65)},
    0 ${bevelDepth * 2}px ${bevelDepth * 4}px rgba(0, 0, 0, 0.5),
    inset 0 0 ${Math.max(10, bevelDepth * 3)}px ${hexToRgba(accentColor, 0.45)};
  text-shadow: 0 0 8px ${hexToRgba(accentColor, 0.85)};`;

    case "flat":
      return `  background: linear-gradient(${gradientAngle}deg, ${hexToRgba(colorStop1, 0.85 * surfaceOpacity)}, ${hexToRgba(colorStop2, 0.65 * surfaceOpacity)});
  border: 1px solid ${hexToRgba(accentColor, 0.45)};
  border-radius: ${borderRadius}px;
  color: ${textColor};
  box-shadow: 
    inset 0 1px ${Math.max(1, bevelDepth)}px rgba(255, 255, 255, 0.35),
    0 8px 24px rgba(0, 0, 0, 0.35);`;

    case "glass":
    default:
      return `  background: ${hexToRgba(colorStop1, 0.45 * surfaceOpacity)};
  background: linear-gradient(${gradientAngle}deg, ${hexToRgba(colorStop1, surfaceOpacity * 0.55)}, ${hexToRgba(colorStop2, surfaceOpacity * 0.45)});
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${hexToRgba(accentColor, 0.4)};
  border-radius: ${borderRadius}px;
  color: ${textColor};
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 1px ${bevelDepth}px rgba(255, 255, 255, 0.45),
    inset 0 -${bevelDepth}px ${bevelDepth * 2}px rgba(0, 0, 0, 0.7);`;
  }
}

/**
 * Universal element code generator.
 * Supports dedicated Dimensions, Lighting (Multi-Stop Gradient & LED Under-Glow),
 * Physics (Bevel & Emboss), Typography & Alignment, and Entrance/Hover Animations.
 */
export function generateElementCode(elementIdOrState, maybeState) {
  let elementId;
  let state;
  if (typeof elementIdOrState === "string") {
    elementId = elementIdOrState;
    state = maybeState || {};
  } else {
    state = elementIdOrState || {};
    elementId = state.activeElement || "button";
  }

  // 1. Unified Dimensions & Opacity
  const dimensions = {
    width: Math.round(clamp(state.dimensions?.width ?? 360, 80, 800)),
    height: state.dimensions?.height ?? "auto",
    borderRadius: Math.round(
      clamp(
        (state.globalParams?.borderRadius !== undefined && state.globalParams.borderRadius !== 14)
          ? state.globalParams.borderRadius
          : (state.dimensions?.borderRadius ?? state.globalParams?.borderRadius ?? 16),
        0,
        99
      )
    ),
    padding: Math.round(
      clamp(
        state.dimensions?.padding ??
          state.cardParams?.padding ??
          state.elementParams?.[elementId]?.padding ??
          24,
        4,
        80
      )
    ),
    surfaceOpacity: clamp(state.dimensions?.surfaceOpacity ?? 0.85, 0.1, 1),
    borderWidth: Math.round(clamp(state.dimensions?.borderWidth ?? 1, 0, 8)),
    borderColor: normalizeHex(state.dimensions?.borderColor || state.globalParams?.accentColor || DEFAULT_ACCENT_COLOR),
  };

  // 2. Unified Gradients & LED Lighting
  const lighting = {
    useThreeColors: state.lighting?.useThreeColors ?? true,
    colorStop1: normalizeHex(
      (state.globalParams?.mainColor && state.globalParams.mainColor !== "#16157f")
        ? state.globalParams.mainColor
        : (state.lighting?.colorStop1 || state.globalParams?.mainColor || "#0d3b2e")
    ),
    colorStop2: normalizeHex(
      state.lighting?.colorStop2 ||
        state.globalParams?.mainColor ||
        "#16157f"
    ),
    colorStop3: normalizeHex(
      state.lighting?.colorStop3 ||
        state.globalParams?.color ||
        "#4a154b"
    ),
    gradientAngle: Math.round(clamp(state.lighting?.gradientAngle ?? 145, 0, 360)),
    showBottomGlow: state.lighting?.showBottomGlow ?? true,
    glowColor: normalizeHex(
      (state.globalParams?.accentColor && state.globalParams.accentColor !== "#d4af37")
        ? state.globalParams.accentColor
        : (state.lighting?.glowColor || state.globalParams?.accentColor || DEFAULT_ACCENT_COLOR)
    ),
    glowSpread: Math.round(clamp(state.lighting?.glowSpread ?? 28, 0, 80)),
    bevelDepth: Math.round(clamp(state.lighting?.bevelDepth ?? state.globalParams?.bevelDepth ?? 4, 0, 16)),
  };

  // 3. Unified Typography & Alignment (Title and Desc operate 100% independently)
  const typography = {
    titleSize: Math.round(
      clamp(
        state.typography?.titleSize ??
          (state.globalParams?.fontSize ? state.globalParams.fontSize + 4 : 22),
        12,
        44
      )
    ),
    titleColor: normalizeHex(
      state.typography?.titleColor ||
        (state.globalParams?.textColor && state.globalParams.textColor !== "#ffffff"
          ? state.globalParams.textColor
          : "#fff8e7")
    ),
    descSize: Math.round(
      clamp(
        state.typography?.descSize ??
          (state.globalParams?.fontSize ?? 14),
        10,
        28
      )
    ),
    descColor: normalizeHex(
      state.typography?.descColor ||
        (state.globalParams?.textColor && state.globalParams.textColor !== "#ffffff"
          ? state.globalParams.textColor
          : "#eae5d9")
    ),
    textAlign: ["right", "center", "left"].includes(state.typography?.textAlign)
      ? state.typography.textAlign
      : "right",
    textShadowDepth: Math.round(clamp(state.typography?.textShadowDepth ?? 2, 0, 10)),
    titleText:
      (state.cardParams?.title && state.cardParams.title !== "بطاقة Beso الفاخرة")
        ? state.cardParams.title
        : (state.typography?.titleText || state.cardParams?.title || state.elementParams?.card?.title || "بطاقة Beso الفاخرة"),
    descText:
      (state.cardParams?.description && state.cardParams.description !== "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة.")
        ? state.cardParams.description
        : (state.typography?.descText || state.cardParams?.description || state.elementParams?.card?.description || "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة."),
  };

  // 4. Unified Animations & Transitions
  const animations = {
    transitionSpeed: clamp(state.animations?.transitionSpeed ?? 0.35, 0.1, 1.5),
    entranceAnimation: state.animations?.entranceAnimation || "fadeUp",
    hoverEffect: state.animations?.hoverEffect || "liftScale",
  };

  const globalParams = {
    fontSize: Math.round(clamp(state.globalParams?.fontSize || typography.descSize || 16, 11, 36)),
    fontWeight: Number(state.globalParams?.fontWeight || 600),
  };

  // Compute CSS building blocks
  const bgGradient = lighting.useThreeColors
    ? `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba(lighting.colorStop1, dimensions.surfaceOpacity)} 0%, ${hexToRgba(lighting.colorStop2, dimensions.surfaceOpacity)} 50%, ${hexToRgba(lighting.colorStop3, dimensions.surfaceOpacity)} 100%)`
    : `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba(lighting.colorStop1, dimensions.surfaceOpacity)} 0%, ${hexToRgba(lighting.colorStop2, dimensions.surfaceOpacity)} 100%)`;

  const bottomGlowCSS = lighting.showBottomGlow
    ? `0 ${Math.max(1, Math.round(lighting.glowSpread / 2))}px ${lighting.glowSpread}px ${hexToRgba(lighting.glowColor, 0.55)}`
    : `0 10px 30px rgba(0, 0, 0, 0.5)`;

  const bevelShadow =
    lighting.bevelDepth > 0
      ? `inset 0 1px ${lighting.bevelDepth}px rgba(255, 255, 255, 0.45), inset 0 -${lighting.bevelDepth}px ${lighting.bevelDepth * 2}px rgba(0, 0, 0, 0.7)`
      : `inset 0 1px 0 rgba(255, 255, 255, 0.25)`;

  const textShadowCSS =
    typography.textShadowDepth > 0
      ? `text-shadow: 0 ${typography.textShadowDepth}px ${typography.textShadowDepth * 2}px rgba(0, 0, 0, 0.65);`
      : "";

  // 5. Dynamic Material Surface Selection (Glass, Metal, Ivory, Neon, Flat)
  const surfaceStyle = state.globalParams?.surfaceStyle || state.activeSurface || "glass";

  // Shared 3D Bevel & Highlight computations driven dynamically by lighting.bevelDepth
  const bevelDepth = lighting.bevelDepth;
  const bevelHighlight = Math.max(1, Math.round(bevelDepth / 4));
  const bevelBlur = Math.max(1, Math.round(bevelDepth / 2));
  const bevelShadowDepth = Math.max(1, Math.round(bevelDepth / 2));
  const bevelShadowBlur = Math.max(2, bevelDepth);

  // Dynamic Multi-Stop Gradients & Opacity across ALL 4 materials
  const metalGradient = lighting.useThreeColors
    ? `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba("#ffffff", 0.45 * dimensions.surfaceOpacity)} 0%, ${hexToRgba(lighting.colorStop1, dimensions.surfaceOpacity)} 25%, ${hexToRgba(lighting.colorStop2, 0.9 * dimensions.surfaceOpacity)} 55%, ${hexToRgba(lighting.colorStop3, dimensions.surfaceOpacity)} 85%, ${hexToRgba("#000000", 0.75 * dimensions.surfaceOpacity)} 100%)`
    : `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba("#ffffff", 0.45 * dimensions.surfaceOpacity)} 0%, ${hexToRgba(lighting.colorStop1, dimensions.surfaceOpacity)} 50%, ${hexToRgba(lighting.colorStop2, 0.85 * dimensions.surfaceOpacity)} 100%)`;

  const ivoryGradient = lighting.useThreeColors
    ? `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba(lighting.colorStop1, 0.3 * dimensions.surfaceOpacity)} 0%, ${hexToRgba("#eae5d9", dimensions.surfaceOpacity)} 48%, ${hexToRgba(lighting.colorStop3, 0.25 * dimensions.surfaceOpacity)} 100%)`
    : `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba(lighting.colorStop1, 0.3 * dimensions.surfaceOpacity)} 0%, ${hexToRgba("#eae5d9", dimensions.surfaceOpacity)} 60%, ${hexToRgba(lighting.colorStop2, 0.25 * dimensions.surfaceOpacity)} 100%)`;

  const neonGradient = lighting.useThreeColors
    ? `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba(lighting.colorStop1, 0.35 * dimensions.surfaceOpacity)} 0%, ${hexToRgba(lighting.colorStop2, 0.25 * dimensions.surfaceOpacity)} 50%, ${hexToRgba(lighting.colorStop3, 0.35 * dimensions.surfaceOpacity)} 100%)`
    : `linear-gradient(${lighting.gradientAngle}deg, ${hexToRgba(lighting.colorStop1, 0.35 * dimensions.surfaceOpacity)} 0%, ${hexToRgba(lighting.colorStop2, 0.25 * dimensions.surfaceOpacity)} 100%)`;

  let surfaceCSSBlock = "";
  if (surfaceStyle === "metal") {
    surfaceCSSBlock = `
  background: ${metalGradient};
  border: ${dimensions.borderWidth}px solid ${lighting.glowColor};
  box-shadow: 
    inset 0 ${bevelHighlight}px ${bevelBlur}px ${hexToRgba("#ffffff", 0.85)},
    inset 0 -${bevelShadowDepth}px ${bevelShadowBlur}px ${hexToRgba("#000000", 0.8)},
    0 ${bevelDepth * 2}px ${bevelDepth * 4}px rgba(0, 0, 0, 0.55),
    ${bottomGlowCSS};`;
  } else if (surfaceStyle === "ivory") {
    surfaceCSSBlock = `
  background: #eae5d9;
  background: ${ivoryGradient};
  border: ${dimensions.borderWidth}px solid #ffffff;
  color: #1e2022;
  box-shadow: 
    inset 0 1px ${Math.max(1, bevelDepth)}px rgba(255, 255, 255, 0.9),
    inset 0 -${Math.max(1, Math.round(bevelDepth / 2))}px ${Math.max(2, bevelDepth)}px rgba(0, 0, 0, 0.12),
    ${bevelDepth}px ${bevelDepth}px ${bevelDepth * 3}px rgba(0, 0, 0, 0.25),
    -${bevelDepth}px -${bevelDepth}px ${bevelDepth * 3}px rgba(255, 255, 255, 0.85),
    ${bottomGlowCSS};`;
  } else if (surfaceStyle === "neon") {
    surfaceCSSBlock = `
  background: ${hexToRgba(lighting.colorStop1, 0.25 * dimensions.surfaceOpacity)};
  background: ${neonGradient};
  border: ${Math.max(2, dimensions.borderWidth)}px solid ${lighting.glowColor};
  box-shadow: 
    inset 0 1px ${Math.max(1, bevelDepth)}px rgba(255, 255, 255, 0.7),
    inset 0 -${Math.max(1, Math.round(bevelDepth / 2))}px ${Math.max(2, bevelDepth * 2)}px rgba(0, 0, 0, 0.75),
    0 0 20px ${hexToRgba(lighting.glowColor, 0.65)},
    0 ${bevelDepth * 2}px ${bevelDepth * 4}px rgba(0, 0, 0, 0.5),
    inset 0 0 ${Math.max(10, bevelDepth * 3)}px ${hexToRgba(lighting.glowColor, 0.45)},
    ${bottomGlowCSS};`;
  } else if (surfaceStyle === "flat") {
    surfaceCSSBlock = `
  background: ${bgGradient};
  border: ${dimensions.borderWidth}px solid ${hexToRgba(lighting.glowColor, 0.45)};
  box-shadow: 
    inset 0 1px ${Math.max(1, bevelDepth)}px rgba(255, 255, 255, 0.35),
    0 8px 24px rgba(0, 0, 0, 0.35),
    ${bottomGlowCSS};`;
  } else {
    // Glass (Default)
    surfaceCSSBlock = `
  background: ${bgGradient};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: ${dimensions.borderWidth}px solid ${hexToRgba(lighting.glowColor, 0.4)};
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.45),
    ${bevelShadow},
    ${bottomGlowCSS};`;
  }

  // 6. Distinct Visual Physics for Hover Effects
  const getHoverCSS = (elementSelector) => {
    switch (animations.hoverEffect) {
      case "glowExpand":
        return `${elementSelector}:hover {
  transform: translateY(-2px);
  box-shadow: ${bevelShadow}, 0 0 ${Math.max(24, lighting.glowSpread * 1.5)}px ${hexToRgba(lighting.glowColor, 0.95)}, 0 0 ${Math.max(48, lighting.glowSpread * 2.5)}px ${hexToRgba(lighting.glowColor, 0.5)};
  filter: brightness(1.12);
}`;
      case "tilt3d":
        return `${elementSelector}:hover {
  transform: perspective(600px) rotateX(6deg) rotateY(-6deg) translateY(-4px);
  box-shadow: ${bevelShadow}, -10px 16px 32px rgba(0, 0, 0, 0.6), 0 0 24px ${hexToRgba(lighting.glowColor, 0.45)};
}`;
      case "neonPulse":
        return `${elementSelector}:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px ${lighting.glowColor}, inset 0 0 14px ${lighting.glowColor}, 0 0 50px ${hexToRgba(lighting.glowColor, 0.8)};
  text-shadow: 0 0 10px ${lighting.glowColor};
}`;
      case "liftScale":
      default:
        return `${elementSelector}:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: ${bevelShadow}, 0 16px 36px rgba(0, 0, 0, 0.55), 0 0 24px ${hexToRgba(lighting.glowColor, 0.5)};
}`;
    }
  };

  // 7. Distinct Visual Physics for Entrance Keyframes
  const entranceKeyframes = `
@keyframes besoEntrance-fadeUp {
  0% { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes besoEntrance-zoomIn {
  0% { opacity: 0; transform: scale(0.75); }
  70% { opacity: 1; transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes besoEntrance-slideDown {
  0% { opacity: 0; transform: translateY(-32px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes besoEntrance-pulseGlow {
  0% { opacity: 0; transform: scale(0.9); box-shadow: 0 0 0 rgba(212,175,55,0); }
  50% { opacity: 1; transform: scale(1.03); box-shadow: 0 0 35px ${hexToRgba(lighting.glowColor, 0.85)}; }
  100% { opacity: 1; transform: scale(1); }
}`;

  // 0. PREMIUM 1: CYBER 3D TILT CARD (Pure CSS Tracker Grid)
  if (elementId === "cyber-card") {
    const title = escapeHtml(typography.titleText || "بطاقة سايبر 3D التفاعلية");
    const desc = escapeHtml(typography.descText || "بطاقة مجسمة تتفاعل مع حركة المؤشر باستخدام شبكة مسارات 3D نقية دون جافاسكريبت.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "240px" : `${dimensions.height}px`;

    const css = `.beso-3d-container {
  width: ${widthRule};
  max-width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-family: inherit;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-3d-container .canvas {
  position: relative;
  width: 100%;
  min-height: ${heightRule};
  perspective: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  transform-style: preserve-3d;
}

/* 9 Invisible CSS Trackers */
.beso-3d-container .tracker {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 15;
  cursor: pointer;
}

.beso-3d-container .tr-1 { grid-area: 1 / 1; }
.beso-3d-container .tr-2 { grid-area: 1 / 2; }
.beso-3d-container .tr-3 { grid-area: 1 / 3; }
.beso-3d-container .tr-4 { grid-area: 2 / 1; }
.beso-3d-container .tr-5 { grid-area: 2 / 2; }
.beso-3d-container .tr-6 { grid-area: 2 / 3; }
.beso-3d-container .tr-7 { grid-area: 3 / 1; }
.beso-3d-container .tr-8 { grid-area: 3 / 2; }
.beso-3d-container .tr-9 { grid-area: 3 / 3; }

/* Dynamic 3D Tilt Angles via Sibling Selector */
.beso-3d-container .tr-1:hover ~ #card { transform: rotateX(15deg) rotateY(-15deg) scale3d(1.02, 1.02, 1.02); }
.beso-3d-container .tr-2:hover ~ #card { transform: rotateX(15deg) rotateY(0deg) scale3d(1.02, 1.02, 1.02); }
.beso-3d-container .tr-3:hover ~ #card { transform: rotateX(15deg) rotateY(15deg) scale3d(1.02, 1.02, 1.02); }
.beso-3d-container .tr-4:hover ~ #card { transform: rotateX(0deg) rotateY(-15deg) scale3d(1.02, 1.02, 1.02); }
.beso-3d-container .tr-5:hover ~ #card { transform: rotateX(0deg) rotateY(0deg) scale3d(1.04, 1.04, 1.04); }
.beso-3d-container .tr-6:hover ~ #card { transform: rotateX(0deg) rotateY(15deg) scale3d(1.02, 1.02, 1.02); }
.beso-3d-container .tr-7:hover ~ #card { transform: rotateX(-15deg) rotateY(-15deg) scale3d(1.02, 1.02, 1.02); }
.beso-3d-container .tr-8:hover ~ #card { transform: rotateX(-15deg) rotateY(0deg) scale3d(1.02, 1.02, 1.02); }
.beso-3d-container .tr-9:hover ~ #card { transform: rotateX(-15deg) rotateY(15deg) scale3d(1.02, 1.02, 1.02); }

#card {
  grid-area: 1 / 1 / -1 / -1;
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  text-align: ${typography.textAlign};
  transform-style: preserve-3d;
  transition: transform 0.22s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.25s ease;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;
}

#card .title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 10px 0;
  transform: translateZ(35px);
  transition: transform 0.2s ease;
  ${textShadowCSS}
}

#card .subtitle {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.6;
  margin: 0;
  transform: translateZ(25px);
  transition: transform 0.2s ease;
}

#card .glowing-elements {
  pointer-events: none;
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  z-index: -1;
}

#card .glow-1 {
  position: absolute;
  top: -20%;
  right: -20%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: ${hexToRgba(lighting.glowColor, 0.45)};
  filter: blur(40px);
  animation: cyberPulse 3s ease-in-out infinite alternate;
}

#card .card-badge-vip {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${hexToRgba(lighting.glowColor, 0.2)};
  color: ${lighting.glowColor};
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.4)};
  margin-bottom: 12px;
  transform: translateZ(40px);
}

#card .card-footer-action {
  display: flex;
  align-items: center;
  justify-content: ${typography.textAlign === "left" ? "flex-start" : typography.textAlign === "center" ? "center" : "flex-end"};
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px solid ${hexToRgba(lighting.glowColor, 0.2)};
  transform: translateZ(30px);
  font-size: 12px;
  font-weight: 600;
  color: ${lighting.glowColor};
}

@keyframes cyberPulse {
  0% { transform: scale(0.9); opacity: 0.5; }
  100% { transform: scale(1.2); opacity: 0.9; filter: blur(30px); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-3d-container">
  <div class="canvas">
    <!-- 9 trackers -->
    <div class="tracker tr-1"></div><div class="tracker tr-2"></div><div class="tracker tr-3"></div>
    <div class="tracker tr-4"></div><div class="tracker tr-5"></div><div class="tracker tr-6"></div>
    <div class="tracker tr-7"></div><div class="tracker tr-8"></div><div class="tracker tr-9"></div>
    <div id="card">
      <span class="card-badge-vip">3D CYBER TRACKER</span>
      <h3 class="title">${title}</h3>
      <p class="subtitle">${desc}</p>
      <div class="glowing-elements">
        <div class="glow-1"></div>
      </div>
      <div class="card-footer-action">
        <span>تفاعل 3D فوري ✦</span>
      </div>
    </div>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 2: ACTION SEND BUTTON (Multi-State Animation)
  if (elementId === "action-send-btn") {
    const rawText = typography.titleText || "إرسال البيانات";
    const lettersSpans = Array.from(rawText).map((char, index) => {
      if (char === " ") return `<span>&nbsp;</span>`;
      return `<span style="--i:${index + 1}">${escapeHtml(char)}</span>`;
    }).join("");

    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "52px" : `${dimensions.height}px`;

    const css = `.beso-action-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  padding: ${Math.round(dimensions.padding * 0.5)}px ${Math.round(dimensions.padding * 1.4)}px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  color: ${typography.titleColor};
  cursor: pointer;
  outline: none;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  transition: all ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-action-btn .state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
}

.beso-action-btn .state--default {
  opacity: 1;
  transform: translateY(0);
}

.beso-action-btn .state--sent {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateY(120%);
  color: ${lighting.glowColor};
}

.beso-action-btn .icon-wrapper svg {
  width: 20px;
  height: 20px;
  display: block;
  transition: transform 0.4s ease;
}

/* Staggered wave animation on letters on hover */
.beso-action-btn:hover .label span {
  display: inline-block;
  animation: wave 0.5s ease infinite alternate;
  animation-delay: calc(var(--i) * 0.05s);
}

.beso-action-btn:hover .plane-icon svg {
  animation: takeOff 0.9s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

/* Multi-State trigger on active/focus */
.beso-action-btn:active .state--default,
.beso-action-btn:focus .state--default,
.beso-action-btn:focus-within .state--default {
  transform: translateY(-120%);
  opacity: 0;
}

.beso-action-btn:active .state--sent,
.beso-action-btn:focus .state--sent,
.beso-action-btn:focus-within .state--sent {
  transform: translateY(0);
  opacity: 1;
  animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.beso-action-btn:active,
.beso-action-btn:focus {
  border-color: ${lighting.glowColor};
  box-shadow: 0 0 25px ${hexToRgba(lighting.glowColor, 0.85)}, inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

@keyframes wave {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); color: ${lighting.glowColor}; text-shadow: 0 0 8px ${hexToRgba(lighting.glowColor, 0.8)}; }
}

@keyframes takeOff {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  50% { transform: translate(14px, -14px) rotate(15deg); opacity: 0; }
  51% { transform: translate(-14px, 14px) rotate(-15deg); opacity: 0; }
  100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
}

@keyframes slideDown {
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
${entranceKeyframes}`.trim();

    const html = `<button type="button" class="beso-action-btn">
  <div class="state state--default">
    <div class="icon-wrapper plane-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/>
        <path d="M22 2 11 13"/>
      </svg>
    </div>
    <span class="label">
      ${lettersSpans}
    </span>
  </div>
  <div class="state state--sent">
    <div class="icon-wrapper check-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    </div>
    <span class="label-sent">تم الإرسال بنجاح ✓</span>
  </div>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 3: CONIC GLOW BUTTON (Spinning Gradient Edge)
  if (elementId === "conic-glow-btn") {
    const text = escapeHtml(typography.titleText || "زر الهالة المضيئة ✦");
    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "54px" : `${dimensions.height}px`;
    const borderWidth = Math.max(2, dimensions.borderWidth || 2);
    const innerRadius = Math.max(0, dimensions.borderRadius - borderWidth);

    const css = `.conic-gradient-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  padding: ${Math.round(dimensions.padding * 0.58)}px ${Math.round(dimensions.padding * 1.4)}px;
  border-radius: ${dimensions.borderRadius}px;
  overflow: hidden;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${hexToRgba(lighting.glowColor, 0.45)};
  transition: transform ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1), box-shadow ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.conic-gradient-btn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    ${hexToRgba(lighting.colorStop1, dimensions.surfaceOpacity)},
    ${hexToRgba(lighting.glowColor, 0.95)},
    ${hexToRgba(lighting.colorStop3, dimensions.surfaceOpacity)},
    ${hexToRgba(lighting.colorStop2, 0.8)},
    ${hexToRgba(lighting.glowColor, 0.95)},
    ${hexToRgba(lighting.colorStop1, dimensions.surfaceOpacity)}
  );
  animation: rotateConic 2s linear infinite;
  z-index: 1;
}

.conic-gradient-btn::after {
  content: '';
  position: absolute;
  inset: ${borderWidth}px;
  background: ${hexToRgba("#07140e", Math.max(0.7, dimensions.surfaceOpacity))};
  border-radius: ${innerRadius}px;
  z-index: 2;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: inset 0 1px ${lighting.bevelDepth}px rgba(255, 255, 255, 0.25);
}

.conic-gradient-btn .gradient-text {
  position: relative;
  z-index: 3;
  font-family: inherit;
  font-size: ${globalParams.fontSize || typography.titleSize || 16}px;
  font-weight: 700;
  background: linear-gradient(135deg, ${typography.titleColor}, ${lighting.glowColor}, #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px ${hexToRgba(lighting.glowColor, 0.65)});
  animation: textHue 4s linear infinite;
  transition: filter 0.3s ease;
}

.conic-gradient-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 32px ${hexToRgba(lighting.glowColor, 0.8)};
}

.conic-gradient-btn:active {
  transform: translateY(1px) scale(0.98);
}

@keyframes rotateConic {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes textHue {
  0% { filter: hue-rotate(0deg) drop-shadow(0 0 8px ${hexToRgba(lighting.glowColor, 0.65)}); }
  50% { filter: hue-rotate(45deg) drop-shadow(0 0 16px ${hexToRgba(lighting.glowColor, 0.95)}); }
  100% { filter: hue-rotate(0deg) drop-shadow(0 0 8px ${hexToRgba(lighting.glowColor, 0.65)}); }
}
${entranceKeyframes}`.trim();

    const html = `<button type="button" class="conic-gradient-btn">
  <span class="gradient-text">${text}</span>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 4: FRUTIGER AERO GLASS BUTTON
  if (elementId === "frutiger-aero-btn") {
    const text = escapeHtml(typography.titleText || "زر الزجاج البلوري Aero");
    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "54px" : `${dimensions.height}px`;

    const css = `.beso-frutiger-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  background: linear-gradient(180deg, #006caa, #00c3ff);
  border-radius: ${dimensions.borderRadius}px;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  cursor: pointer;
  outline: none;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0, 110, 180, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.95);
  transition: all ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-frutiger-btn .inner-glass {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Math.round(dimensions.padding * 0.55)}px ${Math.round(dimensions.padding * 1.35)}px;
  border-radius: ${Math.max(0, dimensions.borderRadius - 3)}px;
  background: radial-gradient(circle at 50% 100%, #30f8f8 10%, #30f8f800 55%), linear-gradient(180deg, #013654 0%, #001a2b 100%);
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.beso-frutiger-btn .inner-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 200%;
  height: 100%;
  background: linear-gradient(-65deg, #0000 40%, #fff7 50%, #0000 70%);
  animation: aeroShimmer 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;
}

.beso-frutiger-btn .top-specular-light {
  position: absolute;
  top: 0;
  left: 6%;
  right: 6%;
  height: 48%;
  border-radius: 99px 99px 50% 50% / 99px 99px 30% 30%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
  z-index: 3;
}

.beso-frutiger-btn .text-glow {
  position: relative;
  z-index: 4;
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  color: ${typography.titleColor || "#ffffff"};
  text-shadow: 0 0 10px rgba(48, 248, 248, 0.85), 0 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.5px;
}

.beso-frutiger-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 36px rgba(0, 195, 255, 0.65), inset 0 1px 3px #ffffff;
  filter: brightness(1.12);
}

.beso-frutiger-btn:active {
  transform: translateY(1px) scale(0.98);
}

@keyframes aeroShimmer {
  0% { transform: translateX(0); }
  100% { transform: translateX(200%); }
}
${entranceKeyframes}`.trim();

    const html = `<button class="beso-frutiger-btn">
  <div class="inner-glass">
    <div class="top-specular-light"></div>
    <span class="text-glow">${text}</span>
  </div>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 5: SPACE GALAXY ORBIT BUTTON
  if (elementId === "space-orbit-btn") {
    const text = escapeHtml(typography.titleText || "رحلة الفضاء ✦");
    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "54px" : `${dimensions.height}px`;

    const css = `.beso-space-btn {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  padding: ${Math.round(dimensions.padding * 0.6)}px ${Math.round(dimensions.padding * 1.5)}px;
  background-image: linear-gradient(#121212, #121212), linear-gradient(137deg, #ffdb3b, #fe53bb, #8f51ea, #0044ff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border: 2px solid transparent;
  border-radius: ${dimensions.borderRadius}px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  background-size: 100% 100%, 300% 300%;
  animation: spaceGradientShift 5s ease infinite, besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: all ${animations.transitionSpeed}s ease;
}

.beso-space-btn .space-title {
  position: relative;
  z-index: 5;
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  color: ${typography.titleColor || "#ffffff"};
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.8), 0 0 20px rgba(254, 83, 187, 0.8);
}

.beso-space-btn #container-stars {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.beso-space-btn #stars-particle-layer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(#ffffff 1px, transparent 1%), radial-gradient(#ffe066 1px, transparent 1%), radial-gradient(#70e6bb 1.5px, transparent 1%);
  background-size: 30px 30px, 45px 45px, 60px 60px;
  background-position: 0 0, 15px 15px, 30px 30px;
  animation: starRotation 90s linear infinite;
  opacity: 0.85;
}

.beso-space-btn #glow-aura {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  filter: blur(20px);
  opacity: 0.75;
}

.beso-space-btn .glow-circle-1 {
  position: absolute;
  top: -20%;
  left: -20%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fe53bb;
  animation: neonPulse 4s ease-in-out infinite alternate;
}

.beso-space-btn .glow-circle-2 {
  position: absolute;
  bottom: -20%;
  right: -20%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #0044ff;
  animation: neonPulse 4s ease-in-out 2s infinite alternate;
}

.beso-space-btn:hover {
  transform: scale(1.04);
  box-shadow: 0 0 35px rgba(254, 83, 187, 0.45), 0 0 50px rgba(0, 68, 255, 0.45);
}

.beso-space-btn:active {
  transform: scale(0.98);
}

@keyframes spaceGradientShift {
  0% { background-position: 0 0, 0% 50%; }
  50% { background-position: 0 0, 100% 50%; }
  100% { background-position: 0 0, 0% 50%; }
}

@keyframes starRotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes neonPulse {
  0% { transform: scale(0.85); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0.95; }
}
${entranceKeyframes}`.trim();

    const html = `<button type="button" class="beso-space-btn">
  <strong class="space-title">${text}</strong>
  <div id="container-stars">
    <div id="stars-particle-layer"></div>
  </div>
  <div id="glow-aura">
    <div class="glow-circle-1"></div>
    <div class="glow-circle-2"></div>
  </div>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 6: ADAPTIVE MORPHING SHELL
  if (elementId === "adaptive-morph-btn") {
    const text = escapeHtml(typography.titleText || "استكشاف المزيد");

    const css = `.beso-morph-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, ${lighting.colorStop1}, ${lighting.colorStop2});
  color: #ffffff;
  padding: 0 15px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px ${hexToRgba(lighting.glowColor, 0.35)};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-morph-btn .sign-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: ${lighting.glowColor};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
}

.beso-morph-btn .morph-text {
  opacity: 0;
  width: 0;
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 0;
  font-family: inherit;
  font-size: ${globalParams.fontSize || 14}px;
  font-weight: 700;
  color: ${typography.titleColor || "#ffffff"};
  transform: translateX(12px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.beso-morph-btn:hover {
  width: 150px;
  border-radius: 30px;
  padding: 0 18px;
  gap: 8px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 25px ${hexToRgba(lighting.glowColor, 0.6)};
}

.beso-morph-btn:hover .morph-text {
  opacity: 1;
  width: auto;
  max-width: 100px;
  margin-right: 6px;
  transform: translateX(0);
}

.beso-morph-btn:hover .sign-icon {
  transform: rotate(-15deg) scale(1.1);
  color: #ffffff;
}

.beso-morph-btn:active {
  transform: translateY(1px) scale(0.96);
}
${entranceKeyframes}`.trim();

    const html = `<button class="beso-morph-btn">
  <div class="sign-icon">
    <svg viewBox="0 0 512 512" width="18" height="18"><path fill="currentColor" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
  </div>
  <div class="morph-text">${text}</div>
</button>`;

    return { html, css };
  }

  // 1. CARD ELEMENT
  if (elementId === "card") {
    const title = escapeHtml(typography.titleText);
    const desc = escapeHtml(typography.descText);
    const heightRule = dimensions.height === "auto" ? "auto" : `${dimensions.height}px`;
    const cardHoverCSS = getHoverCSS(".beso-card");

    const css = `.beso-card {
  width: ${dimensions.width}px;
  max-width: 100%;
  height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  text-align: ${typography.textAlign};
  box-sizing: border-box;
  position: relative;
  font-family: inherit;
  transition: all ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

${cardHoverCSS}

.beso-card-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${hexToRgba(lighting.glowColor, 0.18)};
  color: ${lighting.glowColor};
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.35)};
  margin-bottom: 10px;
}

.beso-card-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
  ${textShadowCSS}
}

.beso-card-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  opacity: 0.9;
  line-height: 1.65;
  margin: 0;
}

.beso-card-footer {
  display: flex;
  align-items: center;
  justify-content: ${typography.textAlign === "left" ? "flex-start" : typography.textAlign === "center" ? "center" : "flex-end"};
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid ${hexToRgba(lighting.glowColor, 0.2)};
}

.beso-card-action {
  font-size: 12px;
  font-weight: 600;
  color: ${lighting.glowColor};
  cursor: pointer;
}
${entranceKeyframes}`.trim();

    const html = `<article class="beso-card">
  <span class="beso-card-badge">VIP MATERIAL</span>
  <h3 class="beso-card-title">${title}</h3>
  <p class="beso-card-desc">${desc}</p>
  <div class="beso-card-footer">
    <span class="beso-card-action">استكشاف المكون ←</span>
  </div>
</article>`;

    return { html, css };
  }

  // 2. INPUT ELEMENT
  if (elementId === "input") {
    const inputParams = {
      label: state.inputParams?.label || state.elementParams?.input?.label || "البريد الإلكتروني",
      placeholder: state.inputParams?.placeholder || state.elementParams?.input?.placeholder || "ادخل بريدك هنا...",
      insetDepth: Math.round(clamp(state.inputParams?.insetDepth || 4, 1, 10)),
    };

    const inputHeightCSS = dimensions.height !== "auto" ? `height: ${dimensions.height}px;` : "";

    const css = `.beso-field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${dimensions.width}px;
  max-width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  text-align: ${typography.textAlign};
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-field-label {
  font-size: ${typography.descSize}px;
  font-weight: 600;
  color: ${typography.titleColor};
  display: flex;
  align-items: center;
  justify-content: ${typography.textAlign === "left" ? "flex-start" : typography.textAlign === "center" ? "center" : "flex-end"};
  gap: 6px;
  ${textShadowCSS}
}

.beso-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.beso-input {
  width: 100%;
  ${inputHeightCSS}
  padding: ${Math.round(dimensions.padding * 0.5)}px 18px;
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  font-family: inherit;
  outline: none;
  border-radius: ${dimensions.borderRadius}px;
  border: ${dimensions.borderWidth}px solid ${hexToRgba(lighting.glowColor, 0.45)};
  background: ${bgGradient};
  box-shadow: inset 0 ${inputParams.insetDepth}px ${inputParams.insetDepth * 2}px rgba(0, 0, 0, 0.6), ${bottomGlowCSS};
  box-sizing: border-box;
  text-align: ${typography.textAlign};
  transition: all ${animations.transitionSpeed}s ease;
}

.beso-input::placeholder {
  color: ${hexToRgba(typography.descColor, 0.55)};
}

.beso-input:focus {
  border-color: ${lighting.glowColor};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 0 20px ${hexToRgba(lighting.glowColor, 0.7)};
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-field-group">
  <label class="beso-field-label">${escapeHtml(inputParams.label)}</label>
  <div class="beso-input-wrapper">
    <input type="text" class="beso-input" placeholder="${escapeHtml(inputParams.placeholder)}" />
  </div>
</div>`;

    return { html, css };
  }

  // 3. BADGE ELEMENT
  if (elementId === "badge") {
    const badgeText = escapeHtml(
      state.badgeParams?.text ||
        state.elementParams?.badge?.label ||
        state.elementParams?.badge?.text ||
        "عنصر فاخر VIP"
    );

    const badgeHoverCSS = getHoverCSS(".beso-badge");
    const badgeHeightCSS = dimensions.height !== "auto" ? `height: ${dimensions.height}px;\n  min-height: ${dimensions.height}px;` : "";

    const css = `.beso-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  ${badgeHeightCSS}
  padding: ${Math.round(dimensions.padding * 0.35)}px ${Math.round(dimensions.padding * 0.9)}px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  font-size: ${typography.descSize - 1}px;
  color: ${typography.titleColor};
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1;
  white-space: nowrap;
  cursor: default;
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  ${textShadowCSS}
}

${badgeHoverCSS}

.beso-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${lighting.glowColor};
  box-shadow: 0 0 8px ${lighting.glowColor};
}
${entranceKeyframes}`.trim();

    const html = `<span class="beso-badge">
  <span class="beso-badge-dot"></span>
  <span>${badgeText}</span>
</span>`;

    return { html, css };
  }

  // 4. SOCIAL DOCK ELEMENT
  if (elementId === "social") {
    const socialBtnSize = dimensions.height === "auto" ? 44 : Math.min(64, Math.max(32, dimensions.height));
    const socialHoverCSS = getHoverCSS(".beso-social-btn");

    const css = `.beso-social-dock {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: ${Math.round(dimensions.padding * 0.5)}px ${Math.round(dimensions.padding * 0.75)}px;
  border-radius: ${dimensions.borderRadius + 6}px;
  background: ${hexToRgba("#030907", 0.65)};
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.35)};
  box-shadow: ${bevelShadow}, ${bottomGlowCSS};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${socialBtnSize}px;
  height: ${socialBtnSize}px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  color: ${lighting.glowColor};
  text-decoration: none;
  cursor: pointer;
  outline: none;
  transition: all ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1);
}

${socialHoverCSS}

.beso-social-btn:active {
  transform: translateY(2px) scale(0.95);
}

.beso-social-icon {
  width: 20px;
  height: 20px;
  display: block;
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-social-dock">
  <a href="#" class="beso-social-btn" aria-label="X (Twitter)" title="X">
    <svg class="beso-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
  </a>
  <a href="#" class="beso-social-btn" aria-label="GitHub" title="GitHub">
    <svg class="beso-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
  </a>
  <a href="#" class="beso-social-btn" aria-label="LinkedIn" title="LinkedIn">
    <svg class="beso-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  </a>
  <a href="#" class="beso-social-btn" aria-label="Telegram" title="Telegram">
    <svg class="beso-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  </a>
</div>`;

    return { html, css };
  }

  // 5. BUTTON ELEMENT (DEFAULT)
  const buttonParams = {
    text:
      state.buttonParams?.text ||
      state.typography?.titleText ||
      state.globalParams?.buttonText ||
      state.buttonState?.globalParams?.buttonText ||
      "تفاعل ملموس ✦",
    showIcon:
      state.buttonParams?.showIcon ??
      state.globalParams?.showIcon ??
      state.buttonState?.globalParams?.showIcon ??
      true,
    iconPosition:
      state.buttonParams?.iconPosition ||
      state.globalParams?.iconPosition ||
      state.buttonState?.globalParams?.iconPosition ||
      "after",
    iconType:
      state.buttonParams?.iconType ||
      state.globalParams?.iconType ||
      state.buttonState?.globalParams?.iconType ||
      "arrow-left",
  };

  const buttonFontSize =
    state.globalParams?.fontSize ??
    (typography.titleSize > 18 ? typography.titleSize - 4 : typography.titleSize);

  const buttonColor =
    state.globalParams?.textColor || typography.titleColor;

  const buttonHeightCSS = dimensions.height !== "auto" ? `height: ${dimensions.height}px;\n  min-height: ${dimensions.height}px;` : "";
  const buttonHoverCSS = getHoverCSS(".beso-btn");

  const iconCSS = buttonParams.showIcon
    ? `\n.beso-btn-icon {\n  display: inline-block;\n  vertical-align: middle;\n  width: ${buttonFontSize}px;\n  height: ${buttonFontSize}px;\n  flex-shrink: 0;\n}`
    : "";

  const css = `.beso-btn {
  display: inline-flex;
  align-items: center;
  justify-content: ${typography.textAlign === "left" ? "flex-start" : typography.textAlign === "center" ? "center" : "center"};
  gap: 10px;
  width: ${dimensions.width === 360 ? "auto" : dimensions.width + "px"};
  max-width: 100%;
  ${buttonHeightCSS}
  padding: ${Math.round(dimensions.padding * 0.58)}px ${Math.round(dimensions.padding * 1.33)}px;
  font-size: ${buttonFontSize}px;
  font-family: inherit;
  font-weight: ${globalParams.fontWeight};
  color: ${buttonColor};
  cursor: pointer;
  outline: none;
  text-decoration: none;
  user-select: none;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  ${textShadowCSS}
  text-align: ${typography.textAlign};
  box-sizing: border-box;
  transition: all ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

${buttonHoverCSS}

.beso-btn:active {
  transform: translateY(2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.6);
}${iconCSS}
${entranceKeyframes}`.trim();

  const iconSvg = SVG_ICONS[buttonParams.iconType] || SVG_ICONS["arrow-left"];
  const textSpan = `<span>${escapeHtml(buttonParams.text)}</span>`;
  let innerHtml;
  if (!buttonParams.showIcon) {
    innerHtml = `  ${textSpan}`;
  } else if (buttonParams.iconPosition === "before") {
    innerHtml = `  ${iconSvg}\n  ${textSpan}`;
  } else {
    innerHtml = `  ${textSpan}\n  ${iconSvg}`;
  }

  const html = `<button type="button" class="beso-btn">\n${innerHtml}\n</button>`;

  return { html, css };
}

/**
 * Backward compatibility alias for tests & button exports.
 */
export function generateFinalCode(state) {
  return generateElementCode("button", state);
}

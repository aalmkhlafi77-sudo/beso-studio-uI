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

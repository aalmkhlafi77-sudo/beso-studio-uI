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
function generateElementCodeCore(elementIdOrState, maybeState) {
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
    width: Math.round(clamp(state.dimensions?.width ?? 360, 50, 1400)),
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
    shadowDepth: Math.round(clamp(state.dimensions?.shadowDepth ?? 12, 0, 30)),
    shadowBlur: Math.round(clamp(state.dimensions?.shadowBlur ?? 30, 0, 50)),
    shadowColor: state.dimensions?.shadowColor || "rgba(0, 0, 0, 0.45)",
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
    glowIntensity: Math.round(clamp(state.lighting?.glowIntensity ?? 100, 0, 200)),
  };

  // 3. Unified Typography & Alignment (Multi-Target Tabbed Controller)
  const typography = {
    titleSize: Math.round(
      clamp(
        state.typography?.titleSize ??
          (state.globalParams?.fontSize ? state.globalParams.fontSize + 4 : 22),
        8,
        140
      )
    ),
    titleColor: normalizeHex(
      state.typography?.titleColor ||
        (state.globalParams?.textColor && state.globalParams.textColor !== "#ffffff"
          ? state.globalParams.textColor
          : "#fff8e7")
    ),
    titleGradient: state.typography?.titleGradient || "",
    titleFontFamily: state.typography?.titleFontFamily || "Alexandria, sans-serif",
    titleWeight: Number(state.typography?.titleWeight || 700),
    titleItalic: Boolean(state.typography?.titleItalic),
    titleAlign: ["right", "center", "left", "justify"].includes(state.typography?.titleAlign)
      ? state.typography.titleAlign
      : (state.typography?.textAlign || "right"),
    titleShadowX: Math.round(clamp(state.typography?.titleShadowX ?? 0, -20, 20)),
    titleShadowY: Math.round(clamp(state.typography?.titleShadowY ?? state.typography?.titleShadowDepth ?? 2, -20, 30)),
    titleShadowDepth: Math.round(clamp(state.typography?.titleShadowDepth ?? 2, 0, 30)),
    titleShadowBlur: Math.round(clamp(state.typography?.titleShadowBlur ?? 4, 0, 50)),
    titleShadowColor: state.typography?.titleShadowColor || "rgba(0, 0, 0, 0.65)",

    descSize: Math.round(
      clamp(
        state.typography?.descSize ??
          (state.globalParams?.fontSize ?? 14),
        8,
        140
      )
    ),
    descColor: normalizeHex(
      state.typography?.descColor ||
        (state.globalParams?.textColor && state.globalParams.textColor !== "#ffffff"
          ? state.globalParams.textColor
          : "#eae5d9")
    ),
    descGradient: state.typography?.descGradient || "",
    descFontFamily: state.typography?.descFontFamily || "Alexandria, sans-serif",
    descWeight: Number(state.typography?.descWeight || 400),
    descItalic: Boolean(state.typography?.descItalic),
    descAlign: ["right", "center", "left", "justify"].includes(state.typography?.descAlign)
      ? state.typography.descAlign
      : (state.typography?.textAlign || "right"),
    descShadowX: Math.round(clamp(state.typography?.descShadowX ?? 0, -20, 20)),
    descShadowY: Math.round(clamp(state.typography?.descShadowY ?? state.typography?.descShadowDepth ?? 1, -20, 30)),
    descShadowDepth: Math.round(clamp(state.typography?.descShadowDepth ?? 1, 0, 30)),
    descShadowBlur: Math.round(clamp(state.typography?.descShadowBlur ?? 2, 0, 50)),
    descShadowColor: state.typography?.descShadowColor || "rgba(0, 0, 0, 0.5)",

    buttonSize: Math.round(
      clamp(
        state.typography?.buttonSize ??
          (state.globalParams?.fontSize ?? 15),
        8,
        140
      )
    ),
    buttonColor: normalizeHex(
      state.typography?.buttonColor ||
        (state.globalParams?.textColor && state.globalParams.textColor !== "#ffffff"
          ? state.globalParams.textColor
          : "#fff8e7")
    ),
    buttonGradient: state.typography?.buttonGradient || "",
    buttonFontFamily: state.typography?.buttonFontFamily || "Alexandria, sans-serif",
    buttonWeight: Number(state.typography?.buttonWeight || 600),
    buttonItalic: Boolean(state.typography?.buttonItalic),
    buttonAlign: ["right", "center", "left", "justify"].includes(state.typography?.buttonAlign)
      ? state.typography.buttonAlign
      : "center",
    buttonShadowX: Math.round(clamp(state.typography?.buttonShadowX ?? 0, -20, 20)),
    buttonShadowY: Math.round(clamp(state.typography?.buttonShadowY ?? state.typography?.buttonShadowDepth ?? 1, -20, 30)),
    buttonShadowDepth: Math.round(clamp(state.typography?.buttonShadowDepth ?? 1, 0, 30)),
    buttonShadowBlur: Math.round(clamp(state.typography?.buttonShadowBlur ?? 3, 0, 50)),
    buttonShadowColor: state.typography?.buttonShadowColor || "rgba(0, 0, 0, 0.4)",

    badgeText: state.typography?.badgeText || state.badgeParams?.text || state.badgeParams?.label || "VIP MATERIAL",
    badgeSize: Math.round(clamp(state.typography?.badgeSize ?? 10, 8, 48)),
    badgeColor: normalizeHex(state.typography?.badgeColor || state.globalParams?.accentColor || "#d4af37"),
    badgeWeight: Number(state.typography?.badgeWeight || 700),
    badgeAlign: state.typography?.badgeAlign || "center",

    fontFamily: state.typography?.fontFamily || state.typography?.titleFontFamily || "inherit",
    textAlign: ["right", "center", "left", "justify"].includes(state.typography?.textAlign)
      ? state.typography.textAlign
      : (state.typography?.titleAlign || "right"),
    textShadowDepth: Math.round(clamp(state.typography?.textShadowDepth ?? 2, 0, 10)),
    titleText:
      (state.cardParams?.title && state.cardParams.title !== "بطاقة Beso الفاخرة")
        ? state.cardParams.title
        : (state.typography?.titleText || state.cardParams?.title || state.elementParams?.card?.title || "بطاقة Beso الفاخرة"),
    descText:
      (state.cardParams?.description && state.cardParams.description !== "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة.")
        ? state.cardParams.description
        : (state.typography?.descText || state.cardParams?.description || state.elementParams?.card?.description || "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة."),
    buttonText:
      state.typography?.buttonText ||
      state.buttonParams?.text ||
      state.globalParams?.buttonText ||
      "تفاعل ملموس ✦",
  };

  // 4. Unified Animations & Transitions
  const animations = {
    transitionSpeed: clamp(state.animations?.transitionSpeed ?? 0.35, 0.1, 3.0),
    entranceAnimation: state.animations?.entranceAnimation || "fadeUp",
    hoverEffect: state.animations?.hoverEffect || "liftScale",
    hoverLift: Number(state.animations?.hoverLift ?? 8),
    hoverScale: Number(state.animations?.hoverScale ?? 1.05),
    hoverGlowExpansion: Number(state.animations?.hoverGlowExpansion ?? 20),
    enableHoverPhysics: state.animations?.enableHoverPhysics !== false,
    particleOverlay: state.animations?.particleOverlay || state.animations?.activeParticle || "none",
  };

  // 5. Unified Media & Image Backdrops (Batch 15 & Master Suite)
  const media = {
    imageWidth: clamp(state.media?.imageWidth ?? state.branding?.imgWidth ?? 360, 20, 1200),
    imageHeight: clamp(state.media?.imageHeight ?? state.branding?.imgHeight ?? 200, 20, 1200),
    isAspectLocked: state.media?.isAspectLocked ?? true,
    aspectRatio: state.media?.aspectRatio || "16:9",
    customImgUrl: state.media?.customImgUrl || "",
    objectFit: state.branding?.objectFit || state.media?.objectFit || "cover",

    carouselImages: state.media?.carouselImages || ["", "", "", "", "", "", "", ""],
    carouselRotationSpeed: clamp(state.media?.carouselRotationSpeed ?? 16, 2, 60),
    carouselPerspective: clamp(state.media?.carouselPerspective ?? 1200, 500, 2500),
    carouselTiltAngle: clamp(state.media?.carouselTiltAngle ?? 10, 0, 45),
    carouselHoverPause: state.media?.carouselHoverPause ?? true,
    carouselImgWidth: clamp(state.media?.carouselImgWidth ?? state.media?.imageWidth ?? 360, 20, 1200),
    carouselImgHeight: clamp(state.media?.carouselImgHeight ?? state.media?.imageHeight ?? 200, 20, 1200),
    carouselObjectFit: state.media?.carouselObjectFit || state.media?.objectFit || "cover",
    isCarouselAspectLocked: state.media?.isCarouselAspectLocked ?? state.media?.isAspectLocked ?? true,

    heroBgImage: state.media?.heroBgImage || state.media?.heroBgUrl || "",
    heroBgUrl: state.media?.heroBgUrl || state.media?.heroBgImage || "",
    heroBgWidth: clamp(state.media?.heroBgWidth ?? state.media?.imageWidth ?? 360, 20, 1200),
    heroBgHeight: clamp(state.media?.heroBgHeight ?? state.media?.imageHeight ?? 200, 20, 1200),
    heroBgOverlayOpacity: clamp(state.media?.heroBgOverlayOpacity ?? 0.85, 0, 1),
    heroBgTint: normalizeHex(state.media?.heroBgTint || "#041a12"),
    heroBgObjectFit: state.media?.heroBgObjectFit || state.media?.objectFit || "cover",
    isHeroAspectLocked: state.media?.isHeroAspectLocked ?? state.media?.isAspectLocked ?? true,
    heroBgBlur: clamp(state.media?.heroBgBlur ?? 0, 0, 20),

    logoUrl: state.branding?.logoUrl || state.media?.logoUrl || "/brand/beso-studio-ui.png",
    logoWidth: clamp(state.branding?.logoWidth ?? state.media?.logoWidth ?? 64, 20, 1200),
    logoHeight: clamp(state.branding?.logoHeight ?? state.media?.logoHeight ?? 64, 20, 1200),
    logoKeepAspect: state.branding?.isLogoAspectLocked ?? state.media?.isLogoAspectLocked ?? state.media?.logoKeepAspect ?? true,
    isLogoAspectLocked: state.branding?.isLogoAspectLocked ?? state.media?.isLogoAspectLocked ?? true,
    logoObjectFit: state.branding?.logoObjectFit || state.media?.logoObjectFit || (state.media?.logoKeepAspect ? "contain" : state.media?.objectFit || "cover"),
    logoGlowColor: normalizeHex(state.media?.logoGlowColor || "#d4af37"),
    logoGlowSpread: clamp(state.media?.logoGlowSpread ?? 15, 0, 50),
    logoDropShadow: state.media?.logoDropShadow ?? true,
    brandLogoSize: clamp(state.media?.brandLogoSize ?? 64, 20, 1200),
    brandFontBase: clamp(state.media?.brandFontBase ?? 16, 10, 36),
    marqueeSpeed: clamp(state.media?.marqueeSpeed ?? 16, 2, 60),
    marqueeRadiusX: clamp(state.media?.marqueeRadiusX ?? 160, 60, 350),
    marqueeRadiusY: clamp(state.media?.marqueeRadiusY ?? 160, 60, 350),
    marqueeIconSize: clamp(state.media?.marqueeIconSize ?? 18, 10, 48),
    marqueeItemsTop: state.media?.marqueeItemsTop || "💎 Glassmorphism, 👑 Royal Gold, ⚡ Cyber Neon, 🏛️ Soft Ivory, ⚙️ Brushed Metal, 🌌 Cosmic Orbit",
    marqueeItemsBottom: state.media?.marqueeItemsBottom || "🔥 Hot Embers, 🌧️ Cyber Rain, 🔮 Quantum Orbs, 📐 Figma Frame, 🛍️ 3D Tote, 🛒 Kinetic Cart",
    marqueeInvertDirection: Boolean(state.media?.marqueeInvertDirection),

    // Batch 18: Kinetic Dual-Track Hero Canvas parameters
    kineticTrackSpeed: clamp(state.media?.kineticTrackSpeed ?? 20, 5, 60),
    kineticTrackInvert: Boolean(state.media?.kineticTrackInvert),
    kineticPillTag: state.media?.kineticPillTag || "حلول رقمية مخصصة للأعمال",
    kineticHeadline: state.media?.kineticHeadline || typography.titleText || "نصمم حلولاً رقمية مبتكرة",
    kineticHighlightWord: state.media?.kineticHighlightWord || "عــــلامتك",
    kineticHighlightGradient: state.media?.kineticHighlightGradient || "linear-gradient(160deg, #4cd864 0%, #39b54a 50%, #2a8f38 100%)",
    kineticClipPath: state.media?.kineticClipPath || "polygon(50% 0px, 100% 10%, 94% 93%, 50% 100%, 6% 93%, 0px 10%)",
    kineticSubtext: state.media?.kineticSubtext || typography.descText || "واجهات تفاعلية مذهلة بحركات لا نهائية ومؤثرات فيزيائية ملموسة.",
    kineticCtaText: state.media?.kineticCtaText || typography.buttonText || "اكتشف إمكانياتنا ✦",
    kineticTrackTopImages: state.media?.kineticTrackTopImages || [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
    ],
    kineticTrackBottomImages: state.media?.kineticTrackBottomImages || [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"
    ],

    // Batch 18: Magic Bento Card Component parameters
    bentoStep: state.media?.bentoStep || "04",
    bentoCategory: state.media?.bentoCategory || "منهجية العمل",
    bentoTitle: state.media?.bentoTitle || typography.titleText || "التطوير",
    bentoDescription: state.media?.bentoDescription || typography.descText || "ننفذ بكود منظم، تكاملات آمنة، وقاعدة بيانات قابلة للتوسع مع المشروع.",
    bentoBgImage: state.media?.bentoBgImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    bentoGlowRadius: clamp(state.media?.bentoGlowRadius ?? 280, 100, 500),
    bentoGlowIntensity: clamp(state.media?.bentoGlowIntensity ?? 0.85, 0.1, 1),
    bentoGlowColor: state.media?.bentoGlowColor || "rgba(57, 181, 74, 0.35)",

    // Batch 18 & 20: Split Hero Banner parameters
    splitHeroBrand: state.media?.splitHeroBrand || "BESO",
    splitHeroBrandSize: clamp(state.media?.splitHeroBrandSize ?? 38, 10, 140),
    splitHeroBrandColor: normalizeHex(state.media?.splitHeroBrandColor || "#e50010"),
    splitHeroBrandWeight: Number(state.media?.splitHeroBrandWeight || 900),
    splitHeroDiscountBadge: state.media?.splitHeroDiscountBadge || "خصم",
    splitHeroBadgeSize: clamp(state.media?.splitHeroBadgeSize ?? 15, 10, 80),
    splitHeroBadgeColor: normalizeHex(state.media?.splitHeroBadgeColor || "#e50010"),
    splitHeroDiscountTitle: state.media?.splitHeroDiscountTitle || "حتى 70%",
    splitHeroTitleSize: clamp(state.media?.splitHeroTitleSize ?? 42, 10, 140),
    splitHeroTitleColor: normalizeHex(state.media?.splitHeroTitleColor || "#e50010"),
    splitHeroSubtext: state.media?.splitHeroSubtext || "عروض منتصف الموسم لفترة محدودة",
    splitHeroSubtextSize: clamp(state.media?.splitHeroSubtextSize ?? 13, 8, 48),
    splitHeroSubtextColor: normalizeHex(state.media?.splitHeroSubtextColor || "#333333"),
    splitHeroAlign: state.media?.splitHeroAlign || "center",
    splitHeroInterval: clamp(state.media?.splitHeroInterval ?? 2.0, 0.5, 30),
    splitHeroOverlayBlur: clamp(state.media?.splitHeroOverlayBlur ?? 0, 0, 40),
    splitHeroOverlayBg: state.media?.splitHeroOverlayBg || "transparent",
    splitHeroRightImages: state.media?.splitHeroRightImages || [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop"
    ],
    splitHeroLeftImages: state.media?.splitHeroLeftImages || [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
    ],
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

  const elementBoxShadow = `0px ${dimensions.shadowDepth}px ${dimensions.shadowBlur}px ${dimensions.shadowColor}`;

  const bevelShadow =
    lighting.bevelDepth > 0
      ? `inset 0 1px ${lighting.bevelDepth}px rgba(255, 255, 255, 0.45), inset 0 -${lighting.bevelDepth}px ${lighting.bevelDepth * 2}px rgba(0, 0, 0, 0.7)`
      : `inset 0 1px 0 rgba(255, 255, 255, 0.25)`;

  const textShadowDepth = typography.titleShadowDepth ?? typography.textShadowDepth ?? 2;
  const textShadowBlur = typography.titleShadowBlur ?? (textShadowDepth * 2) ?? 4;
  const textShadowColor = typography.titleShadowColor || "rgba(0, 0, 0, 0.65)";
  const textShadowCSS = textShadowDepth > 0
    ? `text-shadow: 0px ${textShadowDepth}px ${textShadowBlur}px ${textShadowColor};`
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
    ${elementBoxShadow},
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
    ${elementBoxShadow},
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
    ${elementBoxShadow},
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
    ${elementBoxShadow},
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
    ${elementBoxShadow},
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

  // ==========================================
  // BATCH 15: 3D POLYHEDRAL CAROUSELS, PATH MARQUEES & BRAND IDENTITY STYLE GUIDE
  // ==========================================

  // 1. CAROUSEL 3D CUBE (4 Faces)
  if (elementId === "carousel-3d-cube") {
    const title = escapeHtml(typography.titleText || "مكعب الصور 3D Cube");
    const desc = escapeHtml(typography.descText || "كاروسيل مكعب مجسم بـ 4 أوجه صورية يدور في فضاء ثلاثي الأبعاد.");
    const cardW = state.media?.carouselImgWidth ? clamp(state.media.carouselImgWidth, 20, 1200) : Math.min(260, Math.max(160, Math.round(dimensions.width * 0.65)));
    const cardH = state.media?.carouselImgHeight ? clamp(state.media.carouselImgHeight, 20, 1200) : Math.min(320, Math.max(200, Math.round(dimensions.width * 0.8)));
    const translateDist = Math.round(cardW / 2 + 20);

    const defaultGradients = [
      "linear-gradient(135deg, #0d3b2e 0%, #10b981 100%)",
      "linear-gradient(135deg, #16157f 0%, #3b82f6 100%)",
      "linear-gradient(135deg, #4a154b 0%, #9333ea 100%)",
      "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
    ];

    const faceContents = [0, 1, 2, 3].map((idx) => {
      const img = media.carouselImages[idx];
      const bg = defaultGradients[idx];
      if (img) {
        return `<div class="beso-cube-face beso-cube-face-${idx + 1}">
          <img src="${img}" alt="Face ${idx + 1}" />
          <div class="beso-face-overlay">
            <span class="beso-face-badge">وجه ${idx + 1}</span>
          </div>
        </div>`;
      }
      return `<div class="beso-cube-face beso-cube-face-${idx + 1}" style="background: ${bg};">
        <div class="beso-face-placeholder">
          <span class="beso-face-icon">💎</span>
          <span class="beso-face-title">لوح صور ${idx + 1}</span>
        </div>
      </div>`;
    }).join("\n        ");

    const css = `.beso-cube-scene {
  perspective: ${media.carouselPerspective}px;
  width: 100%;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-cube-stage {
  position: relative;
  width: ${cardW}px;
  height: ${cardH}px;
  transform-style: preserve-3d;
  animation: besoCubeSpin ${media.carouselRotationSpeed}s linear infinite;
  ${media.carouselHoverPause ? "transition: transform 0.6s ease;" : ""}
}

${media.carouselHoverPause ? `.beso-cube-scene:hover .beso-cube-stage {
  animation-play-state: paused;
}` : ""}

.beso-cube-face {
  position: absolute;
  inset: 0;
  border-radius: ${dimensions.borderRadius}px;
  overflow: hidden;
  border: ${dimensions.borderWidth}px solid ${lighting.glowColor};
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.3);
  background: #06110d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backface-visibility: visible;
}

.beso-cube-face img, .beso-carousel-face img {
  width: 100%;
  height: 100%;
  object-fit: ${media.carouselObjectFit || media.objectFit || "cover"};
}

.beso-cube-face-1 { transform: rotateY(0deg) translateZ(${translateDist}px); }
.beso-cube-face-2 { transform: rotateY(90deg) translateZ(${translateDist}px); }
.beso-cube-face-3 { transform: rotateY(180deg) translateZ(${translateDist}px); }
.beso-cube-face-4 { transform: rotateY(270deg) translateZ(${translateDist}px); }

.beso-face-overlay {
  position: absolute;
  bottom: 0;
  inset-x: 0;
  padding: 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  display: flex;
  justify-content: center;
}

.beso-face-badge {
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  background: rgba(212, 175, 55, 0.25);
  border: 1px solid ${lighting.glowColor};
  color: ${lighting.glowColor};
}

.beso-face-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #fff8e7;
  font-weight: 700;
  font-size: 14px;
}

.beso-face-icon {
  font-size: 28px;
  filter: drop-shadow(0 0 10px ${lighting.glowColor});
}

.beso-cube-reflection-floor {
  width: ${Math.round(cardW * 1.5)}px;
  height: 20px;
  margin-top: 35px;
  border-radius: 50%;
  background: radial-gradient(ellipse, ${hexToRgba(lighting.glowColor, 0.45)} 0%, transparent 70%);
  filter: blur(8px);
}

@keyframes besoCubeSpin {
  0% { transform: rotateX(-${media.carouselTiltAngle}deg) rotateY(0deg); }
  100% { transform: rotateX(-${media.carouselTiltAngle}deg) rotateY(360deg); }
}`.trim();

    const html = `<div class="beso-cube-scene">
  <div class="beso-cube-stage">
    ${faceContents}
  </div>
  <div class="beso-cube-reflection-floor"></div>
</div>`;

    return { html, css };
  }

  // 2. CAROUSEL 3D HEXAGON (6 Faces)
  if (elementId === "carousel-3d-hexagon") {
    const cardW = state.media?.carouselImgWidth ? clamp(state.media.carouselImgWidth, 20, 1200) : Math.min(220, Math.max(140, Math.round(dimensions.width * 0.55)));
    const cardH = state.media?.carouselImgHeight ? clamp(state.media.carouselImgHeight, 20, 1200) : Math.min(280, Math.max(180, Math.round(dimensions.width * 0.7)));
    const translateDist = Math.round(cardW * 0.866 + 30); // ~220px

    const defaultGradients = [
      "linear-gradient(135deg, #0d3b2e, #10b981)",
      "linear-gradient(135deg, #16157f, #3b82f6)",
      "linear-gradient(135deg, #4a154b, #9333ea)",
      "linear-gradient(135deg, #7c2d12, #ea580c)",
      "linear-gradient(135deg, #134e4a, #14b8a6)",
      "linear-gradient(135deg, #312e81, #6366f1)",
    ];

    const faceContents = [0, 1, 2, 3, 4, 5].map((idx) => {
      const img = media.carouselImages[idx];
      const bg = defaultGradients[idx];
      const angle = idx * 60;
      if (img) {
        return `<div class="beso-hex-face" style="transform: rotateY(${angle}deg) translateZ(${translateDist}px);">
          <img src="${img}" alt="Face ${idx + 1}" />
          <div class="beso-face-overlay">
            <span class="beso-face-badge">خامة ${idx + 1}/6</span>
          </div>
        </div>`;
      }
      return `<div class="beso-hex-face" style="transform: rotateY(${angle}deg) translateZ(${translateDist}px); background: ${bg};">
        <div class="beso-face-placeholder">
          <span class="beso-face-icon">⬡</span>
          <span class="beso-face-title">لوح سداسي ${idx + 1}</span>
        </div>
      </div>`;
    }).join("\n        ");

    const css = `.beso-hex-scene {
  perspective: ${media.carouselPerspective}px;
  width: 100%;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-hex-stage {
  position: relative;
  width: ${cardW}px;
  height: ${cardH}px;
  transform-style: preserve-3d;
  animation: besoHexSpin ${media.carouselRotationSpeed}s linear infinite;
  ${media.carouselHoverPause ? "transition: transform 0.6s ease;" : ""}
}

${media.carouselHoverPause ? `.beso-hex-scene:hover .beso-hex-stage {
  animation-play-state: paused;
}` : ""}

.beso-hex-face {
  position: absolute;
  inset: 0;
  border-radius: ${dimensions.borderRadius}px;
  overflow: hidden;
  border: ${dimensions.borderWidth}px solid ${lighting.glowColor};
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.75), inset 0 1px 2px rgba(255, 255, 255, 0.3);
  background: #05130d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.beso-hex-face img, .beso-carousel-face img {
  width: 100%;
  height: 100%;
  object-fit: ${media.carouselObjectFit || media.objectFit || "cover"};
}

.beso-face-overlay {
  position: absolute;
  bottom: 0;
  inset-x: 0;
  padding: 8px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  display: flex;
  justify-content: center;
}

.beso-face-badge {
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  background: rgba(212, 175, 55, 0.25);
  border: 1px solid ${lighting.glowColor};
  color: ${lighting.glowColor};
}

.beso-face-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #fff8e7;
  font-weight: 700;
  font-size: 13px;
}

.beso-face-icon {
  font-size: 26px;
  filter: drop-shadow(0 0 10px ${lighting.glowColor});
}

.beso-hex-floor {
  width: ${Math.round(translateDist * 2)}px;
  height: 24px;
  margin-top: 40px;
  border-radius: 50%;
  background: radial-gradient(ellipse, ${hexToRgba(lighting.glowColor, 0.5)} 0%, transparent 70%);
  filter: blur(10px);
}

@keyframes besoHexSpin {
  0% { transform: rotateX(-${media.carouselTiltAngle}deg) rotateY(0deg); }
  100% { transform: rotateX(-${media.carouselTiltAngle}deg) rotateY(360deg); }
}`.trim();

    const html = `<div class="beso-hex-scene">
  <div class="beso-hex-stage">
    ${faceContents}
  </div>
  <div class="beso-hex-floor"></div>
</div>`;

    return { html, css };
  }

  // 3. CAROUSEL 3D OCTAGON (8 Faces)
  if (elementId === "carousel-3d-octagon") {
    const cardW = state.media?.carouselImgWidth ? clamp(state.media.carouselImgWidth, 20, 1200) : Math.min(180, Math.max(120, Math.round(dimensions.width * 0.45)));
    const cardH = state.media?.carouselImgHeight ? clamp(state.media.carouselImgHeight, 20, 1200) : Math.min(250, Math.max(160, Math.round(dimensions.width * 0.62)));
    const translateDist = Math.round(cardW * 1.207 + 40); // ~290px

    const defaultGradients = [
      "linear-gradient(135deg, #0d3b2e, #10b981)",
      "linear-gradient(135deg, #16157f, #3b82f6)",
      "linear-gradient(135deg, #4a154b, #9333ea)",
      "linear-gradient(135deg, #7c2d12, #ea580c)",
      "linear-gradient(135deg, #134e4a, #14b8a6)",
      "linear-gradient(135deg, #312e81, #6366f1)",
      "linear-gradient(135deg, #701a75, #d946ef)",
      "linear-gradient(135deg, #78350f, #d97706)",
    ];

    const faceContents = [0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
      const img = media.carouselImages[idx];
      const bg = defaultGradients[idx];
      const angle = idx * 45;
      if (img) {
        return `<div class="beso-octa-face" style="transform: rotateY(${angle}deg) translateZ(${translateDist}px);">
          <img src="${img}" alt="Face ${idx + 1}" />
          <div class="beso-face-overlay">
            <span class="beso-face-badge">لوح ${idx + 1}/8</span>
          </div>
        </div>`;
      }
      return `<div class="beso-octa-face" style="transform: rotateY(${angle}deg) translateZ(${translateDist}px); background: ${bg};">
        <div class="beso-face-placeholder">
          <span class="beso-face-icon">🛑</span>
          <span class="beso-face-title">لوح ${idx + 1}</span>
        </div>
      </div>`;
    }).join("\n        ");

    const css = `.beso-octa-scene {
  perspective: ${media.carouselPerspective}px;
  width: 100%;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-octa-stage {
  position: relative;
  width: ${cardW}px;
  height: ${cardH}px;
  transform-style: preserve-3d;
  animation: besoOctaSpin ${media.carouselRotationSpeed}s linear infinite;
  ${media.carouselHoverPause ? "transition: transform 0.6s ease;" : ""}
}

${media.carouselHoverPause ? `.beso-octa-scene:hover .beso-octa-stage {
  animation-play-state: paused;
}` : ""}

.beso-octa-face {
  position: absolute;
  inset: 0;
  border-radius: ${dimensions.borderRadius}px;
  overflow: hidden;
  border: ${dimensions.borderWidth}px solid ${lighting.glowColor};
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.25);
  background: #040e0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.beso-octa-face img, .beso-carousel-face img {
  width: 100%;
  height: 100%;
  object-fit: ${media.carouselObjectFit || media.objectFit || "cover"};
}

.beso-face-overlay {
  position: absolute;
  bottom: 0;
  inset-x: 0;
  padding: 6px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  display: flex;
  justify-content: center;
}

.beso-face-badge {
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 9px;
  font-weight: 700;
  background: rgba(212, 175, 55, 0.25);
  border: 1px solid ${lighting.glowColor};
  color: ${lighting.glowColor};
}

.beso-face-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #fff8e7;
  font-weight: 700;
  font-size: 12px;
}

.beso-face-icon {
  font-size: 22px;
  filter: drop-shadow(0 0 8px ${lighting.glowColor});
}

.beso-octa-floor {
  width: ${Math.round(translateDist * 2.2)}px;
  height: 28px;
  margin-top: 45px;
  border-radius: 50%;
  background: radial-gradient(ellipse, ${hexToRgba(lighting.glowColor, 0.55)} 0%, transparent 70%);
  filter: blur(12px);
}

@keyframes besoOctaSpin {
  0% { transform: rotateX(-${media.carouselTiltAngle}deg) rotateY(0deg); }
  100% { transform: rotateX(-${media.carouselTiltAngle}deg) rotateY(360deg); }
}`.trim();

    const html = `<div class="beso-octa-scene">
  <div class="beso-octa-stage">
    ${faceContents}
  </div>
  <div class="beso-octa-floor"></div>
</div>`;

    return { html, css };
  }

  // 4. CAROUSEL 3D SPHERE (3D Orbital Shimmer)
  if (elementId === "carousel-3d-sphere") {
    const defaultGradients = [
      "linear-gradient(135deg, #0d3b2e, #10b981)",
      "linear-gradient(135deg, #16157f, #3b82f6)",
      "linear-gradient(135deg, #4a154b, #9333ea)",
      "linear-gradient(135deg, #7c2d12, #ea580c)",
      "linear-gradient(135deg, #134e4a, #14b8a6)",
      "linear-gradient(135deg, #312e81, #6366f1)",
    ];

    const satellites = [0, 1, 2, 3, 4, 5].map((idx) => {
      const img = media.carouselImages[idx];
      const bg = defaultGradients[idx];
      const angle = idx * 60;
      return `<div class="beso-sphere-sat" style="--sat-angle: ${angle}deg;">
        <div class="beso-sphere-sat-inner" style="${img ? `background-image: url('${img}'); background-size: cover;` : `background: ${bg};`}">
          ${!img ? `<span>🪐</span>` : ""}
        </div>
      </div>`;
    }).join("\n        ");

    const css = `.beso-sphere-scene {
  perspective: ${media.carouselPerspective}px;
  width: 100%;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-sphere-center {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff8e7 0%, ${lighting.glowColor} 40%, #0d3b2e 85%, #05140e 100%);
  box-shadow: 0 0 50px ${hexToRgba(lighting.glowColor, 0.8)}, inset 0 0 20px rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: besoPulseCore 3s ease-in-out infinite alternate;
}

.beso-sphere-rings {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 1.5px dashed ${hexToRgba(lighting.glowColor, 0.5)};
  transform-style: preserve-3d;
  animation: besoRingOrbit ${media.carouselRotationSpeed}s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

${media.carouselHoverPause ? `.beso-sphere-scene:hover .beso-sphere-rings,
.beso-sphere-scene:hover .beso-sphere-sat-inner {
  animation-play-state: paused;
}` : ""}

.beso-sphere-sat {
  position: absolute;
  width: 54px;
  height: 54px;
  transform: rotate(var(--sat-angle)) translateX(170px);
}

.beso-sphere-sat-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid ${lighting.glowColor};
  box-shadow: 0 0 15px ${hexToRgba(lighting.glowColor, 0.7)}, 0 8px 16px rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  animation: besoCounterRotate ${media.carouselRotationSpeed}s linear infinite;
  overflow: hidden;
}

@keyframes besoRingOrbit {
  0% { transform: rotateX(${media.carouselTiltAngle || 65}deg) rotateZ(0deg); }
  100% { transform: rotateX(${media.carouselTiltAngle || 65}deg) rotateZ(360deg); }
}

@keyframes besoCounterRotate {
  0% { transform: rotateZ(0deg); }
  100% { transform: rotateZ(-360deg); }
}

@keyframes besoPulseCore {
  0% { transform: scale(0.95); box-shadow: 0 0 30px ${hexToRgba(lighting.glowColor, 0.5)}; }
  100% { transform: scale(1.05); box-shadow: 0 0 70px ${hexToRgba(lighting.glowColor, 0.95)}; }
}`.trim();

    const html = `<div class="beso-sphere-scene">
  <div class="beso-sphere-rings">
    ${satellites}
  </div>
  <div class="beso-sphere-center">
    <span style="font-size: 32px;">✨</span>
  </div>
</div>`;

    return { html, css };
  }

  // 5. MARQUEE ELLIPTICAL TRACK (360° Path)
  if (elementId === "marquee-elliptical-track") {
    const rawItems = (media.marqueeItemsTop || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const items = rawItems.length > 0
      ? rawItems.map((text, i) => {
          const parts = text.split(" ");
          const icon = parts[0] || "✨";
          const label = parts.slice(1).join(" ") || text;
          return { text: label, icon, bg: lighting.colorStop1 };
        })
      : [
          { text: "خامات زجاجية", icon: "💎", bg: "#0d3b2e" },
          { text: "نيون سايبر", icon: "⚡", bg: "#16157f" },
          { text: "عاجي فاخر", icon: "🏛️", bg: "#4a154b" },
          { text: "معدن مصقول", icon: "⚙️", bg: "#7c2d12" },
          { text: "كريستال كوانتم", icon: "🔮", bg: "#134e4a" },
          { text: "ذهب ملكي", icon: "👑", bg: "#312e81" },
        ];

    const radiusX = media.marqueeRadiusX || 160;
    const radiusY = media.marqueeRadiusY || 160;
    const trackWidth = radiusX * 2;
    const trackHeight = radiusY * 2;
    const iconSize = media.marqueeIconSize || 18;

    const trackItems = items.map((it, idx) => {
      const angle = (idx * 360) / items.length;
      return `<div class="beso-ellipse-node" style="--node-deg: ${angle}deg;">
        <span class="beso-node-icon">${it.icon}</span>
        <span class="beso-node-text">${escapeHtml(it.text)}</span>
      </div>`;
    }).join("\n      ");

    const css = `.beso-ellipse-marquee-wrap {
  width: 100%;
  max-width: ${dimensions.width}px;
  min-height: ${Math.max(380, trackHeight + 60)}px;
  perspective: ${media.carouselPerspective || 1100}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-ellipse-track {
  position: relative;
  width: ${trackWidth}px;
  height: ${trackHeight}px;
  transform-style: preserve-3d;
  animation: besoEllipseSpin ${media.marqueeSpeed}s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

.beso-ellipse-marquee-wrap:hover .beso-ellipse-track,
.beso-ellipse-marquee-wrap:hover .beso-ellipse-node {
  animation-play-state: paused;
}

.beso-ellipse-node {
  position: absolute;
  transform: rotate(var(--node-deg)) translateX(${radiusX}px) rotate(calc(-1 * var(--node-deg)));
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 99px;
  background: linear-gradient(145deg, rgba(14, 38, 27, 0.95), rgba(4, 14, 10, 0.98));
  border: 1px solid ${lighting.glowColor};
  box-shadow: 0 8px 24px rgba(0,0,0,0.6), 0 0 15px ${hexToRgba(lighting.glowColor, 0.4)};
  color: ${typography.titleColor || "#fff8e7"};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  animation: besoNodeCounter ${media.marqueeSpeed}s linear infinite;
}

.beso-node-icon { font-size: ${iconSize}px; }

@keyframes besoEllipseSpin {
  0% { transform: rotateX(${media.carouselTiltAngle || 55}deg) rotateZ(0deg); }
  100% { transform: rotateX(${media.carouselTiltAngle || 55}deg) rotateZ(360deg); }
}

@keyframes besoNodeCounter {
  0% { transform: rotate(var(--node-deg)) translateX(${radiusX}px) rotate(calc(-1 * var(--node-deg))) rotateZ(0deg); }
  100% { transform: rotate(var(--node-deg)) translateX(${radiusX}px) rotate(calc(-1 * var(--node-deg))) rotateZ(-360deg); }
}`.trim();

    const html = `<div class="beso-ellipse-marquee-wrap">
  <div class="beso-ellipse-track">
    ${trackItems}
  </div>
</div>`;

    return { html, css };
  }

  // 6. MARQUEE DUAL OPPOSITE (Dual Opposite Kinetic Marquee)
  if (elementId === "marquee-dual-opposite") {
    const parseList = (str, fallback) => {
      const items = (str || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
      return items.length > 0 ? items : fallback;
    };

    const listA = parseList(media.marqueeItemsTop, ["💎 Glassmorphism", "👑 Royal Gold", "⚡ Cyber Neon", "🏛️ Soft Ivory", "⚙️ Brushed Metal", "🌌 Cosmic Orbit"]);
    const listB = parseList(media.marqueeItemsBottom, ["🔥 Hot Embers", "🌧️ Cyber Rain", "🔮 Quantum Orbs", "📐 Figma Frame", "🛍️ 3D Tote", "🛒 Kinetic Cart"]);

    const renderTape = (items) => [...items, ...items].map((t) => `
      <div class="beso-tape-pill">
        <span class="beso-pill-dot"></span>
        <span>${escapeHtml(t)}</span>
      </div>
    `).join("");

    const dirTop = media.marqueeInvertDirection ? "besoScrollRight" : "besoScrollLeft";
    const dirBottom = media.marqueeInvertDirection ? "besoScrollLeft" : "besoScrollRight";

    const css = `.beso-dual-marquee-container {
  width: 100%;
  max-width: ${dimensions.width}px;
  padding: 24px 12px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-dual-marquee-container:hover .beso-marquee-track {
  animation-play-state: paused;
}

.beso-marquee-row {
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

.beso-marquee-track {
  display: flex;
  width: max-content;
  gap: 12px;
}

.beso-track-left {
  animation: ${dirTop} ${media.marqueeSpeed}s linear infinite;
}

.beso-track-right {
  animation: ${dirBottom} ${media.marqueeSpeed}s linear infinite;
}

.beso-tape-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 99px;
  background: rgba(4, 18, 12, 0.85);
  border: 1px solid ${lighting.glowColor};
  box-shadow: 0 4px 14px rgba(0,0,0,0.45), 0 0 10px ${hexToRgba(lighting.glowColor, 0.3)};
  color: ${typography.titleColor || "#fff8e7"};
  font-size: ${media.marqueeIconSize ? Math.min(14, media.marqueeIconSize) : 12}px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform 0.2s, background 0.2s;
}

.beso-tape-pill:hover {
  transform: scale(1.05);
  background: ${lighting.colorStop1};
}

.beso-pill-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${lighting.glowColor};
  box-shadow: 0 0 8px ${lighting.glowColor};
}

@keyframes besoScrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes besoScrollRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}`.trim();

    const html = `<div class="beso-dual-marquee-container">
  <div class="beso-marquee-row">
    <div class="beso-marquee-track beso-track-left">
      ${renderTape(listA)}
    </div>
  </div>
  <div class="beso-marquee-row">
    <div class="beso-marquee-track beso-track-right">
      ${renderTape(listB)}
    </div>
  </div>
</div>`;

    return { html, css };
  }

  // 7. BRAND IDENTITY STYLE GUIDE CARD (Design System Card)
  if (elementId === "brand-identity-card") {
    const logoW = media.logoWidth || 40;
    const logoH = media.logoHeight || 40;
    const fontBase = media.brandFontBase || 16;
    const customLogoUrl = media.logoUrl || "";
    const textAlign = typography.textAlign || typography.titleAlign || "right";
    const fontFamily = typography.fontFamily || typography.titleFontFamily || "inherit";

    const titleShadowCSS = typography.titleShadowDepth > 0
      ? `text-shadow: 0px ${typography.titleShadowDepth}px ${typography.titleShadowBlur}px ${typography.titleShadowColor};`
      : "";
    const descShadowCSS = typography.descShadowDepth > 0
      ? `text-shadow: 0px ${typography.descShadowDepth}px ${typography.descShadowBlur}px ${typography.descShadowColor};`
      : "";

    const css = `.beso-brand-guide-card {
  width: 100%;
  max-width: ${dimensions.width}px;
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  box-sizing: border-box;
  font-family: ${fontFamily};
  text-align: ${textAlign};
  color: ${typography.descColor || "#eae5d9"};
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-brand-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(212, 175, 55, 0.25);
  padding-bottom: 16px;
  text-align: ${textAlign};
}

.beso-brand-logo-wrap, .brand-logo-symbol, .beso-brand-logo-symbol {
  width: ${logoW}px;
  height: ${logoH}px;
  border-radius: 16px;
  background: linear-gradient(135deg, ${lighting.glowColor} 0%, ${lighting.colorStop1} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${Math.round(Math.min(logoW, logoH) * 0.45)}px;
  box-shadow: 0 0 20px ${hexToRgba(lighting.glowColor, 0.4)};
  color: ${typography.titleColor || "#fff8e7"};
  font-weight: 800;
  overflow: hidden;
  flex-shrink: 0;
}

.beso-brand-logo-wrap img, .brand-logo-symbol img, .beso-brand-logo-symbol img {
  width: 100%;
  height: 100%;
  object-fit: ${media.logoObjectFit || "contain"};
  filter: drop-shadow(0 0 ${media.logoGlowSpread || 10}px ${media.logoGlowColor || lighting.glowColor});
}

.beso-brand-title {
  margin: 0;
  font-family: ${typography.titleFontFamily || fontFamily};
  font-size: ${typography.titleSize}px;
  font-weight: ${typography.titleWeight || 800};
  font-style: ${typography.titleItalic ? "italic" : "normal"};
  text-align: ${typography.titleAlign || textAlign};
  color: ${typography.titleColor || "#fff8e7"};
  ${titleShadowCSS}
}

.beso-brand-subtitle {
  margin: 4px 0 0 0;
  font-family: ${typography.descFontFamily || fontFamily};
  font-size: ${typography.descSize || 12}px;
  font-weight: ${typography.descWeight || 400};
  font-style: ${typography.descItalic ? "italic" : "normal"};
  text-align: ${typography.descAlign || textAlign};
  color: ${typography.descColor || "#aebbb4"};
  ${descShadowCSS}
}

.beso-brand-section-title {
  font-family: ${fontFamily};
  font-size: 12px;
  font-weight: 700;
  color: ${typography.titleColor || "#fff8e7"};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: ${textAlign};
}

.beso-materials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.beso-mat-pill {
  padding: 8px 4px;
  border-radius: 10px;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  font-family: ${fontFamily};
  border: 1px solid rgba(255,255,255,0.15);
}

.beso-mat-glass { background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); }
.beso-mat-dark { background: #071711; border-color: rgba(212,175,55,0.3); }
.beso-mat-metal { background: linear-gradient(145deg, #2b3330, #141c18); }
.beso-mat-classic { background: #0d3b2e; }
.beso-mat-neon { background: #021a12; border-color: #10b981; box-shadow: 0 0 10px rgba(16,185,129,0.4); }
.beso-mat-ivory { background: #f5eee1; color: #2b1f09; }

.beso-typo-hierarchy {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: ${fontFamily};
}

.beso-typo-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(0,0,0,0.25);
  font-size: 11px;
  font-family: ${fontFamily};
}

.beso-color-swatches {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}

.beso-color-swatch {
  height: 38px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2px;
  font-size: 8px;
  font-family: monospace;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px #000;
}

.beso-geometry-indicators {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  font-family: ${fontFamily};
}

.beso-geom-box {
  padding: 8px 4px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.beso-geom-val {
  font-family: monospace;
  font-weight: 700;
  font-size: 11px;
  color: ${typography.titleColor || "#fff8e7"};
}

.beso-geom-lbl {
  font-size: 9px;
  color: ${typography.descColor || "#a8b7ad"};
  font-family: ${fontFamily};
}`.trim();

    const html = `<div class="beso-brand-guide-card">
  <div class="beso-brand-header">
    <div>
      <h2 class="beso-brand-title">${escapeHtml(typography.titleText || "Beso UI Design System")}</h2>
      <p class="beso-brand-subtitle">${escapeHtml(typography.descText || "دليل الهوية البصرية ومصفوفة الخامات المادية")}</p>
    </div>
    <div class="beso-brand-logo-wrap brand-logo-symbol beso-brand-logo-symbol">
      ${customLogoUrl ? `<img src="${customLogoUrl}" alt="Brand Logo" />` : "B"}
    </div>
  </div>

  <div>
    <div class="beso-brand-section-title"><span>💎</span> مصفوفة الخامات المادية الـ 6</div>
    <div class="beso-materials-grid">
      <div class="beso-mat-pill beso-mat-glass">زجاجي Glass</div>
      <div class="beso-mat-pill beso-mat-dark">داكن Dark</div>
      <div class="beso-mat-pill beso-mat-metal">معدني Metal</div>
      <div class="beso-mat-pill beso-mat-classic">كلاسيك Classic</div>
      <div class="beso-mat-pill beso-mat-neon">نيون Neon</div>
      <div class="beso-mat-pill beso-mat-ivory">عاجي Ivory</div>
    </div>
  </div>

  <div>
    <div class="beso-brand-section-title"><span>✍️</span> الهيكل الطباعي (Typography Hierarchy)</div>
    <div class="beso-typo-hierarchy">
      <div class="beso-typo-row">
        <span style="font-size: ${fontBase * 1.75}px; font-weight: 800; color: ${typography.titleColor};">Heading 1</span>
        <span style="color: ${typography.titleColor}; font-family: monospace;">${fontBase * 1.75}px / 1.75rem</span>
      </div>
      <div class="beso-typo-row">
        <span style="font-size: ${fontBase * 1.35}px; font-weight: 700; color: ${typography.descColor};">Heading 2</span>
        <span style="color: ${typography.descColor}; font-family: monospace;">${fontBase * 1.35}px / 1.35rem</span>
      </div>
      <div class="beso-typo-row">
        <span style="font-size: ${fontBase}px; color: ${typography.descColor};">Body Regular</span>
        <span style="color: ${typography.descColor}; font-family: monospace;">${fontBase}px / 1.0rem</span>
      </div>
    </div>
  </div>

  <div>
    <div class="beso-brand-section-title"><span>🎨</span> لوحة الألوان الرئيسية الديناميكية (Color Swatches)</div>
    <div class="beso-color-swatches">
      <div class="beso-color-swatch" style="background: ${lighting.colorStop1};">${lighting.colorStop1.toUpperCase().slice(0, 5)}</div>
      <div class="beso-color-swatch" style="background: ${lighting.colorStop2};">${lighting.colorStop2.toUpperCase().slice(0, 5)}</div>
      <div class="beso-color-swatch" style="background: ${lighting.colorStop3};">${lighting.colorStop3.toUpperCase().slice(0, 5)}</div>
      <div class="beso-color-swatch" style="background: ${lighting.glowColor};">${lighting.glowColor.toUpperCase().slice(0, 5)}</div>
      <div class="beso-color-swatch" style="background: ${dimensions.borderColor};">${dimensions.borderColor.toUpperCase().slice(0, 5)}</div>
      <div class="beso-color-swatch" style="background: ${typography.titleColor};">${typography.titleColor.toUpperCase().slice(0, 5)}</div>
    </div>
  </div>

  <div>
    <div class="beso-brand-section-title"><span>📐</span> مؤشرات الهندسة والسطح المادي (Geometry & Physics)</div>
    <div class="beso-geometry-indicators">
      <div class="beso-geom-box">
        <span class="beso-geom-val">${Math.round(dimensions.surfaceOpacity * 100)}%</span>
        <span class="beso-geom-lbl">الشفافية</span>
      </div>
      <div class="beso-geom-box">
        <span class="beso-geom-val">${dimensions.borderWidth}px</span>
        <span class="beso-geom-lbl">الإطار</span>
      </div>
      <div class="beso-geom-box">
        <span class="beso-geom-val">${lighting.bevelDepth}px</span>
        <span class="beso-geom-lbl">الشطف</span>
      </div>
      <div class="beso-geom-box">
        <span class="beso-geom-val">${lighting.glowSpread}px</span>
        <span class="beso-geom-lbl">التوهج</span>
      </div>
    </div>
  </div>
</div>`;

    return { html, css };
  }

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

  // 0. PREMIUM 7: BEATING HEART INTERACTIVE BUTTON
  if (elementId === "like-heart-btn") {
    const text = escapeHtml(typography.titleText || "إعجاب وتفضيل");
    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "56px" : `${dimensions.height}px`;

    const css = `.beso-heart-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  padding: ${Math.round(dimensions.padding * 0.55)}px ${Math.round(dimensions.padding * 1.35)}px;
  border-radius: ${dimensions.borderRadius}px;
  background: ${hexToRgba("#0b1c15", 0.95)};
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.35)};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 15px ${hexToRgba(lighting.glowColor, 0.2)};
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  color: ${typography.titleColor || "#ffffff"};
  cursor: pointer;
  outline: none;
  user-select: none;
  box-sizing: border-box;
  transition: transform 400ms cubic-bezier(0.68, -0.55, 0.27, 2.5), box-shadow 400ms ease, border-color 300ms ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-heart-btn .heart-icon-wrapper {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.beso-heart-btn .heart-empty {
  position: absolute;
  color: #ff6e6e;
  opacity: 1;
  transition: opacity 300ms ease, transform 300ms ease;
}

.beso-heart-btn .heart-filled {
  position: absolute;
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 300ms ease, transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.beso-heart-btn:hover {
  transform: scale(1.05);
  border-color: #ff6e6e;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 110, 110, 0.45);
}

.beso-heart-btn:hover .heart-empty {
  opacity: 0;
  transform: scale(0.8);
}

.beso-heart-btn:hover .heart-filled {
  opacity: 1;
  transform: scale(1);
  animation: beatingHeart 1.2s infinite ease-in-out;
}

.beso-heart-btn:active {
  transform: scale(0.95);
}

@keyframes beatingHeart {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
  100% { transform: scale(1); }
}
${entranceKeyframes}`.trim();

    const html = `<button class="beso-heart-btn">
  <div class="heart-icon-wrapper">
    <svg class="heart-empty" viewBox="0 0 24 24" width="28" height="28">
      <path fill="none" d="M0 0H24V24H0z"/>
      <path fill="currentColor" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"/>
    </svg>
    <svg class="heart-filled" viewBox="0 0 24 24" width="28" height="28">
      <path fill="none" d="M0 0H24V24H0z"/>
      <path fill="#ff6e6e" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"/>
    </svg>
  </div>
  <span class="heart-btn-text">${text}</span>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 8: MULTI-LAYER BLEND DIFFERENCE BUTTON
  if (elementId === "multi-layer-diff-btn") {
    const text = escapeHtml(typography.titleText || "زر الطبقات المدمجة ✦");
    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "56px" : `${dimensions.height}px`;

    const css = `.beso-diff-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  border-radius: ${dimensions.borderRadius}px;
  overflow: hidden;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${hexToRgba(lighting.glowColor, 0.35)};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-diff-wrapper .diff-light {
  position: absolute;
  inset: 0;
  background: ${hexToRgba("#03120c", dimensions.surfaceOpacity)};
  border-radius: inherit;
  z-index: 0;
}

.beso-diff-wrapper .gradient-layer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at center, ${hexToRgba(lighting.colorStop1, 0.85)} 0%, ${hexToRgba(lighting.glowColor, 0.65)} 35%, ${hexToRgba(lighting.colorStop3, 0.8)} 60%, transparent 75%);
  mix-blend-mode: difference;
  animation: rotateDiff linear infinite;
  pointer-events: none;
  z-index: 1;
}

.beso-diff-wrapper .gradient-btn-base {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Math.round(dimensions.padding * 0.55)}px ${Math.round(dimensions.padding * 1.35)}px;
  border-radius: ${Math.max(0, dimensions.borderRadius - 2)}px;
  background: rgba(5, 15, 11, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: ${typography.titleColor || "#ffffff"};
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  user-select: none;
  box-sizing: border-box;
  transition: background 0.3s ease;
}

.beso-diff-wrapper .text-overlay-mask {
  position: absolute;
  z-index: 3;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 10px ${hexToRgba(lighting.glowColor, 0.8)};
  mix-blend-mode: overlay;
}

.beso-diff-wrapper:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 35px ${hexToRgba(lighting.glowColor, 0.75)};
}

.beso-diff-wrapper:active {
  transform: translateY(1px) scale(0.97);
}

@keyframes rotateDiff {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-diff-wrapper">
  <div class="diff-light"></div>
  <div class="gradient-layer" style="animation-delay: 0s; animation-duration: 25s;"></div>
  <div class="gradient-layer" style="animation-delay: 0.15s; animation-duration: 15.9s;"></div>
  <div class="gradient-layer" style="animation-delay: 0.53s; animation-duration: 26.4s;"></div>
  <button class="gradient-btn-base">${text}</button>
  <div class="text-overlay-mask">${text}</div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 9: FIGMA CANVAS VECTOR FRAME (Dynamic Responsive Scaling, Fixed Centered Content & Autonomous Moving Cursor)
  if (elementId === "figma-vector-frame") {
    const w = dimensions.width || 420;
    const h = dimensions.height === "auto" ? 260 : (typeof dimensions.height === "number" ? dimensions.height : parseInt(dimensions.height, 10) || 260);
    const titleText = escapeHtml(typography.titleText || "إطار التصميم التفاعلي Figma");
    const descText = escapeHtml(typography.descText || "Abdullah Al-Mkhlafi");
    const titleColor = typography.titleColor || "#FFFFFF";
    const descColor = typography.descColor || "#FFFFFF";
    const strokeColor = lighting.glowColor || "#2563EB";

    const css = `.beso-figma-container {
  width: ${w}px;
  max-width: 100%;
  height: ${h}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.7);
  border-radius: ${dimensions.borderRadius || 12}px;
  padding: ${dimensions.padding || 16}px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px ${hexToRgba(strokeColor, 0.25)};
  overflow: hidden;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: box-shadow 0.3s ease;
}

.figma-svg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.figma-fixed-badge {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
}

.figma-moving-cursor {
  /* Autonomous moving cursor keyframe - decoupled from text */
  animation: figmaCursorMove 6s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
}

.figma-card-content {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 90%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: ${typography.textAlign || "center"};
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

.figma-title-text {
  margin: 0;
  width: 100%;
  max-width: 90%;
  font-size: ${typography.titleSize || 20}px;
  font-weight: 700;
  color: ${titleColor};
  line-height: 1.4;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  ${textShadowCSS}
}

.beso-figma-container:hover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px ${hexToRgba(strokeColor, 0.45)};
}

@keyframes figmaCursorMove {
  0% { transform: translate(30px, 40px); }
  25% { transform: translate(${Math.max(40, w - 80)}px, 50px); }
  50% { transform: translate(${Math.max(40, w - 90)}px, ${Math.max(40, h - 70)}px) scale(0.9); }
  75% { transform: translate(50px, ${Math.max(40, h - 60)}px); }
  100% { transform: translate(${Math.floor(w / 2)}px, ${Math.floor(h / 2)}px); }
}
${entranceKeyframes}`.trim();

    const badgeWidth = Math.max(110, descText.length * 8.5 + 20);

    const html = `<div class="beso-figma-container">
  <svg class="figma-svg-canvas" viewBox="0 0 ${w} ${h}">
    <!-- Selection Bounding Box -->
    <rect x="10" y="10" width="${Math.max(10, w - 20)}" height="${Math.max(10, h - 20)}" stroke="${strokeColor}" stroke-width="2" fill="${strokeColor}" fill-opacity="0.08" rx="4" />
    
    <!-- Corner Handles -->
    <rect x="5" y="5" width="10" height="10" stroke="${strokeColor}" stroke-width="2" fill="#FFFFFF" />
    <rect x="${Math.max(5, w - 15)}" y="5" width="10" height="10" stroke="${strokeColor}" stroke-width="2" fill="#FFFFFF" />
    <rect x="5" y="${Math.max(5, h - 15)}" width="10" height="10" stroke="${strokeColor}" stroke-width="2" fill="#FFFFFF" />
    <rect x="${Math.max(5, w - 15)}" y="${Math.max(5, h - 15)}" width="10" height="10" stroke="${strokeColor}" stroke-width="2" fill="#FFFFFF" />

    <!-- FIXED LABEL BADGE ATTACHED DIRECTLY TO THE FRAME -->
    <g class="figma-fixed-badge" transform="translate(18, 18)">
      <rect x="0" y="0" width="${badgeWidth}" height="24" fill="${strokeColor}" rx="4" />
      <text x="${badgeWidth / 2}" y="16" fill="${descColor}" font-size="${typography.descSize || 12}px" font-weight="600" text-anchor="middle">${descText}</text>
    </g>

    <!-- AUTONOMOUS MOVING CURSOR (INDEPENDENT KEYFRAME) -->
    <g class="figma-moving-cursor">
      <path stroke="#FFFFFF" stroke-width="1.5" fill="${strokeColor}" d="M 0 0 L 0 22 L 6 16 L 15 16 Z" />
    </g>
  </svg>

  <!-- CENTERED TEXT CONTAINER WITH AUTO-WRAP & SAFE PADDING -->
  <div class="figma-card-content">
    <h3 class="figma-title-text">${titleText}</h3>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 10: ANIMATED WAVE & RIPPLE BUTTON
  if (elementId === "ripple-wave-btn") {
    const text = escapeHtml(typography.titleText || "انقر للمتابعة");
    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "52px" : `${dimensions.height}px`;

    const css = `.beso-wave-btn {
  --color-background: #0d3b2e;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  padding: ${Math.round(dimensions.padding * 0.55)}px ${Math.round(dimensions.padding * 1.35)}px;
  border-radius: ${dimensions.borderRadius}px;
  background: var(--color-background);
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.4)};
  color: ${typography.titleColor || "#ffffff"};
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45), 0 0 18px ${hexToRgba(lighting.glowColor, 0.25)};
  transition: all ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-wave-btn span {
  position: relative;
  z-index: 2;
}

.beso-wave-btn .wave-svg-arrows {
  position: relative;
  z-index: 2;
  fill: ${lighting.glowColor};
  transition: transform 0.3s ease;
}

.beso-wave-btn .wave-svg-arrows polygon {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.beso-wave-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, ${hexToRgba(lighting.glowColor, 0.55)} 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
  opacity: 0;
  z-index: 1;
}

.beso-wave-btn:hover {
  transform: translateY(-2px);
  border-color: ${lighting.glowColor};
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.5), 0 0 28px ${hexToRgba(lighting.glowColor, 0.6)};
}

.beso-wave-btn:hover::before {
  width: 300px;
  height: 300px;
  opacity: 1;
}

.beso-wave-btn:hover .wave-svg-arrows polygon:nth-child(1) {
  animation: ripple 0.6s infinite alternate;
}
.beso-wave-btn:hover .wave-svg-arrows polygon:nth-child(2) {
  animation: ripple 0.6s 0.2s infinite alternate;
}
.beso-wave-btn:hover .wave-svg-arrows polygon:nth-child(3) {
  animation: ripple 0.6s 0.4s infinite alternate;
}

.beso-wave-btn:active {
  transform: translateY(1px) scale(0.98);
}

@keyframes ripple {
  0% { opacity: 0.3; transform: translateX(0); }
  100% { opacity: 1; transform: translateX(3px); }
}
${entranceKeyframes}`.trim();

    const html = `<button class="beso-wave-btn">
  <span>${text}</span>
  <svg class="wave-svg-arrows" viewBox="0 0 66 43" width="24" height="16">
    <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5" />
    <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5" />
    <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5" />
  </svg>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 11: CYBER SCANLINE & GLOW CARD
  if (elementId === "cyber-glimmer-card") {
    const title = escapeHtml(typography.titleText || "نظام الرادار السيبراني");
    const desc = escapeHtml(typography.descText || "مسح ضوئي ذري مستمر للكشف عن التغيرات الطيفية في النواقل المادية.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "240px" : `${dimensions.height}px`;

    const css = `.beso-cyber-glimmer-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(8, 20, 15, 0.95), rgba(4, 10, 8, 0.98));
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.3)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  text-align: ${typography.textAlign};
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-cyber-glimmer-card .cyber-corners span {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: ${lighting.glowColor};
  border-style: solid;
  transition: all 0.3s ease;
  pointer-events: none;
}
.beso-cyber-glimmer-card .cyber-corners span:nth-child(1) { top: 6px; left: 6px; border-width: 2px 0 0 2px; }
.beso-cyber-glimmer-card .cyber-corners span:nth-child(2) { top: 6px; right: 6px; border-width: 2px 2px 0 0; }
.beso-cyber-glimmer-card .cyber-corners span:nth-child(3) { bottom: 6px; left: 6px; border-width: 0 0 2px 2px; }
.beso-cyber-glimmer-card .cyber-corners span:nth-child(4) { bottom: 6px; right: 6px; border-width: 0 2px 2px 0; }

.beso-cyber-glimmer-card .scanline-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${lighting.glowColor}, #ffffff, ${lighting.glowColor}, transparent);
  box-shadow: 0 0 12px ${lighting.glowColor};
  animation: scanMove 2.5s linear infinite;
  pointer-events: none;
  opacity: 0.85;
}

.beso-cyber-glimmer-card .cyber-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
  ${textShadowCSS}
}

.beso-cyber-glimmer-card .cyber-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.6;
  margin: 0;
}

.beso-cyber-glimmer-card:hover {
  border-color: ${lighting.glowColor};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px ${hexToRgba(lighting.glowColor, 0.5)};
}

.beso-cyber-glimmer-card:hover .cyber-corners span {
  width: 16px;
  height: 16px;
  box-shadow: 0 0 8px ${lighting.glowColor};
}

@keyframes scanMove {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-cyber-glimmer-card">
  <div class="cyber-corners"><span></span><span></span><span></span><span></span></div>
  <div class="scanline-bar"></div>
  <h3 class="cyber-title">${title}</h3>
  <p class="cyber-desc">${desc}</p>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 12: 3D HOLOGRAPHIC ORBIT RING
  if (elementId === "holographic-3d-ring") {
    const title = escapeHtml(typography.titleText || "حلقة الهولوغرام 3D");
    const desc = escapeHtml(typography.descText || "محرك هولوغرافي مداري بتناغم ثلاثي الأبعاد.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "250px" : `${dimensions.height}px`;

    const css = `.beso-holo-ring-container {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: ${media.carouselPerspective || 900}px;
  transform-style: preserve-3d;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-holo-ring-container .holo-orbit-ring {
  position: absolute;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: ${lighting.glowColor};
  border-bottom-color: #00ffcc;
  box-shadow: 0 0 20px ${hexToRgba(lighting.glowColor, 0.5)};
  animation: holoSpin ${media.carouselRotationSpeed ? Math.round(media.carouselRotationSpeed * 0.4) : 6}s linear infinite;
  transform-style: preserve-3d;
  pointer-events: none;
}

.beso-holo-ring-container .ring-secondary {
  width: 135%;
  height: 135%;
  border-top-color: #ff3366;
  border-bottom-color: ${lighting.glowColor};
  animation: holoSpinReverse ${media.carouselRotationSpeed ? Math.round(media.carouselRotationSpeed * 0.5) : 8}s linear infinite;
}

.beso-holo-ring-container .holo-card-core {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(135deg, rgba(13, 59, 46, 0.85), rgba(74, 21, 75, 0.75));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  text-align: ${typography.textAlign};
  transform: rotateX(${media.carouselTiltAngle || 5}deg);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.beso-holo-ring-container .holo-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 99px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: ${hexToRgba(lighting.glowColor, 0.2)};
  color: ${lighting.glowColor};
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.4)};
  margin-bottom: 8px;
}

.beso-holo-ring-container .holo-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 6px 0;
  ${textShadowCSS}
}

.beso-holo-ring-container .holo-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.5;
  margin: 0;
}

.beso-holo-ring-container:hover .holo-card-core {
  transform: rotateX(0deg) scale(1.03);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 35px ${hexToRgba(lighting.glowColor, 0.6)};
}

@keyframes holoSpin {
  0% { transform: rotateX(70deg) rotateZ(0deg); }
  100% { transform: rotateX(70deg) rotateZ(360deg); }
}

@keyframes holoSpinReverse {
  0% { transform: rotateY(70deg) rotateZ(0deg); }
  100% { transform: rotateY(70deg) rotateZ(-360deg); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-holo-ring-container">
  <div class="holo-orbit-ring"></div>
  <div class="holo-orbit-ring ring-secondary"></div>
  <div class="holo-card-core">
    <div class="holo-badge">3D HOLO CORE</div>
    <h3 class="holo-title">${title}</h3>
    <p class="holo-desc">${desc}</p>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 13: CYBER MATRIX BADGE
  if (elementId === "cyber-matrix-badge") {
    const title = escapeHtml(typography.titleText || "MATRIX SECURE NODE");
    const codeTag = escapeHtml(typography.descText || "SYS_ONLINE::0x7F");
    const glow = lighting.glowColor || "#00ff88";

    const css = `.beso-matrix-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: ${Math.round(dimensions.padding * 0.35)}px ${Math.round(dimensions.padding * 0.75)}px;
  border-radius: ${dimensions.borderRadius}px;
  background: rgba(5, 20, 12, 0.92);
  border: 1px solid ${glow};
  box-shadow: 0 0 16px ${hexToRgba(glow, 0.35)}, inset 0 1px 0 rgba(255, 255, 255, 0.15);
  font-family: monospace, sans-serif;
  font-size: ${globalParams.fontSize || 13}px;
  color: ${typography.titleColor || "#00ff88"};
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  transition: transform ${animations.transitionSpeed}s ease, box-shadow ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-matrix-badge .matrix-grid-bg {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(0, 255, 136, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.08) 1px, transparent 1px);
  background-size: 8px 8px;
  pointer-events: none;
  z-index: 1;
}

.beso-matrix-badge .matrix-scan-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffffff, ${glow}, transparent);
  box-shadow: 0 0 8px ${glow};
  animation: matrixScan 2s linear infinite;
  pointer-events: none;
  z-index: 2;
}

.beso-matrix-badge .matrix-dot {
  position: relative;
  z-index: 3;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${glow};
  box-shadow: 0 0 10px ${glow};
  animation: matrixPulse 1.2s ease-in-out infinite alternate;
}

.beso-matrix-badge .matrix-label {
  position: relative;
  z-index: 3;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.beso-matrix-badge .matrix-code {
  position: relative;
  z-index: 3;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${hexToRgba(glow, 0.18)};
  border: 1px solid ${hexToRgba(glow, 0.4)};
  font-size: 11px;
  color: ${typography.descColor || glow};
  letter-spacing: 1px;
}

.beso-matrix-badge:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 0 26px ${hexToRgba(glow, 0.65)};
}

@keyframes matrixPulse {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 14px ${glow}; }
}

@keyframes matrixScan {
  0% { top: 0%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-matrix-badge">
  <div class="matrix-grid-bg"></div>
  <div class="matrix-scan-bar"></div>
  <span class="matrix-dot"></span>
  <span class="matrix-label">${title}</span>
  <span class="matrix-code">${codeTag}</span>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 14: 3D GLASSMORPHIC PRISM CARD
  if (elementId === "glass-morph-card-3d") {
    const title = escapeHtml(typography.titleText || "منشور الزجاج البلوري");
    const desc = escapeHtml(typography.descText || "بطاقة انكسار طيفية متعددة الطبقات بزوايا ضوئية ديناميكية.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "220px" : `${dimensions.height}px`;

    const css = `.beso-prism-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all ${animations.transitionSpeed}s ease;
  box-sizing: border-box;
  text-align: ${typography.textAlign};
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-prism-card .prism-refraction {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, ${hexToRgba(lighting.glowColor, 0.35)} 0%, rgba(255, 0, 128, 0.2) 30%, rgba(0, 200, 255, 0.2) 60%, transparent 75%);
  animation: prismRotate 10s linear infinite;
  pointer-events: none;
  mix-blend-mode: color-dodge;
  z-index: 1;
}

.beso-prism-card .prism-content {
  position: relative;
  z-index: 2;
  transform: translateZ(30px);
}

.beso-prism-card .prism-tag {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 99px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.15);
  color: ${lighting.glowColor};
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 10px;
}

.beso-prism-card .prism-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
  ${textShadowCSS}
}

.beso-prism-card .prism-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.6;
  margin: 0;
}

.beso-prism-card:hover {
  transform: translateY(-4px) scale(1.02) rotateX(4deg);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${hexToRgba(lighting.glowColor, 0.5)};
}

@keyframes prismRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-prism-card">
  <div class="prism-refraction"></div>
  <div class="prism-content">
    <span class="prism-tag">PRISM 3D</span>
    <h3 class="prism-title">${title}</h3>
    <p class="prism-desc">${desc}</p>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 15: FLOWING NEON BORDER BUTTON
  if (elementId === "glowing-border-button") {
    const text = escapeHtml(typography.titleText || "انقر للتأكيد ✦");
    const buttonWidthCSS = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const buttonHeightCSS = dimensions.height === "auto" ? "54px" : `${dimensions.height}px`;

    const css = `.beso-flowing-border-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${buttonWidthCSS};
  height: ${buttonHeightCSS};
  min-height: 48px;
  border-radius: ${dimensions.borderRadius}px;
  overflow: hidden;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 2px;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${hexToRgba(lighting.glowColor, 0.35)};
  transition: transform ${animations.transitionSpeed}s ease, box-shadow ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-flowing-border-btn .flowing-border-beam {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent 0 270deg, ${lighting.glowColor || "#d4af37"} 360deg);
  animation: flowingRotate 2s linear infinite;
  z-index: 1;
}

.beso-flowing-border-btn .flowing-inner-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Math.round(dimensions.padding * 0.55)}px ${Math.round(dimensions.padding * 1.35)}px;
  border-radius: ${Math.max(0, dimensions.borderRadius - 2)}px;
  background: rgba(8, 20, 15, 0.95);
  color: ${typography.titleColor || "#ffffff"};
  font-family: inherit;
  font-size: ${globalParams.fontSize || 16}px;
  font-weight: 700;
  transition: background 0.3s ease;
}

.beso-flowing-border-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 35px ${hexToRgba(lighting.glowColor, 0.75)};
}

.beso-flowing-border-btn:active {
  transform: translateY(1px) scale(0.98);
}

@keyframes flowingRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
${entranceKeyframes}`.trim();

    const html = `<button class="beso-flowing-border-btn">
  <div class="flowing-border-beam"></div>
  <div class="flowing-inner-content">
    <span>${text}</span>
  </div>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 16: BIOMETRIC LASER SCANNER CARD
  if (elementId === "biometric-auth-card") {
    const title = escapeHtml(typography.titleText || "التحقق البيومتري الموثوق");
    const desc = escapeHtml(typography.descText || "ضع بصمة إصبعك لمسح الهوية وتأكيد الصلاحية المشفرة.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "240px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#00ff88";

    const css = `.beso-biometric-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(8, 20, 15, 0.95), rgba(4, 10, 8, 0.98));
  border: 1px solid ${hexToRgba(glow, 0.35)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px ${hexToRgba(glow, 0.2)};
  overflow: hidden;
  box-sizing: border-box;
  text-align: ${typography.textAlign};
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-biometric-card .bio-scanner-wrapper {
  position: relative;
  width: 84px;
  height: 84px;
  margin: 0 auto 16px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(5, 15, 10, 0.85);
  border: 1px solid ${hexToRgba(glow, 0.4)};
  overflow: hidden;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.7);
}

.beso-biometric-card .bio-laser-beam {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ffffff, ${glow}, transparent);
  box-shadow: 0 0 12px ${glow}, 0 0 24px ${glow};
  animation: laserScan 2.2s ease-in-out infinite alternate;
  z-index: 3;
  pointer-events: none;
}

.beso-biometric-card .bio-fingerprint-svg {
  position: relative;
  z-index: 2;
  color: ${glow};
  filter: drop-shadow(0 0 6px ${hexToRgba(glow, 0.6)});
  transition: color 0.3s ease, filter 0.3s ease;
}

.beso-biometric-card .bio-ring-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid ${hexToRgba(glow, 0.5)};
  animation: bioPulse 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
  pointer-events: none;
  z-index: 1;
}

.beso-biometric-card .bio-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 6px 0;
  line-height: 1.3;
  ${textShadowCSS}
}

.beso-biometric-card .bio-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.5;
  margin: 0;
}

.beso-biometric-card:hover {
  border-color: ${glow};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px ${hexToRgba(glow, 0.6)};
}

.beso-biometric-card:hover .bio-fingerprint-svg {
  color: #ffffff;
  filter: drop-shadow(0 0 12px ${glow});
}

@keyframes laserScan {
  0% { top: 5%; opacity: 0.6; }
  50% { opacity: 1; }
  100% { top: 90%; opacity: 0.6; }
}

@keyframes bioPulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1.35); opacity: 0; }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-biometric-card">
  <div class="bio-scanner-wrapper">
    <div class="bio-laser-beam"></div>
    <svg class="bio-fingerprint-svg" viewBox="0 0 24 24" width="64" height="64">
      <path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M12 2a10 10 0 0 0-10 10c0 3 1.2 5.8 3.2 7.8M12 6a6 6 0 0 0-6 6c0 1.8.7 3.5 2 4.7M12 10a2 2 0 0 0-2 2c0 .6.2 1.2.6 1.6M12 14a2 2 0 0 1 2-2M18 12a6 6 0 0 0-1.8-4.2M22 12a10 10 0 0 0-3.2-7.8"/>
    </svg>
    <div class="bio-ring-pulse"></div>
  </div>
  <h4 class="bio-title">${title}</h4>
  <p class="bio-desc">${desc}</p>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 17: QUANTUM GLASS PHYSICS TOGGLE
  if (elementId === "quantum-toggle-switch") {
    const glow = lighting.glowColor || "#00ffcc";

    const css = `.beso-quantum-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-quantum-toggle .toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.beso-quantum-toggle .toggle-track {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 78px;
  height: 42px;
  padding: 4px;
  border-radius: 99px;
  background: rgba(8, 20, 15, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.beso-quantum-toggle .toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(145deg, #24382b, #0a1711);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease;
  z-index: 2;
}

.beso-quantum-toggle .thumb-core {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #555555;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  transition: background 0.35s ease, box-shadow 0.35s ease;
}

.beso-quantum-toggle .toggle-label-on,
.beso-quantum-toggle .toggle-label-off {
  font-family: inherit;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.beso-quantum-toggle .toggle-label-on {
  margin-left: 8px;
  opacity: 0;
  color: ${glow};
}

.beso-quantum-toggle .toggle-label-off {
  margin-right: 8px;
  opacity: 0.6;
  color: #888888;
}

.beso-quantum-toggle .toggle-input:checked + .toggle-track {
  background: ${hexToRgba(lighting.colorStop1 || "#0d3b2e", 0.95)};
  border-color: ${glow};
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.4), 0 0 20px ${hexToRgba(glow, 0.45)};
}

.beso-quantum-toggle .toggle-input:checked + .toggle-track .toggle-thumb {
  transform: translateX(36px);
  background: linear-gradient(145deg, ${glow}, ${lighting.colorStop1 || "#0d3b2e"});
  border-color: #ffffff;
}

.beso-quantum-toggle .toggle-input:checked + .toggle-track .thumb-core {
  background: #ffffff;
  box-shadow: 0 0 10px #ffffff, 0 0 16px ${glow};
}

.beso-quantum-toggle .toggle-input:checked + .toggle-track .toggle-label-on {
  opacity: 1;
}

.beso-quantum-toggle .toggle-input:checked + .toggle-track .toggle-label-off {
  opacity: 0;
}
${entranceKeyframes}`.trim();

    const html = `<label class="beso-quantum-toggle">
  <input type="checkbox" class="toggle-input" />
  <span class="toggle-track">
    <span class="toggle-thumb">
      <span class="thumb-core"></span>
    </span>
    <span class="toggle-label-on">ON</span>
    <span class="toggle-label-off">OFF</span>
  </span>
</label>`;

    return { html, css };
  }

  // 0. PREMIUM 18: HOLOGRAPHIC LUXURY PRICING CARD
  if (elementId === "holographic-price-card") {
    const title = escapeHtml(typography.titleText || "499 $ / شهريًا");
    const badge = escapeHtml(typography.descText || "VIP PLATINUM");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "260px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#d4af37";

    const css = `.beso-holo-price-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(10, 24, 18, 0.96), rgba(5, 14, 10, 0.98));
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-holo-price-card .holo-shimmer-bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, ${hexToRgba(glow, 0.6)}, #ff007f, #00d4ff, #ffe600, ${hexToRgba(glow, 0.6)});
  animation: holoBorderSweep 4s linear infinite;
  z-index: -1;
  opacity: 0.85;
}

.beso-holo-price-card .holo-badge {
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: ${hexToRgba(glow, 0.2)};
  color: ${glow};
  border: 1px solid ${hexToRgba(glow, 0.45)};
  box-shadow: 0 0 12px ${hexToRgba(glow, 0.3)};
  margin-bottom: 12px;
}

.beso-holo-price-card .holo-price-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 800;
  margin: 0 0 12px 0;
  line-height: 1.2;
  ${textShadowCSS}
}

.beso-holo-price-card .holo-divider {
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${hexToRgba(glow, 0.5)}, transparent);
  margin: 0 auto 16px auto;
}

.beso-holo-price-card .holo-cta-btn {
  padding: 8px 20px;
  border-radius: 99px;
  background: linear-gradient(135deg, ${glow}, ${lighting.colorStop1 || "#0d3b2e"});
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), 0 0 15px ${hexToRgba(glow, 0.35)};
  transition: all 0.3s ease;
}

.beso-holo-price-card:hover {
  transform: translateY(-8px) rotateX(4deg);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7), 0 0 40px ${hexToRgba(glow, 0.5)};
}

.beso-holo-price-card:hover .holo-cta-btn {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), 0 0 25px ${hexToRgba(glow, 0.7)};
}

@keyframes holoBorderSweep {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-holo-price-card">
  <div class="holo-shimmer-bg"></div>
  <div class="holo-badge">${badge}</div>
  <h3 class="holo-price-title">${title}</h3>
  <div class="holo-divider"></div>
  <button class="holo-cta-btn">تفعيل الاشتراكات</button>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 19: CYBER DELIVERY TRUCK CARD
  if (elementId === "cyber-truck-card") {
    const title = escapeHtml(typography.titleText || "الشحن السريع الفوري");
    const desc = escapeHtml(typography.descText || "تتبع الشحنات اللوجستية السيبرانية بسرعة الضوء.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "240px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#d4af37";

    const css = `.beso-truck-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(12, 28, 22, 0.95), rgba(6, 14, 11, 0.98));
  border: 1px solid ${hexToRgba(glow, 0.35)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px ${hexToRgba(glow, 0.2)};
  overflow: hidden;
  box-sizing: border-box;
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-truck-card .truck-card-content {
  margin-bottom: 16px;
  text-align: ${typography.textAlign};
}

.beso-truck-card .truck-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 6px 0;
  line-height: 1.3;
  ${textShadowCSS}
}

.beso-truck-card .truck-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.5;
  margin: 0;
}

.beso-truck-card .truck-highway-wrapper {
  position: relative;
  height: 60px;
  border-radius: 12px;
  background: #070e14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.8);
}

.beso-truck-card .moving-road-lines {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 200%;
  height: 3px;
  background: repeating-linear-gradient(90deg, #d4af37, #d4af37 16px, transparent 16px, transparent 32px);
  animation: driveRoad 0.8s linear infinite;
}

.beso-truck-card .moving-truck {
  position: relative;
  z-index: 2;
  animation: truckBob 0.4s ease-in-out infinite alternate;
  display: flex;
  align-items: center;
}

.beso-truck-card .exhaust-smoke {
  position: absolute;
  left: -10px;
  bottom: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  filter: blur(2px);
  animation: smokePuff 0.6s infinite;
}

.beso-truck-card:hover {
  border-color: ${glow};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px ${hexToRgba(glow, 0.6)};
}

@keyframes driveRoad {
  0% { transform: translateX(0); }
  100% { transform: translateX(-32px); }
}

@keyframes truckBob {
  0% { transform: translateY(0); }
  100% { transform: translateY(-2px); }
}

@keyframes smokePuff {
  0% { transform: scale(0.5) translateX(0); opacity: 0.8; }
  100% { transform: scale(2) translateX(-15px); opacity: 0; }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-truck-card">
  <div class="truck-card-content">
    <h3 class="truck-title">${title}</h3>
    <p class="truck-desc">${desc}</p>
  </div>
  <div class="truck-highway-wrapper">
    <div class="moving-road-lines"></div>
    <div class="moving-truck">
      <svg class="truck-svg" viewBox="0 0 64 36" width="54" height="30">
        <path fill="#2563eb" d="M2 10h32v18H2z"/>
        <path fill="#d4af37" d="M34 16h14l6 6v6H34z"/>
        <circle cx="10" cy="28" r="4" fill="#0f172a" stroke="#d4af37" stroke-width="1.5"/>
        <circle cx="42" cy="28" r="4" fill="#0f172a" stroke="#d4af37" stroke-width="1.5"/>
        <path fill="#38bdf8" d="M36 18h10l4 4h-14z"/>
      </svg>
      <div class="exhaust-smoke"></div>
    </div>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 20: ANIME TREADMILL RUNNER CARD
  if (elementId === "anime-treadmill-card") {
    const title = escapeHtml(typography.titleText || "جلسة الجري المستمرة");
    const desc = escapeHtml(typography.descText || "معدل الحرق النشط: 420 سعرة حرارية");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "250px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#2563eb";

    const css = `.beso-treadmill-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(20, 32, 25, 0.95), rgba(8, 16, 12, 0.98));
  border: 1px solid ${hexToRgba(glow, 0.35)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px ${hexToRgba(glow, 0.2)};
  overflow: hidden;
  box-sizing: border-box;
  text-align: ${typography.textAlign};
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-treadmill-card .workout-badge {
  padding: 3px 9px;
  border-radius: 99px;
  font-size: 9px;
  font-weight: 800;
  background: ${hexToRgba(glow, 0.2)};
  color: ${glow};
  border: 1px solid ${hexToRgba(glow, 0.4)};
  margin-bottom: 8px;
  display: inline-block;
}

.beso-treadmill-card .treadmill-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 4px 0;
  ${textShadowCSS}
}

.beso-treadmill-card .treadmill-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.4;
  margin: 0 0 16px 0;
}

.beso-treadmill-card .treadmill-stage {
  position: relative;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.beso-treadmill-card .anime-runner {
  position: relative;
  width: 24px;
  height: 50px;
  animation: runnerBob 0.3s infinite alternate ease-in-out;
  margin-bottom: -4px;
  z-index: 2;
}

.beso-treadmill-card .runner-head {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffd79e;
  border: 1px solid #d4af37;
  margin: 0 auto;
  box-shadow: 0 0 6px rgba(212, 175, 55, 0.4);
}

.beso-treadmill-card .runner-body {
  width: 10px;
  height: 18px;
  border-radius: 4px;
  background: ${glow};
  margin: 2px auto 0 auto;
}

.beso-treadmill-card .runner-leg {
  position: absolute;
  bottom: 0;
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: #ffffff;
  transform-origin: top center;
}

.beso-treadmill-card .leg-left {
  left: 6px;
  animation: legStrides 0.6s linear infinite alternate;
}

.beso-treadmill-card .leg-right {
  right: 6px;
  animation: legStrides 0.6s linear infinite alternate-reverse;
}

.beso-treadmill-card .treadmill-belt {
  position: relative;
  width: 140px;
  height: 10px;
  border-radius: 6px;
  background: #0c1813;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.beso-treadmill-card .belt-track {
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(90deg, #333 0, #333 4px, #555 4px, #555 8px);
  animation: beltMove 0.5s linear infinite;
}

.beso-treadmill-card:hover {
  border-color: ${glow};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px ${hexToRgba(glow, 0.6)};
}

@keyframes runnerBob {
  0% { transform: translateY(0); }
  100% { transform: translateY(-3px); }
}

@keyframes legStrides {
  0% { transform: rotate(-35deg); }
  100% { transform: rotate(35deg); }
}

@keyframes beltMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-16px); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-treadmill-card">
  <div class="treadmill-header">
    <span class="workout-badge">WORKOUT LIVE</span>
    <h3 class="treadmill-title">${title}</h3>
    <p class="treadmill-desc">${desc}</p>
  </div>
  <div class="treadmill-stage">
    <!-- Animated Character -->
    <div class="anime-runner">
      <div class="runner-head"></div>
      <div class="runner-body"></div>
      <div class="runner-leg leg-left"></div>
      <div class="runner-leg leg-right"></div>
    </div>
    <!-- Moving Treadmill Belt -->
    <div class="treadmill-belt">
      <div class="belt-track"></div>
    </div>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 21: KINETIC MARQUEE TICKER TAPE CARD
  if (elementId === "ticker-tape-card") {
    const title = escapeHtml(typography.titleText || "عرض التخفيضات الكبرى");
    const desc = escapeHtml(typography.descText || "خصم 50% على جميع باقات Beso Studio الفاخرة");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "220px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#d4af37";

    const css = `.beso-ticker-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: 24px 0;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(14, 30, 24, 0.95), rgba(7, 16, 12, 0.98));
  border: 1px solid ${hexToRgba(glow, 0.35)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px ${hexToRgba(glow, 0.2)};
  overflow: hidden;
  box-sizing: border-box;
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-ticker-card .card-inner-body {
  padding: 0 24px 16px 24px;
  text-align: ${typography.textAlign};
}

.beso-ticker-card .ticker-card-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 6px 0;
  line-height: 1.3;
  ${textShadowCSS}
}

.beso-ticker-card .ticker-card-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.5;
  margin: 0;
}

.beso-ticker-card .marquee-tape-wrapper {
  position: relative;
  width: 110%;
  left: -5%;
  transform: rotate(-3deg) scale(1.03);
  background: linear-gradient(90deg, #d4af37, #2563eb, #d4af37);
  padding: 8px 0;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  white-space: nowrap;
  transition: transform 0.3s ease;
}

.beso-ticker-card .marquee-track {
  display: flex;
  white-space: nowrap;
  animation: tickerInfinite 10s linear infinite;
}

.beso-ticker-card .marquee-track span {
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  padding-right: 20px;
}

.beso-ticker-card:hover {
  border-color: ${glow};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px ${hexToRgba(glow, 0.6)};
}

.beso-ticker-card:hover .marquee-tape-wrapper {
  transform: rotate(0deg) scale(1.05);
}

@keyframes tickerInfinite {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-ticker-card">
  <div class="card-inner-body">
    <h3 class="ticker-card-title">${title}</h3>
    <p class="ticker-card-desc">${desc}</p>
  </div>
  <div class="marquee-tape-wrapper">
    <div class="marquee-track">
      <span>✨ ${title} • 🚀 ${desc || "عرض خاص ومحدود"} • 🔥 خصومات استثنائية • ✨ ${title} • 🚀 ${desc || "عرض خاص ومحدود"} •</span>
    </div>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 22: SLOT MACHINE FORTUNE CARD
  if (elementId === "slot-machine-card") {
    const title = escapeHtml(typography.titleText || "دولاب الجوائز الذهبي");
    const desc = escapeHtml(typography.descText || "فرصتك اليومية للفوز بهدايا استثنائية فورية.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "260px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#d4af37";

    const css = `.beso-slot-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(28, 18, 5, 0.95), rgba(14, 8, 2, 0.98));
  border: 1px solid ${hexToRgba(glow, 0.4)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 25px ${hexToRgba(glow, 0.3)};
  overflow: hidden;
  box-sizing: border-box;
  text-align: ${typography.textAlign};
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-slot-card .slot-header {
  margin-bottom: 12px;
}

.beso-slot-card .slot-badge {
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 9px;
  font-weight: 800;
  background: ${hexToRgba(glow, 0.2)};
  color: ${glow};
  border: 1px solid ${hexToRgba(glow, 0.45)};
  margin-bottom: 6px;
  display: inline-block;
}

.beso-slot-card .slot-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 800;
  margin: 0;
  ${textShadowCSS}
}

.beso-slot-card .slot-machine-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 16px auto;
  padding: 10px 14px;
  border-radius: 12px;
  background: #080402;
  border: 2px solid ${hexToRgba(glow, 0.5)};
  box-shadow: inset 0 4px 16px rgba(0, 0, 0, 0.8), 0 0 20px ${hexToRgba(glow, 0.25)};
  width: fit-content;
}

.beso-slot-card .reel-window {
  width: 48px;
  height: 52px;
  border-radius: 8px;
  background: #120b05;
  border: 1px solid rgba(255, 255, 255, 0.15);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.9);
}

.beso-slot-card .reel-strip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.beso-slot-card .reel-strip span {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

.beso-slot-card .reel-1 {
  animation: spinReel 1.2s cubic-bezier(0.15, 0.85, 0.35, 1.2) infinite;
}
.beso-slot-card .reel-2 {
  animation: spinReel 1.4s 0.2s cubic-bezier(0.15, 0.85, 0.35, 1.2) infinite;
}
.beso-slot-card .reel-3 {
  animation: spinReel 1.6s 0.4s cubic-bezier(0.15, 0.85, 0.35, 1.2) infinite;
}

.beso-slot-card .slot-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.5;
  margin: 0;
}

.beso-slot-card:hover {
  border-color: ${glow};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px ${hexToRgba(glow, 0.6)};
}

@keyframes spinReel {
  0% { transform: translateY(0); filter: blur(0); }
  30% { filter: blur(2px); }
  70% { filter: blur(2px); }
  100% { transform: translateY(-156px); filter: blur(0); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-slot-card">
  <div class="slot-header">
    <span class="slot-badge">LUCKY WIN</span>
    <h3 class="slot-title">${title}</h3>
  </div>
  <div class="slot-machine-display">
    <div class="reel-window"><div class="reel-strip reel-1"><span>💎</span><span>7️⃣</span><span>🚀</span><span>🎁</span></div></div>
    <div class="reel-window"><div class="reel-strip reel-2"><span>🚀</span><span>💎</span><span>🎁</span><span>7️⃣</span></div></div>
    <div class="reel-window"><div class="reel-strip reel-3"><span>🎁</span><span>7️⃣</span><span>💎</span><span>🚀</span></div></div>
  </div>
  <p class="slot-desc">${desc}</p>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 23: RETRO CRT GLITCH CARD
  if (elementId === "retro-crt-glitch") {
    const title = escapeHtml(typography.titleText || "إشارة البث المباشر CRT");
    const desc = escapeHtml(typography.descText || "جهاز استقبال كهرومغناطيسي بترددات تناظرية مستمرة.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "240px" : `${dimensions.height}px`;

    const css = `.beso-crt-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: #05080c;
  border: 2px solid rgba(0, 255, 180, 0.3);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 255, 180, 0.15), 0 0 20px rgba(0, 255, 180, 0.2);
  overflow: hidden;
  box-sizing: border-box;
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-crt-card .crt-scanline-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05));
  background-size: 100% 4px, 6px 100%;
  pointer-events: none;
  z-index: 2;
  opacity: 0.85;
  animation: crtScan 8s linear infinite;
}

.beso-crt-card .crt-content {
  position: relative;
  z-index: 3;
  text-align: ${typography.textAlign};
}

.beso-crt-card .crt-signal-indicator {
  font-family: monospace, sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #00ffb4;
  letter-spacing: 1px;
  margin-bottom: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.beso-crt-card .blink-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff0055;
  box-shadow: 0 0 6px #ff0055;
  animation: blinkLive 0.8s infinite alternate;
}

.beso-crt-card .crt-title {
  font-family: monospace, sans-serif;
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor || "#00ffb4"};
  font-weight: 800;
  margin: 0 0 8px 0;
  text-shadow: 0 0 10px rgba(0, 255, 180, 0.7);
  position: relative;
  display: inline-block;
}

.beso-crt-card .crt-desc {
  font-family: monospace, sans-serif;
  font-size: ${typography.descSize}px;
  color: ${typography.descColor || "#94a3b8"};
  line-height: 1.5;
  margin: 0;
}

.beso-crt-card:hover {
  border-color: #00ffb4;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), inset 0 0 50px rgba(0, 255, 180, 0.25), 0 0 35px rgba(0, 255, 180, 0.4);
}

.beso-crt-card:hover .crt-title {
  animation: rgbGlitch 0.3s ease infinite alternate;
}

@keyframes crtScan {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}

@keyframes blinkLive {
  0% { opacity: 0.2; }
  100% { opacity: 1; }
}

@keyframes rgbGlitch {
  0% { text-shadow: -2px 0 #ff0055, 2px 0 #00e5ff; transform: translate(1px, -1px); }
  100% { text-shadow: 2px 0 #ff0055, -2px 0 #00e5ff; transform: translate(-1px, 1px); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-crt-card">
  <div class="crt-scanline-overlay"></div>
  <div class="crt-content">
    <div class="crt-signal-indicator"><span class="blink-dot"></span> LIVE SIGNAL</div>
    <h3 class="crt-title" data-text="${title}">${title}</h3>
    <p class="crt-desc">${desc}</p>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 24: DYNAMIC AUDIO SPECTRUM EQUALIZER CARD
  if (elementId === "audio-equalizer-card") {
    const title = escapeHtml(typography.titleText || "الموجات الصوتية الحية");
    const desc = escapeHtml(typography.descText || "معالجة ترددية متعددة النطاقات بالزمن الحقيقي.");
    const widthRule = `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "230px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#00ffcc";

    const css = `.beso-audio-card {
  position: relative;
  width: ${widthRule};
  max-width: 100%;
  min-height: ${heightRule};
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(145deg, rgba(10, 25, 20, 0.95), rgba(4, 12, 10, 0.98));
  border: 1px solid ${hexToRgba(glow, 0.35)};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px ${hexToRgba(glow, 0.25)};
  overflow: hidden;
  box-sizing: border-box;
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-audio-card .audio-info {
  margin-bottom: 16px;
  text-align: ${typography.textAlign};
}

.beso-audio-card .audio-title {
  font-size: ${typography.titleSize}px;
  color: ${typography.titleColor};
  font-weight: 700;
  margin: 0 0 4px 0;
  ${textShadowCSS}
}

.beso-audio-card .audio-desc {
  font-size: ${typography.descSize}px;
  color: ${typography.descColor};
  line-height: 1.5;
  margin: 0;
}

.beso-audio-card .equalizer-visualizer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  height: 60px;
  padding: 10px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);
}

.beso-audio-card .eq-bar {
  width: 6px;
  border-radius: 99px;
  background: linear-gradient(180deg, #ff007f 0%, ${glow} 100%);
  box-shadow: 0 0 8px ${hexToRgba(glow, 0.6)};
}

.beso-audio-card .bar-1 { animation: jumpBar1 0.7s infinite alternate ease-in-out; }
.beso-audio-card .bar-2 { animation: jumpBar2 0.9s 0.1s infinite alternate ease-in-out; }
.beso-audio-card .bar-3 { animation: jumpBar3 0.6s 0.2s infinite alternate ease-in-out; }
.beso-audio-card .bar-4 { animation: jumpBar4 1.1s 0.15s infinite alternate ease-in-out; }
.beso-audio-card .bar-5 { animation: jumpBar2 0.8s 0.3s infinite alternate ease-in-out; }
.beso-audio-card .bar-6 { animation: jumpBar1 1.0s 0.25s infinite alternate ease-in-out; }
.beso-audio-card .bar-7 { animation: jumpBar4 0.75s 0.05s infinite alternate ease-in-out; }
.beso-audio-card .bar-8 { animation: jumpBar3 0.85s 0.2s infinite alternate ease-in-out; }

.beso-audio-card:hover {
  border-color: ${glow};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px ${hexToRgba(glow, 0.6)};
}

@keyframes jumpBar1 { 0% { height: 15%; } 100% { height: 85%; } }
@keyframes jumpBar2 { 0% { height: 35%; } 100% { height: 95%; } }
@keyframes jumpBar3 { 0% { height: 20%; } 100% { height: 70%; } }
@keyframes jumpBar4 { 0% { height: 40%; } 100% { height: 100%; } }
${entranceKeyframes}`.trim();

    const html = `<div class="beso-audio-card">
  <div class="audio-info">
    <h3 class="audio-title">${title}</h3>
    <p class="audio-desc">${desc}</p>
  </div>
  <div class="equalizer-visualizer">
    <span class="eq-bar bar-1"></span>
    <span class="eq-bar bar-2"></span>
    <span class="eq-bar bar-3"></span>
    <span class="eq-bar bar-4"></span>
    <span class="eq-bar bar-5"></span>
    <span class="eq-bar bar-6"></span>
    <span class="eq-bar bar-7"></span>
    <span class="eq-bar bar-8"></span>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 25: KINETIC SLIDING SHOPPING CART BUTTON
  if (elementId === "kinetic-cart-slide") {
    const title = escapeHtml(typography.titleText || "إضافة للسلة");
    const widthRule = dimensions.width === 360 ? "auto" : `${dimensions.width}px`;
    const heightRule = dimensions.height === "auto" ? "54px" : `${dimensions.height}px`;
    const glow = lighting.glowColor || "#d4af37";

    const css = `.beso-kinetic-cart-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: ${widthRule};
  height: ${heightRule};
  padding: ${Math.round(dimensions.padding * 0.5)}px ${Math.round(dimensions.padding * 1.2)}px;
  border-radius: ${dimensions.borderRadius}px;
  background: linear-gradient(135deg, ${glow}, ${lighting.colorStop1 || "#2563eb"});
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-family: inherit;
  font-size: ${globalParams.fontSize || 15}px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px ${hexToRgba(glow, 0.35)};
  transition: transform ${animations.transitionSpeed}s ease, box-shadow ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-kinetic-cart-btn .cart-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.beso-kinetic-cart-btn .cart-svg-wheel {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.beso-kinetic-cart-btn .item-particle-drop {
  position: absolute;
  top: -8px;
  left: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
  opacity: 0;
  transition: all 0.3s ease;
}

.beso-kinetic-cart-btn .btn-text-wrapper {
  position: relative;
  height: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: right;
}

.beso-kinetic-cart-btn .text-default,
.beso-kinetic-cart-btn .text-added {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  display: block;
  line-height: 22px;
}

.beso-kinetic-cart-btn .text-added {
  color: #ffffff;
  transform: translateY(22px);
  opacity: 0;
  font-weight: 800;
}

.beso-kinetic-cart-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.5), 0 0 30px ${hexToRgba(glow, 0.6)};
}

.beso-kinetic-cart-btn:hover .cart-svg-wheel {
  transform: translateX(4px) rotate(-6deg);
}

.beso-kinetic-cart-btn:hover .item-particle-drop {
  animation: dropParticle 0.5s forwards;
}

.beso-kinetic-cart-btn:hover .text-default {
  transform: translateY(-22px);
  opacity: 0;
}

.beso-kinetic-cart-btn:hover .text-added {
  transform: translateY(0);
  opacity: 1;
}

.beso-kinetic-cart-btn:active {
  transform: translateY(1px) scale(0.98);
}

@keyframes dropParticle {
  0% { transform: translateY(-12px); opacity: 1; }
  100% { transform: translateY(6px); opacity: 0; }
}
${entranceKeyframes}`.trim();

    const html = `<button class="beso-kinetic-cart-btn">
  <div class="cart-icon-container">
    <svg class="cart-svg-wheel" viewBox="0 0 24 24" width="22" height="22">
      <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
    <span class="item-particle-drop"></span>
  </div>
  <div class="btn-text-wrapper">
    <span class="text-default">${title}</span>
    <span class="text-added">تمت الإضافة ✔️</span>
  </div>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 26: INTERACTIVE QUICK QUANTITY COUNTER BUTTON
  if (elementId === "quick-quantity-counter") {
    const title = escapeHtml(typography.titleText || "إضافة للسلة");
    const glow = lighting.glowColor || "#d4af37";

    const css = `.beso-counter-btn-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  min-width: 170px;
  border-radius: ${dimensions.borderRadius}px;
  overflow: hidden;
  background: linear-gradient(145deg, rgba(20, 36, 28, 0.95), rgba(8, 18, 14, 0.98));
  border: 1px solid ${hexToRgba(glow, 0.4)};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${hexToRgba(glow, 0.25)};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-counter-btn-wrapper .counter-trigger-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 2;
}

.beso-counter-btn-wrapper .active-counter-pill {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-sizing: border-box;
}

.beso-counter-btn-wrapper .qty-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${hexToRgba(glow, 0.25)};
  border: 1px solid ${hexToRgba(glow, 0.5)};
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.beso-counter-btn-wrapper .qty-btn:hover {
  background: ${glow};
  color: #000000;
  transform: scale(1.1);
}

.beso-counter-btn-wrapper .qty-number {
  font-family: inherit;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  padding: 0 12px;
}

.beso-counter-btn-wrapper:hover,
.beso-counter-btn-wrapper:focus-within {
  border-color: ${glow};
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${hexToRgba(glow, 0.45)};
}

.beso-counter-btn-wrapper:hover .counter-trigger-btn,
.beso-counter-btn-wrapper:focus-within .counter-trigger-btn {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);
}

.beso-counter-btn-wrapper:hover .active-counter-pill,
.beso-counter-btn-wrapper:focus-within .active-counter-pill {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-counter-btn-wrapper">
  <button class="counter-trigger-btn">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
    <span>${title}</span>
  </button>
  <div class="active-counter-pill">
    <button class="qty-btn btn-minus">-</button>
    <span class="qty-number">1</span>
    <button class="qty-btn btn-plus">+</button>
  </div>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 27: 3D LIQUID FILL TOTE BAG BUTTON
  if (elementId === "liquid-tote-fill") {
    const title = escapeHtml(typography.titleText || "شراء سريع");
    const glow = lighting.glowColor || "#d4af37";

    const css = `.beso-liquid-tote-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: ${Math.round(dimensions.padding * 0.55)}px ${Math.round(dimensions.padding * 1.35)}px;
  border-radius: ${dimensions.borderRadius}px;
  background: rgba(10, 24, 18, 0.95);
  border: 1.5px solid ${hexToRgba(glow, 0.4)};
  color: #ffffff;
  font-family: inherit;
  font-size: ${globalParams.fontSize || 15}px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${hexToRgba(glow, 0.25)};
  transition: all ${animations.transitionSpeed}s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-liquid-tote-btn .tote-icon-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.beso-liquid-tote-btn .tote-btn-label {
  position: relative;
  z-index: 2;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.beso-liquid-tote-btn .liquid-wave-bg {
  position: absolute;
  left: 0;
  bottom: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, ${glow}, ${lighting.colorStop1 || "#2563eb"});
  opacity: 0.85;
  transition: bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.beso-liquid-tote-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6), 0 0 35px ${hexToRgba(glow, 0.6)};
  border-color: ${glow};
}

.beso-liquid-tote-btn:hover .liquid-wave-bg {
  bottom: 0;
}

.beso-liquid-tote-btn:hover .tote-icon-wrapper {
  transform: scale(1.15) rotate(-5deg);
}

.beso-liquid-tote-btn:active {
  transform: translateY(1px) scale(0.98);
}
${entranceKeyframes}`.trim();

    const html = `<button class="beso-liquid-tote-btn">
  <div class="tote-icon-wrapper">
    <svg class="tote-svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  </div>
  <span class="tote-btn-label">${title}</span>
  <div class="liquid-wave-bg"></div>
</button>`;

    return { html, css };
  }

  // 0. PREMIUM 28: CONTINUOUS PULSING RIPPLE WHATSAPP
  if (elementId === "wa-pulse-glow") {
    const css = `.beso-wa-pulse-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-wa-pulse-wrapper .wa-ripple-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.35);
  pointer-events: none;
}

.beso-wa-pulse-wrapper .ring-1 {
  animation: waPulseRipple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.beso-wa-pulse-wrapper .ring-2 {
  animation: waPulseRipple 2s 0.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.beso-wa-pulse-wrapper .pulse-main {
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(145deg, #2ae06c, #1da851);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(37, 211, 102, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.beso-wa-pulse-wrapper:hover .pulse-main {
  transform: scale(1.12);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5), 0 0 35px rgba(37, 211, 102, 0.9);
}

@keyframes waPulseRipple {
  0% { transform: scale(0.9); opacity: 0.9; }
  100% { transform: scale(1.8); opacity: 0; }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-wa-pulse-wrapper">
  <div class="wa-ripple-ring ring-1"></div>
  <div class="wa-ripple-ring ring-2"></div>
  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" class="beso-wa-btn pulse-main">
    <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
      <path d="M16 2A13 13 0 0 0 4.68 21.25L3 27.5l6.43-1.64A13 13 0 1 0 16 2zm0 23.8a10.74 10.74 0 0 1-5.48-1.5l-.39-.23-4.08 1.07 1.09-3.98-.26-.41A10.8 10.8 0 1 1 16 25.8z"/>
      <path d="M22.07 18.66c-.33-.17-1.96-.97-2.27-1.08-.31-.11-.53-.17-.75.17-.22.33-.86 1.08-1.05 1.3-.19.22-.39.25-.72.08a9.1 9.1 0 0 1-2.67-1.65 10 10 0 0 1-1.85-2.3c-.19-.33 0-.5.15-.66.14-.14.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.41 0-.58s-.75-1.81-1.03-2.48c-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.88.41s-1.17 1.15-1.17 2.8 1.2 3.25 1.36 3.47c.17.22 2.36 3.6 5.72 5.05.8.35 1.43.55 1.92.71.8.25 1.53.22 2.11.13.64-.1 1.96-.8 2.24-1.58.28-.77.28-1.43.19-1.58-.08-.14-.3-.22-.63-.38z"/>
    </svg>
  </a>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 29: CONTINUOUS ORBITING WHATSAPP
  if (elementId === "wa-continuous-spin") {
    const css = `.beso-wa-orbit-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-wa-orbit-wrapper .wa-orbit-border {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #25D366, #d4af37, #00ffff, #25D366);
  animation: waOrbitSpin 4s linear infinite;
  z-index: 1;
  filter: drop-shadow(0 0 8px rgba(37, 211, 102, 0.6));
}

.beso-wa-orbit-wrapper .orbit-inner {
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0c1813;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8), 0 8px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.beso-wa-orbit-wrapper:hover .orbit-inner {
  transform: scale(1.08);
  background: #13271e;
}

@keyframes waOrbitSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-wa-orbit-wrapper">
  <div class="wa-orbit-border"></div>
  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" class="beso-wa-btn orbit-inner">
    <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
      <path d="M16 2A13 13 0 0 0 4.68 21.25L3 27.5l6.43-1.64A13 13 0 1 0 16 2zm0 23.8a10.74 10.74 0 0 1-5.48-1.5l-.39-.23-4.08 1.07 1.09-3.98-.26-.41A10.8 10.8 0 1 1 16 25.8z"/>
      <path d="M22.07 18.66c-.33-.17-1.96-.97-2.27-1.08-.31-.11-.53-.17-.75.17-.22.33-.86 1.08-1.05 1.3-.19.22-.39.25-.72.08a9.1 9.1 0 0 1-2.67-1.65 10 10 0 0 1-1.85-2.3c-.19-.33 0-.5.15-.66.14-.14.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.41 0-.58s-.75-1.81-1.03-2.48c-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.88.41s-1.17 1.15-1.17 2.8 1.2 3.25 1.36 3.47c.17.22 2.36 3.6 5.72 5.05.8.35 1.43.55 1.92.71.8.25 1.53.22 2.11.13.64-.1 1.96-.8 2.24-1.58.28-.77.28-1.43.19-1.58-.08-.14-.3-.22-.63-.38z"/>
    </svg>
  </a>
</div>`;

    return { html, css };
  }

  // 0. PREMIUM 30: EXPANDABLE LIVE BADGE WHATSAPP
  if (elementId === "wa-expandable-badge") {
    const title = escapeHtml(typography.titleText || "تحدث معنا الآن");
    const desc = escapeHtml(typography.descText || "متواجدون لخدمتك");

    const css = `.beso-wa-expandable-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 99px;
  background: linear-gradient(145deg, #25D366, #128C7E);
  color: #ffffff;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(37, 211, 102, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-wa-expandable-btn .wa-icon-holder {
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.beso-wa-expandable-btn .live-status-dot {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px #ffffff;
  animation: liveDotPulse 1s infinite alternate;
}

.beso-wa-expandable-btn .wa-badge-text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 16px;
  text-align: right;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.beso-wa-expandable-btn .badge-title {
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
}

.beso-wa-expandable-btn .badge-sub {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.2;
}

.beso-wa-expandable-btn:hover {
  width: 190px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(37, 211, 102, 0.7);
}

.beso-wa-expandable-btn:hover .wa-badge-text-wrapper {
  opacity: 1;
  transition-delay: 0.1s;
}

@keyframes liveDotPulse {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}
${entranceKeyframes}`.trim();

    const html = `<a href="https://wa.me/" target="_blank" rel="noopener noreferrer" class="beso-wa-expandable-btn">
  <div class="wa-icon-holder">
    <span class="live-status-dot"></span>
    <svg viewBox="0 0 32 32" width="26" height="26" fill="white">
      <path d="M16 2A13 13 0 0 0 4.68 21.25L3 27.5l6.43-1.64A13 13 0 1 0 16 2zm0 23.8a10.74 10.74 0 0 1-5.48-1.5l-.39-.23-4.08 1.07 1.09-3.98-.26-.41A10.8 10.8 0 1 1 16 25.8z"/>
      <path d="M22.07 18.66c-.33-.17-1.96-.97-2.27-1.08-.31-.11-.53-.17-.75.17-.22.33-.86 1.08-1.05 1.3-.19.22-.39.25-.72.08a9.1 9.1 0 0 1-2.67-1.65 10 10 0 0 1-1.85-2.3c-.19-.33 0-.5.15-.66.14-.14.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.41 0-.58s-.75-1.81-1.03-2.48c-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.88.41s-1.17 1.15-1.17 2.8 1.2 3.25 1.36 3.47c.17.22 2.36 3.6 5.72 5.05.8.35 1.43.55 1.92.71.8.25 1.53.22 2.11.13.64-.1 1.96-.8 2.24-1.58.28-.77.28-1.43.19-1.58-.08-.14-.3-.22-.63-.38z"/>
    </svg>
  </div>
  <div class="wa-badge-text-wrapper">
    <span class="badge-title">${title}</span>
    <span class="badge-sub">${desc}</span>
  </div>
</a>`;

    return { html, css };
  }

  // Universal High-Contrast Neon Particle Overlay Helper
  function getParticleOverlayCode(particleType, accentColor = "#00ffea") {
    if (!particleType || particleType === "none") return { html: "", css: "" };
    const color = accentColor || "#00ffea";

    if (particleType === "particles-cyber-mesh") {
      return {
        html: `<div class="beso-particle-layer mesh-layer"><svg class="mesh-svg" viewBox="0 0 800 600" preserveAspectRatio="none"><g class="mesh-group"><circle cx="150" cy="120" r="6" fill="${color}" class="p-node n1" /><circle cx="350" cy="280" r="7" fill="${color}" class="p-node n2" /><circle cx="600" cy="180" r="6" fill="${color}" class="p-node n3" /><circle cx="720" cy="420" r="8" fill="${color}" class="p-node n4" /><line x1="150" y1="120" x2="350" y2="280" stroke="${color}" stroke-width="2" stroke-opacity="0.8" class="p-line l1" /><line x1="350" y1="280" x2="600" y2="180" stroke="${color}" stroke-width="2" stroke-opacity="0.8" class="p-line l2" /><line x1="600" y1="180" x2="720" y2="420" stroke="${color}" stroke-width="2" stroke-opacity="0.8" class="p-line l3" /></g></svg></div>`,
        css: `.beso-particle-layer { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10 !important; overflow: hidden; }
.mesh-svg { width: 100%; height: 100%; }
.p-node { animation: meshNodePulse 2.5s ease-in-out infinite alternate; filter: drop-shadow(0 0 10px ${color}); }
.p-line { stroke-dasharray: 10 5; animation: meshLineDash 8s linear infinite; filter: drop-shadow(0 0 5px ${color}); }
@keyframes meshNodePulse {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 1; }
}
@keyframes meshLineDash {
  to { stroke-dashoffset: -100; }
}`
      };
    }

    if (particleType === "particles-cosmic-dust") {
      return {
        html: `<div class="beso-particle-layer dust-layer"><span class="dust-orb d1"></span><span class="dust-orb d2"></span><span class="dust-orb d3"></span><span class="dust-orb d4"></span><span class="dust-orb d5"></span></div>`,
        css: `.beso-particle-layer { position: absolute; inset: 0; pointer-events: none; z-index: 10 !important; overflow: hidden; }
.dust-orb { position: absolute; background: ${color}; border-radius: 50%; box-shadow: 0 0 12px ${color}, 0 0 24px ${color}; animation: floatDust 6s ease-in-out infinite alternate; }
.d1 { width: 10px; height: 10px; top: 15%; left: 20%; animation-delay: 0s; }
.d2 { width: 16px; height: 16px; top: 55%; left: 70%; animation-delay: 1.5s; }
.d3 { width: 8px; height: 8px; top: 75%; left: 40%; animation-delay: 3s; }
.d4 { width: 14px; height: 14px; top: 25%; left: 80%; animation-delay: 0.8s; }
.d5 { width: 12px; height: 12px; top: 65%; left: 15%; animation-delay: 2.2s; }
@keyframes floatDust {
  0% { transform: translateY(0) scale(1); opacity: 0.4; }
  100% { transform: translateY(-35px) scale(1.5); opacity: 1; }
}`
      };
    }

    if (particleType === "particles-energy-ember") {
      return {
        html: `<div class="beso-particle-layer ember-layer"><span class="ember-spark e1"></span><span class="ember-spark e2"></span><span class="ember-spark e3"></span><span class="ember-spark e4"></span></div>`,
        css: `.beso-particle-layer { position: absolute; inset: 0; pointer-events: none; z-index: 10 !important; overflow: hidden; }
.ember-spark { position: absolute; bottom: -10px; width: 8px; height: 8px; background: ${color}; border-radius: 50%; box-shadow: 0 0 15px ${color}; animation: emberRise 4.5s linear infinite; }
.e1 { left: 18%; animation-delay: 0s; }
.e2 { left: 42%; animation-delay: 1.2s; }
.e3 { left: 68%; animation-delay: 2.4s; }
.e4 { left: 88%; animation-delay: 0.6s; }
@keyframes emberRise {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-400px) scale(0.2); opacity: 0; }
}`
      };
    }

    if (particleType === "particles-hyper-lightspeed") {
      return {
        html: `<div class="beso-particle-layer lightspeed-layer"><span class="ray r1"></span><span class="ray r2"></span><span class="ray r3"></span><span class="ray r4"></span></div>`,
        css: `.beso-particle-layer { position: absolute !important; inset: 0 !important; pointer-events: none !important; z-index: 100 !important; overflow: hidden !important; }
.ray { position: absolute !important; width: 2px !important; height: 120px !important; background: linear-gradient(to bottom, transparent, ${color}, transparent) !important; filter: drop-shadow(0 0 10px ${color}) !important; animation: rayShoot 2s linear infinite !important; }
.r1 { left: 15%; animation-delay: 0s; }
.r2 { left: 40%; animation-delay: 0.7s; }
.r3 { left: 65%; animation-delay: 1.3s; }
.r4 { left: 85%; animation-delay: 0.4s; }
@keyframes rayShoot {
  0% { transform: translateY(-150px) rotate(15deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(500px) rotate(15deg); opacity: 0; }
}`
      };
    }

    if (particleType === "particles-quantum-orbs") {
      return {
        html: `<div class="beso-particle-layer q-orbs-layer"><span class="q-orb q1"></span><span class="q-orb q2"></span><span class="q-orb q3"></span></div>`,
        css: `.beso-particle-layer { position: absolute !important; inset: 0 !important; pointer-events: none !important; z-index: 100 !important; overflow: hidden !important; }
.q-orb { position: absolute !important; border-radius: 50% !important; background: radial-gradient(circle, ${color} 0%, transparent 70%) !important; filter: blur(8px) drop-shadow(0 0 20px ${color}) !important; animation: orbFloat 7s ease-in-out infinite alternate !important; }
.q1 { width: 90px; height: 90px; top: 10%; left: 15%; animation-delay: 0s; }
.q2 { width: 130px; height: 130px; top: 40%; left: 65%; animation-delay: 2.5s; }
.q3 { width: 70px; height: 70px; top: 70%; left: 30%; animation-delay: 4s; }
@keyframes orbFloat {
  0% { transform: scale(0.8) translate(0, 0); opacity: 0.4; }
  100% { transform: scale(1.3) translate(20px, -30px); opacity: 0.9; }
}`
      };
    }

    if (particleType === "particles-cyber-rain") {
      return {
        html: `<div class="beso-particle-layer cyber-rain-layer"><span class="drop dr1"></span><span class="drop dr2"></span><span class="drop dr3"></span><span class="drop dr4"></span><span class="drop dr5"></span></div>`,
        css: `.beso-particle-layer { position: absolute !important; inset: 0 !important; pointer-events: none !important; z-index: 100 !important; overflow: hidden !important; }
.drop { position: absolute !important; width: 3px !important; height: 35px !important; background: linear-gradient(to bottom, transparent, ${color}) !important; box-shadow: 0 0 12px ${color} !important; animation: rainDrop 2.5s linear infinite !important; }
.dr1 { left: 10%; animation-delay: 0s; }
.dr2 { left: 30%; animation-delay: 0.9s; }
.dr3 { left: 52%; animation-delay: 1.6s; }
.dr4 { left: 74%; animation-delay: 0.4s; }
.dr5 { left: 90%; animation-delay: 1.2s; }
@keyframes rainDrop {
  0% { transform: translateY(-50px); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(480px); opacity: 0; }
}`
      };
    }

    return { html: "", css: "" };
  }

  const activeParticleType = animations.particleOverlay || animations.activeParticle || "none";
  const particleResult = getParticleOverlayCode(activeParticleType, typography.titleColor || "#00ffea");
  const particleHtml = particleResult.html;
  const particleCss = particleResult.css;

  const customHeroBgLayerHtml = media.heroBgImage
    ? `<div class="beso-hero-custom-bg"></div>`
    : "";

  const customHeroBgLayerCss = media.heroBgImage
    ? `
.beso-hero-custom-bg {
  position: absolute;
  inset: 0;
  background-image: url('${media.heroBgImage}');
  background-size: ${media.heroBgObjectFit || media.objectFit || "cover"};
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${media.heroBgOverlayOpacity};
  filter: ${media.heroBgBlur > 0 ? `blur(${media.heroBgBlur}px)` : "none"};
  pointer-events: none;
  z-index: 1;
}
.beso-hero-custom-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: ${media.heroBgTint ? hexToRgba(media.heroBgTint, 0.35) : "transparent"};
  pointer-events: none;
}
.beso-hero-bg-img {
  width: ${media.heroBgWidth ? media.heroBgWidth + "px" : "100%"};
  height: ${media.heroBgHeight ? media.heroBgHeight + "px" : "100%"};
  object-fit: ${media.heroBgObjectFit || media.objectFit || "cover"};
  opacity: ${media.heroBgOverlayOpacity};
  filter: ${media.heroBgBlur > 0 ? `blur(${media.heroBgBlur}px)` : "none"};
}`
    : "";

  // BATCH 18: PROPOSAL 1 - SPLIT HERO BANNER (DUAL COLUMN - SYNCHRONIZED SLIDER)
  if (elementId === "split-hero-banner") {
    const brandLogo = escapeHtml(media.splitHeroBrand || "H&M");
    const discountBadge = escapeHtml(media.splitHeroDiscountBadge || "خصم");
    const discountTitle = escapeHtml(media.splitHeroDiscountTitle || "حتى 70%");
    const subtext = escapeHtml(media.splitHeroSubtext || "عروض منتصف الموسم لفترة محدودة");
    const rightImages = media.splitHeroRightImages || [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop"
    ];
    const leftImages = media.splitHeroLeftImages || [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
    ];

    const rightSlidesHtml = rightImages.map((img, i) => `    <div class="slide-image${i === 0 ? " active" : ""}" style="background-image: url('${img}');"></div>`).join("\n");
    const leftSlidesHtml = leftImages.map((img, i) => `    <div class="slide-image${i === 0 ? " active" : ""}" style="background-image: url('${img}');"></div>`).join("\n");

    const html = `<div class="split-hero-banner">
  <!-- العمود الأيمن (3 صور تتناوب) -->
  <div class="banner-column col-right">
${rightSlidesHtml}
  </div>

  <!-- محتوى الوسط الموحد (العنوان والنص التفصيلي) -->
  <div class="banner-center-content">
    <h1 class="brand-logo">${brandLogo}</h1>
    <div class="discount-badge">${discountBadge}</div>
    <div class="discount-title">${discountTitle}</div>
    <p class="banner-subtext">${subtext}</p>
  </div>

  <!-- العمود الأيسر (3 صور تتناوب) -->
  <div class="banner-column col-left">
${leftSlidesHtml}
  </div>
</div>`;

    const bannerWidth = typeof dimensions.width === "number" ? dimensions.width : (Number(dimensions.width) || 1100);
    const bannerHeight = typeof dimensions.height === "number" ? dimensions.height : (Number(dimensions.height) || 480);
    const overlayBlur = media.splitHeroOverlayBlur ?? 8;
    const overlayBg = media.splitHeroOverlayBg || "rgba(255, 255, 255, 0.88)";
    const brandSize = media.splitHeroBrandSize || 54;
    const brandColor = media.splitHeroBrandColor || "#e50010";
    const brandWeight = media.splitHeroBrandWeight || 900;
    const badgeSize = media.splitHeroBadgeSize || 22;
    const badgeColor = media.splitHeroBadgeColor || "#e50010";
    const titleSize = media.splitHeroTitleSize || 58;
    const titleColorVal = media.splitHeroTitleColor || "#e50010";
    const subtextSize = media.splitHeroSubtextSize || 15;
    const subtextColor = media.splitHeroSubtextColor || "#333333";
    const align = media.splitHeroAlign || "center";

    const css = `/* ============================================================
   SPLIT HERO BANNER (DUAL COLUMN - SYNCHRONIZED SLIDER)
   ============================================================ */

.split-hero-banner {
  position: relative;
  width: 100%;
  max-width: ${bannerWidth}px;
  height: ${bannerHeight}px;
  min-height: 380px;
  margin: 0 auto;
  display: flex;
  direction: rtl;
  overflow: hidden;
  border-radius: ${dimensions.borderRadius}px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background-color: #f9f9f9;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.banner-column {
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.slide-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-image.active {
  opacity: 1;
  transform: scale(1);
}

.banner-center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  text-align: ${align};
  pointer-events: none;
  background: ${overlayBg};
  backdrop-filter: ${overlayBlur > 0 ? `blur(${overlayBlur}px)` : "none"};
  -webkit-backdrop-filter: ${overlayBlur > 0 ? `blur(${overlayBlur}px)` : "none"};
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: ${overlayBg && overlayBg !== "transparent" ? "0 8px 32px rgba(0, 0, 0, 0.06)" : "none"};
  min-width: 200px;
}

.brand-logo {
  font-family: 'Arial Black', sans-serif;
  font-size: ${brandSize}px;
  font-weight: ${brandWeight};
  color: ${brandColor};
  margin: 0 0 2px 0;
  line-height: 1;
  letter-spacing: -1.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.discount-badge {
  font-size: ${badgeSize}px;
  font-weight: 700;
  color: ${badgeColor};
  margin-top: 4px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.discount-title {
  font-size: ${titleSize}px;
  font-weight: 900;
  color: ${titleColorVal};
  line-height: 1.1;
  margin-bottom: 6px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.banner-subtext {
  font-size: ${subtextSize}px;
  font-weight: 600;
  color: ${subtextColor};
  margin: 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .split-hero-banner {
    height: 380px;
  }
  .brand-logo {
    font-size: 40px;
  }
  .discount-title {
    font-size: 42px;
  }
  .banner-center-content {
    padding: 16px 24px;
    min-width: 220px;
  }
}
${entranceKeyframes}`.trim();

    return { html, css };
  }

  // BATCH 18: PROPOSAL 2 - DUAL-TRACK KINETIC HERO CANVAS (hero-kinetic-dual-track)
  if (elementId === "hero-kinetic-dual-track") {
    const pillTag = escapeHtml(media.kineticPillTag || "حلول رقمية مخصصة للأعمال");
    const headline = escapeHtml(media.kineticHeadline || typography.titleText || "نصمم حلولاً رقمية مبتكرة");
    const highlightWord = escapeHtml(media.kineticHighlightWord || "عــــلامتك");
    const subtext = escapeHtml(media.kineticSubtext || typography.descText || "واجهات تفاعلية مذهلة بحركات لا نهائية ومؤثرات فيزيائية ملموسة.");
    const ctaText = escapeHtml(media.kineticCtaText || typography.buttonText || "اكتشف إمكانياتنا ✦");
    const speed = media.kineticTrackSpeed || 20;

    const topImages = media.kineticTrackTopImages || [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
    ];
    const bottomImages = media.kineticTrackBottomImages || [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"
    ];

    const topCards = topImages.map(img => `        <div class="kinetic-track-card" style="background-image: url('${img}');"></div>`).join("\n");
    const bottomCards = bottomImages.map(img => `        <div class="kinetic-track-card" style="background-image: url('${img}');"></div>`).join("\n");

    const html = `<div class="beso-kinetic-hero-wrapper">
  <!-- مسار الصور العلوي (متحرك لليسار) -->
  <div class="kinetic-track-container top-container">
    <div class="beso-kinetic-track-top">
${topCards}
${topCards}
    </div>
  </div>

  <!-- مسار الصور السفلي (متحرك لليمين) -->
  <div class="kinetic-track-container bottom-container">
    <div class="beso-kinetic-track-bottom">
${bottomCards}
${bottomCards}
    </div>
  </div>

  <!-- طبقة التعتيم والغموض للتركيز على المحتوى -->
  <div class="kinetic-hero-overlay"></div>

  <!-- المحتوى المركزي العائم -->
  <div class="kinetic-hero-content">
    <div class="hero-pill-badge">
      <span class="pill-pulse-dot"></span>
      <span>${pillTag}</span>
    </div>

    <h1 class="hero-kinetic-title">
      ${headline}
      <span class="beso-polygon-highlight">${highlightWord}</span>
    </h1>

    <p class="hero-kinetic-desc">${subtext}</p>

    <button type="button" class="sparkle-btn" id="kineticHeroCta">
      <svg class="sparkle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/>
      </svg>
      <span>${ctaText}</span>
      <svg class="sparkle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>
      </svg>
    </button>
  </div>
</div>`;

    const topAnimation = media.kineticTrackInvert ? "kineticTrackRight" : "kineticTrackLeft";
    const bottomAnimation = media.kineticTrackInvert ? "kineticTrackLeft" : "kineticTrackRight";

    const css = `.beso-kinetic-hero-wrapper {
  position: relative;
  width: 100%;
  max-width: 1000px;
  min-height: 520px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: ${dimensions.borderRadius}px;
  background: #020906;
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), inset 0 0 40px rgba(16, 185, 129, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.kinetic-track-container {
  position: absolute;
  left: 0;
  width: 100%;
  height: 140px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.75;
  filter: blur(0.5px);
}

.top-container { top: 30px; }
.bottom-container { bottom: 30px; }

@keyframes kineticTrackLeft {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes kineticTrackRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

.beso-kinetic-track-top {
  display: flex;
  width: 200%;
  gap: 16px;
  animation: ${topAnimation} ${speed}s linear infinite;
}

.beso-kinetic-track-bottom {
  display: flex;
  width: 200%;
  gap: 16px;
  animation: ${bottomAnimation} ${speed}s linear infinite;
}

.kinetic-track-card {
  width: 220px;
  height: 130px;
  flex-shrink: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.kinetic-hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(2, 9, 6, 0.45) 0%, rgba(2, 9, 6, 0.65) 80%);
  z-index: 5;
  pointer-events: none;
}

.kinetic-hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 680px;
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  direction: rtl;
}

.hero-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 99px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(52, 211, 153, 0.4);
  color: #34d399;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.25);
}

.pill-pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 8px #34d399;
  animation: pulseDot 1.8s infinite;
}

@keyframes pulseDot {
  0% { transform: scale(0.9); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.6; }
}

.hero-kinetic-title {
  font-size: ${typography.titleSize || 38}px;
  font-weight: ${typography.titleWeight || 800};
  color: ${typography.titleColor || "#fff8e7"};
  line-height: 1.35;
  margin: 0;
}

.beso-polygon-highlight {
  background: ${media.kineticHighlightGradient || "linear-gradient(160deg, #4cd864 0%, #39b54a 50%, #2a8f38 100%)"};
  clip-path: ${media.kineticClipPath || "polygon(50% 0px, 100% 10%, 94% 93%, 50% 100%, 6% 93%, 0px 10%)"};
  padding: 0.25rem 1.2rem;
  display: inline-block;
  color: #03140a;
  font-weight: 900;
  box-shadow: 0 0 20px rgba(76, 216, 100, 0.4);
  margin: 0 4px;
}

.hero-kinetic-desc {
  font-size: ${typography.descSize || 16}px;
  color: ${typography.descColor || "#c2d5cb"};
  max-width: 540px;
  line-height: 1.6;
  margin: 0;
}

.sparkle-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 99px;
  background: linear-gradient(135deg, #0d3b2e, #10b981);
  border: 1px solid #34d399;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  user-select: none;
}

.sparkle-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 12px 35px rgba(16, 185, 129, 0.55), 0 0 25px rgba(52, 211, 153, 0.6);
  border-color: #6ee7b7;
}

.sparkle-icon {
  width: 18px;
  height: 18px;
  animation: sparkleSpin 4s linear infinite;
}

@keyframes sparkleSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
${entranceKeyframes}`.trim();

    return { html, css };
  }

  // 0. HERO CANVAS 1: CYBERPUNK 3D PERSPECTIVE GRID HORIZON
  if (elementId === "hero-cyber-grid") {
    const title = escapeHtml(typography.titleText || "مستقبل الواجهات الرقمية");
    const desc = escapeHtml(typography.descText || "استوديو لتوليد الفيزياء البصرية والمكونات الفاخرة");

    const css = `.beso-hero-grid-wrapper {
  position: relative;
  width: 100%;
  min-height: 440px;
  max-width: 620px;
  border-radius: 24px;
  overflow: hidden;
  background: #03080e;
  perspective: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 255, 234, 0.3);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7), inset 0 0 60px rgba(0, 255, 234, 0.08);
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-hero-grid-wrapper .hero-horizon-glow {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 180px;
  background: radial-gradient(ellipse at center, rgba(255, 0, 128, 0.6) 0%, rgba(0, 255, 234, 0.4) 45%, transparent 75%);
  filter: blur(45px);
  pointer-events: none;
  z-index: 1;
}

.beso-hero-grid-wrapper .hero-grid-plane {
  position: absolute;
  bottom: -35%;
  left: -50%;
  width: 200%;
  height: 110%;
  transform: rotateX(75deg);
  background-image: linear-gradient(rgba(0, 255, 234, 0.45) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 234, 0.45) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridInfiniteMove 2s linear infinite;
  mask-image: linear-gradient(to top, rgba(0,0,0,1) 25%, transparent 95%);
  -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 25%, transparent 95%);
  z-index: 2;
  pointer-events: none;
}

.beso-hero-grid-wrapper .hero-content-layer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 32px 24px;
  max-width: 480px;
  backdrop-filter: blur(8px);
  background: rgba(3, 8, 14, 0.45);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

.beso-hero-grid-wrapper .hero-badge {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 12px;
  border-radius: 99px;
  background: rgba(0, 255, 234, 0.15);
  border: 1px solid rgba(0, 255, 234, 0.5);
  color: #00ffea;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.beso-hero-grid-wrapper .hero-title {
  margin: 0 0 10px 0;
  font-size: ${typography.titleSize}px;
  font-weight: ${typography.titleWeight};
  color: ${typography.titleColor || "#ffffff"};
  text-shadow: 0 0 20px rgba(0, 255, 234, 0.6), 0 0 40px rgba(255, 0, 128, 0.4);
  line-height: 1.25;
}

.beso-hero-grid-wrapper .hero-subtitle {
  margin: 0;
  font-size: ${typography.descSize}px;
  font-weight: ${typography.descWeight};
  color: ${typography.descColor || "#b4c5dc"};
  line-height: 1.5;
}

@keyframes gridInfiniteMove {
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
}
${entranceKeyframes}
${particleCss}
${customHeroBgLayerCss}`.trim();

    const html = `<div class="beso-hero-grid-wrapper">
  ${customHeroBgLayerHtml}
  <div class="hero-horizon-glow"></div>
  <div class="hero-grid-plane"></div>
  ${particleHtml}
  <div class="hero-content-layer">
    <span class="hero-badge">CYBER HORIZON</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${desc}</p>
  </div>
</div>`;

    return { html, css };
  }

  // 0. HERO CANVAS 2: FLUID AURORA BOREALIS PLASMA WAVE
  if (elementId === "hero-aurora-wave") {
    const title = escapeHtml(typography.titleText || "تصاميم سريالية مبهرة");
    const desc = escapeHtml(typography.descText || "أغلفة خلفية متكيفة تناسب منصات الـ SaaS والمنتجات الفاخرة");

    const css = `.beso-hero-aurora-wrapper {
  position: relative;
  width: 100%;
  min-height: 440px;
  max-width: 620px;
  border-radius: 24px;
  overflow: hidden;
  background: #040914;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(112, 230, 187, 0.3);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-hero-aurora-wrapper .aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.65;
  pointer-events: none;
  animation: blobMorph 12s ease-in-out infinite alternate, auroraHueRotate 18s linear infinite;
}

.beso-hero-aurora-wrapper .blob-1 {
  top: -10%;
  left: 10%;
  width: 280px;
  height: 280px;
  background: #70e6bb;
}

.beso-hero-aurora-wrapper .blob-2 {
  bottom: -15%;
  right: 5%;
  width: 320px;
  height: 320px;
  background: #9d4edd;
  animation-delay: -4s;
}

.beso-hero-aurora-wrapper .blob-3 {
  top: 30%;
  left: 35%;
  width: 240px;
  height: 240px;
  background: #00f2fe;
  animation-delay: -8s;
}

.beso-hero-aurora-wrapper .aurora-glass-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(20px);
  background: rgba(4, 9, 20, 0.4);
  z-index: 2;
  pointer-events: none;
}

.beso-hero-aurora-wrapper .hero-content-layer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 32px 24px;
  max-width: 480px;
  backdrop-filter: blur(12px);
  background: rgba(10, 22, 36, 0.5);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.beso-hero-aurora-wrapper .hero-badge {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 12px;
  border-radius: 99px;
  background: rgba(112, 230, 187, 0.15);
  border: 1px solid rgba(112, 230, 187, 0.5);
  color: #70e6bb;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

.beso-hero-aurora-wrapper .hero-title {
  margin: 0 0 10px 0;
  font-size: ${typography.titleSize}px;
  font-weight: ${typography.titleWeight};
  color: ${typography.titleColor || "#ffffff"};
  text-shadow: 0 0 24px rgba(112, 230, 187, 0.5);
  line-height: 1.25;
}

.beso-hero-aurora-wrapper .hero-subtitle {
  margin: 0;
  font-size: ${typography.descSize}px;
  font-weight: ${typography.descWeight};
  color: ${typography.descColor || "#c2d5cb"};
  line-height: 1.5;
}

@keyframes blobMorph {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  50% { transform: translate(30px, -20px) scale(1.15) rotate(180deg); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  100% { transform: translate(-20px, 30px) scale(0.9) rotate(360deg); border-radius: 30% 70% 50% 50% / 50% 40% 60% 50%; }
}

@keyframes auroraHueRotate {
  0% { filter: blur(80px) hue-rotate(0deg); }
  100% { filter: blur(80px) hue-rotate(360deg); }
}
${entranceKeyframes}
${particleCss}
${customHeroBgLayerCss}`.trim();

    const html = `<div class="beso-hero-aurora-wrapper">
  ${customHeroBgLayerHtml}
  <div class="aurora-blob blob-1"></div>
  <div class="aurora-blob blob-2"></div>
  <div class="aurora-blob blob-3"></div>
  <div class="aurora-glass-overlay"></div>
  ${particleHtml}
  <div class="hero-content-layer">
    <span class="hero-badge">AURORA PLASMA</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${desc}</p>
  </div>
</div>`;

    return { html, css };
  }

  // 0. HERO CANVAS 3: COSMIC NEURAL PARTICLE MESH
  if (elementId === "hero-cosmic-particles") {
    const title = escapeHtml(typography.titleText || "ابتكار بدون حدود");
    const desc = escapeHtml(typography.descText || "حلول برمجية متكاملة لبيئات التجارة والمنصات الحديثة");

    const css = `.beso-hero-cosmic-wrapper {
  position: relative;
  width: 100%;
  min-height: 440px;
  max-width: 620px;
  border-radius: 24px;
  overflow: hidden;
  background: #05040a;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(74, 21, 75, 0.2);
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.beso-hero-cosmic-wrapper .nebula-core {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 50, 220, 0.45) 0%, rgba(212, 175, 55, 0.2) 40%, transparent 70%);
  filter: blur(40px);
  animation: nebulaPulse 6s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 1;
}

.beso-hero-cosmic-wrapper .orbit-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(212, 175, 55, 0.25);
  pointer-events: none;
  z-index: 2;
}

.beso-hero-cosmic-wrapper .ring-outer {
  width: 380px;
  height: 380px;
  animation: cosmicOrbitSpin 20s linear infinite;
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.1);
}

.beso-hero-cosmic-wrapper .ring-inner {
  width: 260px;
  height: 260px;
  border: 1px solid rgba(157, 78, 221, 0.3);
  animation: cosmicOrbitSpin 35s linear infinite reverse;
}

.beso-hero-cosmic-wrapper .stars-layer {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 80px 120px, #ffd700, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 150px 80px, #00ffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 220px 240px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 290px 160px, #ffd700, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 360px 40px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 420px 290px, #00ffff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 450px 450px;
  opacity: 0.7;
  animation: starsTwinkle 4s ease-in-out infinite alternate;
  z-index: 1;
  pointer-events: none;
}

.beso-hero-cosmic-wrapper .hero-content-layer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 32px 24px;
  max-width: 480px;
  backdrop-filter: blur(10px);
  background: rgba(8, 6, 16, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.beso-hero-cosmic-wrapper .hero-badge {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 12px;
  border-radius: 99px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.5);
  color: #ffd700;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

.beso-hero-cosmic-wrapper .hero-title {
  margin: 0 0 10px 0;
  font-size: ${typography.titleSize}px;
  font-weight: ${typography.titleWeight};
  color: ${typography.titleColor || "#fff8e7"};
  text-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
  line-height: 1.25;
}

.beso-hero-cosmic-wrapper .hero-subtitle {
  margin: 0;
  font-size: ${typography.descSize}px;
  font-weight: ${typography.descWeight};
  color: ${typography.descColor || "#d8cee8"};
  line-height: 1.5;
}

@keyframes nebulaPulse {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.15); opacity: 1; }
}

@keyframes cosmicOrbitSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes starsTwinkle {
  0% { opacity: 0.4; }
  100% { opacity: 0.9; }
}
${entranceKeyframes}
${particleCss}
${customHeroBgLayerCss}`.trim();

    const html = `<div class="beso-hero-cosmic-wrapper">
  ${customHeroBgLayerHtml}
  <div class="nebula-core"></div>
  <div class="orbit-ring ring-outer"></div>
  <div class="orbit-ring ring-inner"></div>
  <div class="stars-layer"></div>
  ${particleHtml}
  <div class="hero-content-layer">
    <span class="hero-badge">COSMIC MESH</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${desc}</p>
  </div>
</div>`;

    return { html, css };
  }

  // 3. HERO CANVAS 5: 3D HYPER VORTEX TUNNEL
  if (elementId === "hero-hyper-vortex") {
    const title = escapeHtml(typography.titleText || "عمق بصرى غير محدود");
    const desc = escapeHtml(typography.descText || "واجهات ديناميكية مدعومة بمحرك الفيزياء الرقمية والجسيمات");

    const css = `.beso-hero-vortex-wrapper {
  position: relative !important;
  width: 100%;
  min-height: 480px;
  max-width: 680px;
  border-radius: 28px;
  overflow: hidden !important;
  background: #03040a;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(37, 99, 235, 0.4);
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.vortex-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #38bdf8 0%, rgba(37, 99, 235, 0.6) 50%, transparent 80%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(15px);
  animation: vortexPulse 4s ease-in-out infinite alternate;
  z-index: 1;
}

.vortex-spiral {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 2px solid rgba(56, 189, 248, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
}

.spiral-1 {
  width: 340px;
  height: 340px;
  border-top-color: #2563eb;
  border-bottom-color: #38bdf8;
  animation: vortexSpin 10s linear infinite;
}

.spiral-2 {
  width: 220px;
  height: 220px;
  border-left-color: #d4af37;
  border-right-color: #10b981;
  animation: vortexSpin 6s linear infinite reverse;
}

@keyframes vortexSpin {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.08); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
}

@keyframes vortexPulse {
  0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
}

.beso-hero-vortex-wrapper .hero-content-layer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 36px 24px;
  max-width: 520px;
  backdrop-filter: blur(14px);
  background: rgba(3, 7, 18, 0.7);
  border-radius: 22px;
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.beso-hero-vortex-wrapper .hero-badge {
  display: inline-block;
  padding: 4px 14px;
  margin-bottom: 12px;
  border-radius: 99px;
  background: rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.6);
  color: #38bdf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.beso-hero-vortex-wrapper .hero-title {
  margin: 0 0 10px 0;
  font-size: ${typography.titleSize}px;
  font-weight: ${typography.titleWeight};
  color: ${typography.titleColor || "#fff8e7"};
  text-shadow: 0 0 25px rgba(56, 189, 248, 0.6);
  line-height: 1.25;
}

.beso-hero-vortex-wrapper .hero-subtitle {
  margin: 0;
  font-size: ${typography.descSize}px;
  font-weight: ${typography.descWeight};
  color: ${typography.descColor || "#c7d2fe"};
  line-height: 1.5;
}
${entranceKeyframes}
${particleCss}
${customHeroBgLayerCss}`.trim();

    const html = `<div class="beso-hero-vortex-wrapper" style="position: relative; overflow: hidden;">
  ${customHeroBgLayerHtml}
  <div class="vortex-core"></div>
  <div class="vortex-spiral spiral-1"></div>
  <div class="vortex-spiral spiral-2"></div>
  <div class="hero-content-layer" style="position: relative; z-index: 10;">
    <span class="hero-badge">HYPER VORTEX</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${desc}</p>
  </div>
  ${particleHtml}
</div>`;

    return { html, css };
  }

  // 3. HERO CANVAS 6: HOLOGRAPHIC GLASS PRISM SCREEN
  if (elementId === "hero-glass-prism") {
    const title = escapeHtml(typography.titleText || "انعكاسات زجاجية ساحرة");
    const desc = escapeHtml(typography.descText || "تأثيرات ضوئية طيفية تضفي الفخامة على منصتك");

    const css = `.beso-hero-prism-wrapper {
  position: relative !important;
  width: 100%;
  min-height: 480px;
  max-width: 680px;
  border-radius: 28px;
  overflow: hidden !important;
  background: linear-gradient(135deg, #090d16, #111c2e);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(212, 175, 55, 0.35);
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.prism-refraction-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.2) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 80%);
  pointer-events: none;
  z-index: 1;
}

.prism-border-beam {
  position: absolute;
  inset: -2px;
  border-radius: 30px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
  animation: prismBeam 6s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes prismBeam {
  0% { opacity: 0.3; filter: hue-rotate(0deg); }
  50% { opacity: 0.8; filter: hue-rotate(180deg); }
  100% { opacity: 0.3; filter: hue-rotate(360deg); }
}

.beso-hero-prism-wrapper .hero-content-layer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 36px 24px;
  max-width: 520px;
  backdrop-filter: blur(16px);
  background: rgba(8, 14, 26, 0.6);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.beso-hero-prism-wrapper .hero-badge {
  display: inline-block;
  padding: 4px 14px;
  margin-bottom: 12px;
  border-radius: 99px;
  background: rgba(212, 175, 55, 0.18);
  border: 1px solid rgba(212, 175, 55, 0.6);
  color: #d4af37;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.beso-hero-prism-wrapper .hero-title {
  margin: 0 0 10px 0;
  font-size: ${typography.titleSize}px;
  font-weight: ${typography.titleWeight};
  color: ${typography.titleColor || "#fff8e7"};
  text-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
  line-height: 1.25;
}

.beso-hero-prism-wrapper .hero-subtitle {
  margin: 0;
  font-size: ${typography.descSize}px;
  font-weight: ${typography.descWeight};
  color: ${typography.descColor || "#eae5d9"};
  line-height: 1.5;
}
${entranceKeyframes}
${particleCss}
${customHeroBgLayerCss}`.trim();

    const html = `<div class="beso-hero-prism-wrapper" style="position: relative; overflow: hidden;">
  ${customHeroBgLayerHtml}
  <div class="prism-refraction-bg"></div>
  <div class="prism-border-beam"></div>
  <div class="hero-content-layer" style="position: relative; z-index: 10;">
    <span class="hero-badge">GLASS PRISM V3.6</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${desc}</p>
  </div>
  ${particleHtml}
</div>`;

    return { html, css };
  }

  // 3. HERO CANVAS 4: 3D HOLOGRAPHIC QUANTUM PORTAL
  if (elementId === "hero-quantum-portal") {
    const title = escapeHtml(typography.titleText || "الجيل القادم من واجهات المستقبل");
    const desc = escapeHtml(typography.descText || "منصة متكاملة لتوليد المكونات التفاعلية بالفيزياء الرقمية والجسيمات الحية");

    const css = `.beso-hero-portal-wrapper {
  position: relative !important;
  width: 100%;
  min-height: 480px;
  max-width: 680px;
  border-radius: 28px;
  overflow: hidden !important;
  background: #020611;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(212, 175, 55, 0.25);
  box-sizing: border-box;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.portal-bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(37, 99, 235, 0.25) 0%, rgba(13, 148, 136, 0.1) 45%, rgba(2, 6, 17, 0.95) 80%);
  pointer-events: none;
  z-index: 1;
}

.portal-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 2px dashed rgba(56, 189, 248, 0.35);
  pointer-events: none;
  z-index: 2;
  transform: translate(-50%, -50%);
}

.ring-outer {
  width: 380px;
  height: 380px;
  animation: portalSpin 25s linear infinite;
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.15);
}

.ring-middle {
  width: 260px;
  height: 260px;
  border-color: rgba(212, 175, 55, 0.4);
  animation: portalSpin 15s linear infinite reverse;
}

.ring-inner {
  width: 140px;
  height: 140px;
  border-color: rgba(16, 185, 129, 0.5);
  animation: portalSpin 8s linear infinite;
}

@keyframes portalSpin {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.05); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
}

.portal-core-singularity {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ffffff 0%, rgba(56, 189, 248, 0.8) 40%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(10px);
  z-index: 3;
  animation: corePulse 3s ease-in-out infinite alternate;
}

@keyframes corePulse {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
}

.beso-hero-portal-wrapper .hero-content-layer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 36px 24px;
  max-width: 520px;
  backdrop-filter: blur(12px);
  background: rgba(3, 8, 20, 0.65);
  border-radius: 22px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.beso-hero-portal-wrapper .hero-badge {
  display: inline-block;
  padding: 4px 14px;
  margin-bottom: 12px;
  border-radius: 99px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.5);
  color: #38bdf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.beso-hero-portal-wrapper .hero-title {
  margin: 0 0 10px 0;
  font-size: ${typography.titleSize}px;
  font-weight: ${typography.titleWeight};
  color: ${typography.titleColor || "#fff8e7"};
  text-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
  line-height: 1.25;
}

.beso-hero-portal-wrapper .hero-subtitle {
  margin: 0;
  font-size: ${typography.descSize}px;
  font-weight: ${typography.descWeight};
  color: ${typography.descColor || "#c7d2fe"};
  line-height: 1.5;
}
${entranceKeyframes}
${particleCss}
${customHeroBgLayerCss}`.trim();

    const html = `<div class="beso-hero-portal-wrapper">
  ${customHeroBgLayerHtml}
  <div class="portal-bg-glow"></div>
  <div class="portal-ring ring-outer"></div>
  <div class="portal-ring ring-middle"></div>
  <div class="portal-ring ring-inner"></div>
  <div class="portal-core-singularity"></div>
  <div class="hero-content-layer">
    <span class="hero-badge">QUANTUM CORE V3.5</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${desc}</p>
  </div>
  ${particleHtml}
</div>`;

    return { html, css };
  }

  // BATCH 17: COMPOUND MEDIA CARD (compound-media-card)
  if (elementId === "compound-media-card") {
    const titleText = escapeHtml(typography.titleText || "عنوان البطاقة المركبة");
    const descText = escapeHtml(typography.descText || "هذا النص يمثل الوصف التفصيلي للبطاقة مع دعم كامل للفيزياء والتوهج الزجاجي.");
    const badgeText = escapeHtml(state.badgeParams?.text || typography.badgeText || "منتج مميز");
    const buttonText = escapeHtml(typography.buttonText || "استكشف التفاصيل");
    const customImgUrl = media.customImgUrl || media.heroBgImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";
    const objectFit = media.objectFit || "cover";
    const imgWidth = media.imageWidth ? (typeof media.imageWidth === "number" ? `${media.imageWidth}px` : media.imageWidth) : "100%";
    const imgHeight = `${media.imageHeight || 200}px`;
    const titleColor = typography.titleColor || "#fff8e7";
    const titleSize = typography.titleSize || 22;
    const descColor = typography.descColor || "#eae5d9";
    const descSize = typography.descSize || 14;
    const mainColor = lighting.colorStop1 || state.globalParams?.mainColor || "#16157f";
    const cardHoverCSS = getHoverCSS(".beso-compound-card");

    const css = `.beso-compound-card {
  width: ${dimensions.width}px;
  max-width: 100%;
  padding: ${dimensions.padding}px;
  border-radius: ${dimensions.borderRadius}px;
  ${surfaceCSSBlock.trim()}
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  font-family: inherit;
  transition: all ${animations.transitionSpeed}s cubic-bezier(0.16, 1, 0.3, 1);
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

${cardHoverCSS}

.media-frame-wrapper {
  position: relative;
  width: ${imgWidth};
  max-width: 100%;
  height: ${imgHeight};
  border-radius: ${Math.max(8, dimensions.borderRadius - 4)}px;
  overflow: hidden;
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.35)};
  box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.2), 0 8px 20px rgba(0, 0, 0, 0.4);
}

.compound-img {
  width: 100%;
  height: 100%;
  object-fit: ${objectFit};
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.beso-compound-card:hover .compound-img {
  transform: scale(1.06);
}

.img-overlay-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 60%);
  pointer-events: none;
}

.compound-card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: ${typography.textAlign};
}

.compound-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: ${hexToRgba(lighting.glowColor, 0.2)};
  color: ${lighting.glowColor};
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.4)};
  width: fit-content;
}

.compound-title {
  margin: 0;
  font-size: ${titleSize}px;
  font-weight: ${typography.titleWeight || 700};
  color: ${titleColor};
  line-height: 1.3;
  ${textShadowCSS}
}

.compound-desc {
  margin: 0;
  font-size: ${descSize}px;
  font-weight: ${typography.descWeight || 400};
  color: ${descColor};
  line-height: 1.6;
  opacity: 0.9;
}

.compound-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  padding: 10px 20px;
  border-radius: ${Math.max(8, dimensions.borderRadius - 4)}px;
  background: ${mainColor};
  color: #ffffff;
  font-size: ${typography.buttonSize || 14}px;
  font-weight: 700;
  border: 1px solid ${hexToRgba(lighting.glowColor, 0.5)};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.compound-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${hexToRgba(lighting.glowColor, 0.6)};
  filter: brightness(1.1);
}
${entranceKeyframes}`.trim();

    const html = `<div class="beso-compound-card material-${surfaceStyle}">
  <!-- Top Media Frame with Ratio & Size Binding -->
  <div class="media-frame-wrapper" style="width: ${imgWidth}; height: ${imgHeight};">
    <img src="${customImgUrl}" alt="Media Card" class="compound-img" style="object-fit: ${objectFit};" />
    <div class="img-overlay-glow"></div>
  </div>

  <!-- Content Layer -->
  <div class="compound-card-content">
    <span class="compound-badge">${badgeText}</span>
    <h3 class="compound-title" style="color: ${titleColor}; font-size: ${titleSize}px;">${titleText}</h3>
    <p class="compound-desc" style="color: ${descColor}; font-size: ${descSize}px;">${descText}</p>
    
    <!-- Action Button -->
    <button class="compound-action-btn" style="background: ${mainColor}; color: #fff;">
      ${buttonText}
    </button>
  </div>
</div>`;

    return { html, css };
  }

  // BATCH 18: MAGIC BENTO CARD COMPONENT (magic-bento-card)
  if (elementId === "magic-bento-card") {
    const step = escapeHtml(media.bentoStep || "04");
    const category = escapeHtml(media.bentoCategory || "منهجية العمل");
    const title = escapeHtml(media.bentoTitle || typography.titleText || "التطوير");
    const desc = escapeHtml(media.bentoDescription || typography.descText || "ننفذ بكود منظم، تكاملات آمنة، وقاعدة بيانات قابلة للتوسع مع المشروع.");
    const bgImage = media.bentoBgImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
    const glowRadius = clamp(media.bentoGlowRadius ?? 280, 100, 500);
    const glowIntensity = clamp(media.bentoGlowIntensity ?? 0.85, 0.1, 1);
    const glowColor = media.bentoGlowColor || "rgba(57, 181, 74, 0.35)";
    const cardW = dimensions.width || 380;
    const cardRadius = dimensions.borderRadius || 20;

    const html = `<div class="magic-bento-card magic-bento-card--glow" style="--glow-radius: ${glowRadius}px; --glow-color: ${glowColor};">
  <!-- خلفية الصورة مع طبقة التعتيم المتدرجة -->
  <div class="bento-bg-layer" style="background-image: url('${bgImage}');"></div>
  <div class="bento-overlay-gradient"></div>

  <!-- المحتوى الداخلي للبطاقة -->
  <div class="bento-card-inner">
    <div class="bento-header-row">
      <span class="bento-step-badge">${step}</span>
      <span class="bento-category-tag">${category}</span>
    </div>

    <div class="bento-body">
      <h3 class="bento-title">${title}</h3>
      <p class="bento-desc">${desc}</p>
    </div>

    <div class="bento-footer">
      <div class="bento-indicator">
        <span class="indicator-dot"></span>
        <span class="indicator-text">منهجية معتمدة</span>
      </div>
      <div class="bento-arrow-icon">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</div>`;

    const css = `.magic-bento-card {
  --glow-x: 50%;
  --glow-y: 50%;
  --glow-intensity: 0;
  --glow-radius: ${glowRadius}px;
  --glow-color: ${glowColor};
  position: relative;
  width: ${cardW}px;
  max-width: 100%;
  min-height: 380px;
  border-radius: ${cardRadius}px;
  background: #06150e;
  border: 1px solid rgba(52, 211, 153, 0.25);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  direction: rtl;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
  animation: besoEntrance-${animations.entranceAnimation} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.magic-bento-card:hover {
  transform: translateY(-4px);
  border-color: rgba(52, 211, 153, 0.6);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(16, 185, 129, 0.2);
}

.magic-bento-card--glow::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  border-radius: inherit;
  background: radial-gradient(
    var(--glow-radius) circle at var(--glow-x) var(--glow-y),
    var(--glow-color) 0%,
    transparent 100%
  );
  opacity: var(--glow-intensity);
  transition: opacity 0.25s ease;
}

.bento-bg-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: saturate(1.1) brightness(0.65);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.magic-bento-card:hover .bento-bg-layer {
  transform: scale(1.05);
}

.bento-overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 21, 14, 0.3) 0%, rgba(3, 10, 7, 0.85) 60%, rgba(2, 8, 5, 0.98) 100%);
  z-index: 1;
}

.bento-card-inner {
  position: relative;
  z-index: 3;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 380px;
  box-sizing: border-box;
}

.bento-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.bento-step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 14px;
  font-weight: 800;
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(52, 211, 153, 0.35);
  border-radius: 10px;
  padding: 4px 10px;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
}

.bento-category-tag {
  font-size: 12px;
  font-weight: 600;
  color: #a7f3d0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 99px;
  padding: 4px 14px;
  backdrop-filter: blur(8px);
}

.bento-body {
  margin-top: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bento-title {
  margin: 0;
  font-size: ${typography.titleSize || 24}px;
  font-weight: ${typography.titleWeight || 800};
  color: ${typography.titleColor || "#f0fdf4"};
  line-height: 1.3;
}

.bento-desc {
  margin: 0;
  font-size: ${typography.descSize || 14}px;
  font-weight: ${typography.descWeight || 400};
  color: ${typography.descColor || "#cbd5e1"};
  line-height: 1.6;
}

.bento-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.bento-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

.indicator-text {
  font-size: 12px;
  color: #94a3b8;
}

.bento-arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #34d399;
  transition: all 0.3s ease;
}

.magic-bento-card:hover .bento-arrow-icon {
  background: #10b981;
  color: #020a06;
  transform: translateX(-4px);
}
${entranceKeyframes}`.trim();

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
 * Auto-Generated JavaScript Engine with Audio & Spotlight Physics
 */
export function generateElementJs(elementId, state = {}) {
  return `// Auto-Generated Beso Studio JS Engine
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.querySelector('.sparkle-btn');
  const bentoCard = document.querySelector('.magic-bento-card');

  // Sparkle Button Sound Trigger
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      if (typeof SoundLibrary !== 'undefined') SoundLibrary.play('neon_click');
    });
  }

  // Bento Mouse Tracking Glow Physics
  if (bentoCard) {
    bentoCard.addEventListener('mousemove', (e) => {
      const rect = bentoCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      bentoCard.style.setProperty('--glow-x', \`\${x}%\`);
      bentoCard.style.setProperty('--glow-y', \`\${y}%\`);
      bentoCard.style.setProperty('--glow-intensity', '1');
    });
    bentoCard.addEventListener('mouseleave', () => {
      bentoCard.style.setProperty('--glow-intensity', '0');
    });
  }

  // Split Hero Synchronized Dual Column Auto-Slider
  const splitHero = document.querySelector('.split-hero-banner');
  if (splitHero) {
    const rightSlides = splitHero.querySelectorAll('.col-right .slide-image');
    const leftSlides = splitHero.querySelectorAll('.col-left .slide-image');
    let currentIdx = 0;
    const total = Math.max(rightSlides.length, leftSlides.length);
    if (total > 1) {
      setInterval(() => {
        currentIdx = (currentIdx + 1) % total;
        rightSlides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
        leftSlides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
      }, ${Math.round((state.media?.splitHeroInterval || 2.0) * 1000)});
    }
  }
});`;
}

/**
 * Universal element code generator returning { html, css, js }.
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

  const result = generateElementCodeCore(elementId, state);
  const js = generateElementJs(elementId, state);

  return {
    ...result,
    js,
  };
}

/**
 * Backward compatibility alias for tests & button exports.
 */
export function generateFinalCode(state) {
  return generateElementCode("button", state);
}

export {
  COMPONENT_ALLOWED_CATEGORIES,
  ELEMENT_PRESETS,
  EFFECT_PRESETS,
  PRESETS,
  getComponentAllowedCategories,
} from "../data/effects.js";



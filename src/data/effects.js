// data/effects.js

export const MATERIAL_SURFACES = [
  {
    id: "glass",
    label: "زجاجي",
    subLabel: "Glassmorphism",
    glyph: "💎",
    instructions: [
      "سطح زجاجي بلوري شيمر مع انعكاس ضوئي علوي.",
      "تأثير عمق عالي مع ضبابية خلفية 20px.",
      "يناسب واجهات الـ Glass المتطورة والفخمة.",
    ],
    params: [
      { id: "blurAmount", label: "نعومة الزجاج (Blur)", type: "number", default: 16, min: 0, max: 40, step: 1, unit: "px" },
      { id: "transparency", label: "الشفافية", type: "number", default: 0.35, min: 0.1, max: 0.9, step: 0.05 },
    ],
  },
  {
    id: "metal",
    label: "معدني",
    subLabel: "Brushed Metal",
    glyph: "⚙️",
    instructions: [
      "معدن مصقول بتدرجات ضوئية وحواف مشطوفة Bevel.",
      "انعكاسات كروم مزدوجة مع استجابة ميكانيكية عند النقر.",
      "يناسب الأزرار والبطاقات التكتيكية والفاخرة.",
    ],
    params: [
      { id: "shineIntensity", label: "شدة اللمعان", type: "number", default: 0.6, min: 0.1, max: 1, step: 0.05 },
    ],
  },
  {
    id: "ivory",
    label: "عاجي",
    subLabel: "Soft Ivory",
    glyph: "🏛️",
    instructions: [
      "سطح عاجي ناعم منحوت بظلال فيزيائية مزدوجة Neumorphic.",
      "عمق ناعم وانخفاض داخلي سلس عند التفاعل.",
      "مظهر فخم وهادئ متناغم مع الضوء الطبيعي.",
    ],
    params: [
      { id: "shadowSpread", label: "مدى الظلال", type: "number", default: 12, min: 4, max: 30, step: 1, unit: "px" },
    ],
  },
  {
    id: "neon",
    label: "نيون",
    subLabel: "Cyber Glow",
    glyph: "⚡",
    instructions: [
      "توهج نيون كهرومغناطيسي متعدد الطبقات مع نبض LED.",
      "إشعاع ضوئي داخلي وخارجي ناصع.",
      "يناسب الواجهات المستقبلية وعناصر جذب الانتباه.",
    ],
    params: [
      { id: "glowStrength", label: "شدة التوهج", type: "number", default: 25, min: 5, max: 50, step: 1, unit: "px" },
    ],
  },
  {
    id: "flat",
    label: "عادي",
    subLabel: "Flat",
    instructions: [
      "سطح أحادي بتدرج فاخر وظلال أنيقة.",
      "استخدمه للتصاميم البسيطة الكلاسيكية.",
      "عدّل اللون والخصائص من الإعدادات العامة.",
    ],
    params: [],
  },
];

export const surfaceModel = {
  key: "surface",
  title: "شكل السطح المادي (Material Surface)",
  options: MATERIAL_SURFACES,
};

export const animationModel = {
  key: "animation",
  title: "الحركة المستمرة (Animation)",
  options: [
    {
      id: "none",
      label: "بدون حركة",
      subLabel: "None",
      instructions: ["يبقي العنصر ثابتًا بهدوء.", "استخدمه للتصاميم التحريرية الهادئة."],
      params: [],
    },
    {
      id: "pulse",
      label: "نبض",
      subLabel: "Pulse",
      instructions: ["يكبّر العنصر ويعيده بنعومة.", "يناسب إبراز الأزرار والدعوة لاتخاذ إجراء."],
      params: [{ id: "pulseScale", label: "قوة النبضة", type: "number", default: 1.08, min: 1.02, max: 1.15, step: 0.01 }],
    },
    {
      id: "fade",
      label: "تلاشي",
      subLabel: "Fade",
      instructions: ["يغيّر شفافية العنصر باستمرار كتلميح بصري هادئ."],
      params: [{ id: "minOpacity", label: "أدنى شفافية", type: "number", default: 0.4, min: 0.1, max: 0.8, step: 0.05 }],
    },
  ],
};

export const hoverModel = {
  key: "hover",
  title: "تأثير مرور الماوس (Hover)",
  options: [
    {
      id: "scale",
      label: "تكبير",
      subLabel: "Scale",
      instructions: ["يكبّر العنصر بنعومة عند مرور المؤشر."],
      params: [{ id: "hoverScale", label: "مقدار التكبير", type: "number", default: 1.05, min: 1.01, max: 1.2, step: 0.01 }],
    },
    {
      id: "lift",
      label: "ارتفاع",
      subLabel: "Lift",
      instructions: ["يرفع العنصر فيزيائيًا مع تعميق الظلال المزدوجة."],
      params: [{ id: "liftDistance", label: "مسافة الارتفاع", type: "number", default: 8, min: 2, max: 20, step: 1, unit: "px" }],
    },
    {
      id: "glow",
      label: "توهج",
      subLabel: "Glow",
      instructions: ["يشع ضوءًا ذهبيًا ساطعًا حول الحواف."],
      params: [{ id: "hoverGlowSpread", label: "انتشار التوهج", type: "number", default: 20, min: 5, max: 40, step: 1, unit: "px" }],
    },
  ],
};

// 1. Dimensions & Opacity initial state
export const initialDimensions = {
  width: 360,
  height: "auto",
  borderRadius: 16,
  padding: 24,
  surfaceOpacity: 0.85,
  borderWidth: 1,
  borderColor: "#d4af37",
  shadowDepth: 12,
  shadowBlur: 30,
  shadowColor: "rgba(0, 0, 0, 0.45)",
  shadowElevation: 3,
};

// 2. Gradients & LED Glow initial state
export const initialLighting = {
  useThreeColors: true,
  colorStop1: "#0d3b2e",
  colorStop2: "#16157f",
  colorStop3: "#4a154b",
  gradientAngle: 145,
  showBottomGlow: true,
  glowColor: "#d4af37",
  glowSpread: 28,
  glowIntensity: 100, // 0% (Disabled) -> 100% (Natural) -> 200% (Overexposure)
  brightness: 100,
  bevelDepth: 4,
};

// 3. Typography & Alignment initial state (Multi-Target Tabbed Controller)
export const initialTypography = {
  activeTarget: "title", // "title" | "desc" | "button" | "badge"

  // Target: Title (العنوان)
  titleText: "بطاقة Beso الفاخرة",
  titleSize: 22,
  titleColor: "#fff8e7",
  titleGradient: "",
  titleFontFamily: "Alexandria, sans-serif",
  titleWeight: 700,
  titleItalic: false,
  titleAlign: "right", // "right" | "center" | "left" | "justify"
  titleShadowX: 0,
  titleShadowY: 2,
  titleShadowDepth: 2,
  titleShadowBlur: 4,
  titleShadowColor: "rgba(0, 0, 0, 0.65)",

  // Target: Description (التفاصيل والوصف)
  descText: "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة.",
  descSize: 14,
  descColor: "#eae5d9",
  descGradient: "",
  descFontFamily: "Alexandria, sans-serif",
  descWeight: 400,
  descItalic: false,
  descAlign: "right", // "right" | "center" | "left" | "justify"
  descShadowX: 0,
  descShadowY: 1,
  descShadowDepth: 1,
  descShadowBlur: 2,
  descShadowColor: "rgba(0, 0, 0, 0.5)",

  // Target: Button (زر الإجراء)
  buttonText: "تفاعل ملموس ✦",
  buttonSize: 15,
  buttonColor: "#fff8e7",
  buttonGradient: "",
  buttonFontFamily: "Alexandria, sans-serif",
  buttonWeight: 600,
  buttonItalic: false,
  buttonAlign: "center",
  buttonShadowX: 0,
  buttonShadowY: 1,
  buttonShadowDepth: 1,
  buttonShadowBlur: 3,
  buttonShadowColor: "rgba(0, 0, 0, 0.4)",

  // Target: Badge (الشارة والوسم)
  badgeText: "عنصر فاخر VIP",
  badgeSize: 11,
  badgeColor: "#d4af37",
  badgeWeight: 700,
  badgeAlign: "center",
  badgeShadowDepth: 1,
  badgeShadowBlur: 2,
  badgeShadowColor: "rgba(0, 0, 0, 0.5)",

  // Backward compatibility keys
  textAlign: "right",
  textShadowDepth: 2,
};

// 4. Animations initial state
export const initialAnimations = {
  transitionSpeed: 0.35,
  entranceAnimation: "fadeUp", // "fadeUp" | "zoomIn" | "slideDown" | "pulseGlow"
  hoverEffect: "liftScale", // "liftScale" | "glowExpand" | "tilt3d" | "neonPulse"
  hoverLift: 8, // translateY in px
  hoverScale: 1.05, // scale factor
  hoverGlowExpansion: 20, // glow expansion in px
  enableHoverPhysics: true,
  soundPreset: "soft-click", // "soft-click" | "send-swoosh" | "open-pop" | "close-snap" | "cyber-neon" | "success-chime" | "space-warp" | "toggle-switch" | "hover-tick" | "heart-beat"
  particleOverlay: "none", // "none" | "particles-cosmic-dust" | "particles-cyber-mesh" | "particles-energy-ember"
};

// 5. Media, 3D Geometry, Logo, Hero Backdrops & Marquee Parameters
export const initialMediaParams = {
  imageWidth: 360,
  imageHeight: 200,
  isAspectLocked: true,
  aspectRatio: "16:9",
  customImgUrl: "",
  objectFit: "cover",

  carouselImages: ["", "", "", "", "", "", "", ""],
  carouselRotationSpeed: 16,
  carouselPerspective: 1200,
  carouselTiltAngle: 10,
  carouselHoverPause: true,

  heroBgImage: "",
  heroBgOverlayOpacity: 0.85,
  heroBgTint: "#041a12",
  heroBgObjectFit: "cover",
  heroBgBlur: 0,

  logoUrl: "/brand/beso-studio-ui.png",
  logoWidth: 64,
  logoHeight: 64,
  logoKeepAspect: true,
  logoGlowColor: "#d4af37",
  logoGlowSpread: 15,
  logoDropShadow: true,
  brandLogoSize: 64,
  brandFontBase: 16,

  marqueeSpeed: 16,
  marqueeRadiusX: 160,
  marqueeRadiusY: 160,
  marqueeIconSize: 18,
  marqueeItemsTop: "💎 Glassmorphism, 👑 Royal Gold, ⚡ Cyber Neon, 🏛️ Soft Ivory, ⚙️ Brushed Metal, 🌌 Cosmic Orbit",
  marqueeItemsBottom: "🔥 Hot Embers, 🌧️ Cyber Rain, 🔮 Quantum Orbs, 📐 Figma Frame, 🛍️ 3D Tote, 🛒 Kinetic Cart",
  marqueeInvertDirection: false,

  // Batch 18: Kinetic Dual-Track Hero Canvas parameters
  kineticTrackSpeed: 20,
  kineticTrackInvert: false,
  kineticPillTag: "حلول رقمية مخصصة للأعمال",
  kineticHeadline: "نصمم حلولاً رقمية مبتكرة",
  kineticHighlightWord: "عــــلامتك",
  kineticHighlightGradient: "linear-gradient(160deg, #4cd864 0%, #39b54a 50%, #2a8f38 100%)",
  kineticClipPath: "polygon(50% 0px, 100% 10%, 94% 93%, 50% 100%, 6% 93%, 0px 10%)",
  kineticSubtext: "واجهات تفاعلية مذهلة بحركات لا نهائية ومؤثرات فيزيائية ملموسة.",
  kineticCtaText: "اكتشف إمكانياتنا ✦",
  kineticTrackTopImages: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
  ],
  kineticTrackBottomImages: [
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"
  ],

  // Batch 18: Magic Bento Card Component parameters
  bentoStep: "04",
  bentoCategory: "منهجية العمل",
  bentoTitle: "التطوير",
  bentoDescription: "ننفذ بكود منظم، تكاملات آمنة، وقاعدة بيانات قابلة للتوسع مع المشروع.",
  bentoBgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  bentoGlowRadius: 280,
  bentoGlowIntensity: 0.85,
  bentoGlowColor: "rgba(57, 181, 74, 0.35)",

  // Batch 18: Split Hero Banner (Synchronized Dual Column Slider)
  splitHeroBrand: "BESO",
  splitHeroBrandSize: 38,
  splitHeroBrandColor: "#e50010",
  splitHeroBrandWeight: 900,
  splitHeroDiscountBadge: "خصم",
  splitHeroBadgeSize: 15,
  splitHeroBadgeColor: "#e50010",
  splitHeroDiscountTitle: "حتى 70%",
  splitHeroTitleSize: 42,
  splitHeroTitleColor: "#e50010",
  splitHeroSubtext: "عروض منتصف الموسم لفترة محدودة",
  splitHeroSubtextSize: 13,
  splitHeroSubtextColor: "#333333",
  splitHeroAlign: "center",
  splitHeroInterval: 2.0,
  splitHeroOverlayBlur: 0,
  splitHeroOverlayBg: "transparent",
  splitHeroAspectRatio: "custom",
  splitHeroRightImages: [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop"
  ],
  splitHeroLeftImages: [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
  ],

  // Batch 18: Super Promo Slider (5-Slide Card)
  promoBadgeTag: "Super September",
  promoTitle: "Save big with",
  promoHighlight: "hot picks!",
  promoDesc: "تخفيضات موسمية حصرية على تشكيلة المعدات والملابس الخارجية.",
  promoCtaText: "View More",
  promoSlides: [
    { badge: "Super September", title: "Save big with", highlight: "hot picks!", desc: "تخفيضات موسمية حصرية على تشكيلة المعدات والملابس الخارجية.", cta: "View More", img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop" },
    { badge: "عروض خاصة", title: "تشكيلة", highlight: "الأجهزة الذكية", desc: "اكتشف أحدث البروجكتورات وأجهزة المنزل الذكي بأسعار استثنائية.", cta: "تسوق الآن", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop" },
    { badge: "جديد الموسم", title: "معدات", highlight: "التخييم والرحلات", desc: "تجهيزات كاملة للرحلات الجبلية والخيم المقاومة للطقس.", cta: "استكشف القسم", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop" },
    { badge: "خصم حصري", title: "أزياء", highlight: "المغامرات الخارجية", desc: "سترات وأحذية مخصصة لتحمل أقسى ظروف الطبيعة.", cta: "تصفح المنتجات", img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop" },
    { badge: "الأعلى مبيعاً", title: "مستلزمات", highlight: "الحياة الذكية", desc: "أجهزة أطعام الأليفة الذكية وحلول العناية اليومية بالمنزل.", cta: "اطلب اليوم", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop" }
  ],
};

export const initialEffectState = {
  activeElement: "split-hero-banner", // Premium & Hero options: split-hero-banner, compound-media-card, cyber-card, action-send-btn, conic-glow-btn, frutiger-aero-btn, space-orbit-btn, adaptive-morph-btn, like-heart-btn, multi-layer-diff-btn, figma-vector-frame, ripple-wave-btn, cyber-glimmer-card, holographic-3d-ring, cyber-matrix-badge, glass-morph-card-3d, glowing-border-button, biometric-auth-card, quantum-toggle-switch, holographic-price-card, cyber-truck-card, anime-treadmill-card, ticker-tape-card, slot-machine-card, retro-crt-glitch, audio-equalizer-card, kinetic-cart-slide, quick-quantity-counter, liquid-tote-fill, wa-pulse-glow, wa-continuous-spin, wa-expandable-badge, hero-cyber-grid, hero-aurora-wave, hero-cosmic-particles alongside button, card, input, badge, social

  dimensions: { ...initialDimensions },
  lighting: { ...initialLighting },
  typography: { ...initialTypography },
  animations: { ...initialAnimations },
  media: { ...initialMediaParams },
  soundPreset: "soft-click",

  globalParams: {
    surfaceStyle: "glass",
    mainColor: "#16157f",
    accentColor: "#d4af37",
    textColor: "#ffffff",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 14,
    bevelDepth: 4,
    showRivets: true,
    showGlow: true,
    // Compatibility fields
    color: "#16157f",
    size: 2,
    speed: 1.2,
    intensity: 0.8,
    showIcon: true,
    iconPosition: "after",
    iconType: "arrow-left",
  },

  cardParams: {
    title: "بطاقة Beso الفاخرة",
    description: "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة.",
    padding: 24,
  },

  inputParams: {
    label: "البريد الإلكتروني",
    placeholder: "ادخل بريدك هنا...",
    insetDepth: 4,
  },

  badgeParams: {
    text: "عنصر فاخر VIP",
  },

  buttonParams: {
    text: "تفاعل ملموس",
    showIcon: true,
  },

  socialParams: {
    title: "تواصل معنا (Social Dock)",
  },

  surfaceParams: {
    flat: {},
    glass: { transparency: 0.35, blurAmount: 16 },
    metal: { shineIntensity: 0.6 },
    ivory: { shadowSpread: 12 },
    neon: { glowStrength: 25 },
  },

  animationParams: {
    none: {},
    pulse: { pulseScale: 1.08 },
    fade: { minOpacity: 0.4 },
  },

  hoverParams: {
    scale: { hoverScale: 1.05 },
    lift: { liftDistance: 8 },
    glow: { hoverGlowSpread: 20 },
  },

  activeSurface: "glass",
  activeAnimation: "pulse",
  activeHover: "lift",
};

export function createInitialEffectState() {
  return {
    ...initialEffectState,
    dimensions: { ...initialDimensions },
    lighting: { ...initialLighting },
    typography: { ...initialTypography },
    animations: { ...initialAnimations },
    media: { ...initialMediaParams },
    globalParams: { ...initialEffectState.globalParams },
    cardParams: { ...initialEffectState.cardParams },
    inputParams: { ...initialEffectState.inputParams },
    badgeParams: { ...initialEffectState.badgeParams },
    buttonParams: { ...initialEffectState.buttonParams },
    socialParams: { ...initialEffectState.socialParams },
    surfaceParams: Object.fromEntries(
      Object.entries(initialEffectState.surfaceParams).map(([id, params]) => [id, { ...params }])
    ),
    animationParams: Object.fromEntries(
      Object.entries(initialEffectState.animationParams).map(([id, params]) => [id, { ...params }])
    ),
    hoverParams: Object.fromEntries(
      Object.entries(initialEffectState.hoverParams).map(([id, params]) => [id, { ...params }])
    ),
  };
}

// ============================================================
// CONTEXTUAL INSPECTOR ENGINE (V9.0) - COMPONENT-BOUND CATEGORIES
// ============================================================

export const CATEGORY_DEFINITIONS = {
  typography: { label: "النصوص والخطوط", icon: "Type" },
  materials: { label: "الخامات والأسطح", icon: "Layers" },
  lighting: { label: "الإضاءة والظلال", icon: "Sun" },
  dimensions: { label: "الأبعاد والأحجام", icon: "Maximize" },
  kinetic_tracks: { label: "المسارات الحركية", icon: "Activity" },
  bento_glow: { label: "توهج البينتو", icon: "Sparkles" },
  carousel_3d: { label: "المجسمات ثلاثية الأبعاد", icon: "Box" },
  brand_identity: { label: "الهوية والشعارات", icon: "Briefcase" },
  split_slider: { label: "الشرائح المزدوجة", icon: "Sliders" },
  cta_button: { label: "دعوة لإجراء فعل (CTA)", icon: "MousePointer" },
  gradients: { label: "التدرجات والأشكال", icon: "Palette" },
  hero_backdrop: { label: "خلفية الهيرو", icon: "Image" },
  background_image: { label: "صورة الخلفية", icon: "Image" },
  brand_colors: { label: "ألوان الهوية", icon: "Palette" },
  logo_branding: { label: "شعار العلامة", icon: "Award" },
  promo_slides: { label: "شرائح العرض", icon: "Tag" },
  marquees: { label: "أشرطة الحركة", icon: "Repeat" },
  media_frame: { label: "إطار الصورة", icon: "Layout" },
  animations: { label: "الحركات والمؤثرات", icon: "Sparkles" },
  "3d_carousels": { label: "دوران الكاروسيل", icon: "RotateCw" },
  carousel_images: { label: "صور الأوجه", icon: "Image" },
  perspective: { label: "المنظور والميلان", icon: "Compass" }
};

export const COMPONENT_ALLOWED_CATEGORIES = {
  // Flagship Heroes
  "hero-kinetic-dual-track": ["typography", "gradients", "kinetic_tracks", "cta_button"],
  "split-hero-banner": ["split_slider", "typography", "dimensions"],
  "hero-cyber-grid": ["typography", "hero_backdrop", "gradients", "lighting"],
  "hero-aurora-wave": ["typography", "hero_backdrop", "gradients", "lighting"],
  "hero-cosmic-particles": ["typography", "hero_backdrop", "gradients", "lighting"],
  "hero-quantum-portal": ["typography", "hero_backdrop", "gradients", "lighting"],
  "hero-hyper-vortex": ["typography", "hero_backdrop", "gradients", "lighting"],
  "hero-glass-prism": ["typography", "hero_backdrop", "gradients", "lighting"],

  // Flagship Bento & Cards
  "magic-bento-card": ["typography", "bento_glow", "background_image"],
  "compound-media-card": ["typography", "media_frame", "materials", "cta_button"],
  "brand-identity-card": ["typography", "brand_colors", "materials", "logo_branding"],
  "super-promo-slider": ["typography", "promo_slides", "background_image", "cta_button"],
  "beso-compound-card": ["typography", "materials", "lighting", "animations", "cta_button"],

  // 3D Polyhedral Carousels
  "carousel-3d-cube": ["3d_carousels", "carousel_images", "perspective"],
  "carousel-3d-hexagon": ["3d_carousels", "carousel_images", "perspective"],
  "carousel-3d-octagon": ["3d_carousels", "carousel_images", "perspective"],
  "carousel-3d-sphere": ["3d_carousels", "carousel_images", "perspective"],

  // Kinetic Path Marquees
  "marquee-elliptical-track": ["marquees", "typography", "materials"],
  "marquee-dual-opposite": ["marquees", "typography", "materials"],

  // Kinetic & Interactive Cards
  "cyber-card": ["typography", "materials", "dimensions", "lighting", "animations"],
  "figma-vector-frame": ["typography", "materials", "dimensions", "lighting"],
  "cyber-glimmer-card": ["typography", "materials", "dimensions", "lighting", "animations"],
  "holographic-3d-ring": ["typography", "materials", "dimensions", "lighting", "animations"],
  "cyber-matrix-badge": ["typography", "materials", "dimensions", "lighting"],
  "glass-morph-card-3d": ["typography", "materials", "dimensions", "lighting", "animations"],
  "biometric-auth-card": ["typography", "materials", "dimensions", "lighting"],
  "quantum-toggle-switch": ["typography", "materials", "dimensions", "lighting"],
  "holographic-price-card": ["typography", "materials", "dimensions", "lighting", "cta_button"],
  "cyber-truck-card": ["typography", "materials", "dimensions", "lighting", "animations"],
  "anime-treadmill-card": ["typography", "materials", "dimensions", "lighting", "animations"],
  "ticker-tape-card": ["typography", "materials", "dimensions", "lighting", "marquees"],
  "slot-machine-card": ["typography", "materials", "dimensions", "lighting", "animations"],
  "retro-crt-glitch": ["typography", "materials", "dimensions", "lighting", "animations"],
  "audio-equalizer-card": ["typography", "materials", "dimensions", "lighting", "animations"],
  "kinetic-cart-slide": ["typography", "materials", "dimensions", "lighting", "animations"],
  "quick-quantity-counter": ["typography", "materials", "dimensions", "lighting"],
  "liquid-tote-fill": ["typography", "materials", "dimensions", "lighting", "animations"],

  // Buttons & Floating Triggers
  "action-send-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "conic-glow-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "frutiger-aero-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "space-orbit-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "adaptive-morph-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "like-heart-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "multi-layer-diff-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "ripple-wave-btn": ["typography", "materials", "lighting", "animations", "cta_button"],
  "glowing-border-button": ["typography", "materials", "lighting", "animations", "cta_button"],
  "wa-pulse-glow": ["typography", "materials", "lighting", "animations", "cta_button"],
  "wa-continuous-spin": ["typography", "materials", "lighting", "animations", "cta_button"],
  "wa-expandable-badge": ["typography", "materials", "lighting", "animations", "cta_button"],

  // Core Standard Elements
  "button": ["typography", "materials", "lighting", "dimensions", "animations", "cta_button"],
  "card": ["typography", "materials", "lighting", "dimensions", "animations"],
  "input": ["typography", "materials", "lighting", "dimensions"],
  "badge": ["typography", "materials", "lighting", "dimensions"],
  "social": ["typography", "materials", "lighting", "dimensions"],
};

export const ELEMENT_PRESETS = Object.fromEntries(
  Object.entries(COMPONENT_ALLOWED_CATEGORIES).map(([id, allowedCategories]) => [
    id,
    { id, allowedCategories },
  ])
);

export const EFFECT_PRESETS = ELEMENT_PRESETS;
export const PRESETS = ELEMENT_PRESETS;

export function getComponentCategories(componentId) {
  const id = typeof componentId === "object" ? componentId?.id : componentId;
  return COMPONENT_ALLOWED_CATEGORIES[id] || ["typography", "materials", "lighting", "dimensions"];
}

export function getComponentAllowedCategories(componentId) {
  const id = typeof componentId === "object" ? componentId?.id : componentId;
  return COMPONENT_ALLOWED_CATEGORIES[id] || ["typography", "materials", "lighting", "dimensions", "animations"];
}


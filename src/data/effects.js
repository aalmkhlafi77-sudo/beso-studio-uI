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
  bevelDepth: 4,
};

// 3. Typography & Alignment initial state
export const initialTypography = {
  titleSize: 22,
  titleColor: "#fff8e7",
  descSize: 14,
  descColor: "#eae5d9",
  textAlign: "right", // "right" | "center" | "left"
  textShadowDepth: 2,
  titleText: "بطاقة Beso الفاخرة",
  descText: "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة.",
};

// 4. Animations initial state
export const initialAnimations = {
  transitionSpeed: 0.35,
  entranceAnimation: "fadeUp", // "fadeUp" | "zoomIn" | "slideDown" | "pulseGlow"
  hoverEffect: "liftScale", // "liftScale" | "glowExpand" | "tilt3d" | "neonPulse"
};

export const initialEffectState = {
  activeElement: "cyber-card", // Premium options: cyber-card, action-send-btn, conic-glow-btn, frutiger-aero-btn, space-orbit-btn, adaptive-morph-btn alongside button, card, input, badge, social

  dimensions: { ...initialDimensions },
  lighting: { ...initialLighting },
  typography: { ...initialTypography },
  animations: { ...initialAnimations },

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

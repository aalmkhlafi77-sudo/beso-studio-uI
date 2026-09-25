// data/elementsRegistry.js
import {
  createInitialEffectState,
  initialDimensions,
  initialLighting,
  initialTypography,
  initialAnimations,
} from "./effects.js";

export const ELEMENTS_CONFIG = [
  {
    id: "button",
    label: "الأزرار",
    subLabel: "Buttons",
    glyph: "↗",
    status: "active",
    description: "أنشئ زرًا ملموسًا فخمًا بتأثيرات الأسطح وانعكاسات الكروم والفيزياء التفاعلية.",
  },
  {
    id: "card",
    label: "البطاقات",
    subLabel: "Cards",
    glyph: "▱",
    status: "active",
    description: "أنشئ بطاقة فاخرة بانعكاسات ضوئية وظلال مزدوجة وشارة VIP.",
  },
  {
    id: "input",
    label: "حقول الإدخال",
    subLabel: "Inputs",
    glyph: "⌁",
    status: "active",
    description: "حقل إدخال بتأثير حفر غائر وميض تركيز ذهبي فائق النقاء.",
  },
  {
    id: "badge",
    label: "الشارات",
    subLabel: "Badges",
    glyph: "◉",
    status: "active",
    description: "شارة فخمة VIP بنمط زجاجي أو معدني أو نيون مع نقطة مضيئة.",
  },
  {
    id: "social",
    label: "أيقونات التواصل",
    subLabel: "Social Dock",
    glyph: "✦",
    status: "active",
    description: "منصة أيقونات تواصل تفاعلية مجسمة بأبعاد مادية وضغط ميكانيكي.",
  },
  {
    id: "hero",
    label: "خلفيات Hero",
    subLabel: "Hero Engine",
    glyph: "✧",
    status: "coming_soon",
    description: "محرك إنشاء خلفيات الأقسام الرئيسية قادم لاحقًا.",
  },
  {
    id: "particles",
    label: "الجسيمات",
    subLabel: "Particles",
    glyph: "✳",
    status: "coming_soon",
    description: "محرك الجسيمات والتأثيرات المتحركة قادم لاحقًا.",
  },
];

export const createInitialWorkspaceState = () => {
  const effectState = createInitialEffectState();
  return {
    activeElement: "button",
    buttonState: effectState,
    dimensions: { ...initialDimensions },
    lighting: { ...initialLighting },
    typography: { ...initialTypography },
    animations: { ...initialAnimations },
    globalParams: effectState.globalParams,
    cardParams: effectState.cardParams,
    inputParams: effectState.inputParams,
    badgeParams: effectState.badgeParams,
    buttonParams: effectState.buttonParams,
    socialParams: effectState.socialParams,
    elementParams: {
      card: {
        title: "بطاقة Beso الفاخرة",
        description: "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة.",
        backgroundColor: "#0d3b2e",
        textColor: "#eae5d9",
        radius: 16,
        padding: 24,
      },
      input: {
        label: "البريد الإلكتروني",
        placeholder: "ادخل بريدك هنا...",
        backgroundColor: "#071a14",
        textColor: "#eae5d9",
        accentColor: "#d4af37",
        radius: 14,
        fontSize: 16,
      },
      badge: {
        label: "عنصر فاخر VIP",
        text: "عنصر فاخر VIP",
        backgroundColor: "#4a154b",
        textColor: "#eae5d9",
        radius: 99,
        paddingX: 16,
        paddingY: 6,
        fontSize: 13,
      },
      social: {
        title: "منصات التواصل الفاخرة",
      },
    },
  };
};

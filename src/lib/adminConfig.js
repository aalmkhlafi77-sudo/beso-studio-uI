// lib/adminConfig.js

export const DEFAULT_ADMIN_CONFIG = {
  header: {
    leftText: "Design\nBeautiful\nButtons.",
    leftTextColor: "#d4af37",
    leftTextSize: 11,
    leftTextVisible: true,
    badgeText: "BESO STUDIO UI · أسلوبك الخاص",
    badgeBgColor: "#072118",
    badgeTextColor: "#f5d77f",
    badgeBorderColor: "#d4af37",
    badgePulseVisible: true,
    mainTitle: "صمّم أزرارك .. بأسلوبك الخاص",
    mainTitleGradient: "gold", // "gold" | "emerald" | "purple" | "custom"
    mainTitleCustomColor: "#fff7d6",
    mainTitleSize: 22,
    mainTitleWeight: "800",
    subTitle: "مختبر المؤثرات الزجاجية والفيزيائية المتقدمة وتصدير شفرات HTML/CSS الجاهزة.",
    subTitleColor: "#b3c5bb",
    subTitleOpacity: 90,
  },
  logo: {
    url: "/brand/beso-studio-ui.png",
    width: 160,
    height: 80,
    objectFit: "contain", // "contain" | "cover" | "fill"
    dropShadow: true,
  },
  canvas: {
    hdResolutionEnabled: true,
    antiAliasingBoost: true,
    defaultZoom: 100, // 50, 75, 100, 125, 150
  },
  branding: {
    designerSignature: "تصميم وتطوير: أمان للتطوير الرقمي",
    designerUrl: "https://github.com",
    copyrightYear: "2026",
    licenseText: "كافة الحقوق محفوظة © Beso Studio UI",
  },
  adSense: {
    clientCode: "",
    slotCode: "",
    enabled: false,
    headerSnippet: "",
  },
  seo: {
    title: "Beso Studio UI — استوديو الخامات والفيزياء المادية",
    description: "استوديو احترافي لتصميم وتخصيص الخامات الفيزيائية والزجاجية للأزرار والبطاقات وتصدير HTML/CSS.",
    keywords: "Beso Studio UI, Glassmorphism, Neomorphism, CSS Buttons, Material Physics",
    googleSiteVerification: "",
  },
  social: {
    whatsapp: "+966500000000",
    telegram: "besostudio",
    twitter: "https://x.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  contact: {
    email: "contact@besostudio.com",
    phone: "+966 50 000 0000",
    address: "الرياض، المملكة العربية السعودية",
  },
  security: {
    username: "admin",
    password: "beso2026",
    pin: "2026",
  },
  analytics: {
    visitorCount: 1420,
    pageViews: 3890,
    lastVisit: new Date().toISOString(),
  },
};

const STORAGE_KEY = "beso_studio_admin_config_v45";
const VISITOR_LOGGED_KEY = "beso_studio_visitor_session";

export function loadAdminConfig() {
  if (typeof window === "undefined") return DEFAULT_ADMIN_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAdminConfig(DEFAULT_ADMIN_CONFIG);
      return DEFAULT_ADMIN_CONFIG;
    }
    const parsed = JSON.parse(raw);
    // Deep merge with defaults to avoid missing keys
    return {
      ...DEFAULT_ADMIN_CONFIG,
      ...parsed,
      header: { ...DEFAULT_ADMIN_CONFIG.header, ...(parsed.header || {}) },
      logo: { ...DEFAULT_ADMIN_CONFIG.logo, ...(parsed.logo || {}) },
      canvas: { ...DEFAULT_ADMIN_CONFIG.canvas, ...(parsed.canvas || {}) },
      branding: { ...DEFAULT_ADMIN_CONFIG.branding, ...(parsed.branding || {}) },
      adSense: { ...DEFAULT_ADMIN_CONFIG.adSense, ...(parsed.adSense || {}) },
      seo: { ...DEFAULT_ADMIN_CONFIG.seo, ...(parsed.seo || {}) },
      social: { ...DEFAULT_ADMIN_CONFIG.social, ...(parsed.social || {}) },
      contact: { ...DEFAULT_ADMIN_CONFIG.contact, ...(parsed.contact || {}) },
      security: { ...DEFAULT_ADMIN_CONFIG.security, ...(parsed.security || {}) },
      analytics: { ...DEFAULT_ADMIN_CONFIG.analytics, ...(parsed.analytics || {}) },
    };
  } catch {
    return DEFAULT_ADMIN_CONFIG;
  }
}

export function saveAdminConfig(config) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error("Failed to save admin config to localStorage", err);
  }
}

export function trackVisitorIncrement() {
  if (typeof window === "undefined") return { visitorCount: 1420, pageViews: 3890 };
  try {
    const config = loadAdminConfig();
    let newVisitors = config.analytics?.visitorCount || 1420;
    let newViews = (config.analytics?.pageViews || 3890) + 1;

    // Increment visitor count only once per browser session
    const hasVisitedSession = sessionStorage.getItem(VISITOR_LOGGED_KEY);
    if (!hasVisitedSession) {
      newVisitors += 1;
      sessionStorage.setItem(VISITOR_LOGGED_KEY, "true");
    }

    const updatedAnalytics = {
      ...config.analytics,
      visitorCount: newVisitors,
      pageViews: newViews,
      lastVisit: new Date().toISOString(),
    };

    saveAdminConfig({
      ...config,
      analytics: updatedAnalytics,
    });

    return updatedAnalytics;
  } catch {
    return { visitorCount: 1420, pageViews: 3890 };
  }
}

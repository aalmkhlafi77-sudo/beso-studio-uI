// app/page.jsx & App.jsx
import React, { useMemo, useState, useEffect } from "react";
import { createInitialWorkspaceState, ELEMENTS_CONFIG } from "@/data/elementsRegistry";
import { generateElementCode } from "@/lib/generateCode";
import ElementSelector from "@/components/ElementSelector";
import ParamsEditor from "@/components/ParamsEditor";
import LivePreview from "@/components/LivePreview";
import CodePreview from "@/components/CodePreview";
import SoundToggle from "@/components/SoundToggle";
import ThemeToggle from "@/components/ThemeToggle";
import PWAInstallButton from "@/components/PWAInstallButton";
import AdminLoginModal from "@/components/AdminLoginModal";
import AdminSettingsPanel from "@/components/AdminSettingsPanel";
import ContactModal from "@/components/ContactModal";
import {
  loadAdminConfig,
  saveAdminConfig,
  DEFAULT_ADMIN_CONFIG,
  trackVisitorIncrement,
} from "@/lib/adminConfig";
import { playSoftClick, playHoverTone, playPresetSound } from "@/lib/soundEngine";

export default function App() {
  const [state, setState] = useState(createInitialWorkspaceState);
  const [theme, setTheme] = useState("dark"); // "dark" (Emerald Marble) or "light" (Pearl Ivory)
  const [adminConfig, setAdminConfig] = useState(loadAdminConfig);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const isLight = theme === "light";

  // Track visitor counters on mount
  useEffect(() => {
    const updated = trackVisitorIncrement();
    setAdminConfig((prev) => ({
      ...prev,
      analytics: updated,
    }));
  }, []);

  // Sync SEO meta tags dynamically with adminConfig.seo
  useEffect(() => {
    if (typeof document !== "undefined" && adminConfig.seo) {
      if (adminConfig.seo.title) {
        document.title = adminConfig.seo.title;
      }
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement("meta");
        descMeta.setAttribute("name", "description");
        document.head.appendChild(descMeta);
      }
      if (adminConfig.seo.description) {
        descMeta.setAttribute("content", adminConfig.seo.description);
      }

      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta && adminConfig.seo.keywords) {
        keywordsMeta = document.createElement("meta");
        keywordsMeta.setAttribute("name", "keywords");
        document.head.appendChild(keywordsMeta);
      }
      if (keywordsMeta && adminConfig.seo.keywords) {
        keywordsMeta.setAttribute("content", adminConfig.seo.keywords);
      }
    }
  }, [adminConfig.seo]);

  const handleSaveAdminConfig = (newConfig) => {
    setAdminConfig(newConfig);
    saveAdminConfig(newConfig);
  };

  const handleResetAdminDefaults = () => {
    setAdminConfig(DEFAULT_ADMIN_CONFIG);
    saveAdminConfig(DEFAULT_ADMIN_CONFIG);
    resetToDefault();
    playPresetSound("crystal-bell");
  };

  const setDimensionsParam = (key, value) => {
    setState((prev) => {
      const activeId = prev.activeElement;
      const nextDimensions = { ...prev.dimensions, [key]: value };
      const nextGlobal = {
        ...prev.globalParams,
        borderRadius: key === "borderRadius" ? value : prev.globalParams?.borderRadius,
      };

      return {
        ...prev,
        dimensions: nextDimensions,
        globalParams: nextGlobal,
        ...(activeId === "card"
          ? {
              cardParams: {
                ...prev.cardParams,
                padding: key === "padding" ? value : prev.cardParams?.padding,
              },
            }
          : {}),
        effectState: {
          ...prev.effectState,
          [activeId]: {
            ...prev.effectState?.[activeId],
            dimensions: nextDimensions,
            globalParams: nextGlobal,
          },
        },
      };
    });
  };

  const setLightingParam = (key, value) => {
    setState((prev) => {
      const activeId = prev.activeElement;
      const nextLighting = { ...prev.lighting, [key]: value };
      const nextGlobal = {
        ...prev.globalParams,
        mainColor: key === "colorStop1" ? value : prev.globalParams?.mainColor,
        color: key === "colorStop1" ? value : prev.globalParams?.color,
        accentColor: key === "glowColor" ? value : prev.globalParams?.accentColor,
        bevelDepth: key === "bevelDepth" ? value : prev.globalParams?.bevelDepth,
      };

      return {
        ...prev,
        lighting: nextLighting,
        globalParams: nextGlobal,
        effectState: {
          ...prev.effectState,
          [activeId]: {
            ...prev.effectState?.[activeId],
            lighting: nextLighting,
            globalParams: nextGlobal,
          },
        },
      };
    });
  };

  const setTypographyParam = (key, value) => {
    setState((prev) => {
      const activeId = prev.activeElement;
      const nextTypography = { ...prev.typography, [key]: value };
      const nextGlobal = {
        ...prev.globalParams,
        fontSize: key === "descSize" ? value : prev.globalParams?.fontSize,
        textColor: key === "descColor" ? value : prev.globalParams?.textColor,
      };

      return {
        ...prev,
        typography: nextTypography,
        globalParams: nextGlobal,
        ...(activeId === "card"
          ? {
              cardParams: {
                ...prev.cardParams,
                title: key === "titleText" ? value : prev.cardParams?.title,
                description: key === "descText" ? value : prev.cardParams?.description,
              },
            }
          : {}),
        effectState: {
          ...prev.effectState,
          [activeId]: {
            ...prev.effectState?.[activeId],
            typography: nextTypography,
            globalParams: nextGlobal,
          },
        },
      };
    });
  };

  const setAnimationsParam = (key, value) => {
    setState((prev) => {
      const activeId = prev.activeElement;
      const nextAnimations = { ...prev.animations, [key]: value };
      const nextGlobal = {
        ...prev.globalParams,
        soundPreset: key === "soundPreset" ? value : prev.globalParams?.soundPreset,
      };

      return {
        ...prev,
        animations: nextAnimations,
        soundPreset: key === "soundPreset" ? value : prev.soundPreset,
        globalParams: nextGlobal,
        effectState: {
          ...prev.effectState,
          [activeId]: {
            ...prev.effectState?.[activeId],
            animations: nextAnimations,
            globalParams: nextGlobal,
          },
        },
      };
    });
  };

  const setMediaParam = (key, value) => {
    setState((prev) => {
      const activeId = prev.activeElement;
      const nextMedia = { ...prev.media, [key]: value };
      const nextBranding = { ...prev.branding, [key]: value };

      // Synchronize Logo controls across state namespaces
      if (key === "logoWidth") {
        nextMedia.logoWidth = value;
        nextBranding.logoWidth = value;
      }
      if (key === "logoHeight") {
        nextMedia.logoHeight = value;
        nextBranding.logoHeight = value;
      }
      if (key === "logoObjectFit") {
        nextMedia.logoObjectFit = value;
        nextBranding.logoObjectFit = value;
      }
      if (key === "isLogoAspectLocked" || key === "logoKeepAspect") {
        nextMedia.isLogoAspectLocked = Boolean(value);
        nextMedia.logoKeepAspect = Boolean(value);
        nextBranding.isLogoAspectLocked = Boolean(value);
      }

      // Synchronize Hero Image controls across state namespaces
      if (key === "heroBgUrl" || key === "heroBgImage") {
        nextMedia.heroBgUrl = value;
        nextMedia.heroBgImage = value;
      }
      if (key === "heroBgWidth" || key === "imageWidth") {
        nextMedia.heroBgWidth = value;
        nextMedia.imageWidth = value;
        nextBranding.imgWidth = value;
      }
      if (key === "heroBgHeight" || key === "imageHeight") {
        nextMedia.heroBgHeight = value;
        nextMedia.imageHeight = value;
        nextBranding.imgHeight = value;
      }
      if (key === "heroBgObjectFit") {
        nextMedia.heroBgObjectFit = value;
      }
      if (key === "isHeroAspectLocked") {
        nextMedia.isHeroAspectLocked = Boolean(value);
      }

      // Synchronize 3D Carousel controls across state namespaces
      if (key === "carouselImgWidth") {
        nextMedia.carouselImgWidth = value;
      }
      if (key === "carouselImgHeight") {
        nextMedia.carouselImgHeight = value;
      }
      if (key === "carouselObjectFit") {
        nextMedia.carouselObjectFit = value;
      }
      if (key === "isCarouselAspectLocked") {
        nextMedia.isCarouselAspectLocked = Boolean(value);
      }

      // Synchronize Compound Card controls across state namespaces
      if (key === "imgWidth" || key === "imageWidth") {
        nextBranding.imgWidth = value;
        nextMedia.imageWidth = value;
        nextMedia.imgWidth = value;
      }
      if (key === "imgHeight" || key === "imageHeight") {
        nextBranding.imgHeight = value;
        nextMedia.imageHeight = value;
        nextMedia.imgHeight = value;
      }
      if (key === "objectFit") {
        nextBranding.objectFit = value;
        nextMedia.objectFit = value;
      }

      return {
        ...prev,
        media: nextMedia,
        branding: nextBranding,
        effectState: {
          ...prev.effectState,
          [activeId]: {
            ...prev.effectState?.[activeId],
            media: nextMedia,
            branding: nextBranding,
          },
        },
      };
    });
  };

  const setGlobalParam = (key, value) => {
    setState((prev) => {
      const activeId = prev.activeElement;
      const nextGlobal = { ...prev.globalParams, [key]: value };
      const nextDim = {
        ...prev.dimensions,
        borderRadius: key === "borderRadius" ? value : prev.dimensions?.borderRadius,
      };
      const nextLight = {
        ...prev.lighting,
        bevelDepth: key === "bevelDepth" ? value : prev.lighting?.bevelDepth,
      };

      return {
        ...prev,
        globalParams: nextGlobal,
        dimensions: nextDim,
        lighting: nextLight,
        effectState: {
          ...prev.effectState,
          [activeId]: {
            ...prev.effectState?.[activeId],
            globalParams: nextGlobal,
            dimensions: nextDim,
            lighting: nextLight,
          },
        },
      };
    });
  };

  const setElementParam = (elementId, key, value) => {
    setState((prev) => {
      const targetParamKey = `${elementId}Params`;
      const prevElementParams = prev[targetParamKey] || {};
      const nextParams = { ...prevElementParams, [key]: value };

      return {
        ...prev,
        [targetParamKey]: nextParams,
        elementParams: {
          ...prev.elementParams,
          [elementId]: {
            ...prev.elementParams?.[elementId],
            [key]: value,
          },
        },
      };
    });
  };

  const handleSelectElement = (newElementId) => {
    setState((prev) => {
      if (prev.activeElement === newElementId) return prev;
      const currentActiveId = prev.activeElement;

      // Save current active element state to effectState
      const updatedEffectState = {
        ...prev.effectState,
        [currentActiveId]: {
          ...prev.effectState?.[currentActiveId],
          dimensions: { ...prev.dimensions },
          lighting: { ...prev.lighting },
          typography: { ...prev.typography },
          animations: { ...prev.animations },
          media: { ...prev.media },
          globalParams: { ...prev.globalParams },
          ...(prev.branding ? { branding: { ...prev.branding } } : {}),
        },
      };

      // Check if newElementId already has state in effectState
      const targetState = updatedEffectState[newElementId];
      if (targetState) {
        return {
          ...prev,
          activeElement: newElementId,
          effectState: updatedEffectState,
          dimensions: { ...targetState.dimensions },
          lighting: { ...targetState.lighting },
          typography: { ...targetState.typography },
          animations: { ...targetState.animations },
          media: { ...targetState.media },
          globalParams: { ...targetState.globalParams },
          ...(targetState.branding ? { branding: { ...targetState.branding } } : {}),
        };
      }

      // If newElementId not yet initialized in effectState, initialize isolated copy
      const defaultWidth = newElementId === "split-hero-banner" || newElementId.startsWith("hero-") ? 1100 : (prev.dimensions.width || 360);
      const defaultHeight = newElementId === "split-hero-banner" || newElementId.startsWith("hero-") ? 480 : (prev.dimensions.height || "auto");
      
      const newIsolatedState = {
        dimensions: {
          ...prev.dimensions,
          width: defaultWidth,
          height: defaultHeight,
        },
        lighting: { ...prev.lighting },
        typography: { ...prev.typography },
        animations: { ...prev.animations },
        media: { ...prev.media },
        globalParams: { ...prev.globalParams },
      };

      return {
        ...prev,
        activeElement: newElementId,
        dimensions: newIsolatedState.dimensions,
        lighting: newIsolatedState.lighting,
        typography: newIsolatedState.typography,
        animations: newIsolatedState.animations,
        media: newIsolatedState.media,
        globalParams: newIsolatedState.globalParams,
        effectState: {
          ...updatedEffectState,
          [newElementId]: newIsolatedState,
        },
      };
    });
  };

  const resetToDefault = () => setState(createInitialWorkspaceState());
  const selectedElement = ELEMENTS_CONFIG.find((element) => element.id === state.activeElement);
  const generatedCode = useMemo(() => generateElementCode(state.activeElement, state), [state]);

  // Compute Heading Gradient / Style based on admin settings
  const mainTitleStyle = useMemo(() => {
    const grad = adminConfig.header?.mainTitleGradient || "gold";
    if (grad === "custom") {
      return {
        color: adminConfig.header?.mainTitleCustomColor || "#fff7d6",
        fontSize: `${adminConfig.header?.mainTitleSize || 22}px`,
        fontWeight: adminConfig.header?.mainTitleWeight || "800",
      };
    }
    return {
      fontSize: `${adminConfig.header?.mainTitleSize || 22}px`,
      fontWeight: adminConfig.header?.mainTitleWeight || "800",
    };
  }, [adminConfig.header]);

  const mainTitleClass = useMemo(() => {
    const grad = adminConfig.header?.mainTitleGradient || "gold";
    if (grad === "emerald") {
      return "bg-gradient-to-r from-[#70e6bb] via-[#34d399] to-[#059669] bg-clip-text text-transparent drop-shadow-sm";
    }
    if (grad === "purple") {
      return "bg-gradient-to-r from-[#e9d5ff] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent drop-shadow-sm";
    }
    if (grad === "custom") {
      return "";
    }
    return "text-gold-emboss";
  }, [adminConfig.header]);

  return (
    <div
      dir="rtl"
      className={`isolate relative min-h-screen px-4 py-5 font-sans sm:px-6 lg:px-8 transition-colors duration-500 ${
        isLight
          ? "app-theme-light bg-ivory-marble-texture text-[#2b2114]"
          : "app-theme-dark bg-emerald-marble-texture text-[#eae5d9]"
      }`}
    >
      {/* Isolated background decorations with luxury marble lighting */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-75"
          style={{
            backgroundImage: isLight
              ? "radial-gradient(ellipse at 50% 0%, rgba(20,95,70,.25), transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(120,40,110,.15), transparent 45%), radial-gradient(ellipse at 10% 95%, rgba(212,175,55,.15), transparent 35%), repeating-linear-gradient(135deg, transparent 0 140px, rgba(212,175,55,.025) 141px, transparent 142px)"
              : "radial-gradient(ellipse at 50% 0%, rgba(13,90,65,.35), transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(90,20,95,.22), transparent 45%), radial-gradient(ellipse at 10% 95%, rgba(212,175,55,.12), transparent 35%), repeating-linear-gradient(135deg, transparent 0 140px, rgba(212,175,55,.018) 141px, transparent 142px)",
          }}
        />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#4a154b]/20 blur-[130px]" />
        <div className="absolute -left-28 bottom-10 h-80 w-80 rounded-full bg-[#0d5940]/25 blur-[120px]" />
      </div>

      {/* Header with Luxury Brand Lockup and Dynamic Bindings */}
      <header
        className={`relative mx-auto mb-6 flex max-w-[1800px] flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between transition-colors ${
          isLight ? "border-[#d4af37]/45" : "border-[#d4af37]/30"
        }`}
      >
        <div className="flex min-w-0 items-center gap-4">
          {/* Logo with dynamic sizing & fit */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#d4af37]/30 via-[#70e6bb]/20 to-[#9d4edd]/30 blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />
            <div
              style={{
                width: `${adminConfig.logo?.width || 160}px`,
                height: `${adminConfig.logo?.height || 80}px`,
              }}
              className="relative flex items-center justify-center transition-all duration-300"
            >
              <img
                src={adminConfig.logo?.url || "/brand/beso-studio-ui.png"}
                alt="Beso Studio UI"
                style={{
                  objectFit: adminConfig.logo?.objectFit || "contain",
                }}
                className={`w-full h-full shrink-0 ${
                  adminConfig.logo?.dropShadow !== false
                    ? "drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* Dynamic Header Texts */}
          <div className={`min-w-0 border-r pr-4 ${isLight ? "border-[#d4af37]/40" : "border-[#d4af37]/30"}`}>
            {/* Center Tag Badge */}
            <span
              style={{
                backgroundColor: adminConfig.header?.badgeBgColor || "#072118",
                color: adminConfig.header?.badgeTextColor || "#f5d77f",
                borderColor: adminConfig.header?.badgeBorderColor || "#d4af37",
              }}
              className="mb-1.5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[.18em] shadow-sm transition-all"
            >
              {adminConfig.header?.badgePulseVisible !== false && (
                <span className="h-2 w-2 rounded-full bg-[#70e6bb] shadow-[0_0_10px_#70e6bb]" />
              )}
              {adminConfig.header?.badgeText || "BESO STUDIO UI · أسلوبك الخاص"}
            </span>

            {/* Main Title */}
            <h1 className="tracking-wide font-serif transition-all" style={mainTitleStyle}>
              <span className={mainTitleClass}>{adminConfig.header?.mainTitle}</span>
            </h1>

            {/* Sub-heading Text */}
            <p
              style={{
                color: adminConfig.header?.subTitleColor || "#b3c5bb",
                opacity: (adminConfig.header?.subTitleOpacity ?? 90) / 100,
              }}
              className="mt-1 text-[11px] leading-relaxed transition-all"
            >
              {adminConfig.header?.subTitle}
            </p>
          </div>
        </div>

        {/* Top Header Actions & Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
          {/* Left Text Typography Badge (if enabled) */}
          {adminConfig.header?.leftTextVisible !== false && (
            <div
              style={{
                color: adminConfig.header?.leftTextColor || "#d4af37",
                fontSize: `${adminConfig.header?.leftTextSize || 11}px`,
              }}
              className="hidden 2xl:flex flex-col text-left font-serif leading-tight tracking-wider pl-2 whitespace-pre-line"
            >
              {adminConfig.header?.leftText || "Design\nBeautiful\nButtons."}
            </div>
          )}

          {/* Theme Mode Toggle (Light vs Dark) */}
          <ThemeToggle theme={theme} onToggle={setTheme} />

          {/* Sound FX Toggle */}
          <SoundToggle />

          {/* PWA Native Installation Button */}
          <PWAInstallButton theme={theme} />

          {/* Contact Us Button */}
          <button
            type="button"
            onClick={() => {
              playSoftClick();
              setIsContactModalOpen(true);
            }}
            onMouseEnter={playHoverTone}
            title="تواصل مع إدارة وتطوير الاستوديو"
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold shadow-md transition cursor-pointer ${
              isLight
                ? "border-[#d4af37]/60 bg-white/80 text-[#5c4a35] hover:border-[#bfa143] hover:text-[#2b1f09]"
                : "border-sky-500/40 bg-sky-950/40 text-sky-300 hover:border-sky-400 hover:bg-sky-900/50"
            }`}
          >
            <span>✉️</span>
            <span>تواصل معنا</span>
          </button>

          {/* Enterprise Admin Suite Button */}
          <button
            type="button"
            onClick={() => {
              playSoftClick();
              if (isAdminLoggedIn) {
                setIsAdminPanelOpen(true);
              } else {
                setIsLoginModalOpen(true);
              }
            }}
            onMouseEnter={playHoverTone}
            title={isAdminLoggedIn ? "فتح لوحة الإدارة الشاملة" : "تسجيل دخول الإدارة (Admin Login)"}
            className={`group flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition shadow-md cursor-pointer ${
              isAdminLoggedIn
                ? "border-[#d4af37] bg-[linear-gradient(145deg,#244d37,#0d251a)] text-[#f5df93] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                : isLight
                ? "border-[#d4af37]/60 bg-white text-[#785b14] hover:border-[#bfa143]"
                : "border-[#d4af37]/40 bg-[linear-gradient(145deg,#122b20,#081711)] text-[#f5df93] hover:border-[#f0d779]"
            }`}
          >
            <span className={isAdminLoggedIn ? "text-emerald-400 animate-spin" : ""}>
              {isAdminLoggedIn ? "⚙️" : "🔐"}
            </span>
            <span>{isAdminLoggedIn ? "لوحة الإدارة" : "دخول الإدارة"}</span>
            {isAdminLoggedIn && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            )}
          </button>

          {/* Reset Workspace Button */}
          <button
            type="button"
            onClick={() => {
              playSoftClick();
              resetToDefault();
            }}
            className={`group shrink-0 rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-md transition cursor-pointer ${
              isLight
                ? "border-[#bfa143] bg-[linear-gradient(145deg,#ffffff,#f3e8d2)] text-[#57401c] hover:border-[#8c6d1f] hover:text-[#2b1f09]"
                : "border-[#d4af37]/40 bg-[linear-gradient(145deg,rgba(40,55,42,.95),rgba(10,24,18,.98))] text-[#f3ead6] hover:border-[#f0d779] hover:shadow-[0_0_20px_rgba(212,175,55,.25)]"
            }`}
          >
            <span className="ml-1.5 text-[#d4af37] transition group-hover:rotate-[-35deg]">⟲</span>
            إعادة ضبط
          </button>
        </div>
      </header>

      {/* Main Studio Grid Layout: Sticky Split Preview & Code Panel */}
      <main className="relative mx-auto grid max-w-[1800px] grid-cols-1 items-start gap-6 lg:grid-cols-12 xl:gap-8">
        
        {/* RIGHT COLUMN: Scrollable Controls Panel (5 Columns on Desktop) */}
        <section className="space-y-4 lg:col-span-5" aria-label="اختيار العنصر وإعدادات الخامات">
          <ElementSelector
            elements={ELEMENTS_CONFIG}
            activeElementId={state.activeElement}
            onSelectElement={handleSelectElement}
            theme={theme}
          />

          <ParamsEditor
            activeElement={state.activeElement}
            activeEffect={selectedElement}
            dimensions={state.dimensions}
            onDimensionsChange={setDimensionsParam}
            lighting={state.lighting}
            onLightingChange={setLightingParam}
            typography={state.typography}
            onTypographyChange={setTypographyParam}
            animations={state.animations}
            onAnimationsChange={setAnimationsParam}
            media={state.media}
            onMediaChange={setMediaParam}
            globalParams={state.globalParams}
            onGlobalChange={setGlobalParam}
            cardParams={state.cardParams}
            inputParams={state.inputParams}
            badgeParams={state.badgeParams}
            buttonParams={state.buttonParams}
            onElementParamChange={setElementParam}
            onReset={resetToDefault}
            theme={theme}
          />
        </section>

        {/* LEFT COLUMN: STICKY Preview Canvas & Code Viewport (7 Columns on Desktop) */}
        <section
          className="lg:col-span-7 space-y-6 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto pr-1 custom-scrollbar z-10"
          aria-label="مسرح المعاينة المباشرة وشفرة الكود"
        >
          {/* Live Render Preview Canvas Stage with Luxury HD Frame */}
          <div
            className={`relative rounded-[26px] p-[1.5px] shadow-[0_20px_50px_rgba(0,0,0,0.65)] ${
              isLight
                ? "bg-gradient-to-b from-[#d4af37]/80 via-[#fbf8f2] to-[#d4af37]/40"
                : "bg-gradient-to-b from-[#d4af37]/60 via-[#0d5940]/40 to-[#d4af37]/20"
            }`}
          >
            <div
              className={`rounded-[24px] p-4 backdrop-blur-xl ${
                isLight ? "bg-[#041a12]/90" : "bg-[#02140e]/95"
              }`}
            >
              <LivePreview
                generatedCode={generatedCode}
                elementLabel={selectedElement?.label}
                soundPreset={state.animations?.soundPreset || state.soundPreset || "soft-click"}
                theme={theme}
                hdEnabledDefault={adminConfig.canvas?.hdResolutionEnabled !== false}
                media={state.media}
              />
            </div>
          </div>

          {/* Live Generated Code Snippet Output Container with Luxury Frame */}
          <div
            className={`relative rounded-[26px] p-[1.5px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] ${
              isLight
                ? "bg-gradient-to-b from-[#d4af37]/60 via-white/40 to-[#d4af37]/30"
                : "bg-gradient-to-b from-[#d4af37]/40 via-white/10 to-[#d4af37]/20"
            }`}
          >
            <div
              className={`rounded-[24px] p-4 backdrop-blur-xl ${
                isLight ? "bg-[#fcf9f2]/95" : "bg-[#020b08]/95"
              }`}
            >
              <CodePreview generatedCode={generatedCode} theme={theme} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Designer Signature, Rights Branding & Real-time Traffic Counters */}
      <footer
        className={`relative mx-auto mt-8 max-w-[1800px] border-t pt-5 pb-3 transition-colors ${
          isLight ? "border-[#d4af37]/25 text-[#4a3928]" : "border-[#d4af37]/15 text-[#9cac9f]"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          {/* Designer Signature Link */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="font-semibold">
              {adminConfig.branding?.licenseText || "كافة الحقوق محفوظة © Beso Studio UI"}
            </span>
            <span>·</span>
            <a
              href={adminConfig.branding?.designerUrl || "https://github.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#d4af37] transition hover:text-[#fff8e7] hover:underline"
            >
              <span>{adminConfig.branding?.designerSignature || "تصميم وتطوير: أمان للتطوير الرقمي"}</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Real-time Visitor & Analytics Counters */}
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>الزوار: {(adminConfig.analytics?.visitorCount || 1420).toLocaleString()}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-black/40 px-3 py-1 text-[#f5df93]">
              <span>المشاهدات: {(adminConfig.analytics?.pageViews || 3890).toLocaleString()}</span>
            </span>
          </div>

          {/* Quick Social Suite Icons */}
          <div className="flex items-center gap-2">
            {adminConfig.social?.whatsapp && (
              <a
                href={`https://wa.me/${adminConfig.social.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                title="واتساب"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-emerald-400 hover:scale-110 hover:border-emerald-400 transition"
              >
                💬
              </a>
            )}
            {adminConfig.social?.telegram && (
              <a
                href={
                  adminConfig.social.telegram.startsWith("http")
                    ? adminConfig.social.telegram
                    : `https://t.me/${adminConfig.social.telegram.replace("@", "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                title="تليجرام"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-sky-400 hover:scale-110 hover:border-sky-400 transition"
              >
                ✈️
              </a>
            )}
            {adminConfig.social?.twitter && (
              <a
                href={adminConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="منصة X"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-slate-300 hover:scale-110 hover:border-[#d4af37] transition"
              >
                𝕏
              </a>
            )}
            {adminConfig.social?.github && (
              <a
                href={adminConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-slate-300 hover:scale-110 hover:border-[#d4af37] transition"
              >
                🐙
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentSecurity={adminConfig.security}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Admin Settings Fullscreen Panel */}
      <AdminSettingsPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        adminConfig={adminConfig}
        onSaveConfig={handleSaveAdminConfig}
        onResetDefaults={handleResetAdminDefaults}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          setIsAdminPanelOpen(false);
        }}
        theme={theme}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        social={adminConfig.social}
        contact={adminConfig.contact}
        theme={theme}
      />
    </div>
  );
}

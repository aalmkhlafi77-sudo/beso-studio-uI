// src/components/inspector/BrandIdentityDeck.jsx
import React from "react";
import { MATERIAL_SURFACES } from "@/data/effects";
import { UniversalTypographyDeck } from "./UniversalTypographyDeck";
import { UniversalMediaDeck } from "./UniversalMediaDeck";

export function BrandIdentityDeck({
  activeTab,
  media = {},
  onMediaChange,
  lighting = {},
  onLightingChange,
  globalParams = {},
  onGlobalChange,
  typography = {},
  onTypographyChange,
  theme = "dark",
}) {
  const isLight = theme === "light";
  const titleColor = isLight ? "text-[#4a2e12] font-bold" : "text-[#f5d77f] font-bold";
  const labelAccent = isLight ? "text-[#165a40] font-bold" : "text-[#34d399] font-medium";
  const helperText = isLight ? "text-[#165a40]" : "text-[#34d399]";
  const inputClass = isLight
    ? "border-[#c99e32]/40 bg-[#fbf9f4] text-[#2c1d0c] placeholder:text-[#165a40]/60 focus:border-[#0e5a3e]"
    : "border-white/15 bg-black/50 text-white placeholder:text-emerald-300/40 focus:border-[#d4af37]";

  // Tab 1: [ 📝 نصوص الهوية ]
  if (activeTab === "typography") {
    return (
      <UniversalTypographyDeck
        typography={typography}
        onTypographyChange={onTypographyChange}
        theme={theme}
        availableTargets={["title", "desc"]}
      />
    );
  }

  // Tab 2: [ 🎨 ألوان الهوية ]
  if (activeTab === "brand_colors") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🎨</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>ألوان الهوية واللوحة الأساسية (Brand Palette)</h4>
            <p className={`text-[10px] ${helperText}`}>تخصيص اللون الأساسي واللون الثانوي ولون الإضاءة والتوهج</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className={`block text-xs ${labelAccent}`}>اللون الأساسي (Primary Color)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={lighting.colorStop1 || globalParams.mainColor || "#0d3b2e"}
              onChange={(e) => onLightingChange?.("colorStop1", e.target.value)}
              className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={lighting.colorStop1 || globalParams.mainColor || "#0d3b2e"}
              onChange={(e) => onLightingChange?.("colorStop1", e.target.value)}
              className={`flex-1 rounded-xl border px-3 py-1.5 text-xs font-mono outline-none ${inputClass}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={`block text-xs ${labelAccent}`}>اللون الثانوي (Secondary Color)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={lighting.colorStop2 || "#16157f"}
              onChange={(e) => onLightingChange?.("colorStop2", e.target.value)}
              className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={lighting.colorStop2 || "#16157f"}
              onChange={(e) => onLightingChange?.("colorStop2", e.target.value)}
              className={`flex-1 rounded-xl border px-3 py-1.5 text-xs font-mono outline-none ${inputClass}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={`block text-xs ${labelAccent}`}>لون الإضاءة واللهب (Accent Glow Color)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={lighting.glowColor || "#d4af37"}
              onChange={(e) => onLightingChange?.("glowColor", e.target.value)}
              className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={lighting.glowColor || "#d4af37"}
              onChange={(e) => onLightingChange?.("glowColor", e.target.value)}
              className={`flex-1 rounded-xl border px-3 py-1.5 text-xs font-mono outline-none ${inputClass}`}
            />
          </div>
        </div>
      </div>
    );
  }

  // Tab 3: [ 💎 الخامات والأسطح ]
  if (activeTab === "materials") {
    const currentSurface = globalParams.surfaceStyle || "glass";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">💎</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>الخامات المادية والأسطح (Material Surface)</h4>
            <p className={`text-[10px] ${helperText}`}>اختيار الطراز المادي (زجاجي، معدني، عاجي، نيون، عادي)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {MATERIAL_SURFACES.map((surface) => {
            const isSelected = currentSurface === surface.id;
            return (
              <button
                key={surface.id}
                type="button"
                onClick={() => onGlobalChange?.("surfaceStyle", surface.id)}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center transition cursor-pointer border ${
                  isSelected
                    ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] shadow-md"
                    : "border-white/10 bg-black/30 hover:border-white/20 text-slate-300"
                }`}
              >
                <span className="text-xl mb-1">{surface.glyph || "✧"}</span>
                <span className="text-xs font-bold">{surface.label}</span>
                <span className="text-[9px] text-slate-400">{surface.subLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Tab 4: [ 🏷️ شعار العلامة ]
  if (activeTab === "logo_branding") {
    return (
      <UniversalMediaDeck
        title="شعار العلامة التجارية (Brand Logo)"
        subTitle="رفع الشعار وضبط الأبعاد الحرة (50-1200px) ونسبة الأبعاد المقفلة ونمط الاحتواء"
        imageUrl={media.logoUrl || ""}
        onImageUrlChange={(url) => onMediaChange?.("logoUrl", url)}
        width={media.logoWidth || 64}
        onWidthChange={(w) => onMediaChange?.("logoWidth", w)}
        height={media.logoHeight || 64}
        onHeightChange={(h) => onMediaChange?.("logoHeight", h)}
        aspectRatio={media.aspectRatio || "1:1"}
        onAspectRatioChange={(r) => onMediaChange?.("aspectRatio", r)}
        isAspectLocked={media.isLogoAspectLocked ?? media.logoKeepAspect ?? true}
        onAspectLockedChange={(l) => {
          onMediaChange?.("isLogoAspectLocked", l);
          onMediaChange?.("logoKeepAspect", l);
        }}
        objectFit={media.logoObjectFit || "contain"}
        onObjectFitChange={(f) => onMediaChange?.("logoObjectFit", f)}
        theme={theme}
      />
    );
  }

  return null;
}

// src/components/inspector/GeneralDeck.jsx
import React from "react";
import { MATERIAL_SURFACES } from "@/data/effects";
import { UniversalTypographyDeck } from "./UniversalTypographyDeck";
import { UniversalMediaDeck } from "./UniversalMediaDeck";
import { AdvancedEffectsDeck } from "./AdvancedEffectsDeck";

export function GeneralDeck({
  activeElement = "button",
  activeTab,
  dimensions = {},
  onDimensionsChange,
  lighting = {},
  onLightingChange,
  typography = {},
  onTypographyChange,
  animations = {},
  onAnimationsChange,
  media = {},
  onMediaChange,
  globalParams = {},
  onGlobalChange,
  cardParams = {},
  inputParams = {},
  badgeParams = {},
  buttonParams = {},
  onElementParamChange,
  theme = "dark",
}) {
  const isLight = theme === "light";
  const titleColor = isLight ? "text-[#4a2e12] font-bold" : "text-[#f5d77f] font-bold";
  const labelAccent = isLight ? "text-[#165a40] font-bold" : "text-[#34d399] font-medium";
  const helperText = isLight ? "text-[#165a40]" : "text-[#34d399]";
  const inputClass = isLight
    ? "border-[#c99e32]/40 bg-[#fbf9f4] text-[#2c1d0c] placeholder:text-[#165a40]/60 focus:border-[#0e5a3e]"
    : "border-white/15 bg-black/50 text-white placeholder:text-emerald-300/40 focus:border-[#d4af37]";

  // 1. Typography Deck (Universal)
  if (activeTab === "typography") {
    return (
      <UniversalTypographyDeck
        typography={typography}
        onTypographyChange={onTypographyChange}
        cardParams={cardParams}
        buttonParams={buttonParams}
        badgeParams={badgeParams}
        theme={theme}
        availableTargets={["title", "desc", "button", "badge"]}
      />
    );
  }

  // 2. Media Frame / Background Image / Hero Backdrop
  if (
    activeTab === "media_frame" ||
    activeTab === "background_image" ||
    activeTab === "hero_backdrop"
  ) {
    const isHero = activeTab === "hero_backdrop";
    const currentUrl = isHero ? (media.heroBgImage || media.heroBgUrl || "") : (media.customImgUrl || "");
    const handleUrlChange = (val) => {
      if (isHero) {
        onMediaChange?.("heroBgImage", val);
        onMediaChange?.("heroBgUrl", val);
      } else {
        onMediaChange?.("customImgUrl", val);
      }
    };

    return (
      <div className="space-y-4">
        <UniversalMediaDeck
          title={isHero ? "خلفية الهيرو والوسائط" : "إطار الصورة والوسائط المتعددة"}
          subTitle="تخصيص كامل للصورة، نسبة الأبعاد، الأبعاد الحرة، ونمط الاحتواء"
          imageUrl={currentUrl}
          onImageUrlChange={handleUrlChange}
          width={media.imageWidth || (isHero ? media.heroBgWidth : 360)}
          onWidthChange={(w) => {
            onMediaChange?.("imageWidth", w);
            if (isHero) onMediaChange?.("heroBgWidth", w);
          }}
          height={media.imageHeight || (isHero ? media.heroBgHeight : 200)}
          onHeightChange={(h) => {
            onMediaChange?.("imageHeight", h);
            if (isHero) onMediaChange?.("heroBgHeight", h);
          }}
          aspectRatio={media.aspectRatio || "16:9"}
          onAspectRatioChange={(r) => onMediaChange?.("aspectRatio", r)}
          isAspectLocked={media.isAspectLocked ?? true}
          onAspectLockedChange={(locked) => onMediaChange?.("isAspectLocked", locked)}
          objectFit={media.objectFit || "cover"}
          onObjectFitChange={(fit) => onMediaChange?.("objectFit", fit)}
          theme={theme}
        />

        {isHero && (
          <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
            <div className="flex items-center justify-between text-xs">
              <span className={labelAccent}>شفافية تعتيم الخلفية (Backdrop Opacity)</span>
              <span className="font-mono text-[#d4af37]">
                {Math.round((media.heroBgOverlayOpacity ?? 0.65) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={media.heroBgOverlayOpacity ?? 0.65}
              onChange={(e) => onMediaChange?.("heroBgOverlayOpacity", Number(e.target.value))}
              className="w-full accent-[#39b54a]"
            />
          </div>
        )}
      </div>
    );
  }

  // 3. Dimensions / Animations / Lighting -> Advanced Effects Suite
  if (activeTab === "dimensions" || activeTab === "animations" || activeTab === "lighting") {
    return (
      <AdvancedEffectsDeck
        dimensions={dimensions}
        onDimensionsChange={onDimensionsChange}
        lighting={lighting}
        onLightingChange={onLightingChange}
        animations={animations}
        onAnimationsChange={onAnimationsChange}
        theme={theme}
      />
    );
  }

  // 4. Materials
  if (activeTab === "materials") {
    const currentSurface = globalParams.surfaceStyle || "glass";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">💎</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>الخامات المادية (Material Surfaces)</h4>
            <p className={`text-[10px] ${helperText}`}>اختيار نمط السطح (زجاجي، معدني، عاجي، نيون، عادي)</p>
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

  // 5. Marquees
  if (activeTab === "marquees") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🔄</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>أشرطة الحركة المستمرة (Kinetic Marquees)</h4>
            <p className={`text-[10px] ${helperText}`}>سرعة الشريط واتجاه الدوران وعناصر الشريط</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>سرعة الحركة (Speed)</span>
            <span className="font-mono text-[#d4af37] font-bold">{media.marqueeSpeed ?? 16}s</span>
          </div>
          <input
            type="range"
            min={4}
            max={40}
            step={1}
            value={media.marqueeSpeed ?? 16}
            onChange={(e) => onMediaChange?.("marqueeSpeed", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>عناصر الشريط العلوي</label>
          <input
            type="text"
            value={media.marqueeItemsTop || ""}
            onChange={(e) => onMediaChange?.("marqueeItemsTop", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
          />
        </div>

        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>عناصر الشريط السفلي</label>
          <input
            type="text"
            value={media.marqueeItemsBottom || ""}
            onChange={(e) => onMediaChange?.("marqueeItemsBottom", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
          />
        </div>
      </div>
    );
  }

  // 6. Split Slider
  if (activeTab === "split_slider") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">⇄</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>سلايدر الأعمدة المزدوجة (Split Hero Slider)</h4>
            <p className={`text-[10px] ${helperText}`}>روابط صور العمودين الأيمن والأيسر</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className={`block text-xs ${labelAccent}`}>صورة العمود الأيمن الرئيسية</label>
          <input
            type="text"
            value={media.splitHeroRightImages?.[0] || ""}
            onChange={(e) => {
              const next = [...(media.splitHeroRightImages || [])];
              next[0] = e.target.value;
              onMediaChange?.("splitHeroRightImages", next);
            }}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
          />
        </div>

        <div className="space-y-2">
          <label className={`block text-xs ${labelAccent}`}>صورة العمود الأيسر الرئيسية</label>
          <input
            type="text"
            value={media.splitHeroLeftImages?.[0] || ""}
            onChange={(e) => {
              const next = [...(media.splitHeroLeftImages || [])];
              next[0] = e.target.value;
              onMediaChange?.("splitHeroLeftImages", next);
            }}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
          />
        </div>
      </div>
    );
  }

  // 7. Promo Slides
  if (activeTab === "promo_slides") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🏷️</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>شرائح العرض الترويجي (Super Promo 5-Slide)</h4>
            <p className={`text-[10px] ${helperText}`}>تخصيص نصوص وصور الشرائح الترويجية الخماسية</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>وسام العرض الرئيسي</label>
          <input
            type="text"
            value={media.promoBadgeTag ?? "Super September"}
            onChange={(e) => onMediaChange?.("promoBadgeTag", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
          />
        </div>

        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>عنوان العرض</label>
          <input
            type="text"
            value={media.promoTitle ?? "Save big with"}
            onChange={(e) => onMediaChange?.("promoTitle", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
          />
        </div>

        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>وصف العرض</label>
          <textarea
            rows={2}
            value={media.promoDesc ?? "تخفيضات موسمية حصرية على تشكيلة المعدات والملابس الخارجية."}
            onChange={(e) => onMediaChange?.("promoDesc", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition resize-none ${inputClass}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-black/20 text-xs text-slate-300">
      <p>إعدادات الخيار المحدد متاحة للتخصيص المباشر عبر المحرك السياقي.</p>
    </div>
  );
}

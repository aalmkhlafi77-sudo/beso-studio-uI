// src/components/inspector/UniversalMediaDeck.jsx
import React from "react";
import { playPresetSound } from "@/lib/soundEngine";

const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1 (مربع)" },
  { id: "16:9", label: "16:9 (عريض)" },
  { id: "4:3", label: "4:3 (قياسي)" },
  { id: "custom", label: "غير مرتبط (حر)" },
];

const OBJECT_FIT_OPTIONS = [
  { id: "cover", label: "تغطية (Cover)" },
  { id: "contain", label: "احتواء (Contain)" },
  { id: "fill", label: "تعبئة الحاوي (Fill)" },
  { id: "none", label: "بلا تغيير (None)" },
];

export function UniversalMediaDeck({
  title = "محرك التحكم الشامل بالوسائط والصور",
  subTitle = "تخصيص كامل للصور ونسبة الأبعاد والأبعاد الحرة مع خاصية رفع الصور",
  imageUrl = "",
  onImageUrlChange,
  width = 360,
  onWidthChange,
  height = 200,
  onHeightChange,
  aspectRatio = "16:9",
  onAspectRatioChange,
  isAspectLocked = true,
  onAspectLockedChange,
  objectFit = "cover",
  onObjectFitChange,
  theme = "dark",
}) {
  const isLight = theme === "light";
  const titleColor = isLight ? "text-[#4a2e12] font-bold" : "text-[#f5d77f] font-bold";
  const labelAccent = isLight ? "text-[#165a40] font-bold" : "text-[#34d399] font-medium";
  const helperText = isLight ? "text-[#165a40]" : "text-[#34d399]";
  const inputClass = isLight
    ? "border-[#c99e32]/40 bg-[#fbf9f4] text-[#2c1d0c] placeholder:text-[#165a40]/60 focus:border-[#0e5a3e]"
    : "border-white/15 bg-black/50 text-white placeholder:text-emerald-300/40 focus:border-[#d4af37]";

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        onImageUrlChange?.(base64);
        playPresetSound("water-drop");
      }
    };
    reader.readAsDataURL(file);
  };

  const getRatioVal = (ratioStr, w, h) => {
    if (ratioStr === "1:1") return 1;
    if (ratioStr === "16:9") return 16 / 9;
    if (ratioStr === "4:3") return 4 / 3;
    return w && h ? w / h : 16 / 9;
  };

  const handleWidthUpdate = (newW) => {
    const clampedW = Math.min(1200, Math.max(50, newW));
    onWidthChange?.(clampedW);
    if (isAspectLocked && aspectRatio !== "custom") {
      const ratio = getRatioVal(aspectRatio, clampedW, height);
      const newH = Math.min(1200, Math.max(50, Math.round(clampedW / ratio)));
      onHeightChange?.(newH);
    }
  };

  const handleHeightUpdate = (newH) => {
    const clampedH = Math.min(1200, Math.max(50, newH));
    onHeightChange?.(clampedH);
    if (isAspectLocked && aspectRatio !== "custom") {
      const ratio = getRatioVal(aspectRatio, width, clampedH);
      const newW = Math.min(1200, Math.max(50, Math.round(clampedH * ratio)));
      onWidthChange?.(newW);
    }
  };

  const handleSelectRatio = (preset) => {
    onAspectRatioChange?.(preset);
    if (preset !== "custom") {
      const ratio = preset === "1:1" ? 1 : preset === "16:9" ? 16 / 9 : 4 / 3;
      const newH = Math.min(1200, Math.max(50, Math.round((width || 360) / ratio)));
      onHeightChange?.(newH);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
        <span className="text-base">🖼️</span>
        <div>
          <h4 className={`text-xs ${titleColor}`}>{title}</h4>
          <p className={`text-[10px] ${helperText}`}>{subTitle}</p>
        </div>
      </div>

      {/* 1. Thumbnail Preview & URL / Upload */}
      <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
        <label className={`block text-xs ${labelAccent}`}>مصدر الصورة (Image Source & Upload)</label>
        
        {imageUrl ? (
          <div className="relative h-32 w-full overflow-hidden rounded-xl border border-[#d4af37]/30 bg-black/50">
            <img
              src={imageUrl}
              alt="Preview"
              style={{ objectFit: objectFit || "cover" }}
              className="h-full w-full"
            />
            <button
              type="button"
              onClick={() => onImageUrlChange?.("")}
              className="absolute top-2 left-2 rounded-lg bg-black/75 px-2 py-1 text-[10px] font-bold text-red-300 hover:bg-black transition cursor-pointer"
            >
              ✕ إزالة الصورة
            </button>
          </div>
        ) : (
          <div className="flex h-24 w-full items-center justify-center rounded-xl border border-dashed border-white/20 bg-black/30 text-xs text-slate-400">
            لا توجد صورة محددة (سيتم استخدام القالب الافتراضي)
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => onImageUrlChange?.(e.target.value)}
            placeholder="رابط الصورة المباشر (https://...)"
            className={`flex-1 rounded-xl border px-3 py-1.5 text-xs outline-none ${inputClass}`}
          />
          <label className="flex items-center justify-center gap-1.5 rounded-xl border border-[#d4af37] bg-[#d4af37]/20 px-3 py-1.5 text-xs font-bold text-[#f5df93] hover:bg-[#d4af37]/30 transition cursor-pointer shrink-0">
            <span>📁 رفع صورة</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* 2. Aspect Ratio Presets */}
      <div className="space-y-1.5">
        <label className={`block text-xs ${labelAccent}`}>نسبة الأبعاد المقفلة (Aspect Ratio Presets)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelectRatio(r.id)}
              className={`rounded-xl py-1.5 text-xs font-bold transition cursor-pointer border ${
                aspectRatio === r.id
                  ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] shadow-sm"
                  : "border-white/10 bg-black/30 text-slate-400 hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Width & Height Controls (50px to 1200px) */}
      <div className="space-y-3 p-3 rounded-xl border border-white/10 bg-black/20">
        <div className="flex items-center justify-between">
          <span className={`text-xs ${labelAccent}`}>الأبعاد الفيزيائية (Dimensions Controls)</span>
          <button
            type="button"
            onClick={() => onAspectLockedChange?.(!isAspectLocked)}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold border transition cursor-pointer ${
              isAspectLocked
                ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                : "border-white/15 bg-black/40 text-slate-400"
            }`}
          >
            <span>{isAspectLocked ? "🔒 نسبة مقفلة" : "🔓 أبعاد حرة"}</span>
          </button>
        </div>

        {/* Width Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>العرض (Width)</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleWidthUpdate(Number(width) - 10)}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                -
              </button>
              <span className="font-mono text-[#d4af37] font-bold min-w-[42px] text-center">{width}px</span>
              <button
                type="button"
                onClick={() => handleWidthUpdate(Number(width) + 10)}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <input
            type="range"
            min={50}
            max={1200}
            step={5}
            value={Number(width) || 360}
            onChange={(e) => handleWidthUpdate(Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Height Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>الارتفاع (Height)</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleHeightUpdate(Number(height) - 10)}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                -
              </button>
              <span className="font-mono text-[#d4af37] font-bold min-w-[42px] text-center">{height}px</span>
              <button
                type="button"
                onClick={() => handleHeightUpdate(Number(height) + 10)}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <input
            type="range"
            min={50}
            max={1200}
            step={5}
            value={Number(height) || 200}
            onChange={(e) => handleHeightUpdate(Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>
      </div>

      {/* 4. Object Fit Selector */}
      <div className="space-y-1.5">
        <label className={`block text-xs ${labelAccent}`}>نمط احتواء الصورة (Object Fit)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {OBJECT_FIT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onObjectFitChange?.(opt.id)}
              className={`rounded-xl py-1.5 text-xs font-bold transition cursor-pointer border ${
                objectFit === opt.id
                  ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] shadow-sm"
                  : "border-white/10 bg-black/30 text-slate-400 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

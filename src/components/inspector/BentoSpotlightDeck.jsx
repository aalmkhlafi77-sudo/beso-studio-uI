// src/components/inspector/BentoSpotlightDeck.jsx
import React from "react";
import { UniversalMediaDeck } from "./UniversalMediaDeck";

const FONT_WEIGHTS = [
  { val: 100, label: "Thin" },
  { val: 300, label: "Light" },
  { val: 400, label: "Regular" },
  { val: 500, label: "Medium" },
  { val: 600, label: "Semi-Bold" },
  { val: 700, label: "Bold" },
  { val: 800, label: "Extra-Bold" },
  { val: 900, label: "Black" },
];

const ALIGNMENTS = [
  { id: "right", label: "يمين", icon: "⇥" },
  { id: "center", label: "وسط", icon: "↔" },
  { id: "left", label: "يسار", icon: "⇤" },
  { id: "justify", label: "ضبط", icon: "≡" },
];

export function BentoSpotlightDeck({
  activeTab,
  media = {},
  onMediaChange,
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

  // Tab 1: [ 📝 النصوص والبيانات ]
  if (activeTab === "typography") {
    const titleSize = typography.titleSize ?? 24;
    const titleWeight = typography.titleWeight ?? 700;
    const titleAlign = typography.titleAlign ?? "right";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">📝</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>بيانات بطاقة بينتو (Bento Content & Step)</h4>
            <p className={`text-[10px] ${helperText}`}>تخصيص وسم الخطوة والتصنيف والعنوان والوصف التفصيلي وأبعاد الخط ومحاذاته</p>
          </div>
        </div>

        {/* Step Badge */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>رقم الخطوة (Step Badge)</label>
          <input
            type="text"
            value={media.bentoStep ?? "04"}
            onChange={(e) => onMediaChange?.("bentoStep", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="مثال: 04"
          />
        </div>

        {/* Category Tag */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>تصنيف المنهجية (Method Tag)</label>
          <input
            type="text"
            value={media.bentoCategory ?? "منهجية العمل"}
            onChange={(e) => onMediaChange?.("bentoCategory", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="مثال: منهجية العمل"
          />
        </div>

        {/* Bento Title */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>عنوان البطاقة (Bento Title)</label>
          <input
            type="text"
            value={media.bentoTitle ?? "التطوير"}
            onChange={(e) => {
              onMediaChange?.("bentoTitle", e.target.value);
              onTypographyChange?.("titleText", e.target.value);
            }}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="مثال: التطوير والتنفيذ"
          />
        </div>

        {/* Font Size Slider (10px to 120px) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>حجم خط العنوان (Font Size: 10px-120px)</span>
            <span className="font-mono text-[#d4af37] font-bold">{titleSize}px</span>
          </div>
          <input
            type="range"
            min={10}
            max={120}
            step={1}
            value={titleSize}
            onChange={(e) => onTypographyChange?.("titleSize", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Font Weight */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>وزن الخط (Font Weight)</span>
            <span className="font-mono text-[#d4af37] font-bold">{titleWeight}</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {FONT_WEIGHTS.map((w) => (
              <button
                key={w.val}
                type="button"
                onClick={() => onTypographyChange?.("titleWeight", w.val)}
                className={`rounded-lg py-1 text-[10px] transition cursor-pointer border ${
                  Number(titleWeight) === w.val
                    ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] font-bold"
                    : "border-white/10 bg-black/30 text-slate-400 hover:text-white"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Alignment */}
        <div className="space-y-1">
          <label className={`block text-xs ${labelAccent}`}>محاذاة النص (Alignment)</label>
          <div className="grid grid-cols-4 gap-1">
            {ALIGNMENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onTypographyChange?.("titleAlign", a.id)}
                className={`flex items-center justify-center gap-1 rounded-xl py-1.5 text-xs font-bold transition cursor-pointer border ${
                  titleAlign === a.id
                    ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93]"
                    : "border-white/10 bg-black/30 text-slate-400 hover:text-white"
                }`}
              >
                <span>{a.icon}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Description */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>الوصف التفصيلي (Bento Description)</label>
          <textarea
            rows={3}
            value={media.bentoDescription ?? "ننفذ بكود منظم، تكاملات آمنة، وقاعدة بيانات قابلة للتوسع مع المشروع."}
            onChange={(e) => {
              onMediaChange?.("bentoDescription", e.target.value);
              onTypographyChange?.("descText", e.target.value);
            }}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition resize-none ${inputClass}`}
            placeholder="اكتب وصف الخطوة والمنهجية..."
          />
        </div>
      </div>
    );
  }

  // Tab 2: [ ✨ توهج بينتو والضوء ]
  if (activeTab === "bento_glow") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">✨</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>توهج بينتو وفيزياء الماوس (Spotlight Glow Physics)</h4>
            <p className={`text-[10px] ${helperText}`}>التحكم بنصف قطر الإضاءة التفاعلية وشدة التوهج واللون الزمردي المتتبع للمؤشر</p>
          </div>
        </div>

        {/* Glow Radius */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>نصف قطر التوهج (Glow Radius)</span>
            <span className="font-mono text-[#d4af37] font-bold">{media.bentoGlowRadius ?? 280}px</span>
          </div>
          <input
            type="range"
            min={100}
            max={600}
            step={10}
            value={media.bentoGlowRadius ?? 280}
            onChange={(e) => onMediaChange?.("bentoGlowRadius", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Glow Intensity */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>شدة التوهج (Glow Intensity)</span>
            <span className="font-mono text-[#d4af37] font-bold">{media.bentoGlowIntensity ?? 0.85}</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1.0}
            step={0.05}
            value={media.bentoGlowIntensity ?? 0.85}
            onChange={(e) => onMediaChange?.("bentoGlowIntensity", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Glow Color */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>لون إضاءة التتبع (Spotlight Color)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={media.bentoGlowColor ?? "rgba(57, 181, 74, 0.35)"}
              onChange={(e) => onMediaChange?.("bentoGlowColor", e.target.value)}
              className={`flex-1 rounded-xl border px-3 py-2 text-xs font-mono outline-none ${inputClass}`}
              placeholder="rgba(57, 181, 74, 0.35)"
            />
          </div>
        </div>
      </div>
    );
  }

  // Tab 3: [ 🖼️ صورة الخلفية ]
  if (activeTab === "background_image") {
    return (
      <UniversalMediaDeck
        title="صورة خلفية بطاقة بينتو (Bento Background Image)"
        subTitle="رفع صورة خلفية فخمة مع تحكم كامل بنسبة الأبعاد والأبعاد الحرة (50-1200px) ونمط الاحتواء"
        imageUrl={media.bentoBgImage || ""}
        onImageUrlChange={(url) => onMediaChange?.("bentoBgImage", url)}
        width={media.imageWidth || 420}
        onWidthChange={(w) => onMediaChange?.("imageWidth", w)}
        height={media.imageHeight || 280}
        onHeightChange={(h) => onMediaChange?.("imageHeight", h)}
        aspectRatio={media.aspectRatio || "16:9"}
        onAspectRatioChange={(r) => onMediaChange?.("aspectRatio", r)}
        isAspectLocked={media.isAspectLocked ?? true}
        onAspectLockedChange={(l) => onMediaChange?.("isAspectLocked", l)}
        objectFit={media.objectFit || "cover"}
        onObjectFitChange={(f) => onMediaChange?.("objectFit", f)}
        theme={theme}
      />
    );
  }

  return null;
}

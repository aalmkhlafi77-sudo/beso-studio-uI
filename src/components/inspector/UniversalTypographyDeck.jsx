// src/components/inspector/UniversalTypographyDeck.jsx
import React, { useState } from "react";

const FONT_WEIGHTS = [
  { val: 100, label: "Thin (100)" },
  { val: 300, label: "Light (300)" },
  { val: 400, label: "Regular (400)" },
  { val: 500, label: "Medium (500)" },
  { val: 600, label: "Semi-Bold (600)" },
  { val: 700, label: "Bold (700)" },
  { val: 800, label: "Extra-Bold (800)" },
  { val: 900, label: "Black (900)" },
];

const ALIGNMENTS = [
  { id: "right", label: "يمين", icon: "⇥" },
  { id: "center", label: "وسط", icon: "↔" },
  { id: "left", label: "يسار", icon: "⇤" },
  { id: "justify", label: "ضبط", icon: "≡" },
];

const GRADIENT_PRESETS = [
  "linear-gradient(135deg, #fff8e7 0%, #d4af37 100%)",
  "linear-gradient(160deg, #4cd864 0%, #39b54a 50%, #2a8f38 100%)",
  "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
];

export function UniversalTypographyDeck({
  typography = {},
  onTypographyChange,
  cardParams = {},
  buttonParams = {},
  badgeParams = {},
  theme = "dark",
  availableTargets = ["title", "desc", "button", "badge"],
}) {
  const [target, setTarget] = useState("title");
  const isLight = theme === "light";
  const titleColor = isLight ? "text-[#4a2e12] font-bold" : "text-[#f5d77f] font-bold";
  const labelAccent = isLight ? "text-[#165a40] font-bold" : "text-[#34d399] font-medium";
  const helperText = isLight ? "text-[#165a40]" : "text-[#34d399]";
  const inputClass = isLight
    ? "border-[#c99e32]/40 bg-[#fbf9f4] text-[#2c1d0c] placeholder:text-[#165a40]/60 focus:border-[#0e5a3e]"
    : "border-white/15 bg-black/50 text-white placeholder:text-emerald-300/40 focus:border-[#d4af37]";

  const isTargetTitle = target === "title";
  const isTargetDesc = target === "desc";
  const isTargetBtn = target === "button";
  const isTargetBadge = target === "badge";

  // Current values based on active target
  const prefix = isTargetTitle ? "title" : isTargetDesc ? "desc" : isTargetBtn ? "button" : "badge";

  const currentText = isTargetTitle
    ? typography.titleText || cardParams.title || "بطاقة Beso الفاخرة"
    : isTargetDesc
    ? typography.descText || cardParams.description || "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي."
    : isTargetBtn
    ? typography.buttonText || buttonParams.text || "تفاعل ملموس ✦"
    : typography.badgeText || badgeParams.text || "عنصر فاخر VIP";

  const currentSize = typography[`${prefix}Size`] ?? (isTargetTitle ? 22 : isTargetDesc ? 14 : isTargetBtn ? 15 : 11);
  const currentWeight = Number(typography[`${prefix}Weight`] ?? (isTargetTitle ? 700 : isTargetDesc ? 400 : isTargetBtn ? 600 : 700));
  const currentColor = typography[`${prefix}Color`] || (isTargetDesc ? "#eae5d9" : "#fff8e7");
  const currentGradient = typography[`${prefix}Gradient`] || "";
  const currentAlign = typography[`${prefix}Align`] || (isTargetBtn || isTargetBadge ? "center" : "right");
  const currentShadowX = typography[`${prefix}ShadowX`] ?? 0;
  const currentShadowY = typography[`${prefix}ShadowY`] ?? (typography[`${prefix}ShadowDepth`] ?? 2);
  const currentShadowBlur = typography[`${prefix}ShadowBlur`] ?? 4;
  const currentShadowColor = typography[`${prefix}ShadowColor`] || "rgba(0, 0, 0, 0.65)";

  const handleUpdate = (fieldSuffix, val) => {
    onTypographyChange?.(`${prefix}${fieldSuffix}`, val);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
        <span className="text-base">✍️</span>
        <div>
          <h4 className={`text-xs ${titleColor}`}>منصة التحكم الشاملة بالنصوص والخطوط (Universal Typography)</h4>
          <p className={`text-[10px] ${helperText}`}>
            تخصيص كامل للنصوص، الحجم (10-120px)، الوزن (100-900)، الألوان، التدرجات، والظلال ومحاذاة النص
          </p>
        </div>
      </div>

      {/* Target Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-xl border border-white/10 bg-black/30">
        {availableTargets.map((tId) => {
          const labels = {
            title: "العنوان الرئيسي",
            desc: "الوصف والتفاصيل",
            button: "زر الإجراء",
            badge: "الشارة والوسم",
          };
          return (
            <button
              key={tId}
              type="button"
              onClick={() => setTarget(tId)}
              className={`rounded-lg py-1.5 text-center text-xs font-bold transition cursor-pointer ${
                target === tId
                  ? "border border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {labels[tId] || tId}
            </button>
          );
        })}
      </div>

      {/* 1. Text Content Input */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label className={labelAccent}>محتوى النص (Text Content)</label>
          <span className="text-[10px] text-slate-400">طبقة: {target}</span>
        </div>
        {isTargetDesc ? (
          <textarea
            rows={3}
            value={currentText}
            onChange={(e) => handleUpdate("Text", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition resize-none ${inputClass}`}
            placeholder="اكتب المحتوى النصي هنا..."
          />
        ) : (
          <input
            type="text"
            value={currentText}
            onChange={(e) => handleUpdate("Text", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="اكتب المحتوى النصي هنا..."
          />
        )}
      </div>

      {/* 2. Font Size Slider (10px to 120px) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className={labelAccent}>حجم الخط (Font Size)</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleUpdate("Size", Math.max(10, currentSize - 1))}
              className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
            >
              -
            </button>
            <span className="font-mono text-[#d4af37] font-bold min-w-[36px] text-center">{currentSize}px</span>
            <button
              type="button"
              onClick={() => handleUpdate("Size", Math.min(120, currentSize + 1))}
              className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
        <input
          type="range"
          min={10}
          max={120}
          step={1}
          value={currentSize}
          onChange={(e) => handleUpdate("Size", Number(e.target.value))}
          className="w-full accent-[#39b54a]"
        />
      </div>

      {/* 3. Font Weight Picker (100 to 900) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className={labelAccent}>وزن وسماكة الخط (Font Weight)</span>
          <span className="font-mono text-[#d4af37] font-bold">{currentWeight}</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {FONT_WEIGHTS.map((w) => (
            <button
              key={w.val}
              type="button"
              onClick={() => handleUpdate("Weight", w.val)}
              className={`rounded-lg py-1 text-[10px] transition cursor-pointer border ${
                currentWeight === w.val
                  ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] font-bold"
                  : "border-white/10 bg-black/30 text-slate-400 hover:text-white"
              }`}
            >
              {w.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Text Color & Gradient Picker */}
      <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
        <label className={`block text-xs ${labelAccent}`}>لون وتدرج النص (Color & Gradient)</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={currentColor.startsWith("#") ? currentColor : "#fff8e7"}
            onChange={(e) => {
              handleUpdate("Color", e.target.value);
              handleUpdate("Gradient", "");
            }}
            className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
          />
          <input
            type="text"
            value={currentGradient || currentColor}
            onChange={(e) => {
              const val = e.target.value;
              if (val.includes("gradient")) {
                handleUpdate("Gradient", val);
              } else {
                handleUpdate("Color", val);
                handleUpdate("Gradient", "");
              }
            }}
            placeholder="Hex/RGB أو linear-gradient..."
            className={`flex-1 rounded-xl border px-3 py-1.5 text-xs font-mono outline-none ${inputClass}`}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-1">
          {GRADIENT_PRESETS.map((grad, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleUpdate("Gradient", grad)}
              className="rounded-lg border border-white/10 p-1 text-[9px] font-bold text-white drop-shadow hover:border-[#d4af37] transition cursor-pointer truncate"
              style={{ background: grad }}
            >
              تدرج #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Text Shadow Controls (X, Y, Blur, Color) */}
      <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
        <div className="flex items-center justify-between text-xs">
          <span className={labelAccent}>تأثير ظل النص (Text Shadow)</span>
          <span className="font-mono text-[10px] text-slate-400">
            {currentShadowX}px {currentShadowY}px {currentShadowBlur}px
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] text-slate-400 mb-0.5">إزاحة X</label>
            <input
              type="range"
              min={-20}
              max={20}
              step={1}
              value={currentShadowX}
              onChange={(e) => handleUpdate("ShadowX", Number(e.target.value))}
              className="w-full accent-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 mb-0.5">إزاحة Y</label>
            <input
              type="range"
              min={-20}
              max={20}
              step={1}
              value={currentShadowY}
              onChange={(e) => {
                handleUpdate("ShadowY", Number(e.target.value));
                handleUpdate("ShadowDepth", Number(e.target.value));
              }}
              className="w-full accent-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 mb-0.5">الضبابية</label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={currentShadowBlur}
              onChange={(e) => handleUpdate("ShadowBlur", Number(e.target.value))}
              className="w-full accent-[#d4af37]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] text-slate-400">لون الظل:</span>
          <input
            type="text"
            value={currentShadowColor}
            onChange={(e) => handleUpdate("ShadowColor", e.target.value)}
            className={`flex-1 rounded-lg border px-2 py-1 text-[10px] font-mono outline-none ${inputClass}`}
          />
        </div>
      </div>

      {/* 6. Explicit Alignment Buttons */}
      <div className="space-y-1.5">
        <label className={`block text-xs ${labelAccent}`}>محاذاة النص (Text Align)</label>
        <div className="grid grid-cols-4 gap-1.5">
          {ALIGNMENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleUpdate("Align", a.id)}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold transition cursor-pointer border ${
                currentAlign === a.id
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
    </div>
  );
}

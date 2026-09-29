// src/components/inspector/SplitHeroDeck.jsx
import React from "react";
import { playPresetSound } from "@/lib/soundEngine";

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
];

const ASPECT_RATIOS = [
  { id: "custom", label: "حر (Custom)" },
  { id: "16:9", label: "16:9 (عريض)" },
  { id: "4:3", label: "4:3 (شاشة)" },
  { id: "1:1", label: "1:1 (مربع)" },
];

export function SplitHeroDeck({
  activeTab,
  media = {},
  onMediaChange,
  dimensions = {},
  onDimensionsChange,
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

  const rightImages = media.splitHeroRightImages || [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
  ];

  const leftImages = media.splitHeroLeftImages || [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
  ];

  const handleUploadImage = (column, index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        if (column === "right") {
          const next = [...rightImages];
          next[index] = base64;
          onMediaChange?.("splitHeroRightImages", next);
        } else {
          const next = [...leftImages];
          next[index] = base64;
          onMediaChange?.("splitHeroLeftImages", next);
        }
        playPresetSound("water-drop");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (column, index, val) => {
    if (column === "right") {
      const next = [...rightImages];
      next[index] = val;
      onMediaChange?.("splitHeroRightImages", next);
    } else {
      const next = [...leftImages];
      next[index] = val;
      onMediaChange?.("splitHeroLeftImages", next);
    }
  };

  // 1. DUAL-COLUMN MULTI-IMAGE MANAGEMENT TAB
  if (activeTab === "split_slider") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🖼️</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>إدارة صور الأعمدة المزدوجة ومعدل التبديل</h4>
            <p className={`text-[10px] ${helperText}`}>
              تخصيص 6 صور متناوبة للعمودين الأيمن والأيسر مع التحكم الكامل بسرعة التبديل الزمني
            </p>
          </div>
        </div>

        {/* Transition Swap Speed Interval Slider (1.0s to 10.0s) */}
        <div className="space-y-1.5 p-3 rounded-xl border border-white/10 bg-black/20">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>معدل سرعة التبديل بين الصور (Swap Interval)</span>
            <span className="font-mono text-[#d4af37] font-bold">
              {(media.splitHeroInterval ?? 2.0).toFixed(1)} ثانية
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={10.0}
            step={0.1}
            value={media.splitHeroInterval ?? 2.0}
            onChange={(e) => onMediaChange?.("splitHeroInterval", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
          <div className="flex justify-between text-[9px] text-slate-400">
            <span>1.0s (تبديل فائق)</span>
            <span>2.0s (افتراضي)</span>
            <span>10.0s (تبديل هادئ)</span>
          </div>
        </div>

        {/* Right Column Images (3 slots) */}
        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
          <h5 className={`text-xs font-bold ${titleColor}`}>العمود الأيمن (Right Column - 3 صور)</h5>
          <div className="grid grid-cols-1 gap-2.5">
            {rightImages.slice(0, 3).map((img, idx) => (
              <div key={idx} className="flex items-center gap-2.5 rounded-xl border border-white/10 p-2 bg-black/30">
                <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-[#d4af37]/30 bg-black/50">
                  {img ? (
                    <img src={img} alt={`Right ${idx + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-[10px] text-slate-500 font-bold">
                      #{idx + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-300 font-bold">صورة #{idx + 1}</span>
                    <label className="text-[10px] font-bold text-[#d4af37] hover:underline cursor-pointer">
                      📁 رفع صورة
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage("right", idx, e)} />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleUrlChange("right", idx, e.target.value)}
                    placeholder="رابط الصورة المباشر..."
                    className={`w-full rounded-lg border px-2 py-1 text-[10px] outline-none ${inputClass}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Column Images (3 slots) */}
        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
          <h5 className={`text-xs font-bold ${titleColor}`}>العمود الأيسر (Left Column - 3 صور)</h5>
          <div className="grid grid-cols-1 gap-2.5">
            {leftImages.slice(0, 3).map((img, idx) => (
              <div key={idx} className="flex items-center gap-2.5 rounded-xl border border-white/10 p-2 bg-black/30">
                <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-[#d4af37]/30 bg-black/50">
                  {img ? (
                    <img src={img} alt={`Left ${idx + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-[10px] text-slate-500 font-bold">
                      #{idx + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-300 font-bold">صورة #{idx + 1}</span>
                    <label className="text-[10px] font-bold text-[#d4af37] hover:underline cursor-pointer">
                      📁 رفع صورة
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage("left", idx, e)} />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleUrlChange("left", idx, e.target.value)}
                    placeholder="رابط الصورة المباشر..."
                    className={`w-full rounded-lg border px-2 py-1 text-[10px] outline-none ${inputClass}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. FULL CENTER CONTENT & TYPOGRAPHY INSPECTOR
  if (activeTab === "typography") {
    const brandText = media.splitHeroBrand ?? "BESO";
    const brandSize = media.splitHeroBrandSize ?? 38;
    const brandColor = media.splitHeroBrandColor ?? "#e50010";
    const brandWeight = media.splitHeroBrandWeight ?? 900;

    const badgeText = media.splitHeroDiscountBadge ?? "خصم";
    const badgeSize = media.splitHeroBadgeSize ?? 15;
    const badgeColor = media.splitHeroBadgeColor ?? "#e50010";

    const titleText = media.splitHeroDiscountTitle ?? "حتى 70%";
    const titleSize = media.splitHeroTitleSize ?? 42;
    const titleColorVal = media.splitHeroTitleColor ?? "#e50010";

    const subtext = media.splitHeroSubtext ?? "عروض منتصف الموسم لفترة محدودة";
    const subtextSize = media.splitHeroSubtextSize ?? 13;
    const subtextColor = media.splitHeroSubtextColor ?? "#333333";

    const align = media.splitHeroAlign ?? "center";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">✍️</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>نصوص وخطوط بطاقة الوسط التفاعلية</h4>
            <p className={`text-[10px] ${helperText}`}>
              تخصيص الشعار، وسم الخصم، العنوان الكبير، الوصف، والألوان والأوزان والمحاذاة
            </p>
          </div>
        </div>

        {/* 1. Logo Text (الشعار الرئيسي) */}
        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
          <label className={`block text-xs font-bold ${labelAccent}`}>الشعار الرئيسي (Brand Logo Text)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={brandText}
              onChange={(e) => onMediaChange?.("splitHeroBrand", e.target.value)}
              className={`rounded-xl border px-3 py-1.5 text-xs outline-none ${inputClass}`}
              placeholder="H&M"
            />
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={brandColor.startsWith("#") ? brandColor : "#e50010"}
                onChange={(e) => onMediaChange?.("splitHeroBrandColor", e.target.value)}
                className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={brandColor}
                onChange={(e) => onMediaChange?.("splitHeroBrandColor", e.target.value)}
                className={`flex-1 rounded-xl border px-2 py-1 text-xs font-mono outline-none ${inputClass}`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-300">حجم الشعار</span>
                <span className="font-mono text-[#d4af37]">{brandSize}px</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={brandSize}
                onChange={(e) => onMediaChange?.("splitHeroBrandSize", Number(e.target.value))}
                className="w-full accent-[#39b54a]"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-300">سماكة الخط</span>
                <span className="font-mono text-[#d4af37]">{brandWeight}</span>
              </div>
              <select
                value={brandWeight}
                onChange={(e) => onMediaChange?.("splitHeroBrandWeight", Number(e.target.value))}
                className={`w-full rounded-lg border px-2 py-1 text-xs ${inputClass}`}
              >
                {FONT_WEIGHTS.map((w) => (
                  <option key={w.val} value={w.val}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. Badge Label (وسم الخصم) */}
        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
          <label className={`block text-xs font-bold ${labelAccent}`}>وسم الخصم العلوي (Discount Badge Label)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={badgeText}
              onChange={(e) => onMediaChange?.("splitHeroDiscountBadge", e.target.value)}
              className={`rounded-xl border px-3 py-1.5 text-xs outline-none ${inputClass}`}
              placeholder="خصم"
            />
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={badgeColor.startsWith("#") ? badgeColor : "#e50010"}
                onChange={(e) => onMediaChange?.("splitHeroBadgeColor", e.target.value)}
                className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={badgeColor}
                onChange={(e) => onMediaChange?.("splitHeroBadgeColor", e.target.value)}
                className={`flex-1 rounded-xl border px-2 py-1 text-xs font-mono outline-none ${inputClass}`}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-300">حجم خط الوسم</span>
              <span className="font-mono text-[#d4af37]">{badgeSize}px</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              value={badgeSize}
              onChange={(e) => onMediaChange?.("splitHeroBadgeSize", Number(e.target.value))}
              className="w-full accent-[#39b54a]"
            />
          </div>
        </div>

        {/* 3. Discount Title (عنوان الخصم الكبير) */}
        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
          <label className={`block text-xs font-bold ${labelAccent}`}>عنوان الخصم الكبير (Discount Title)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={titleText}
              onChange={(e) => onMediaChange?.("splitHeroDiscountTitle", e.target.value)}
              className={`rounded-xl border px-3 py-1.5 text-xs outline-none ${inputClass}`}
              placeholder="حتى 70%"
            />
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={titleColorVal.startsWith("#") ? titleColorVal : "#e50010"}
                onChange={(e) => onMediaChange?.("splitHeroTitleColor", e.target.value)}
                className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={titleColorVal}
                onChange={(e) => onMediaChange?.("splitHeroTitleColor", e.target.value)}
                className={`flex-1 rounded-xl border px-2 py-1 text-xs font-mono outline-none ${inputClass}`}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-300">حجم الخط (20px - 100px)</span>
              <span className="font-mono text-[#d4af37] font-bold">{titleSize}px</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={titleSize}
              onChange={(e) => onMediaChange?.("splitHeroTitleSize", Number(e.target.value))}
              className="w-full accent-[#39b54a]"
            />
          </div>
        </div>

        {/* 4. Sub-text Description (الوصف التفصيلي) */}
        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
          <label className={`block text-xs font-bold ${labelAccent}`}>الوصف التفصيلي (Subtext Description)</label>
          <textarea
            rows={2}
            value={subtext}
            onChange={(e) => onMediaChange?.("splitHeroSubtext", e.target.value)}
            className={`w-full rounded-xl border px-3 py-1.5 text-xs outline-none resize-none ${inputClass}`}
            placeholder="عروض منتصف الموسم لفترة محدودة"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-300">حجم خط الوصف</span>
                <span className="font-mono text-[#d4af37]">{subtextSize}px</span>
              </div>
              <input
                type="range"
                min={10}
                max={30}
                value={subtextSize}
                onChange={(e) => onMediaChange?.("splitHeroSubtextSize", Number(e.target.value))}
                className="w-full accent-[#39b54a]"
              />
            </div>
            <div className="flex items-center gap-1.5 pt-3">
              <input
                type="color"
                value={subtextColor.startsWith("#") ? subtextColor : "#333333"}
                onChange={(e) => onMediaChange?.("splitHeroSubtextColor", e.target.value)}
                className="h-8 w-10 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={subtextColor}
                onChange={(e) => onMediaChange?.("splitHeroSubtextColor", e.target.value)}
                className={`flex-1 rounded-xl border px-2 py-1 text-xs font-mono outline-none ${inputClass}`}
              />
            </div>
          </div>
        </div>

        {/* 5. Explicit Alignment Controls */}
        <div className="space-y-1.5">
          <label className={`block text-xs font-bold ${labelAccent}`}>محاذاة بطاقة الوسط (Center Card Alignment)</label>
          <div className="grid grid-cols-3 gap-2">
            {ALIGNMENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onMediaChange?.("splitHeroAlign", a.id)}
                className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold transition cursor-pointer border ${
                  align === a.id
                    ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] shadow-sm"
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

  // 3. DIMENSIONS, RATIOS & LAYOUT CONTROLS TAB
  if (activeTab === "dimensions") {
    const bannerWidth = dimensions.width || 1100;
    const bannerHeight = dimensions.height || 480;
    const overlayBlur = media.splitHeroOverlayBlur ?? 8;
    const overlayBg = media.splitHeroOverlayBg ?? "rgba(255, 255, 255, 0.88)";
    const currentRatio = media.splitHeroAspectRatio || "custom";

    const handleSelectRatio = (rId) => {
      onMediaChange?.("splitHeroAspectRatio", rId);
      if (rId === "16:9") {
        onDimensionsChange?.("height", Math.round((bannerWidth || 1100) * (9 / 16)));
      } else if (rId === "4:3") {
        onDimensionsChange?.("height", Math.round((bannerWidth || 1100) * (3 / 4)));
      } else if (rId === "1:1") {
        onDimensionsChange?.("height", bannerWidth || 1100);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">📐</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>الأبعاد والنسب والزجاجية (Layout & Glassmorphism)</h4>
            <p className={`text-[10px] ${helperText}`}>
              التحكم بأبعاد البانر (400-1400px)، نسبة العرض إلى الارتفاع، وضبابية بطاقة الزجاج
            </p>
          </div>
        </div>

        {/* Aspect Ratio Presets */}
        <div className="space-y-1.5">
          <label className={`block text-xs font-bold ${labelAccent}`}>نسبة الأبعاد المحددة (Aspect Ratio Presets)</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {ASPECT_RATIOS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRatio(r.id)}
                className={`rounded-xl py-1.5 text-xs font-bold transition cursor-pointer border ${
                  currentRatio === r.id
                    ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] shadow-sm"
                    : "border-white/10 bg-black/30 text-slate-400 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Width Slider (400px to 1400px) */}
        <div className="space-y-1.5 p-3 rounded-xl border border-white/10 bg-black/20">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>عرض البانر (Banner Width)</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onDimensionsChange?.("width", Math.max(400, (Number(bannerWidth) || 1100) - 20))}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                -
              </button>
              <span className="font-mono text-[#d4af37] font-bold min-w-[48px] text-center">{bannerWidth}px</span>
              <button
                type="button"
                onClick={() => onDimensionsChange?.("width", Math.min(1400, (Number(bannerWidth) || 1100) + 20))}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <input
            type="range"
            min={400}
            max={1400}
            step={10}
            value={Number(bannerWidth) || 1100}
            onChange={(e) => onDimensionsChange?.("width", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Height Slider (300px to 800px) */}
        <div className="space-y-1.5 p-3 rounded-xl border border-white/10 bg-black/20">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>ارتفاع البانر (Banner Height)</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onDimensionsChange?.("height", Math.max(300, (Number(bannerHeight) || 480) - 10))}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                -
              </button>
              <span className="font-mono text-[#d4af37] font-bold min-w-[48px] text-center">{bannerHeight}px</span>
              <button
                type="button"
                onClick={() => onDimensionsChange?.("height", Math.min(800, (Number(bannerHeight) || 480) + 10))}
                className="h-5 w-5 rounded bg-black/40 border border-white/10 text-xs flex items-center justify-center hover:bg-black/60 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <input
            type="range"
            min={300}
            max={800}
            step={10}
            value={Number(bannerHeight) || 480}
            onChange={(e) => onDimensionsChange?.("height", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Overlay Glassmorphism Controls */}
        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
          <label className={`block text-xs font-bold ${labelAccent}`}>خلفية وتأثير الزجاج لبطاقة الوسط (Overlay Background)</label>
          
          {/* Quick Presets */}
          <div className="grid grid-cols-3 gap-1.5 pb-1">
            <button
              type="button"
              onClick={() => {
                onMediaChange?.("splitHeroOverlayBg", "transparent");
                onMediaChange?.("splitHeroOverlayBlur", 0);
              }}
              className="rounded-lg py-1 px-2 text-[10px] font-bold border border-white/10 bg-black/40 hover:bg-black/60 text-emerald-300"
            >
              شفاف (Transparent)
            </button>
            <button
              type="button"
              onClick={() => {
                onMediaChange?.("splitHeroOverlayBg", "rgba(0, 0, 0, 0.45)");
                onMediaChange?.("splitHeroOverlayBlur", 8);
              }}
              className="rounded-lg py-1 px-2 text-[10px] font-bold border border-white/10 bg-black/40 hover:bg-black/60 text-slate-300"
            >
              زجاج داكن
            </button>
            <button
              type="button"
              onClick={() => {
                onMediaChange?.("splitHeroOverlayBg", "rgba(255, 255, 255, 0.2)");
                onMediaChange?.("splitHeroOverlayBlur", 8);
              }}
              className="rounded-lg py-1 px-2 text-[10px] font-bold border border-white/10 bg-black/40 hover:bg-black/60 text-slate-300"
            >
              زجاج فاتح
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-300">ضبابية الخلفية (Background Blur: 0px - 20px)</span>
              <span className="font-mono text-[#d4af37]">{overlayBlur}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={1}
              value={overlayBlur}
              onChange={(e) => onMediaChange?.("splitHeroOverlayBlur", Number(e.target.value))}
              className="w-full accent-[#39b54a]"
            />
          </div>

          <div className="pt-1">
            <span className="block text-[10px] text-slate-300 mb-1">لون وخلفية الزجاج (CSS Color / rgba / transparent)</span>
            <input
              type="text"
              value={overlayBg}
              onChange={(e) => onMediaChange?.("splitHeroOverlayBg", e.target.value)}
              className={`w-full rounded-xl border px-3 py-1.5 text-xs font-mono outline-none ${inputClass}`}
              placeholder="transparent"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

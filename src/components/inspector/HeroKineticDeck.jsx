// src/components/inspector/HeroKineticDeck.jsx
import React from "react";
import { playPresetSound, SoundLibrary } from "@/lib/soundEngine";

const CLIP_PATH_PRESETS = [
  {
    name: "درع سداسي (Hexagon Shield)",
    path: "polygon(50% 0px, 100% 10%, 94% 93%, 50% 100%, 6% 93%, 0px 10%)",
  },
  {
    name: "ماسة هندسية (Diamond Prism)",
    path: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  },
  {
    name: "منشور ثماني (Octagon Cut)",
    path: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  },
  {
    name: "مستطيل مائل (Angled Card)",
    path: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
  },
];

const GRADIENT_PRESETS = [
  {
    name: "زمردي كلاسيكي",
    val: "linear-gradient(160deg, #4cd864 0%, #39b54a 50%, #2a8f38 100%)",
  },
  {
    name: "سيبراني نيون",
    val: "linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #00c6ff 100%)",
  },
  {
    name: "ذهبي ملكي",
    val: "linear-gradient(135deg, #fce043 0%, #fbab7e 50%, #d4af37 100%)",
  },
  {
    name: "أورورا فايوليت",
    val: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
  },
];

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

export function HeroKineticDeck({
  activeTab,
  media = {},
  onMediaChange,
  lighting = {},
  onLightingChange,
  animations = {},
  onAnimationsChange,
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

  const handleUpload = (trackType, index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        if (trackType === "top") {
          const next = [...(media.kineticTrackTopImages || [])];
          next[index] = base64;
          onMediaChange?.("kineticTrackTopImages", next);
        } else {
          const next = [...(media.kineticTrackBottomImages || [])];
          next[index] = base64;
          onMediaChange?.("kineticTrackBottomImages", next);
        }
        playPresetSound("water-drop");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (trackType, index, val) => {
    if (trackType === "top") {
      const next = [...(media.kineticTrackTopImages || [])];
      next[index] = val;
      onMediaChange?.("kineticTrackTopImages", next);
    } else {
      const next = [...(media.kineticTrackBottomImages || [])];
      next[index] = val;
      onMediaChange?.("kineticTrackBottomImages", next);
    }
  };

  // Tab 1: [ 📝 النصوص والوسوم ]
  if (activeTab === "typography") {
    const titleSize = typography.titleSize ?? 36;
    const titleWeight = typography.titleWeight ?? 800;
    const titleAlign = typography.titleAlign ?? "right";

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">📝</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>النصوص والوسوم الرئيسية (Typography & Texts)</h4>
            <p className={`text-[10px] ${helperText}`}>
              تخصيص الوسام العلوي، العنوان البارز، الكلمة المميزة، الوصف، والتحكم بالخط والحجم (10-120px) والوزن والمحاذاة
            </p>
          </div>
        </div>

        {/* Pill Tag */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>وسام الهيرو العلوي (Pill Tag)</label>
          <input
            type="text"
            value={media.kineticPillTag ?? "حلول رقمية مخصصة للأعمال"}
            onChange={(e) => onMediaChange?.("kineticPillTag", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="مثال: حلول رقمية مخصصة للأعمال"
          />
        </div>

        {/* Main Headline */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>العنوان الرئيسي (Main Headline)</label>
          <input
            type="text"
            value={media.kineticHeadline ?? "نصمم حلولاً رقمية مبتكرة"}
            onChange={(e) => {
              onMediaChange?.("kineticHeadline", e.target.value);
              onTypographyChange?.("titleText", e.target.value);
            }}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="مثال: نصمم حلولاً رقمية مبتكرة"
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

        {/* Font Weight Picker (100 to 900) */}
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

        {/* Highlight Word */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>الكلمة المميزة بالتدرج (Highlight Word)</label>
          <input
            type="text"
            value={media.kineticHighlightWord ?? "عــــلامتك"}
            onChange={(e) => onMediaChange?.("kineticHighlightWord", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="مثال: عــــلامتك"
          />
        </div>

        {/* Subtext */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>النص التوضيحي (Subtext Description)</label>
          <textarea
            rows={3}
            value={media.kineticSubtext ?? "واجهات تفاعلية مذهلة بحركات لا نهائية ومؤثرات فيزيائية ملموسة."}
            onChange={(e) => {
              onMediaChange?.("kineticSubtext", e.target.value);
              onTypographyChange?.("descText", e.target.value);
            }}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition resize-none ${inputClass}`}
            placeholder="اكتب وصفاً جذاباً للخدمة أو الهيرو..."
          />
        </div>
      </div>
    );
  }

  // Tab 2: [ 🎨 التدرجات والشكل ]
  if (activeTab === "gradients") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🎨</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>التدرجات والشكل الهندسي (Emerald Gradient & Clip-Path)</h4>
            <p className={`text-[10px] ${helperText}`}>تخصيص التدرج اللوني للكلمة المميزة وتشكيل مسار القص الهندسي للبطاقات</p>
          </div>
        </div>

        {/* Highlight Gradient */}
        <div className="space-y-2">
          <label className={`block text-xs ${labelAccent}`}>تدرج الكلمة المميزة (Gradient CSS)</label>
          <input
            type="text"
            value={media.kineticHighlightGradient ?? "linear-gradient(160deg, #4cd864 0%, #39b54a 50%, #2a8f38 100%)"}
            onChange={(e) => onMediaChange?.("kineticHighlightGradient", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs font-mono outline-none transition ${inputClass}`}
          />
          <div className="grid grid-cols-2 gap-1.5 pt-1 sm:grid-cols-4">
            {GRADIENT_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onMediaChange?.("kineticHighlightGradient", p.val)}
                className="rounded-lg border border-white/10 p-1.5 text-center text-[10px] hover:border-[#d4af37] transition cursor-pointer"
                style={{ background: p.val }}
              >
                <span className="text-white drop-shadow font-bold text-[9px]">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clip-Path Settings */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <label className={`block text-xs ${labelAccent}`}>شكل القص الهندسي (Polygon Clip-Path)</label>
          <input
            type="text"
            value={media.kineticClipPath ?? "polygon(50% 0px, 100% 10%, 94% 93%, 50% 100%, 6% 93%, 0px 10%)"}
            onChange={(e) => onMediaChange?.("kineticClipPath", e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs font-mono outline-none transition ${inputClass}`}
          />
          <div className="grid grid-cols-2 gap-1.5 pt-1 sm:grid-cols-4">
            {CLIP_PATH_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onMediaChange?.("kineticClipPath", p.path)}
                className={`rounded-lg border px-2 py-1.5 text-center text-[10px] transition cursor-pointer ${
                  media.kineticClipPath === p.path
                    ? "border-[#d4af37] bg-[#d4af37]/20 font-bold text-[#f5df93]"
                    : "border-white/10 bg-black/30 hover:border-white/20"
                }`}
              >
                {p.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tab 3: [ 🖼️ صور المسارات ]
  if (activeTab === "kinetic_tracks") {
    const topImages = media.kineticTrackTopImages || [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    ];

    const bottomImages = media.kineticTrackBottomImages || [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🖼️</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>صور وسرعة المسارات الحركية (Kinetic Dual-Tracks)</h4>
            <p className={`text-[10px] ${helperText}`}>إدارة سرعة دوران المسارات وعكس اتجاهها ورفع صور المسارين العلوي والسفلي</p>
          </div>
        </div>

        {/* Speed Slider & Direction Invert */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl border border-[#d4af37]/20 bg-black/20">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={labelAccent}>سرعة الحركة (Duration)</span>
              <span className="font-mono text-[#d4af37] font-bold">{media.kineticTrackSpeed ?? 20}s</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={media.kineticTrackSpeed ?? 20}
              onChange={(e) => onMediaChange?.("kineticTrackSpeed", Number(e.target.value))}
              className="w-full accent-[#39b54a]"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
            <span className={`text-xs ${labelAccent}`}>عكس اتجاه المسارات:</span>
            <button
              type="button"
              onClick={() => onMediaChange?.("kineticTrackInvert", !media.kineticTrackInvert)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer border ${
                media.kineticTrackInvert
                  ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                  : "border-white/10 bg-black/40 text-slate-400"
              }`}
            >
              {media.kineticTrackInvert ? "معكوس ⇄" : "طبيعي ➔"}
            </button>
          </div>
        </div>

        {/* Track 1: Top Images */}
        <div className="space-y-2">
          <h5 className={`text-xs font-bold ${titleColor}`}>المسار العلوي (Top Track - 4 صور)</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topImages.slice(0, 4).map((img, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-xl border border-white/10 p-2 bg-black/30">
                <img src={img} alt={`Top ${idx + 1}`} className="h-10 w-10 shrink-0 rounded-lg object-cover border border-[#d4af37]/30" />
                <div className="flex-1 min-w-0 space-y-1">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleUrlChange("top", idx, e.target.value)}
                    placeholder="رابط الصورة..."
                    className={`w-full rounded-lg border px-2 py-1 text-[10px] outline-none ${inputClass}`}
                  />
                  <label className="inline-block text-[9px] text-[#d4af37] hover:underline cursor-pointer">
                    📁 رفع صورة
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload("top", idx, e)} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Bottom Images */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <h5 className={`text-xs font-bold ${titleColor}`}>المسار السفلي (Bottom Track - 4 صور)</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {bottomImages.slice(0, 4).map((img, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-xl border border-white/10 p-2 bg-black/30">
                <img src={img} alt={`Bottom ${idx + 1}`} className="h-10 w-10 shrink-0 rounded-lg object-cover border border-[#d4af37]/30" />
                <div className="flex-1 min-w-0 space-y-1">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleUrlChange("bottom", idx, e.target.value)}
                    placeholder="رابط الصورة..."
                    className={`w-full rounded-lg border px-2 py-1 text-[10px] outline-none ${inputClass}`}
                  />
                  <label className="inline-block text-[9px] text-[#d4af37] hover:underline cursor-pointer">
                    📁 رفع صورة
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload("bottom", idx, e)} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tab 4: [ 🔘 زر الإجراء والصوت ]
  if (activeTab === "cta_button") {
    const SOUNDS = [
      { id: "neon_click", label: "Neon Click (نيون سايبر)" },
      { id: "soft-click", label: "Soft Click (نقرة ناعمة)" },
      { id: "cyber-neon", label: "Cyber Pulsar (نبض مستقبلي)" },
      { id: "success-chime", label: "Success Chime (رنين إنجاز)" },
      { id: "hover-tick", label: "Tick Tone (تكة خفيفة)" },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🔘</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>زر الإجراء والتكامل الصوتي (CTA Button & Audio Trigger)</h4>
            <p className={`text-[10px] ${helperText}`}>تخصيص نص زر الدعوة لاتخاذ إجراء، لونه، والمؤثر الصوتي التفاعلي</p>
          </div>
        </div>

        {/* CTA Text */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>نص زر الدعوة لاتخاذ إجراء (CTA Text)</label>
          <input
            type="text"
            value={media.kineticCtaText ?? "اكتشف إمكانياتنا ✦"}
            onChange={(e) => {
              onMediaChange?.("kineticCtaText", e.target.value);
              onTypographyChange?.("buttonText", e.target.value);
            }}
            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none transition ${inputClass}`}
            placeholder="مثال: اكتشف إمكانياتنا ✦"
          />
        </div>

        {/* Button Color / Accent */}
        <div className="space-y-1.5">
          <label className={`block text-xs ${labelAccent}`}>لون توهج الزر والإطار (Glow & Border Accent)</label>
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

        {/* Sound Preset Selector */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <label className={`block text-xs ${labelAccent}`}>المؤثر الصوتي عند النقر (Audio Trigger Preset)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SOUNDS.map((s) => {
              const isSelected = (animations.soundPreset || "neon_click") === s.id;
              return (
                <div
                  key={s.id}
                  className={`flex items-center justify-between rounded-xl border p-2 transition ${
                    isSelected
                      ? "border-[#d4af37] bg-[#d4af37]/20 text-[#f5df93]"
                      : "border-white/10 bg-black/30 hover:border-white/20 text-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onAnimationsChange?.("soundPreset", s.id);
                      SoundLibrary.play(s.id);
                    }}
                    className="flex-1 text-right text-xs font-medium cursor-pointer"
                  >
                    {s.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => SoundLibrary.play(s.id)}
                    title="تجربة الصوت"
                    className="h-6 w-6 rounded-lg bg-emerald-900/50 text-[10px] text-emerald-300 hover:bg-emerald-800 transition flex items-center justify-center cursor-pointer"
                  >
                    ▶
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

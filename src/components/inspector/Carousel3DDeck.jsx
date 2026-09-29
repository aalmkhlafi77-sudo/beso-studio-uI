// src/components/inspector/Carousel3DDeck.jsx
import React from "react";
import { playPresetSound } from "@/lib/soundEngine";

export function Carousel3DDeck({
  activeElement = "carousel-3d-cube",
  activeTab,
  media = {},
  onMediaChange,
  theme = "dark",
}) {
  const isLight = theme === "light";
  const titleColor = isLight ? "text-[#4a2e12] font-bold" : "text-[#f5d77f] font-bold";
  const labelAccent = isLight ? "text-[#165a40] font-bold" : "text-[#34d399] font-medium";
  const helperText = isLight ? "text-[#165a40]" : "text-[#34d399]";
  const inputClass = isLight
    ? "border-[#c99e32]/40 bg-[#fbf9f4] text-[#2c1d0c] placeholder:text-[#165a40]/60 focus:border-[#0e5a3e]"
    : "border-white/15 bg-black/50 text-white placeholder:text-emerald-300/40 focus:border-[#d4af37]";

  const requiredFaces =
    activeElement === "carousel-3d-cube"
      ? 4
      : activeElement === "carousel-3d-hexagon"
      ? 6
      : 8;

  const handleFaceImageChange = (index, value) => {
    const next = [...(media.carouselImages || [])];
    next[index] = value;
    onMediaChange?.("carouselImages", next);
  };

  const handleFaceUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        handleFaceImageChange(index, base64);
        playPresetSound("water-drop");
      }
    };
    reader.readAsDataURL(file);
  };

  // Tab 1: [ 🔄 دوران الكاروسيل ]
  if (activeTab === "3d_carousels") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🔄</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>سرعة وديناميكية الدوران (3D Rotation)</h4>
            <p className={`text-[10px] ${helperText}`}>التحكم بمدة دورة الـ 360 درجة وخاصية التوقف عند التحويم</p>
          </div>
        </div>

        {/* Speed Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>سرعة الدوران (Speed Duration)</span>
            <span className="font-mono text-[#d4af37] font-bold">{media.carouselRotationSpeed ?? 16}s</span>
          </div>
          <input
            type="range"
            min={4}
            max={40}
            step={1}
            value={media.carouselRotationSpeed ?? 16}
            onChange={(e) => onMediaChange?.("carouselRotationSpeed", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Hover Pause */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-black/20">
          <span className={`text-xs ${labelAccent}`}>إيقاف الدوران عند مرور الماوس:</span>
          <button
            type="button"
            onClick={() => onMediaChange?.("carouselHoverPause", !media.carouselHoverPause)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer border ${
              media.carouselHoverPause !== false
                ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                : "border-white/10 bg-black/40 text-slate-400"
            }`}
          >
            {media.carouselHoverPause !== false ? "مفعل ✓" : "معطل ✕"}
          </button>
        </div>
      </div>
    );
  }

  // Tab 2: [ 🖼️ صور الأوجه ]
  if (activeTab === "carousel_images") {
    const images = media.carouselImages || [];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">🖼️</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>صور أوجه المجسم ({requiredFaces} أوجه)</h4>
            <p className={`text-[10px] ${helperText}`}>رفع صور مخصصة لكل لوح صور أوجه المجسم ثلاثي الأبعاد</p>
          </div>
        </div>

        {/* Face Image Dimensions, Aspect Ratio & Object Fit */}
        <div className="space-y-2 p-2.5 rounded-xl border border-white/10 bg-black/20">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex justify-between text-[10px]">
                <span className={labelAccent}>عرض الوجه</span>
                <span className="font-mono text-[#d4af37]">{media.carouselImgWidth || 280}px</span>
              </div>
              <input
                type="range"
                min={50}
                max={1200}
                step={5}
                value={media.carouselImgWidth || 280}
                onChange={(e) => onMediaChange?.("carouselImgWidth", Number(e.target.value))}
                className="w-full accent-[#d4af37]"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px]">
                <span className={labelAccent}>ارتفاع الوجه</span>
                <span className="font-mono text-[#d4af37]">{media.carouselImgHeight || 200}px</span>
              </div>
              <input
                type="range"
                min={50}
                max={1200}
                step={5}
                value={media.carouselImgHeight || 200}
                onChange={(e) => onMediaChange?.("carouselImgHeight", Number(e.target.value))}
                className="w-full accent-[#d4af37]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-white/10">
            <span className="text-[10px] text-slate-400">نمط الاحتواء:</span>
            <div className="grid grid-cols-4 gap-1 flex-1">
              {[
                { id: "cover", label: "Cover" },
                { id: "contain", label: "Contain" },
                { id: "fill", label: "Fill" },
                { id: "none", label: "None" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onMediaChange?.("carouselObjectFit", opt.id)}
                  className={`rounded-lg py-1 text-[9px] font-bold border transition cursor-pointer ${
                    (media.carouselObjectFit || "cover") === opt.id
                      ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93]"
                      : "border-white/10 bg-black/30 text-slate-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Face Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
          {Array.from({ length: requiredFaces }).map((_, idx) => {
            const img = images[idx] || "";
            return (
              <div key={idx} className="flex items-center gap-2 rounded-xl border border-white/10 p-2 bg-black/30">
                <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-[#d4af37]/30 bg-black/50">
                  {img ? (
                    <img src={img} alt={`Face ${idx + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-[10px] text-slate-500 font-bold">
                      #{idx + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleFaceImageChange(idx, e.target.value)}
                    placeholder={`رابط الوجه #${idx + 1}...`}
                    className={`w-full rounded-lg border px-2 py-1 text-[10px] outline-none ${inputClass}`}
                  />
                  <label className="inline-block text-[9px] text-[#d4af37] hover:underline cursor-pointer">
                    📁 رفع صورة للوجه
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFaceUpload(idx, e)} />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Tab 3: [ 📐 المنظور والميلان ]
  if (activeTab === "perspective") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
          <span className="text-base">📐</span>
          <div>
            <h4 className={`text-xs ${titleColor}`}>المنظور الفضائي والزاوية (3D Perspective & Tilt)</h4>
            <p className={`text-[10px] ${helperText}`}>التحكم بعمق المنظور Z وزاوية ميلان الكاميرا المحورية</p>
          </div>
        </div>

        {/* Perspective Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>المنظور البصري (Perspective)</span>
            <span className="font-mono text-[#d4af37] font-bold">{media.carouselPerspective ?? 1200}px</span>
          </div>
          <input
            type="range"
            min={600}
            max={3000}
            step={50}
            value={media.carouselPerspective ?? 1200}
            onChange={(e) => onMediaChange?.("carouselPerspective", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>

        {/* Tilt Angle Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={labelAccent}>زاوية الميلان (Tilt Angle)</span>
            <span className="font-mono text-[#d4af37] font-bold">{media.carouselTiltAngle ?? 10}°</span>
          </div>
          <input
            type="range"
            min={-30}
            max={30}
            step={1}
            value={media.carouselTiltAngle ?? 10}
            onChange={(e) => onMediaChange?.("carouselTiltAngle", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>
      </div>
    );
  }

  return null;
}

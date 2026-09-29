// src/components/inspector/AdvancedEffectsDeck.jsx
import React from "react";
import { SoundLibrary } from "@/lib/soundEngine";

const ENTRANCE_ANIMATIONS = [
  { id: "fadeUp", label: "ظهور ناعم (Fade In)" },
  { id: "slideDown", label: "انزلاق لأسفل (Slide Down)" },
  { id: "zoomIn", label: "تكبير مجسم (Zoom In)" },
  { id: "pulseGlow", label: "نبض الإضاءة (Pulse Glow)" },
];

const SOUND_PRESETS = [
  { id: "soft-click", label: "Soft Click (نقرة ناعمة)" },
  { id: "neon_click", label: "Neon Click (نيون سايبر)" },
  { id: "cyber-neon", label: "Cyber Pulsar (نبض كهرومغناطيسي)" },
  { id: "hover-tick", label: "Tick Tone (تكة خفيفة)" },
  { id: "success-chime", label: "Success Chime (رنين إنجاز)" },
];

export function AdvancedEffectsDeck({
  dimensions = {},
  onDimensionsChange,
  lighting = {},
  onLightingChange,
  animations = {},
  onAnimationsChange,
  theme = "dark",
}) {
  const isLight = theme === "light";
  const titleColor = isLight ? "text-[#4a2e12] font-bold" : "text-[#f5d77f] font-bold";
  const labelAccent = isLight ? "text-[#165a40] font-bold" : "text-[#34d399] font-medium";
  const helperText = isLight ? "text-[#165a40]" : "text-[#34d399]";
  const inputClass = isLight
    ? "border-[#c99e32]/40 bg-[#fbf9f4] text-[#2c1d0c] placeholder:text-[#165a40]/60 focus:border-[#0e5a3e]"
    : "border-white/15 bg-black/50 text-white placeholder:text-emerald-300/40 focus:border-[#d4af37]";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b pb-2 border-[#d4af37]/20">
        <span className="text-base">✨</span>
        <div>
          <h4 className={`text-xs ${titleColor}`}>المؤثرات البصرية والتفاعلية المتقدمة (Advanced Effects Suite)</h4>
          <p className={`text-[10px] ${helperText}`}>
            التحكم بالإضاءة والسطوع، الشفافية، الحركة والظهور، فيزياء التمرير، الحدود والعمق 3D، والأصوات
          </p>
        </div>
      </div>

      {/* 1. Lighting & Glow Intensity (0% to 200%) */}
      <div className="space-y-1.5 p-3 rounded-xl border border-white/10 bg-black/20">
        <div className="flex items-center justify-between text-xs">
          <span className={labelAccent}>الإضاءة والسطوع (Lighting & Glow Intensity)</span>
          <span className="font-mono text-[#d4af37] font-bold">{lighting.glowIntensity ?? 100}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={200}
          step={5}
          value={lighting.glowIntensity ?? 100}
          onChange={(e) => onLightingChange?.("glowIntensity", Number(e.target.value))}
          className="w-full accent-[#39b54a]"
        />
        <div className="flex justify-between text-[9px] text-slate-400">
          <span>0% (معتم)</span>
          <span>100% (طبيعي)</span>
          <span>200% (إشعاع نيون ناصع)</span>
        </div>
      </div>

      {/* 2. Opacity (0% to 100%) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className={labelAccent}>الشفافية (Opacity Alpha)</span>
          <span className="font-mono text-[#d4af37] font-bold">
            {Math.round((dimensions.surfaceOpacity ?? 0.85) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={Number(dimensions.surfaceOpacity) || 0.85}
          onChange={(e) => onDimensionsChange?.("surfaceOpacity", Number(e.target.value))}
          className="w-full accent-[#39b54a]"
        />
      </div>

      {/* 3. Animation & Entrance (Fade In, Slide Down, Zoom In, Pulse Glow) + Transition Speed (0.1s to 3.0s) */}
      <div className="space-y-2.5 p-3 rounded-xl border border-white/10 bg-black/20">
        <label className={`block text-xs ${labelAccent}`}>الحركة والظهور (Animation & Entrance)</label>
        <div className="grid grid-cols-2 gap-1.5">
          {ENTRANCE_ANIMATIONS.map((anim) => (
            <button
              key={anim.id}
              type="button"
              onClick={() => onAnimationsChange?.("entranceAnimation", anim.id)}
              className={`rounded-xl py-1.5 px-2 text-xs font-bold transition cursor-pointer border truncate ${
                (animations.entranceAnimation || "fadeUp") === anim.id
                  ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93] shadow-sm"
                  : "border-white/10 bg-black/30 text-slate-400 hover:text-white"
              }`}
            >
              {anim.label}
            </button>
          ))}
        </div>

        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-300">سرعة الحركة والانتقال (Transition Speed)</span>
            <span className="font-mono text-[#d4af37] font-bold">
              {(animations.transitionSpeed ?? 0.35).toFixed(2)}s
            </span>
          </div>
          <input
            type="range"
            min={0.1}
            max={3.0}
            step={0.05}
            value={animations.transitionSpeed ?? 0.35}
            onChange={(e) => onAnimationsChange?.("transitionSpeed", Number(e.target.value))}
            className="w-full accent-[#39b54a]"
          />
        </div>
      </div>

      {/* 4. Hover Physics (Lift, Scale, Glow Expansion) */}
      <div className="space-y-2.5 p-3 rounded-xl border border-white/10 bg-black/20">
        <div className="flex items-center justify-between">
          <span className={`text-xs ${labelAccent}`}>فيزياء حركة التمرير (Hover Physics)</span>
          <button
            type="button"
            onClick={() => onAnimationsChange?.("enableHoverPhysics", animations.enableHoverPhysics === false)}
            className={`rounded-lg px-2.5 py-1 text-[10px] font-bold border transition cursor-pointer ${
              animations.enableHoverPhysics !== false
                ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                : "border-white/15 bg-black/40 text-slate-400"
            }`}
          >
            {animations.enableHoverPhysics !== false ? "مفعل ✓" : "معطل ✕"}
          </button>
        </div>

        {animations.enableHoverPhysics !== false && (
          <div className="space-y-2 pt-1">
            {/* Hover Lift */}
            <div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">مسافة الارتفاع (Hover Lift - translateY)</span>
                <span className="font-mono text-[#d4af37] font-bold">{animations.hoverLift ?? 8}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={animations.hoverLift ?? 8}
                onChange={(e) => onAnimationsChange?.("hoverLift", Number(e.target.value))}
                className="w-full accent-[#d4af37]"
              />
            </div>

            {/* Scale Factor */}
            <div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">معامل التكبير (Scale Factor)</span>
                <span className="font-mono text-[#d4af37] font-bold">{animations.hoverScale ?? 1.05}x</span>
              </div>
              <input
                type="range"
                min={0.9}
                max={1.3}
                step={0.01}
                value={animations.hoverScale ?? 1.05}
                onChange={(e) => onAnimationsChange?.("hoverScale", Number(e.target.value))}
                className="w-full accent-[#d4af37]"
              />
            </div>

            {/* Glow Expansion */}
            <div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">تمدد التوهج (Glow Expansion)</span>
                <span className="font-mono text-[#d4af37] font-bold">{animations.hoverGlowExpansion ?? 20}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                step={2}
                value={animations.hoverGlowExpansion ?? 20}
                onChange={(e) => onAnimationsChange?.("hoverGlowExpansion", Number(e.target.value))}
                className="w-full accent-[#d4af37]"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Borders & Depth 3D (Border Width, Radius, Color, Box Shadow) */}
      <div className="space-y-2.5 p-3 rounded-xl border border-white/10 bg-black/20">
        <label className={`block text-xs ${labelAccent}`}>الحدود والعمق ثلاثي الأبعاد (Borders & 3D Depth)</label>
        
        {/* Border Width & Color */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">سماكة الإطار</span>
              <span className="font-mono text-[#d4af37]">{dimensions.borderWidth ?? 1}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={Number(dimensions.borderWidth) || 1}
              onChange={(e) => onDimensionsChange?.("borderWidth", Number(e.target.value))}
              className="w-full accent-[#d4af37]"
            />
          </div>
          <div>
            <span className="block text-[11px] text-slate-300 mb-1">لون الإطار</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={dimensions.borderColor || "#d4af37"}
                onChange={(e) => onDimensionsChange?.("borderColor", e.target.value)}
                className="h-7 w-8 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={dimensions.borderColor || "#d4af37"}
                onChange={(e) => onDimensionsChange?.("borderColor", e.target.value)}
                className={`flex-1 rounded-lg border px-2 py-0.5 text-[10px] font-mono outline-none ${inputClass}`}
              />
            </div>
          </div>
        </div>

        {/* Shadow Depth & Blur */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
          <div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">عمق الظل (Shadow Depth)</span>
              <span className="font-mono text-[#d4af37]">{dimensions.shadowDepth ?? 12}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={1}
              value={Number(dimensions.shadowDepth) || 12}
              onChange={(e) => onDimensionsChange?.("shadowDepth", Number(e.target.value))}
              className="w-full accent-[#d4af37]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">انتشار الضبابية (Shadow Blur)</span>
              <span className="font-mono text-[#d4af37]">{dimensions.shadowBlur ?? 30}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={2}
              value={Number(dimensions.shadowBlur) || 30}
              onChange={(e) => onDimensionsChange?.("shadowBlur", Number(e.target.value))}
              className="w-full accent-[#d4af37]"
            />
          </div>
        </div>
      </div>

      {/* 6. Sound Trigger Binding */}
      <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/20">
        <label className={`block text-xs ${labelAccent}`}>ربط المؤثرات الصوتية (Sound Trigger Binding)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {SOUND_PRESETS.map((s) => {
            const isSelected = (animations.soundPreset || "soft-click") === s.id;
            return (
              <div
                key={s.id}
                className={`flex items-center justify-between rounded-xl border p-2 transition ${
                  isSelected
                    ? "border-[#d4af37] bg-[#d4af37]/25 text-[#f5df93]"
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
                  className="h-6 w-6 rounded-lg bg-emerald-900/50 text-[10px] text-emerald-300 hover:bg-emerald-800 transition flex items-center justify-center cursor-pointer shrink-0"
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

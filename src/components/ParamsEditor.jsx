// components/ParamsEditor.jsx
import React, { useState } from "react";
import { MATERIAL_SURFACES } from "@/data/effects";
import { STANDARD_SOUND_PRESETS, LUXURY_SOUND_PRESETS, playPresetSound } from "@/lib/soundEngine";

const TABS = [
  { id: "dimensions", label: "الأبعاد والشفافية", icon: "📐", sub: "Dimensions & Opacity" },
  { id: "lighting", label: "التدرجات والإضاءة", icon: "🌈", sub: "Gradients & LED Glow" },
  { id: "physics", label: "الفيزياء والشطف", icon: "⚙️", sub: "Bevel & Emboss" },
  { id: "typography", label: "النصوص والظلال", icon: "✍️", sub: "Typography & Align" },
  { id: "animations", label: "الحركات", icon: "✨", sub: "Animations & Motion" },
];

export default function ParamsEditor({
  activeElement = "button",
  dimensions = {},
  onDimensionsChange,
  lighting = {},
  onLightingChange,
  typography = {},
  onTypographyChange,
  animations = {},
  onAnimationsChange,
  globalParams = {},
  onGlobalChange,
  cardParams = {},
  inputParams = {},
  badgeParams = {},
  buttonParams = {},
  onElementParamChange,
  onReset,
}) {
  const [activeTab, setActiveTab] = useState("dimensions");

  // Fallbacks to guarantee smooth sliders even if some prop is nested
  const dim = {
    width: dimensions.width ?? 360,
    height: dimensions.height ?? "auto",
    borderRadius: dimensions.borderRadius ?? globalParams.borderRadius ?? 16,
    padding: dimensions.padding ?? 24,
    surfaceOpacity: dimensions.surfaceOpacity ?? 0.85,
    borderWidth: dimensions.borderWidth ?? 1,
    borderColor: dimensions.borderColor || globalParams.accentColor || "#d4af37",
  };

  const light = {
    useThreeColors: lighting.useThreeColors ?? true,
    colorStop1: lighting.colorStop1 || globalParams.mainColor || "#0d3b2e",
    colorStop2: lighting.colorStop2 || "#16157f",
    colorStop3: lighting.colorStop3 || globalParams.color || "#4a154b",
    gradientAngle: lighting.gradientAngle ?? 145,
    showBottomGlow: lighting.showBottomGlow ?? true,
    glowColor: lighting.glowColor || globalParams.accentColor || "#d4af37",
    glowSpread: lighting.glowSpread ?? 28,
    bevelDepth: lighting.bevelDepth ?? globalParams.bevelDepth ?? 4,
  };

  const typo = {
    titleSize: typography.titleSize ?? (globalParams.fontSize ? globalParams.fontSize + 4 : 22),
    titleColor: typography.titleColor || "#fff8e7",
    descSize: typography.descSize ?? globalParams.fontSize ?? 14,
    descColor: typography.descColor || globalParams.textColor || "#eae5d9",
    textAlign: typography.textAlign || "right",
    textShadowDepth: typography.textShadowDepth ?? 2,
    titleText: typography.titleText || cardParams.title || "بطاقة Beso الفاخرة",
    descText: typography.descText || cardParams.description || "بطاقة تفاعلية محبوكة بتأثيرات السطح المادي والظلال الفيزيائية المزدوجة.",
  };

  const anim = {
    transitionSpeed: animations.transitionSpeed ?? 0.35,
    entranceAnimation: animations.entranceAnimation || "fadeUp",
    hoverEffect: animations.hoverEffect || "liftScale",
    soundPreset: animations.soundPreset || "soft-click",
    particleOverlay: animations.particleOverlay || "none",
  };

  const currentSurface = globalParams.surfaceStyle || "glass";

  return (
    <div className="space-y-3.5">
      {/* 1. Header Tabs Bar */}
      <section className="rounded-[22px] border border-[#d4af37]/25 bg-[linear-gradient(150deg,rgba(15,35,26,.97),rgba(5,15,12,.96))] p-2.5 shadow-[0_16px_40px_rgba(0,0,0,.26),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl">
        <div className="flex items-center justify-between px-2 pt-1 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-gradient-to-b from-[#f0d780] to-[#8f6921] shadow-[0_0_10px_rgba(212,175,55,.35)]" />
            <span className="text-xs font-bold text-[#fff8e7]">لوحة التحكم المادية (Control Studio)</span>
          </div>
          <span className="rounded-full border border-[#d4af37]/20 bg-[#07120d]/80 px-2 py-0.5 text-[9px] font-mono text-[#d4af37]">
            {activeElement.toUpperCase()}
          </span>
        </div>

        {/* Tab buttons */}
        <div className="grid grid-cols-5 gap-1 pt-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                title={tab.sub}
                className={`relative flex flex-col items-center justify-center rounded-xl py-2 px-1 text-center transition-all cursor-pointer ${
                  isActive
                    ? "border border-[#f0d779] bg-[linear-gradient(145deg,rgba(74,21,75,.65),rgba(20,43,32,.98))] font-bold text-[#fff8e7] shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_0_16px_rgba(212,175,55,.18)]"
                    : "border border-white/[.06] bg-black/25 text-slate-400 hover:border-[#d4af37]/40 hover:text-[#eae5d9]"
                }`}
              >
                <span className="text-sm mb-0.5">{tab.icon}</span>
                <span className="text-[10px] leading-tight truncate w-full px-0.5">{tab.label.split(" ")[0]}</span>
                {isActive && (
                  <span className="absolute -bottom-1 h-1 w-5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. TAB 1: الأبعاد والشفافية (Dimensions & Opacity) */}
      {(activeTab === "dimensions" || activeTab === "all") && (
        <section className="rounded-[22px] border border-[#d4af37]/25 bg-[linear-gradient(150deg,rgba(15,35,26,.97),rgba(5,15,12,.96))] p-4 shadow-[0_16px_40px_rgba(0,0,0,.26),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#fff8e7]">
              <span className="text-base">📐</span>
              الأبعاد والشفافية (Dimensions & Opacity)
            </h3>
            <span className="text-[10px] text-[#a8b7ad]">تحكم دقيق 1px مادي</span>
          </div>

          <div className="space-y-3.5">
            {/* Width Stepper */}
            <StepperControl
              label="العرض (Width)"
              value={dim.width}
              min={100}
              max={650}
              step={1}
              display={`${dim.width}px`}
              onChange={(val) => onDimensionsChange?.("width", val)}
            />

            {/* Height Stepper with Auto toggle */}
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium">الارتفاع (Height)</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onDimensionsChange?.("height", "auto")}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer ${
                      dim.height === "auto"
                        ? "bg-[#d4af37] text-black shadow-[0_0_8px_#d4af37]"
                        : "bg-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    تلقائي (Auto)
                  </button>
                  <span className="font-mono text-[11px] font-bold text-[#d4af37]">
                    {dim.height === "auto" ? "Auto" : `${dim.height}px`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const cur = dim.height === "auto" ? 180 : Number(dim.height);
                    onDimensionsChange?.("height", Math.max(30, cur - 1));
                  }}
                  disabled={dim.height !== "auto" && Number(dim.height) <= 30}
                  aria-label="تقليل الارتفاع -1"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[linear-gradient(145deg,#0a1d15,#040e0a)] text-sm font-bold text-[#d4af37] shadow-[0_2px_4px_rgba(0,0,0,.3)] transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 active:scale-95 disabled:opacity-30 cursor-pointer"
                >
                  −
                </button>
                <div className="relative flex flex-1 items-center">
                  <input
                    type="range"
                    min={40}
                    max={400}
                    step={1}
                    value={dim.height === "auto" ? 180 : Number(dim.height)}
                    onChange={(e) => onDimensionsChange?.("height", Number(e.target.value))}
                    className="w-full h-1.5 cursor-pointer rounded-lg bg-black/50 accent-[#d4af37]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const cur = dim.height === "auto" ? 180 : Number(dim.height);
                    onDimensionsChange?.("height", Math.min(400, cur + 1));
                  }}
                  disabled={dim.height !== "auto" && Number(dim.height) >= 400}
                  aria-label="زيادة الارتفاع +1"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[linear-gradient(145deg,#0a1d15,#040e0a)] text-sm font-bold text-[#d4af37] shadow-[0_2px_4px_rgba(0,0,0,.3)] transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 active:scale-95 disabled:opacity-30 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Border Radius Stepper */}
            <StepperControl
              label="استدارة الحواف (Radius)"
              value={dim.borderRadius}
              min={0}
              max={60}
              step={1}
              display={`${dim.borderRadius}px`}
              onChange={(val) => {
                onDimensionsChange?.("borderRadius", val);
                onGlobalChange?.("borderRadius", val);
              }}
            />

            {/* Padding Stepper */}
            <StepperControl
              label="المساحة الداخلية (Padding)"
              value={dim.padding}
              min={4}
              max={64}
              step={1}
              display={`${dim.padding}px`}
              onChange={(val) => onDimensionsChange?.("padding", val)}
            />

            {/* Surface Opacity Stepper */}
            <StepperControl
              label="شفافية السطح (Surface Opacity)"
              value={Math.round(dim.surfaceOpacity * 100)}
              min={10}
              max={100}
              step={1}
              display={`${Math.round(dim.surfaceOpacity * 100)}%`}
              onChange={(val) => onDimensionsChange?.("surfaceOpacity", val / 100)}
            />

            {/* Border Width Stepper */}
            <StepperControl
              label="سماكة الإطار (Border Width)"
              value={dim.borderWidth}
              min={0}
              max={8}
              step={1}
              display={`${dim.borderWidth}px`}
              onChange={(val) => onDimensionsChange?.("borderWidth", val)}
            />
          </div>
        </section>
      )}

      {/* 3. TAB 2: التدرجات والإضاءة (Gradients & LED Glow) */}
      {(activeTab === "lighting" || activeTab === "all") && (
        <section className="rounded-[22px] border border-[#d4af37]/25 bg-[linear-gradient(150deg,rgba(15,35,26,.97),rgba(5,15,12,.96))] p-4 shadow-[0_16px_40px_rgba(0,0,0,.26),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#fff8e7]">
              <span className="text-base">🌈</span>
              التدرجات والإضاءة (Gradients & LED Glow)
            </h3>
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={light.useThreeColors}
                onChange={(e) => onLightingChange?.("useThreeColors", e.target.checked)}
                className="h-3.5 w-3.5 accent-[#d4af37]"
              />
              <span>تدرج 3 ألوان</span>
            </label>
          </div>

          <div className="space-y-3.5">
            {/* 3 Color Pickers */}
            <div className="grid grid-cols-1 gap-2.5">
              <ColorPickerRow
                label="محطة اللون 1 (Color Stop 1 - البداية)"
                value={light.colorStop1}
                onChange={(val) => {
                  onLightingChange?.("colorStop1", val);
                  onGlobalChange?.("mainColor", val);
                  onGlobalChange?.("color", val);
                }}
              />
              <ColorPickerRow
                label="محطة اللون 2 (Color Stop 2 - الوسط)"
                value={light.colorStop2}
                onChange={(val) => onLightingChange?.("colorStop2", val)}
              />
              {light.useThreeColors && (
                <ColorPickerRow
                  label="محطة اللون 3 (Color Stop 3 - النهاية)"
                  value={light.colorStop3}
                  onChange={(val) => onLightingChange?.("colorStop3", val)}
                />
              )}
            </div>

            {/* Gradient Angle Stepper */}
            <StepperControl
              label="زاوية التدرج (Gradient Angle)"
              value={light.gradientAngle}
              min={0}
              max={360}
              step={1}
              display={`${light.gradientAngle}°`}
              onChange={(val) => onLightingChange?.("gradientAngle", val)}
            />

            {/* Bottom LED Glow Toggle & Controls */}
            <div className="rounded-xl border border-[#d4af37]/20 bg-black/20 p-3 shadow-[inset_0_1px_5px_rgba(0,0,0,.3)] space-y-3">
              <label className="flex items-center justify-between text-xs text-slate-200 cursor-pointer">
                <span className="font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                  إضاءة سفلية (Bottom LED Glow)
                </span>
                <input
                  type="checkbox"
                  checked={light.showBottomGlow}
                  onChange={(e) => onLightingChange?.("showBottomGlow", e.target.checked)}
                  className="h-4 w-4 accent-[#d4af37] cursor-pointer"
                />
              </label>

              {light.showBottomGlow && (
                <>
                  <ColorPickerRow
                    label="لون توهج LED (Glow Color)"
                    value={light.glowColor}
                    onChange={(val) => {
                      onLightingChange?.("glowColor", val);
                      onGlobalChange?.("accentColor", val);
                    }}
                  />
                  <StepperControl
                    label="مدى انتشار التوهج (Glow Spread)"
                    value={light.glowSpread}
                    min={0}
                    max={80}
                    step={1}
                    display={`${light.glowSpread}px`}
                    onChange={(val) => onLightingChange?.("glowSpread", val)}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. TAB 3: الفيزياء والشطف (Bevel & Emboss) */}
      {(activeTab === "physics" || activeTab === "all") && (
        <section className="rounded-[22px] border border-[#d4af37]/25 bg-[linear-gradient(150deg,rgba(15,35,26,.97),rgba(5,15,12,.96))] p-4 shadow-[0_16px_40px_rgba(0,0,0,.26),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#fff8e7]">
              <span className="text-base">⚙️</span>
              الفيزياء والشطف (Bevel & Emboss)
            </h3>
            <span className="text-[10px] text-[#d4af37]">3D Physics</span>
          </div>

          <div className="space-y-4">
            {/* Bevel Depth Stepper */}
            <StepperControl
              label="عمق الشطف والبروز (Bevel Depth)"
              value={light.bevelDepth}
              min={0}
              max={16}
              step={1}
              display={`${light.bevelDepth}px`}
              onChange={(val) => {
                onLightingChange?.("bevelDepth", val);
                onGlobalChange?.("bevelDepth", val);
              }}
            />

            {/* Quick Material Surface Presets */}
            <div>
              <label className="mb-2 block text-xs text-slate-300">النمط المادي السريع (Material Preset):</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {MATERIAL_SURFACES.filter((s) => s.id !== "flat").map((surface) => {
                  const isActive = currentSurface === surface.id;
                  return (
                    <button
                      key={surface.id}
                      type="button"
                      onClick={() => onGlobalChange?.("surfaceStyle", surface.id)}
                      className={`relative flex flex-col items-center justify-center rounded-xl border p-2 text-center transition cursor-pointer ${
                        isActive
                          ? "border-[#f0d779] bg-[linear-gradient(145deg,rgba(74,21,75,.65),rgba(21,43,33,.98))] font-bold text-[#fff8e7] shadow-[0_0_16px_rgba(212,175,55,.2)]"
                          : "border-white/[.08] bg-black/25 text-slate-400 hover:border-[#d4af37]/50 hover:text-white"
                      }`}
                    >
                      <span className="text-sm">{surface.glyph}</span>
                      <span className="text-[11px] mt-0.5">{surface.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. TAB 4: النصوص والظلال (Typography & Alignment) */}
      {(activeTab === "typography" || activeTab === "all") && (
        <section className="rounded-[22px] border border-[#d4af37]/25 bg-[linear-gradient(150deg,rgba(15,35,26,.97),rgba(5,15,12,.96))] p-4 shadow-[0_16px_40px_rgba(0,0,0,.26),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#fff8e7]">
              <span className="text-base">✍️</span>
              النصوص والظلال (Typography & Alignment)
            </h3>
            <span className="text-[10px] text-[#a8b7ad]">ألوان مستقلة تماماً</span>
          </div>

          <div className="space-y-3.5">
            {/* Title Font Size Stepper */}
            <StepperControl
              label="حجم خط العنوان (Title Font Size)"
              value={typo.titleSize}
              min={12}
              max={44}
              step={1}
              display={`${typo.titleSize}px`}
              onChange={(val) => onTypographyChange?.("titleSize", val)}
            />

            {/* Description Font Size Stepper */}
            <StepperControl
              label="حجم خط الوصف/النص (Desc Font Size)"
              value={typo.descSize}
              min={10}
              max={28}
              step={1}
              display={`${typo.descSize}px`}
              onChange={(val) => {
                onTypographyChange?.("descSize", val);
                onGlobalChange?.("fontSize", val);
              }}
            />

            {/* Alignment Buttons (Right, Center, Left) */}
            <div>
              <label className="mb-1.5 block text-xs text-slate-300">محاذاة النص (Alignment)</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "right", label: "يمين (Right ➔)" },
                  { id: "center", label: "وسط (Center ↔)" },
                  { id: "left", label: "يسار (Left ⬅)" },
                ].map((align) => {
                  const isSelected = typo.textAlign === align.id;
                  return (
                    <button
                      key={align.id}
                      type="button"
                      onClick={() => onTypographyChange?.("textAlign", align.id)}
                      className={`rounded-xl border py-2 text-xs font-semibold transition cursor-pointer ${
                        isSelected
                          ? "border-[#f0d779] bg-[linear-gradient(145deg,rgba(74,21,75,.65),rgba(21,43,33,.98))] text-[#fff8e7] shadow-[0_0_12px_rgba(212,175,55,.18)]"
                          : "border-white/[.08] bg-black/25 text-slate-400 hover:text-white hover:border-[#d4af37]/40"
                      }`}
                    >
                      {align.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Shadow Depth Stepper */}
            <StepperControl
              label="عمق ظل النص (Text Shadow Depth)"
              value={typo.textShadowDepth}
              min={0}
              max={12}
              step={1}
              display={`${typo.textShadowDepth}px`}
              onChange={(val) => onTypographyChange?.("textShadowDepth", val)}
            />

            {/* Text Color Pickers - Operating 100% Independently */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <ColorPickerRow
                label="لون العنوان (Title Color)"
                value={typo.titleColor}
                onChange={(val) => onTypographyChange?.("titleColor", val)}
              />
              <ColorPickerRow
                label="لون الوصف (Desc Color)"
                value={typo.descColor}
                onChange={(val) => onTypographyChange?.("descColor", val)}
              />
            </div>

            {/* Text Content Inputs */}
            <div className="rounded-xl border border-white/10 bg-black/15 p-3 space-y-2.5">
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-slate-300">نص العنوان الرئيسي (Title Text)</label>
                <input
                  type="text"
                  value={typo.titleText}
                  onChange={(e) => {
                    onTypographyChange?.("titleText", e.target.value);
                    onElementParamChange?.(activeElement, "title", e.target.value);
                    onElementParamChange?.(activeElement, "text", e.target.value);
                  }}
                  className="w-full rounded-lg border border-white/10 bg-[#07120d] px-3 py-1.5 text-xs text-[#eae5d9] focus:border-[#d4af37] focus:outline-none"
                  placeholder="ادخل نص العنوان..."
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-slate-300">نص الوصف / الشارة (Description / Badge Text)</label>
                <input
                  type="text"
                  value={typo.descText}
                  onChange={(e) => {
                    onTypographyChange?.("descText", e.target.value);
                    onElementParamChange?.(activeElement, "description", e.target.value);
                  }}
                  className="w-full rounded-lg border border-white/10 bg-[#07120d] px-3 py-1.5 text-xs text-[#eae5d9] focus:border-[#d4af37] focus:outline-none"
                  placeholder="ادخل نص الوصف أو اسم المصمم..."
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. TAB 5: الحركات (Animations) */}
      {(activeTab === "animations" || activeTab === "all") && (
        <section className="rounded-[22px] border border-[#d4af37]/25 bg-[linear-gradient(150deg,rgba(15,35,26,.97),rgba(5,15,12,.96))] p-4 shadow-[0_16px_40px_rgba(0,0,0,.26),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#fff8e7]">
              <span className="text-base">✨</span>
              الحركات (Animations & Motion)
            </h3>
            <span className="text-[10px] text-[#70e6bb]">فيزياء حركية مستقلة</span>
          </div>

          <div className="space-y-3.5">
            {/* Entrance Animation Selector with dark styling */}
            <div>
              <label htmlFor="beso-entrance-anim" className="mb-1.5 block text-xs text-slate-300">
                حركة الظهور (Entrance Animation)
              </label>
              <select
                id="beso-entrance-anim"
                value={anim.entranceAnimation}
                onChange={(e) => onAnimationsChange?.("entranceAnimation", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#081711] px-3 py-2 text-xs text-[#eae5d9] shadow-[inset_0_2px_5px_rgba(0,0,0,.45)] focus:border-[#d4af37] focus:outline-none"
              >
                <option value="fadeUp" className="bg-[#081711] text-[#fff8e7] py-1.5">ظهور للأعلى (Fade In Up)</option>
                <option value="zoomIn" className="bg-[#081711] text-[#fff8e7] py-1.5">تكبير ناعم (Zoom In)</option>
                <option value="slideDown" className="bg-[#081711] text-[#fff8e7] py-1.5">انزلاق لأسفل (Slide Down)</option>
                <option value="pulseGlow" className="bg-[#081711] text-[#fff8e7] py-1.5">نبض متوهج (Pulse Glow)</option>
              </select>
            </div>

            {/* Hover Effects Selector with dark styling */}
            <div>
              <label htmlFor="beso-hover-effect" className="mb-1.5 block text-xs text-slate-300">
                تأثير مرور المؤشر (Hover Effect)
              </label>
              <select
                id="beso-hover-effect"
                value={anim.hoverEffect}
                onChange={(e) => onAnimationsChange?.("hoverEffect", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#081711] px-3 py-2 text-xs text-[#eae5d9] shadow-[inset_0_2px_5px_rgba(0,0,0,.45)] focus:border-[#d4af37] focus:outline-none"
              >
                <option value="liftScale" className="bg-[#081711] text-[#fff8e7] py-1.5">رفع وتكبير فيزيائي (Lift & Scale)</option>
                <option value="glowExpand" className="bg-[#081711] text-[#fff8e7] py-1.5">توسيع هالة التوهج (Glow Expand)</option>
                <option value="tilt3d" className="bg-[#081711] text-[#fff8e7] py-1.5">إمالة مجسمة (Tilt 3D)</option>
                <option value="neonPulse" className="bg-[#081711] text-[#fff8e7] py-1.5">وميض نيون (Neon Flash)</option>
              </select>
            </div>

            {/* Transition Speed Stepper */}
            <StepperControl
              label="سرعة الحركة والانتقال (Transition Speed)"
              value={Math.round(anim.transitionSpeed * 100)}
              min={10}
              max={150}
              step={5}
              display={`${(anim.transitionSpeed).toFixed(2)}s`}
              onChange={(val) => onAnimationsChange?.("transitionSpeed", val / 100)}
            />

            {/* Sound Preset Library Selector */}
            <div className="space-y-2 border-t border-[#d4af37]/20 pt-3">
              <div className="flex items-center justify-between">
                <label htmlFor="beso-sound-preset" className="block text-xs font-semibold text-emerald-400">
                  🔊 الصوت التفاعلي للقطعة (UI Sound FX)
                </label>
                <span className="text-[10px] text-[#d4af37] font-mono">20 خامة ونغمة فاخرة</span>
              </div>
              <div className="flex gap-2">
                <select
                  id="beso-sound-preset"
                  value={anim.soundPreset}
                  onChange={(e) => onAnimationsChange?.("soundPreset", e.target.value)}
                  className="flex-1 rounded-xl border border-emerald-500/30 bg-[#081711] px-3 py-2 text-xs text-[#eae5d9] shadow-[inset_0_2px_5px_rgba(0,0,0,.45)] focus:border-emerald-400 focus:outline-none"
                >
                  <optgroup label="🔊 المؤثرات الأساسية (Standard UI)" className="bg-[#05110c] text-emerald-300 font-bold">
                    {STANDARD_SOUND_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id} className="bg-[#081711] text-[#fff8e7] font-normal py-1.5">
                        {preset.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="💎 الألحان النغمية الفاخرة (Luxury Symphony)" className="bg-[#05110c] text-[#ffd700] font-bold">
                    {LUXURY_SOUND_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id} className="bg-[#081711] text-[#fff8e7] font-normal py-1.5">
                        {preset.label}
                      </option>
                    ))}
                  </optgroup>
                </select>

                <button
                  type="button"
                  onClick={() => playPresetSound(anim.soundPreset, true)}
                  title="تجربة الصوت التفاعلي"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/40 hover:text-white transition cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>▶️</span>
                  <span>تجربة</span>
                </button>
              </div>
            </div>

            {/* Hero Particle Overlay Selector */}
            <div className="space-y-2 border-t border-[#d4af37]/20 pt-3">
              <div className="flex items-center justify-between">
                <label htmlFor="beso-particle-overlay" className="block text-xs font-semibold text-cyan-400">
                  ✨ طبقة جسيمات الهيرو (Hero Particle Overlay)
                </label>
                <span className="text-[10px] text-cyan-300 font-mono">3 تأثيرات إضافية</span>
              </div>
              <select
                id="beso-particle-overlay"
                value={anim.particleOverlay}
                onChange={(e) => onAnimationsChange?.("particleOverlay", e.target.value)}
                className="w-full rounded-xl border border-cyan-500/30 bg-[#081711] px-3 py-2 text-xs text-[#eae5d9] shadow-[inset_0_2px_5px_rgba(0,0,0,.45)] focus:border-cyan-400 focus:outline-none"
              >
                <option value="none" className="bg-[#081711] text-[#fff8e7] py-1.5">🚫 بدون طبقة جسيمات (None)</option>
                <option value="particles-cosmic-dust" className="bg-[#081711] text-[#fff8e7] py-1.5">✨ غبار كوني وميض بوكيه (Cosmic Dust)</option>
                <option value="particles-cyber-mesh" className="bg-[#081711] text-[#fff8e7] py-1.5">🌐 شبكة سايبر متصلة (Cyber Mesh Nodes)</option>
                <option value="particles-energy-ember" className="bg-[#081711] text-[#fff8e7] py-1.5">🔥 شرارات وطاقة متطايرة (Energy Embers)</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {/* Reset Action */}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-xl border border-[#d4af37]/30 bg-[linear-gradient(145deg,rgba(20,40,30,.8),rgba(8,16,12,.9))] py-2.5 text-xs font-semibold text-[#d4af37] hover:border-[#d4af37]/70 hover:text-[#fff8e7] transition shadow-sm cursor-pointer"
        >
          ⟲ إعادة ضبط جميع إعدادات ومحددات الاستوديو
        </button>
      )}
    </div>
  );
}

function StepperControl({ label, value, min, max, step = 1, display, onChange }) {
  const numValue = Number(value);

  const handleDecrement = () => {
    const delta = step <= 1 ? 1 : step;
    const next = Math.max(min, Math.round((numValue - delta) * 100) / 100);
    onChange(next);
  };

  const handleIncrement = () => {
    const delta = step <= 1 ? 1 : step;
    const next = Math.min(max, Math.round((numValue + delta) * 100) / 100);
    onChange(next);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-xs text-slate-300">
        <span className="font-medium">{label}</span>
        <span className="shrink-0 font-mono text-[11px] font-bold text-[#d4af37]">
          {display !== undefined ? display : `${numValue}px`}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={numValue <= min}
          aria-label={`تقليل ${label} -1`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[linear-gradient(145deg,#0a1d15,#040e0a)] text-sm font-bold text-[#d4af37] shadow-[0_2px_4px_rgba(0,0,0,.3)] transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 active:scale-95 disabled:opacity-30 cursor-pointer"
        >
          −
        </button>
        <div className="relative flex flex-1 items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={numValue}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-1.5 cursor-pointer rounded-lg bg-black/50 accent-[#d4af37]"
          />
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={numValue >= max}
          aria-label={`زيادة ${label} +1`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[linear-gradient(145deg,#0a1d15,#040e0a)] text-sm font-bold text-[#d4af37] shadow-[0_2px_4px_rgba(0,0,0,.3)] transition hover:border-[#d4af37] hover:bg-[#d4af37]/20 active:scale-95 disabled:opacity-30 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}

const RangeControl = StepperControl;

function ColorPickerRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
      <span className="truncate">{label}</span>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-mono text-[11px] text-[#d4af37]">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-9 cursor-pointer rounded border border-slate-600 bg-transparent p-0"
        />
      </div>
    </div>
  );
}

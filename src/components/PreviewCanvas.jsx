// components/PreviewCanvas.jsx
import React, { useState, useRef, useEffect } from "react";
import { playSoftClick, playHoverTone, playPresetSound } from "../lib/soundEngine";

const backgroundOptions = [
  {
    id: "dark",
    label: "رخام الزمرد",
    className:
      "bg-[#03150e] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.22),transparent_70%),linear-gradient(180deg,#02140d_0%,#041f14_60%,#010906_100%)]",
  },
  {
    id: "light",
    label: "عاجي فاخر",
    className: "bg-[#eae5d9] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.2),transparent_70%)]",
  },
  {
    id: "grid",
    label: "شبكة ذهبية",
    className:
      "bg-[#04130f] bg-[radial-gradient(rgba(212,175,55,.28)_1px,transparent_1px)] [background-size:20px_20px]",
  },
];

const viewportOptions = [
  { id: "mobile", label: "موبايل", icon: "📱", widthClass: "max-w-[375px]", desc: "375px" },
  { id: "tablet", label: "تابلت", icon: "📟", widthClass: "max-w-[640px]", desc: "640px" },
  { id: "desktop", label: "سطح مكتب", icon: "💻", widthClass: "max-w-full", desc: "كامل" },
];

const zoomLevels = [50, 75, 100, 125, 150];

export default function PreviewCanvas({
  generatedCode,
  elementLabel,
  soundPreset = "soft-click",
  theme = "dark",
  hdEnabledDefault = true,
  media,
}) {
  const [bgMode, setBgMode] = useState("dark");
  const [viewportMode, setViewportMode] = useState("desktop");
  const [isHdMode, setIsHdMode] = useState(hdEnabledDefault);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const ctaBtn = stage.querySelector(".sparkle-btn");
    const bentoCard = stage.querySelector(".magic-bento-card");

    const onCtaClick = () => {
      playPresetSound("cyber-neon");
    };

    const onBentoMouseMove = (e) => {
      if (!bentoCard) return;
      const rect = bentoCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      bentoCard.style.setProperty("--glow-x", `${x}%`);
      bentoCard.style.setProperty("--glow-y", `${y}%`);
      bentoCard.style.setProperty("--glow-intensity", "1");
    };

    const onBentoMouseLeave = () => {
      if (!bentoCard) return;
      bentoCard.style.setProperty("--glow-intensity", "0");
    };

    if (ctaBtn) {
      ctaBtn.addEventListener("click", onCtaClick);
    }

    if (bentoCard) {
      bentoCard.addEventListener("mousemove", onBentoMouseMove);
      bentoCard.addEventListener("mouseleave", onBentoMouseLeave);
    }

    // Split Hero Synchronized Dual Column Auto-Slider in Preview Canvas
    const splitHero = stage.querySelector(".split-hero-banner");
    let splitHeroTimer;
    if (splitHero) {
      const rightSlides = splitHero.querySelectorAll(".col-right .slide-image");
      const leftSlides = splitHero.querySelectorAll(".col-left .slide-image");
      let currentIdx = 0;
      const total = Math.max(rightSlides.length, leftSlides.length);
      if (total > 1) {
        splitHeroTimer = setInterval(() => {
          currentIdx = (currentIdx + 1) % total;
          rightSlides.forEach((s, i) => s.classList.toggle("active", i === currentIdx));
          leftSlides.forEach((s, i) => s.classList.toggle("active", i === currentIdx));
        }, Math.round((media?.splitHeroInterval || 2.0) * 1000));
      }
    }

    return () => {
      if (ctaBtn) ctaBtn.removeEventListener("click", onCtaClick);
      if (bentoCard) {
        bentoCard.removeEventListener("mousemove", onBentoMouseMove);
        bentoCard.removeEventListener("mouseleave", onBentoMouseLeave);
      }
      if (splitHeroTimer) {
        clearInterval(splitHeroTimer);
      }
    };
  }, [generatedCode.html, media?.splitHeroInterval]);

  const isLight = theme === "light";

  const allBackgroundOptions = [
    ...backgroundOptions,
    ...(media?.heroBgImage
      ? [
          {
            id: "hero-backdrop",
            label: "خلفية الهيرو 🌌",
            className: "bg-[#03080e]",
          },
        ]
      : []),
  ];

  const background = allBackgroundOptions.find((option) => option.id === bgMode)?.className || backgroundOptions[0].className;
  const currentViewport = viewportOptions.find((option) => option.id === viewportMode) || viewportOptions[2];

  const handleZoom = (level) => {
    playSoftClick();
    setZoom(level);
  };

  const toggleHd = () => {
    playSoftClick();
    setIsHdMode((prev) => !prev);
  };

  return (
    <section
      ref={canvasRef}
      className={`relative flex min-h-[500px] h-full flex-col overflow-hidden rounded-[24px] border p-4 backdrop-blur-xl transition-all duration-300 ${
        isLight
          ? "border-[#d4af37]/60 bg-[linear-gradient(165deg,#fcf9f2_0%,#f5eee1_50%,#eae0d0_100%)] text-[#2d2215] shadow-[0_20px_50px_rgba(0,0,0,.18),inset_0_1px_2px_#ffffff]"
          : "border-[#d4af37]/25 bg-[linear-gradient(145deg,rgba(17,38,29,.96),rgba(5,15,12,.97))] text-[#eae5d9] shadow-[0_24px_70px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.08)]"
      } ${isFullscreen ? "fixed inset-2 z-50 !max-h-none !min-h-screen" : ""}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#d4af37]/[.06] blur-3xl" />

      {/* Top Toolbar */}
      <div
        className={`relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-3 ${
          isLight ? "border-[#d4af37]/30" : "border-[#d4af37]/20"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm shadow-sm ${
              isLight
                ? "border-[#d4af37]/50 bg-white/80 text-[#8c6d1f]"
                : "border-[#d4af37]/40 bg-black/40 text-[#f5d77f] shadow-[0_0_12px_rgba(212,175,55,0.2)]"
            }`}
          >
            👁️
          </span>
          <div className="flex items-center gap-2">
            <h2 className={`text-sm font-bold ${isLight ? "text-[#2d2114]" : "text-[#fff8e7]"}`}>
              مسرح المعاينة المباشرة (HD Canvas)
            </h2>
            {elementLabel && (
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[9px] font-semibold ${
                  isLight
                    ? "border-[#d4af37]/50 bg-white/90 text-[#846210]"
                    : "border-[#d4af37]/30 bg-[#061b14] text-[#f5df93]"
                }`}
              >
                {elementLabel}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls: HD Mode, Viewport, Zoom, Background */}
        <div className="flex flex-wrap items-center gap-2">
          {/* HD Resolution Mode Toggle */}
          <button
            type="button"
            onClick={toggleHd}
            onMouseEnter={playHoverTone}
            title={isHdMode ? "الدقة الفائقة مفعلة (Retina HD Crisp)" : "تفعيل نمط الدقة الفائقة"}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[10px] font-bold transition cursor-pointer ${
              isHdMode
                ? "border-emerald-400/80 bg-emerald-950/80 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.45)]"
                : isLight
                ? "border-[#d4af37]/40 bg-[#0f291e] text-white hover:text-emerald-300"
                : "border-white/20 bg-black/60 text-white hover:text-emerald-300"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isHdMode ? "bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" : "bg-emerald-500"}`} />
            <span className="font-bold">{isHdMode ? "دقة فائقة HD" : "دقة قياسية"}</span>
          </button>

          {/* Zoom Levels with Bright Phosphor Neon / Pure Crisp White */}
          <div className={`hidden sm:flex items-center gap-1 rounded-xl border p-1 text-[10px] shadow-sm ${
            isLight
              ? "border-[#d4af37]/40 bg-[#081f16]"
              : "border-[#d4af37]/30 bg-black/70"
          }`}>
            <span className="px-1 text-emerald-400 font-mono text-xs">🔍</span>
            {zoomLevels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => handleZoom(lvl)}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition cursor-pointer ${
                  zoom === lvl
                    ? "bg-[#d4af37] text-black font-extrabold shadow-[0_0_10px_rgba(212,175,55,0.7)]"
                    : "text-emerald-300 hover:text-white hover:bg-emerald-500/20 active:scale-95"
                }`}
              >
                {lvl}%
              </button>
            ))}
          </div>

          {/* Viewport Switcher: Mobile / Tablet / Desktop */}
          <div
            className={`flex gap-1 rounded-xl border p-1 text-[10px] ${
              isLight ? "border-[#d4af37]/35 bg-white/70" : "border-[#d4af37]/30 bg-black/50"
            }`}
            aria-label="حجم شاشة المعاينة"
          >
            {viewportOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-pressed={viewportMode === opt.id}
                title={`${opt.label} (${opt.desc})`}
                onClick={() => {
                  playSoftClick();
                  setViewportMode(opt.id);
                }}
                onMouseEnter={playHoverTone}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition cursor-pointer ${
                  viewportMode === opt.id
                    ? isLight
                      ? "border border-[#c99e32] bg-[linear-gradient(145deg,#fdedcb,#edd18c)] font-bold text-[#2b1f09] shadow-sm"
                      : "border border-[#d4af37] bg-[linear-gradient(145deg,#0e5a3e,#073322)] font-bold text-[#f5df93] shadow-[0_0_12px_rgba(212,175,55,.25),inset_0_1px_0_rgba(255,255,255,.3)]"
                    : isLight
                    ? "border border-transparent text-[#68533d] hover:text-[#1e150a]"
                    : "border border-transparent text-[#9ba99f] hover:text-[#fff8e7]"
                }`}
              >
                <span>{opt.icon}</span>
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Background Mode Switcher */}
          <div
            className={`flex gap-1 rounded-xl border p-1 text-[10px] ${
              isLight ? "border-[#d4af37]/35 bg-white/70" : "border-white/[.08] bg-black/35"
            }`}
            aria-label="خلفية المعاينة"
          >
            {allBackgroundOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={bgMode === option.id}
                onClick={() => {
                  playSoftClick();
                  setBgMode(option.id);
                }}
                onMouseEnter={playHoverTone}
                className={`rounded-lg px-2 py-1 transition cursor-pointer ${
                  bgMode === option.id
                    ? isLight
                      ? "border border-[#c99e32] bg-[linear-gradient(145deg,#fdedcb,#edd18c)] font-semibold text-[#20180b] shadow-sm"
                      : "border border-[#f0d779]/80 bg-[linear-gradient(145deg,#e2c15d,#9d7624)] font-semibold text-[#20180b] shadow-[0_2px_9px_rgba(212,175,55,.22),inset_0_1px_0_rgba(255,255,255,.5)]"
                    : isLight
                    ? "border border-transparent text-[#68533d] hover:text-[#1e150a]"
                    : "border border-transparent text-[#9ba99f] hover:text-[#fff8e7]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => {
              playSoftClick();
              setIsFullscreen(!isFullscreen);
            }}
            title={isFullscreen ? "تصغير المعاينة" : "تكبير الشاشة كاملة"}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-slate-300 hover:text-white"
          >
            {isFullscreen ? "↙" : "⛶"}
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport Area with HD Scaling */}
      <div
        className={`relative isolate flex min-h-[390px] flex-1 items-center justify-center overflow-hidden rounded-[20px] border border-[#d4af37]/20 p-6 transition-colors ${background} shadow-[inset_0_0_50px_rgba(0,0,0,.48)] ${
          isHdMode ? "canvas-hd-mode canvas-hd-active" : ""
        }`}
      >
        {/* Custom Hero Backdrop on Canvas Stage */}
        {media?.heroBgImage && bgMode === "hero-backdrop" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-center bg-no-repeat transition-all duration-300"
            style={{
              backgroundImage: `url('${media.heroBgImage}')`,
              backgroundSize: media.heroBgObjectFit || "cover",
              opacity: media.heroBgOverlayOpacity ?? 0.85,
              filter: media.heroBgBlur > 0 ? `blur(${media.heroBgBlur}px)` : "none",
            }}
          >
            {media.heroBgTint && (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: media.heroBgTint, opacity: 0.35 }}
              />
            )}
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(212,175,55,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_78%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d4af37]/20 shadow-[0_0_70px_rgba(74,21,75,.22),inset_0_0_50px_rgba(13,59,46,.25)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[218px] w-[218px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a76ec2]/25 shadow-[0_0_45px_rgba(122,61,155,.12)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[18%] top-[21%] h-1.5 w-1.5 rounded-full bg-[#f2db8b] shadow-[0_0_12px_4px_rgba(242,219,139,.35)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[24%] right-[17%] h-1 w-1 rounded-full bg-[#bc7be0] shadow-[0_0_12px_4px_rgba(188,123,224,.45)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[15%] h-8 w-[72%] rounded-[50%] bg-[#d4af37]/[.08] blur-xl"
        />

        <style>{generatedCode.css}</style>

        {/* Dynamic Responsive Viewport Wrapper */}
        <div
          data-viewport={viewportMode}
          style={{
            transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
            transformOrigin: "center center",
            transition: "transform 0.25s ease-out",
          }}
          className={`relative z-10 w-full flex items-center justify-center transition-all duration-300 ${
            currentViewport.widthClass
          } ${
            viewportMode !== "desktop"
              ? "p-4 border border-dashed border-[#d4af37]/35 rounded-2xl bg-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : ""
          }`}
        >
          <div
            ref={stageRef}
            className="relative z-10 w-full flex items-center justify-center [filter:drop-shadow(0_22px_20px_rgba(0,0,0,.48))]"
            onPointerDown={() => playPresetSound(soundPreset)}
            onMouseEnter={playHoverTone}
            dangerouslySetInnerHTML={{ __html: generatedCode.html }}
          />
        </div>

        {/* Bottom Badges */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[8px] tracking-[.2em] font-bold text-white shadow-sm">
            {isHdMode ? "HD RETINA ENGINE 4K" : "LIVE MATERIAL RENDER"}
          </span>
          <span className="rounded-full border border-emerald-400/50 bg-[#061e14]/90 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            {currentViewport.desc} · {zoom}%
          </span>
        </div>
      </div>
    </section>
  );
}

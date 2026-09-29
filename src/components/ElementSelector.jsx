// components/ElementSelector.jsx
import { useState } from "react";
import { playSoftClick, playHoverTone } from "../lib/soundEngine";

export default function ElementSelector({ elements, activeElementId, onSelectElement, theme = "dark" }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const isLight = theme === "light";

  const carouselElements = elements.filter(
    (el) =>
      el.id.startsWith("carousel-") ||
      el.id.startsWith("marquee-") ||
      el.id === "brand-identity-card"
  );
  const heroElements = elements.filter((el) => el.category === "hero");
  const premiumElements = elements.filter((el) => el.category === "premium");
  const standardElements = elements.filter((el) => el.category === "standard");

  const displayedElements =
    selectedCategory === "carousels"
      ? carouselElements
      : selectedCategory === "hero"
      ? heroElements
      : selectedCategory === "premium"
      ? premiumElements
      : selectedCategory === "standard"
      ? standardElements
      : elements;

  return (
    <section className={`relative overflow-hidden rounded-[24px] border p-4 backdrop-blur-xl transition-colors duration-300 ${
      isLight
        ? "border-[#d4af37]/60 bg-[linear-gradient(165deg,#fcf9f2_0%,#f5eee1_50%,#eae0d0_100%)] text-[#2d2215] shadow-[0_20px_50px_rgba(0,0,0,.18),inset_0_1px_2px_#ffffff]"
        : "border-[#d4af37]/35 bg-[linear-gradient(150deg,rgba(11,26,19,.98),rgba(3,10,7,.99))] text-[#eae5d9] shadow-[0_24px_60px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.08)]"
    }`}>
      <div aria-hidden="true" className="pointer-events-none absolute -left-12 -top-16 h-32 w-32 rounded-full bg-[#4a154b]/20 blur-3xl" />
      
      {/* Header */}
      <div className={`mb-3 flex items-center justify-between gap-3 border-b pb-2.5 ${
        isLight ? "border-[#d4af37]/30" : "border-[#d4af37]/15"
      }`}>
        <div className="flex items-center gap-2.5">
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs shadow-sm ${
            isLight
              ? "border-[#d4af37]/50 bg-white/80 text-[#8c6d1f]"
              : "border-[#d4af37]/40 bg-black/40 text-[#f5d77f]"
          }`}>
            💎
          </span>
          <div>
            <h2 className={`text-sm font-bold ${isLight ? "text-[#2d2114]" : "text-[#fff8e7]"}`}>مكتبة العناصر والتراكيب المادية</h2>
            <p className={`mt-0.5 text-[10px] ${isLight ? "text-[#6b5843]" : "text-[#aebbb4]"}`}>اختر القطعة التي تريد تشكيلها وتصدير كودها</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-[10px] font-mono font-bold shadow-sm ${
            isLight
              ? "border-[#d4af37]/60 bg-white/90 text-[#846210]"
              : "border-[#d4af37]/40 bg-[#072118]/90 text-[#f5df93]"
          }`}>
            {elements.filter(e => e.status === "active").length} متاحة
          </span>
          {/* Decorative Purple Jewel */}
          <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#4c1d95] shadow-[0_0_8px_#9333ea]" />
        </div>
      </div>

      {/* Category Toggle Tabs */}
      <div className={`mb-3 grid grid-cols-2 gap-1 rounded-xl border p-1 sm:grid-cols-5 ${
        isLight ? "border-[#d4af37]/30 bg-white/60" : "border-white/10 bg-black/30"
      }`}>
        <button
          type="button"
          onClick={() => {
            playSoftClick();
            setSelectedCategory("all");
          }}
          onMouseEnter={playHoverTone}
          className={`rounded-lg py-1.5 text-center text-xs font-semibold transition cursor-pointer ${
            selectedCategory === "all"
              ? isLight
                ? "bg-[linear-gradient(145deg,#fdedcb,#edd18c)] text-[#2b1f09] border border-[#c99e32] shadow-sm font-bold"
                : "bg-[#d4af37]/25 text-[#fff8e7] border border-[#d4af37]/50 shadow-sm"
              : isLight ? "text-[#68533d] hover:text-[#1e150a]" : "text-slate-400 hover:text-white"
          }`}
        >
          الكل (All)
        </button>
        <button
          type="button"
          onClick={() => {
            playSoftClick();
            setSelectedCategory("carousels");
          }}
          onMouseEnter={playHoverTone}
          className={`rounded-lg py-1.5 text-center text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1 ${
            selectedCategory === "carousels"
              ? isLight
                ? "bg-[linear-gradient(145deg,#fdedcb,#edd18c)] text-[#2b1f09] border border-[#c99e32] shadow-sm font-bold"
                : "bg-[linear-gradient(135deg,rgba(168,85,247,.4),rgba(30,10,40,.8))] text-[#f5df93] border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,.4)]"
              : isLight ? "text-purple-700 hover:text-purple-950" : "text-purple-400 hover:text-white"
          }`}
        >
          <span>🧊</span>
          <span>مجسمات 3D</span>
        </button>
        <button
          type="button"
          onClick={() => {
            playSoftClick();
            setSelectedCategory("hero");
          }}
          onMouseEnter={playHoverTone}
          className={`rounded-lg py-1.5 text-center text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1 ${
            selectedCategory === "hero"
              ? isLight
                ? "bg-[linear-gradient(135deg,rgba(16,185,129,.25),rgba(6,78,59,.4))] text-[#064e3b] border border-emerald-500 shadow-sm font-bold"
                : "bg-[linear-gradient(135deg,rgba(16,185,129,.4),rgba(6,78,59,.8))] text-[#fff8e7] border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,.4)]"
              : isLight ? "text-emerald-700 hover:text-emerald-950" : "text-emerald-400 hover:text-white"
          }`}
        >
          <span>🌌</span>
          <span>الهيرو (Hero)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            playSoftClick();
            setSelectedCategory("premium");
          }}
          onMouseEnter={playHoverTone}
          className={`rounded-lg py-1.5 text-center text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1 ${
            selectedCategory === "premium"
              ? isLight
                ? "bg-[linear-gradient(145deg,#fdedcb,#edd18c)] text-[#2b1f09] border border-[#c99e32] shadow-sm font-bold"
                : "bg-[linear-gradient(135deg,rgba(212,175,55,.4),rgba(74,21,75,.6))] text-[#fff8e7] border border-[#f0d779] shadow-[0_0_12px_rgba(212,175,55,.3)]"
              : isLight ? "text-[#8c6d1f] hover:text-[#3b2a05]" : "text-[#d4af37] hover:text-white"
          }`}
        >
          <span>💎</span>
          <span>القطع الفاخرة</span>
        </button>
        <button
          type="button"
          onClick={() => {
            playSoftClick();
            setSelectedCategory("standard");
          }}
          onMouseEnter={playHoverTone}
          className={`rounded-lg py-1.5 text-center text-xs font-semibold transition cursor-pointer ${
            selectedCategory === "standard"
              ? isLight
                ? "bg-white text-[#2b1f09] border border-[#d4af37]/60 shadow-sm font-bold"
                : "bg-white/15 text-[#fff8e7] border border-white/20 shadow-sm"
              : isLight ? "text-[#68533d] hover:text-[#1e150a]" : "text-slate-400 hover:text-white"
          }`}
        >
          ⚡ الأساسية
        </button>
      </div>

      {/* Elements Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {displayedElements.map((element) => {
          const isActive = element.id === activeElementId;
          const isAvailable = element.status === "active";
          const isPremium = element.category === "premium";

          return (
            <button
              key={element.id}
              type="button"
              aria-pressed={isAvailable ? isActive : undefined}
              aria-label={`${element.label}${isAvailable ? "" : " — قريبًا"}`}
              disabled={!isAvailable}
              onClick={() => {
                playSoftClick();
                onSelectElement(element.id);
              }}
              onMouseEnter={() => {
                if (isAvailable) playHoverTone();
              }}
              className={`relative flex min-h-[92px] flex-col items-start justify-between rounded-xl border p-3 text-right transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37] cursor-pointer ${
                isActive
                  ? isLight
                    ? "border-[#bfa143] bg-[linear-gradient(145deg,#fdedcb,#ebd08d)] text-[#291c06] shadow-[0_4px_16px_rgba(212,175,55,.4),inset_0_1px_2px_#ffffff]"
                    : "border-[#e5c35d] bg-[linear-gradient(145deg,rgba(74,21,75,.65),rgba(18,35,27,.98))] text-[#fff8e7] shadow-[0_0_24px_rgba(212,175,55,.22),inset_0_1px_0_rgba(255,255,255,.2)]"
                  : isAvailable
                  ? isLight
                    ? "border-[#d4af37]/40 bg-[linear-gradient(145deg,#ffffff_0%,#f8f2e7_60%,#ede2cf_100%)] text-[#3a2c1d] shadow-[inset_0_1px_0_#ffffff,0_4px_12px_rgba(0,0,0,.06)] hover:-translate-y-0.5 hover:border-[#bfa143] hover:text-[#181105]"
                    : isPremium
                    ? "border-[#d4af37]/35 bg-[linear-gradient(145deg,rgba(28,48,37,.95),rgba(8,18,14,.96))] text-[#eae5d9] shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_20px_rgba(0,0,0,.22)] hover:-translate-y-0.5 hover:border-[#d4af37] hover:text-white"
                    : "border-white/10 bg-[linear-gradient(145deg,rgba(23,39,30,.88),rgba(5,15,12,.95))] text-[#d8ded9] shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_8px_16px_rgba(0,0,0,.15)] hover:-translate-y-0.5 hover:border-[#d4af37]/50 hover:text-white"
                  : "cursor-not-allowed border-white/5 bg-black/15 text-slate-500 opacity-70"
              }`}
            >
              <span className="flex w-full items-center justify-between gap-1.5">
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 place-items-center rounded-xl border text-base shadow-[inset_0_1px_0_rgba(255,255,255,.22)] ${
                    isActive
                      ? "border-[#f6e29a] bg-[linear-gradient(145deg,#f0d67d,#9f7724)] text-[#24190b]"
                      : isLight
                      ? "border-[#d4af37]/40 bg-white text-[#8c6d1f]"
                      : isPremium
                      ? "border-[#d4af37]/40 bg-[linear-gradient(145deg,#364835,#0e1e16)] text-[#ffd700]"
                      : "border-[#d4af37]/20 bg-[linear-gradient(145deg,#24382b,#0a1711)] text-[#ddc46f]"
                  }`}
                >
                  {element.glyph}
                </span>

                {isPremium && (
                  <span className={`rounded-full border px-1.5 py-0.5 text-[8px] font-bold tracking-wider ${
                    isLight
                      ? "border-[#bfa143] bg-[#fcedc5] text-[#705206]"
                      : "border-[#d4af37]/50 bg-[#d4af37]/15 text-[#d4af37]"
                  }`}>
                    {element.badge || "VIP ✦"}
                  </span>
                )}
                {!isAvailable && (
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-slate-400">
                    قريبًا
                  </span>
                )}
              </span>

              <span className="mt-1">
                <span className="block text-xs font-bold leading-snug">{element.label}</span>
                <span className={`mt-0.5 block text-[9px] tracking-wide ${isLight ? "text-[#7a6752]" : "text-[#a8b7ad]"}`}>
                  {element.subLabel}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

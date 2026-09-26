// components/ElementSelector.jsx
import { useState } from "react";
import { playSoftClick, playHoverTone } from "../lib/soundEngine";

export default function ElementSelector({ elements, activeElementId, onSelectElement }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const heroElements = elements.filter((el) => el.category === "hero");
  const premiumElements = elements.filter((el) => el.category === "premium");
  const standardElements = elements.filter((el) => el.category === "standard");

  const displayedElements =
    selectedCategory === "hero"
      ? heroElements
      : selectedCategory === "premium"
      ? premiumElements
      : selectedCategory === "standard"
      ? standardElements
      : elements;

  return (
    <section className="relative overflow-hidden rounded-[22px] border border-[#d4af37]/25 bg-[linear-gradient(150deg,rgba(15,35,26,.97),rgba(5,15,12,.96))] p-4 shadow-[0_20px_50px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl">
      <div aria-hidden="true" className="pointer-events-none absolute -left-12 -top-16 h-32 w-32 rounded-full bg-[#4a154b]/20 blur-3xl" />
      
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-[#fff8e7]">مكتبة العناصر والتراكيب المادية</h2>
          <p className="mt-0.5 text-[11px] text-[#aebbb4]">اختر القطعة التي تريد تشكيلها وتصدير كودها</p>
        </div>
        <span className="rounded-full border border-[#d4af37]/30 bg-[#07120d]/90 px-2.5 py-1 text-[10px] font-mono text-[#d4af37]">
          {elements.filter(e => e.status === "active").length} متاحة
        </span>
      </div>

      {/* Category Toggle Tabs */}
      <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-black/30 p-1 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => {
            playSoftClick();
            setSelectedCategory("all");
          }}
          onMouseEnter={playHoverTone}
          className={`rounded-lg py-1.5 text-center text-xs font-semibold transition cursor-pointer ${
            selectedCategory === "all"
              ? "bg-[#d4af37]/25 text-[#fff8e7] border border-[#d4af37]/50 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          الكل (All)
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
              ? "bg-[linear-gradient(135deg,rgba(16,185,129,.4),rgba(6,78,59,.8))] text-[#fff8e7] border border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,.4)]"
              : "text-emerald-400 hover:text-white"
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
              ? "bg-[linear-gradient(135deg,rgba(212,175,55,.4),rgba(74,21,75,.6))] text-[#fff8e7] border border-[#f0d779] shadow-[0_0_12px_rgba(212,175,55,.3)]"
              : "text-[#d4af37] hover:text-white"
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
              ? "bg-white/15 text-[#fff8e7] border border-white/20 shadow-sm"
              : "text-slate-400 hover:text-white"
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
                  ? "border-[#e5c35d] bg-[linear-gradient(145deg,rgba(74,21,75,.65),rgba(18,35,27,.98))] text-[#fff8e7] shadow-[0_0_24px_rgba(212,175,55,.22),inset_0_1px_0_rgba(255,255,255,.2)]"
                  : isAvailable
                  ? isPremium
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
                      : isPremium
                      ? "border-[#d4af37]/40 bg-[linear-gradient(145deg,#364835,#0e1e16)] text-[#ffd700]"
                      : "border-[#d4af37]/20 bg-[linear-gradient(145deg,#24382b,#0a1711)] text-[#ddc46f]"
                  }`}
                >
                  {element.glyph}
                </span>

                {isPremium && (
                  <span className="rounded-full border border-[#d4af37]/50 bg-[#d4af37]/15 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-[#d4af37]">
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
                <span className="mt-0.5 block text-[9px] tracking-wide text-[#a8b7ad]">{element.subLabel}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}


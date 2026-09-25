// components/ElementSelector.jsx
export default function ElementSelector({ elements, activeElementId, onSelectElement }) {
  return (
    <section className="relative overflow-hidden rounded-[22px] border border-[#d4af37]/20 bg-[linear-gradient(150deg,rgba(15,35,26,.96),rgba(5,15,12,.95))] p-4 shadow-[0_20px_50px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl">
      <div aria-hidden="true" className="pointer-events-none absolute -left-12 -top-16 h-32 w-32 rounded-full bg-[#4a154b]/20 blur-3xl" />
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-[#fff8e7]">مكتبة العناصر</h2>
          <p className="mt-1 text-[11px] text-[#aebbb4]">اختر القطعة التي تريد تشكيلها</p>
        </div>
        <span className="rounded-full border border-[#d4af37]/25 bg-[#07120d]/80 px-2.5 py-1 text-[10px] text-[#d4af37]">٤ متاحة</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {elements.map((element) => {
          const isActive = element.id === activeElementId;
          const isAvailable = element.status === "active";
          return (
            <button
              key={element.id}
              type="button"
              aria-pressed={isAvailable ? isActive : undefined}
              aria-label={`${element.label}${isAvailable ? "" : " — قريبًا"}`}
              disabled={!isAvailable}
              onClick={() => onSelectElement(element.id)}
              className={`relative flex min-h-[88px] flex-col items-start justify-between rounded-xl border p-3 text-right transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37] ${
                isActive
                  ? "border-[#e5c35d]/80 bg-[linear-gradient(145deg,rgba(74,21,75,.58),rgba(18,35,27,.95))] text-[#fff8e7] shadow-[0_0_26px_rgba(168,78,194,.12),inset_0_1px_0_rgba(255,255,255,.15)]"
                  : isAvailable
                    ? "border-[#d4af37]/15 bg-[linear-gradient(145deg,rgba(23,39,30,.92),rgba(5,15,12,.95))] text-[#d8ded9] shadow-[inset_0_1px_0_rgba(255,255,255,.07),0_8px_18px_rgba(0,0,0,.18)] hover:-translate-y-0.5 hover:border-[#d4af37]/55 hover:text-white"
                    : "cursor-not-allowed border-white/5 bg-black/15 text-slate-500 opacity-70"
              }`}
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span aria-hidden="true" className={`grid h-9 w-9 place-items-center rounded-xl border text-base shadow-[inset_0_1px_0_rgba(255,255,255,.22)] ${isActive ? "border-[#f6e29a] bg-[linear-gradient(145deg,#f0d67d,#9f7724)] text-[#24190b]" : "border-[#d4af37]/25 bg-[linear-gradient(145deg,#24382b,#0a1711)] text-[#ddc46f]"}`}>
                  {element.glyph}
                </span>
                {!isAvailable && <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px]">قريبًا</span>}
              </span>
              <span>
                <span className="block text-xs font-semibold">{element.label}</span>
                <span className="mt-0.5 block text-[9px] tracking-wide opacity-55">{element.subLabel}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

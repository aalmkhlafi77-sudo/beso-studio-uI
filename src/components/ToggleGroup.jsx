// components/ToggleGroup.jsx
export default function ToggleGroup({ model, activeId, onChange }) {
  const activeOption = model.options.find((option) => option.id === activeId);

  return (
    <section className="rounded-[22px] border border-[#d4af37]/20 bg-[linear-gradient(150deg,rgba(15,35,26,.96),rgba(5,15,12,.95))] p-4 shadow-[0_16px_40px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl">
      <h3 className="mb-3 text-sm font-bold text-[#fff8e7]">{model.title}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {model.options.map((option) => {
          const isActive = option.id === activeId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.id)}
              className={`flex flex-col items-center justify-center rounded-lg border p-2 text-xs transition-all ${
                isActive
                  ? "border-[#e9cd6e]/75 bg-[linear-gradient(145deg,rgba(74,21,75,.55),rgba(19,36,28,.96))] font-bold text-[#fff8e7] shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_0_18px_rgba(125,68,155,.12)]"
                  : "border-white/[.08] bg-[linear-gradient(145deg,rgba(23,37,29,.9),rgba(5,13,10,.98))] text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] hover:border-[#d4af37]/45 hover:text-[#eae5d9]"
              }`}
            >
              <span>{option.label}</span>
              <span className="text-[10px] opacity-60">{option.subLabel}</span>
            </button>
          );
        })}
      </div>
      {activeOption?.instructions && (
        <div className="mt-3 rounded-xl border border-[#d4af37]/10 bg-[linear-gradient(120deg,rgba(13,59,46,.25),rgba(74,21,75,.09))] p-3 text-xs leading-relaxed text-[#cbd8d0]">
          {Array.isArray(activeOption.instructions) ? (
            <ul className="space-y-1">
              {activeOption.instructions.map((instruction, index) => (
                <li key={`${activeOption.id}-${index}`}>{instruction}</li>
              ))}
            </ul>
          ) : (
            <p>{activeOption.instructions}</p>
          )}
        </div>
      )}
    </section>
  );
}

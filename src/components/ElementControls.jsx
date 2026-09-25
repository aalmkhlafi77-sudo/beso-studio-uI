const definitions = {
  card: {
    title: "إعدادات البطاقة",
    fields: [
      { id: "title", label: "عنوان البطاقة", type: "text" },
      { id: "description", label: "الوصف", type: "text" },
      { id: "backgroundColor", label: "لون الخلفية", type: "color" },
      { id: "textColor", label: "لون النص", type: "color" },
      { id: "radius", label: "استدارة الزوايا", type: "range", min: 0, max: 48, unit: "px" },
      { id: "padding", label: "المساحة الداخلية", type: "range", min: 8, max: 48, unit: "px" },
    ],
  },
  input: {
    title: "إعدادات حقل الإدخال",
    fields: [
      { id: "label", label: "عنوان الحقل", type: "text" },
      { id: "placeholder", label: "النص التلميحي", type: "text" },
      { id: "backgroundColor", label: "لون الخلفية", type: "color" },
      { id: "textColor", label: "لون النص", type: "color" },
      { id: "accentColor", label: "لون الإطار والتركيز", type: "color" },
      { id: "radius", label: "استدارة الزوايا", type: "range", min: 0, max: 32, unit: "px" },
      { id: "fontSize", label: "حجم النص", type: "range", min: 10, max: 32, unit: "px" },
    ],
  },
  badge: {
    title: "إعدادات الشارة",
    fields: [
      { id: "label", label: "نص الشارة", type: "text" },
      { id: "backgroundColor", label: "لون الخلفية", type: "color" },
      { id: "textColor", label: "لون النص", type: "color" },
      { id: "radius", label: "استدارة الزوايا", type: "range", min: 0, max: 99, unit: "px" },
      { id: "paddingX", label: "المساحة الأفقية", type: "range", min: 4, max: 32, unit: "px" },
      { id: "paddingY", label: "المساحة العمودية", type: "range", min: 2, max: 20, unit: "px" },
      { id: "fontSize", label: "حجم النص", type: "range", min: 10, max: 24, unit: "px" },
    ],
  },
};

export default function ElementControls({ elementId, params, onChange }) {
  const definition = definitions[elementId];
  if (!definition) return null;

  return (
    <section className="rounded-[22px] border border-[#d4af37]/20 bg-[linear-gradient(150deg,rgba(15,35,26,.96),rgba(5,15,12,.95))] p-4 shadow-[0_20px_50px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-2 border-b border-white/5 pb-3">
        <h2 className="text-sm font-bold text-[#fff8e7]">{definition.title}</h2>
        <span className="flex items-center gap-1.5 text-[10px] text-[#a8b7ad]"><i className="h-1.5 w-1.5 rounded-full bg-[#70e6bb] shadow-[0_0_8px_#70e6bb]" /> معاينة فورية</span>
      </div>
      <div className="space-y-4">
        {definition.fields.map((field) => (
          <ControlField key={field.id} field={field} value={params[field.id]} onChange={(value) => onChange(field.id, value)} />
        ))}
      </div>
    </section>
  );
}

function ControlField({ field, value, onChange }) {
  if (field.type === "color") {
    return (
      <label className="flex items-center justify-between gap-3 text-xs text-[#d8ded9]">
        <span>{field.label}</span>
        <span className="flex items-center gap-2 rounded-xl border border-[#d4af37]/15 bg-[linear-gradient(145deg,#17251c,#050c09)] px-2 py-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,.6)]">
          <span className="font-mono text-[10px] text-[#aebbb4]">{value}</span>
          <input aria-label={field.label} type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0" />
        </span>
      </label>
    );
  }

  if (field.type === "range") {
    return (
      <label className="block text-xs text-[#d8ded9]">
        <span className="mb-2 flex items-center justify-between gap-2">
          <span>{field.label}</span>
          <span className="font-mono text-[10px] text-[#d4af37]">{value}{field.unit}</span>
        </span>
        <input aria-label={field.label} type="range" min={field.min} max={field.max} step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full cursor-pointer accent-[#d4af37]" />
      </label>
    );
  }

  return (
    <label className="block text-xs text-[#d8ded9]">
      <span className="mb-1.5 block">{field.label}</span>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[linear-gradient(145deg,#050c09,#14231b)] px-3 py-2.5 text-xs text-[#eae5d9] shadow-[inset_0_2px_5px_rgba(0,0,0,.45),0_1px_0_rgba(255,255,255,.04)] outline-none transition placeholder:text-slate-500 focus:border-[#d4af37]/70" />
    </label>
  );
}

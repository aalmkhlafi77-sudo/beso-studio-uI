// components/SoundToggle.jsx
import { useState } from "react";
import { toggleSound, playSoftClick } from "../lib/soundEngine";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    toggleSound(nextState);
    if (nextState) {
      playSoftClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={enabled}
      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-300 cursor-pointer ${
        enabled
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-emerald-500/20"
          : "border-white/10 bg-black/40 text-slate-400 hover:text-slate-200 hover:border-white/20"
      }`}
    >
      <span className="text-sm">{enabled ? "🔊" : "🔇"}</span>
      <span>{enabled ? "التأثيرات الصوتية: مفعلة" : "التأثيرات الصوتية: مكتومة"}</span>
    </button>
  );
}

// components/ThemeToggle.jsx
import { playSoftClick, playHoverTone } from "../lib/soundEngine";

export default function ThemeToggle({ theme = "dark", onToggle }) {
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => {
        playSoftClick();
        onToggle?.(isLight ? "dark" : "light");
      }}
      onMouseEnter={playHoverTone}
      title={isLight ? "التبديل إلى الوضع الداكن (الرخام الزمردي)" : "التبديل إلى الوضع الفاتح (العاجي اللؤلؤي)"}
      aria-label="تبديل وضع العرض (داكن / فاتح)"
      className={`group relative flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-300 cursor-pointer shadow-md ${
        isLight
          ? "border-[#bfa143] bg-[linear-gradient(145deg,#fdedcb,#edd18c)] text-[#2b1f09] shadow-[0_2px_10px_rgba(212,175,55,0.35),inset_0_1px_1px_#ffffff]"
          : "border-[#d4af37]/45 bg-[linear-gradient(145deg,#122b20,#081711)] text-[#f5df93] shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#f0d779]"
      }`}
    >
      {/* Icon */}
      <span className="text-sm transition-transform duration-300 group-hover:rotate-12">
        {isLight ? "☀️" : "🌙"}
      </span>

      {/* Label */}
      <span className="font-sans">
        {isLight ? "الوضع الفاتح (عاجي)" : "الوضع الداكن (زمرد)"}
      </span>

      {/* Jewel Indicator */}
      <span
        className={`h-2 w-2 rounded-full transition-all duration-300 ${
          isLight
            ? "bg-[#9333ea] shadow-[0_0_8px_#9333ea]"
            : "bg-[#70e6bb] shadow-[0_0_8px_#70e6bb]"
        }`}
      />
    </button>
  );
}

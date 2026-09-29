// components/CodePreview.jsx
import { useState } from "react";
import { playSoftClick, playHoverTone } from "../lib/soundEngine";

const DEFAULT_BESO_JS = `// Auto-Generated Beso Studio JS Engine
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.querySelector('.sparkle-btn');
  const bentoCard = document.querySelector('.magic-bento-card');

  // Sparkle Button Sound Trigger
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      if (typeof SoundLibrary !== 'undefined') SoundLibrary.play('neon_click');
    });
  }

  // Bento Mouse Tracking Glow Physics
  if (bentoCard) {
    bentoCard.addEventListener('mousemove', (e) => {
      const rect = bentoCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      bentoCard.style.setProperty('--glow-x', \`\${x}%\`);
      bentoCard.style.setProperty('--glow-y', \`\${y}%\`);
      bentoCard.style.setProperty('--glow-intensity', '1');
    });
    bentoCard.addEventListener('mouseleave', () => {
      bentoCard.style.setProperty('--glow-intensity', '0');
    });
  }
});`;

export default function CodePreview({ generatedCode = {}, theme = "dark" }) {
  const [copyStatus, setCopyStatus] = useState({ type: null, message: "" });
  const [activeTab, setActiveTab] = useState("all"); // "all" | "html" | "css" | "js"
  const isLight = theme === "light";

  const jsCode = generatedCode.js || DEFAULT_BESO_JS;

  const handleCopy = async (text, type) => {
    try {
      playSoftClick();
      if (!navigator?.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
      setCopyStatus({ type, message: "تم النسخ بنجاح" });
    } catch {
      setCopyStatus({ type, message: "تعذر النسخ؛ انسخ يدويًا" });
    }
    window.setTimeout(() => setCopyStatus({ type: null, message: "" }), 2500);
  };

  return (
    <section className={`flex min-h-[500px] h-full flex-col gap-4 rounded-[24px] border p-4 backdrop-blur-xl transition-colors duration-300 ${
      isLight
        ? "border-[#d4af37]/60 bg-[linear-gradient(165deg,#fcf9f2_0%,#f5eee1_50%,#eae0d0_100%)] text-[#2d2215] shadow-[0_20px_50px_rgba(0,0,0,.18),inset_0_1px_2px_#ffffff]"
        : "border-[#d4af37]/35 bg-[linear-gradient(150deg,rgba(11,26,19,.98),rgba(3,10,7,.99))] text-[#eae5d9] shadow-[0_24px_70px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.08)]"
    }`}>
      {/* Top Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-3 ${
        isLight ? "border-[#d4af37]/30" : "border-[#d4af37]/20"
      }`}>
        <div className="flex items-center gap-2.5">
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg border font-mono text-xs font-bold ${
            isLight
              ? "border-[#d4af37]/50 bg-white/80 text-[#8c6d1f]"
              : "border-[#d4af37]/40 bg-black/40 text-[#f5d77f]"
          }`}>
            &lt;/&gt;
          </span>
          <div>
            <h2 className={`text-sm font-bold ${isLight ? "text-[#2d2114]" : "text-[#fff8e7]"}`}>محرر تصدير الكود (HTML / CSS / JS)</h2>
            <p className={`text-[10px] ${isLight ? "text-[#6d5b47]" : "text-[#9cac9f]"}`}>3-Tab Code Engine مع تكامل الصوت ومؤثرات التتبع</p>
          </div>
        </div>

        {/* Global Fast Action Copy Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopy(generatedCode.html, "html")}
            onMouseEnter={playHoverTone}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-sm transition cursor-pointer ${
              isLight
                ? "border-[#c99e32] bg-[linear-gradient(145deg,#fdedcb,#edd18c)] text-[#2b1f09] hover:bg-[#eac87b]"
                : "border-[#d4af37]/50 bg-[linear-gradient(145deg,rgba(212,175,55,0.22),rgba(140,109,31,0.1))] text-[#f5df93] hover:border-[#f5df93] hover:bg-[#d4af37]/30"
            }`}
          >
            <span>📋</span>
            <span>نسخ HTML</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopy(generatedCode.css, "css")}
            onMouseEnter={playHoverTone}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-sm transition cursor-pointer ${
              isLight
                ? "border-emerald-600/40 bg-[linear-gradient(145deg,#dcfce7,#bbf7d0)] text-[#065f46] hover:bg-[#86efac]"
                : "border-[#10b981]/50 bg-[linear-gradient(145deg,rgba(16,185,129,0.22),rgba(5,70,48,0.1))] text-[#70e6bb] hover:border-[#70e6bb] hover:bg-[#10b981]/30"
            }`}
          >
            <span>✨</span>
            <span>نسخ CSS</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopy(jsCode, "js")}
            onMouseEnter={playHoverTone}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-sm transition cursor-pointer ${
              isLight
                ? "border-amber-600/40 bg-[linear-gradient(145deg,#fef3c7,#fde68a)] text-[#92400e] hover:bg-[#fcd34d]"
                : "border-amber-400/50 bg-[linear-gradient(145deg,rgba(245,158,11,0.22),rgba(120,53,15,0.1))] text-[#fcd34d] hover:border-[#fcd34d] hover:bg-amber-500/30"
            }`}
          >
            <span>⚡</span>
            <span>نسخ JS</span>
          </button>
          {/* Decorative Purple Jewel */}
          <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#4c1d95] shadow-[0_0_10px_#9333ea,inset_0_1px_1px_rgba(255,255,255,0.6)] ml-1" />
        </div>
      </div>

      {/* 3-Tab Navigator */}
      <div className={`grid grid-cols-4 gap-1 rounded-xl border p-1 text-xs font-semibold ${
        isLight ? "border-[#d4af37]/30 bg-white/60" : "border-white/10 bg-black/40"
      }`}>
        {[
          { id: "all", label: "عرض الكل" },
          { id: "html", label: "📄 HTML" },
          { id: "css", label: "🎨 CSS" },
          { id: "js", label: "⚡ JavaScript" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              playSoftClick();
              setActiveTab(tab.id);
            }}
            onMouseEnter={playHoverTone}
            className={`rounded-lg py-1.5 text-center transition cursor-pointer ${
              activeTab === tab.id
                ? isLight
                  ? "bg-[linear-gradient(145deg,#fdedcb,#edd18c)] text-[#2b1f09] border border-[#c99e32] shadow-sm font-bold"
                  : "bg-[#d4af37]/30 text-[#fff8e7] border border-[#d4af37]/60 shadow-[0_0_12px_rgba(212,175,55,0.3)] font-bold"
                : isLight
                ? "text-[#68533d] hover:text-[#1e150a]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code Blocks Area */}
      <div className="flex flex-1 flex-col gap-3 min-h-0">
        {(activeTab === "all" || activeTab === "html") && (
          <CodeBlock
            label="HTML Structure"
            badgeColor={isLight ? "text-[#8c6d1f]" : "text-[#f5d77f]"}
            value={generatedCode.html}
            onCopy={() => handleCopy(generatedCode.html, "html")}
            status={copyStatus.type === "html" ? copyStatus.message : ""}
            className={isLight ? "text-[#7a590b]" : "text-[#f5d77f]"}
            isLight={isLight}
          />
        )}
        {(activeTab === "all" || activeTab === "css") && (
          <CodeBlock
            label="CSS Physics & Styling"
            badgeColor={isLight ? "text-[#065f46]" : "text-[#70e6bb]"}
            value={generatedCode.css}
            onCopy={() => handleCopy(generatedCode.css, "css")}
            status={copyStatus.type === "css" ? copyStatus.message : ""}
            className={`max-h-[300px] flex-1 overflow-y-auto ${isLight ? "text-[#065f46]" : "text-[#70e6bb]"}`}
            isLight={isLight}
          />
        )}
        {(activeTab === "all" || activeTab === "js") && (
          <CodeBlock
            label="JavaScript (Beso Audio & Spotlight Engine)"
            badgeColor={isLight ? "text-[#b45309]" : "text-[#fcd34d]"}
            value={jsCode}
            onCopy={() => handleCopy(jsCode, "js")}
            status={copyStatus.type === "js" ? copyStatus.message : ""}
            className={`max-h-[260px] flex-1 overflow-y-auto ${isLight ? "text-[#92400e]" : "text-[#fde68a]"}`}
            isLight={isLight}
          />
        )}
      </div>
    </section>
  );
}

function CodeBlock({ label, value, onCopy, status, badgeColor, className = "text-emerald-400", isLight = false }) {
  return (
    <div className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border p-3 shadow-inner ${
      isLight
        ? "border-[#d4af37]/30 bg-[linear-gradient(145deg,#ffffff,#f7f2e8)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
        : "border-white/[.08] bg-[linear-gradient(145deg,#04110b,#010704)] shadow-[inset_0_2px_12px_rgba(0,0,0,.6),0_1px_0_rgba(255,255,255,.04)]"
    }`}>
      <div className={`mb-2 flex items-center justify-between gap-2 border-b pb-1.5 ${
        isLight ? "border-[#d4af37]/20" : "border-white/5"
      }`}>
        <span className={`flex items-center gap-2 text-[11px] font-bold ${badgeColor}`}>
          <span className="h-2 w-2 rounded-full bg-[#c084fc] shadow-[0_0_8px_#c084fc]" />
          {label}
        </span>
        <div className="flex items-center gap-2">
          {status && <span role="status" className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{status}</span>}
          <button
            type="button"
            onClick={onCopy}
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition cursor-pointer ${
              isLight
                ? "border-[#d4af37]/50 bg-white text-[#785b14] hover:border-[#bfa143] hover:text-[#2b1f09] shadow-sm"
                : "border-[#d4af37]/30 bg-[linear-gradient(145deg,#1c2f23,#09140e)] text-[#f5df93] shadow-[inset_0_1px_0_rgba(255,255,255,.1)] hover:border-[#d4af37] hover:text-white"
            }`}
          >
            <span>📋</span>
            <span>نسخ</span>
          </button>
        </div>
      </div>
      <pre className={`overflow-x-auto font-mono text-[11px] leading-relaxed custom-scrollbar ${className}`}><code>{value}</code></pre>
    </div>
  );
}

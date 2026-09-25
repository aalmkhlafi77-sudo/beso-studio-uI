// components/CodePreview.jsx
import { useState } from "react";

export default function CodePreview({ generatedCode }) {
  const [copyStatus, setCopyStatus] = useState({ type: null, message: "" });

  const handleCopy = async (text, type) => {
    try {
      if (!navigator?.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
      setCopyStatus({ type, message: "تم النسخ" });
    } catch {
      setCopyStatus({ type, message: "تعذر النسخ؛ انسخ النص يدويًا" });
    }
    window.setTimeout(() => setCopyStatus({ type: null, message: "" }), 2500);
  };

  return (
    <section className="flex min-h-[500px] h-full flex-col gap-4 rounded-[24px] border border-[#d4af37]/20 bg-[linear-gradient(150deg,rgba(13,29,22,.97),rgba(4,11,9,.98))] p-4 shadow-[0_24px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-[#fff8e7]">شفرة القطعة</h2>
          <p className="mt-1 text-[10px] text-[#9cac9f]">تحديث لحظي · جاهزة للنسخ</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-[#70e6bb]/15 bg-[#70e6bb]/[.06] px-2.5 py-1 text-[9px] text-[#70e6bb]"><i className="h-1.5 w-1.5 rounded-full bg-[#70e6bb] shadow-[0_0_8px_#70e6bb]" /> LIVE</span>
      </div>
      <CodeBlock
        label="HTML"
        value={generatedCode.html}
        onCopy={() => handleCopy(generatedCode.html, "html")}
        status={copyStatus.type === "html" ? copyStatus.message : ""}
      />
      <CodeBlock
        label="CSS"
        value={generatedCode.css}
        onCopy={() => handleCopy(generatedCode.css, "css")}
        status={copyStatus.type === "css" ? copyStatus.message : ""}
        className="max-h-[300px] flex-1 overflow-y-auto text-[#d4af37]"
      />
    </section>
  );
}

function CodeBlock({ label, value, onCopy, status, className = "text-emerald-400" }) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[.08] bg-[linear-gradient(145deg,#07110d,#020604)] p-3 shadow-[inset_0_2px_12px_rgba(0,0,0,.48),0_1px_0_rgba(255,255,255,.03)]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-[#d4af37]"><span className="h-1.5 w-1.5 rounded-full bg-[#c38bd8] shadow-[0_0_7px_#c38bd8]" />{label}</span>
        <div className="flex items-center gap-2">
          {status && <span role="status" className="text-[10px] text-emerald-400">{status}</span>}
          <button type="button" onClick={onCopy} className="rounded-lg border border-[#d4af37]/20 bg-[linear-gradient(145deg,#1e3022,#0a140e)] px-2.5 py-1.5 text-[10px] text-[#e5c86d] shadow-[inset_0_1px_0_rgba(255,255,255,.1)] transition hover:border-[#d4af37]/60 hover:text-[#fff1bd]">
            نسخ {label}
          </button>
        </div>
      </div>
      <pre className={`overflow-x-auto font-mono text-[11px] leading-relaxed ${className}`}><code>{value}</code></pre>
    </div>
  );
}

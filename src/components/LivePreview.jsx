// components/LivePreview.jsx
import { useState } from "react";
import { playSoftClick, playHoverTone, playPresetSound } from "../lib/soundEngine";

const backgroundOptions = [
  { id: "dark", label: "داكنة", className: "bg-[#03100b]" },
  { id: "light", label: "فاتحة", className: "bg-[#eae5d9]" },
  { id: "grid", label: "شبكة", className: "bg-[#04130f] bg-[radial-gradient(rgba(212,175,55,.22)_1px,transparent_1px)] [background-size:18px_18px]" },
];

export default function LivePreview({ generatedCode, elementLabel, soundPreset = "soft-click" }) {
  const [bgMode, setBgMode] = useState("dark");
  const background = backgroundOptions.find((option) => option.id === bgMode)?.className;

  return (
    <section className="relative flex min-h-[500px] h-full flex-col overflow-hidden rounded-[24px] border border-[#d4af37]/25 bg-[linear-gradient(145deg,rgba(17,38,29,.96),rgba(5,15,12,.97))] p-4 shadow-[0_24px_70px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#d4af37]/[.06] blur-3xl" />
      <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl border border-[#d4af37]/40 bg-[linear-gradient(145deg,#3b3020,#111911)] text-sm text-[#f1d983] shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_0_18px_rgba(212,175,55,.1)]">✧</span>
          <div>
            <h2 className="text-sm font-bold text-[#fff8e7]">مسرح المعاينة</h2>
            {elementLabel && <p className="mt-1 text-[10px] text-[#d4af37]">{elementLabel} <span className="text-[#71847a]">/ حيّة</span></p>}
          </div>
        </div>
        <div className="flex gap-1 rounded-xl border border-white/[.06] bg-black/25 p-1 text-[10px]" aria-label="خلفية المعاينة">
          {backgroundOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={bgMode === option.id}
              onClick={() => {
                playSoftClick();
                setBgMode(option.id);
              }}
              onMouseEnter={playHoverTone}
              className={`rounded-lg px-2.5 py-1.5 transition cursor-pointer ${bgMode === option.id ? "border border-[#f0d779]/70 bg-[linear-gradient(145deg,#e2c15d,#9d7624)] font-semibold text-[#20180b] shadow-[0_2px_9px_rgba(212,175,55,.22),inset_0_1px_0_rgba(255,255,255,.5)]" : "border border-transparent text-[#9ba99f] hover:text-[#fff8e7]"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`relative isolate flex min-h-[390px] flex-1 items-center justify-center overflow-hidden rounded-[20px] border border-[#d4af37]/20 p-6 transition-colors ${background} shadow-[inset_0_0_50px_rgba(0,0,0,.48)]`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(212,175,55,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_78%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d4af37]/20 shadow-[0_0_70px_rgba(74,21,75,.22),inset_0_0_50px_rgba(13,59,46,.25)]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[218px] w-[218px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a76ec2]/25 shadow-[0_0_45px_rgba(122,61,155,.12)]" />
        <span aria-hidden="true" className="pointer-events-none absolute left-[18%] top-[21%] h-1.5 w-1.5 rounded-full bg-[#f2db8b] shadow-[0_0_12px_4px_rgba(242,219,139,.35)]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-[24%] right-[17%] h-1 w-1 rounded-full bg-[#bc7be0] shadow-[0_0_12px_4px_rgba(188,123,224,.45)]" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[15%] h-8 w-[72%] rounded-[50%] bg-[#d4af37]/[.08] blur-xl" />
        <style>{generatedCode.css}</style>
        <div
          className="relative z-10 [filter:drop-shadow(0_22px_20px_rgba(0,0,0,.48))]"
          onPointerDown={() => playPresetSound(soundPreset)}
          onMouseEnter={playHoverTone}
          dangerouslySetInnerHTML={{ __html: generatedCode.html }}
        />
        <span className="absolute bottom-3 left-3 rounded-full border border-white/[.08] bg-black/30 px-2.5 py-1 text-[8px] tracking-[.2em] text-[#83938a]">LIVE MATERIAL RENDER</span>
      </div>
    </section>
  );
}

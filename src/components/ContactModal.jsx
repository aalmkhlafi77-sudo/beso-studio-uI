// components/ContactModal.jsx
import React, { useState } from "react";
import { playSoftClick, playHoverTone, playPresetSound } from "../lib/soundEngine";

export default function ContactModal({ isOpen, onClose, social = {}, contact = {}, theme = "dark" }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    playPresetSound("crystal-bell");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
      onClose();
    }, 2000);
  };

  const whatsappLink = `https://wa.me/${(social.whatsapp || "+966500000000").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `مرحباً استوديو Beso، أود الاستفسار بخصوص تصميم الأزرار والخامات.`
  )}`;

  const telegramLink = social.telegram?.startsWith("http")
    ? social.telegram
    : `https://t.me/${(social.telegram || "besostudio").replace("@", "")}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={() => {
        playSoftClick();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-[#d4af37]/45 bg-[#061710] p-6 text-right text-[#eae5d9] shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-black/40 text-lg text-[#f5d77f]">
              ✉️
            </span>
            <div>
              <h2 className="text-base font-bold text-[#fff8e7]">تواصل معنا</h2>
              <p className="text-[11px] text-[#aebbb4]">فريق الدعم الفني وتطوير واجهات Beso Studio</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playSoftClick();
              onClose();
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Quick Instant Chat Launchers */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playPresetSound("water-drop")}
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 py-2.5 px-3 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <span className="text-base">💬</span>
            <span>محادثة واتساب سريعة</span>
          </a>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playPresetSound("water-drop")}
            className="flex items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-950/40 py-2.5 px-3 text-xs font-bold text-sky-300 transition hover:bg-sky-900/60 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer"
          >
            <span className="text-base">✈️</span>
            <span>قناة / محادثة تليجرام</span>
          </a>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-6 text-center space-y-2">
            <span className="text-3xl animate-bounce inline-block">✅</span>
            <h3 className="text-sm font-bold text-emerald-300">تم إرسال رسالتك بنجاح!</h3>
            <p className="text-xs text-slate-300">سيتواصل معك مهندس الاستوديو في أقرب وقت.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs text-slate-300 font-medium">الاسم الكريم:</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="أحمد المحمدي"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300 font-medium">البريد الإلكتروني:</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300 font-medium">نص الرسالة / الاستفسار:</label>
              <textarea
                rows={3}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="اكتب استفسارك أو طلب تصميم خامة خاصة..."
                className="w-full rounded-xl border border-white/15 bg-black/40 p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              onMouseEnter={playHoverTone}
              className="w-full rounded-xl border border-[#d4af37] bg-gradient-to-r from-[#d4af37] to-[#b38f2b] py-2.5 text-xs font-bold text-[#140e04] shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 cursor-pointer"
            >
              إرسال الرسالة ➔
            </button>
          </form>
        )}

        {/* Social Suite Row */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono">تابعنا على المنصات:</span>
          <div className="flex items-center gap-2">
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="منصة X"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-slate-300 hover:text-white hover:border-[#d4af37] hover:scale-110 transition"
              >
                𝕏
              </a>
            )}
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-slate-300 hover:text-white hover:border-[#d4af37] hover:scale-110 transition"
              >
                🐙
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-slate-300 hover:text-white hover:border-[#d4af37] hover:scale-110 transition"
              >
                📸
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs text-slate-300 hover:text-white hover:border-[#d4af37] hover:scale-110 transition"
              >
                💼
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// components/AdminLoginModal.jsx
import React, { useState } from "react";
import { playSoftClick, playHoverTone, playPresetSound } from "../lib/soundEngine";

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess, currentSecurity }) {
  const [loginMode, setLoginMode] = useState("password"); // "password" or "pin"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validUsername = currentSecurity?.username || "admin";
  const validPassword = currentSecurity?.password || "beso2026";
  const validPin = currentSecurity?.pin || "2026";

  const handleSubmit = (e) => {
    e.preventDefault();
    playSoftClick();
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (loginMode === "password") {
        if (username.trim() === validUsername && password === validPassword) {
          playPresetSound("crystal-bell");
          onLoginSuccess();
          onClose();
        } else {
          playPresetSound("bubble-pop");
          setErrorMessage("اسم المستخدم أو كلمة المرور غير صحيحة");
        }
      } else {
        if (pin.trim() === validPin) {
          playPresetSound("crystal-bell");
          onLoginSuccess();
          onClose();
        } else {
          playPresetSound("bubble-pop");
          setErrorMessage("رمز PIN السريع غير صحيح");
        }
      }
    }, 400);
  };

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
      {/* Background Floating Orbs */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-emerald-500/20 blur-[100px] -top-10 -right-10" />
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-purple-600/20 blur-[100px] -bottom-10 -left-10" />
      <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-amber-400/15 blur-[90px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Rotating Conic Border Beam Container */}
      <div
        className="login-border-beam relative w-full max-w-md shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="login-inner-box text-right text-[#eae5d9]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-gradient-to-br from-[#0c2e22] to-[#1a0a20] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <span className="text-lg">🔐</span>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#fff8e7] font-serif">
                  لوحة الإدارة المركزية
                </h2>
                <p className="text-[10px] text-[#aebbb4]">
                  Beso Enterprise Suite · مصادقة الأمان
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playSoftClick();
                onClose();
              }}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              ✕
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-black/40 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                playSoftClick();
                setLoginMode("password");
                setErrorMessage("");
              }}
              onMouseEnter={playHoverTone}
              className={`rounded-lg py-2 transition cursor-pointer ${
                loginMode === "password"
                  ? "border border-[#d4af37]/60 bg-[linear-gradient(145deg,#123326,#071711)] text-[#f5df93] shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🔑 كلمة المرور
            </button>
            <button
              type="button"
              onClick={() => {
                playSoftClick();
                setLoginMode("pin");
                setErrorMessage("");
              }}
              onMouseEnter={playHoverTone}
              className={`rounded-lg py-2 transition cursor-pointer ${
                loginMode === "pin"
                  ? "border border-[#d4af37]/60 bg-[linear-gradient(145deg,#123326,#071711)] text-[#f5df93] shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🔢 رمز PIN السريع
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMode === "password" ? (
              <>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    اسم المستخدم (Username)
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="beso-input-glow w-full rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    كلمة المرور (Password)
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="beso-input-glow w-full rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  رمز PIN المكون من 4 أرقام
                </label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="2026"
                  className="beso-input-glow w-full text-center tracking-[0.5em] font-mono rounded-xl px-3.5 py-3 text-base text-[#f5df93] placeholder-slate-500"
                />
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-2.5 text-xs text-rose-300 text-center font-medium">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Hint Notice */}
            <div className="rounded-xl border border-[#d4af37]/20 bg-black/40 p-2 text-[10px] text-slate-400 text-center">
              💡 الافتراضي: المستخدم <span className="text-[#f5d77f] font-mono">admin</span> · المرور <span className="text-[#f5d77f] font-mono">beso2026</span> · الـ PIN <span className="text-[#f5d77f] font-mono">2026</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={playHoverTone}
              className="w-full rounded-xl border border-[#d4af37]/70 bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#b38f2b] py-3 text-xs font-bold text-[#1a1205] shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? "جاري المصادقة..." : "تسجيل الدخول إلى الإدارة ➔"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

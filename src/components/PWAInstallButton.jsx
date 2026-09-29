// components/PWAInstallButton.jsx
import React, { useState } from "react";
import { usePWAInstall } from "../lib/usePWAInstall";
import { playSoftClick, playHoverTone } from "../lib/soundEngine";

export default function PWAInstallButton({ theme = "dark" }) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const isLight = theme === "light";

  if (isInstalled) {
    return (
      <span
        title="التطبيق مثبت لديك كـ PWA"
        className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-1.5 text-[11px] font-semibold text-emerald-300"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        مثبت 📲
      </span>
    );
  }

  const handleClick = async () => {
    playSoftClick();
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={playHoverTone}
        title="تثبيت Beso Studio UI كتطبيق ويب تقدمي (PWA)"
        className={`group relative flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
          isLight
            ? "border-emerald-600/50 bg-[linear-gradient(145deg,#ecfdf5,#d1fae5)] text-emerald-900 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            : "border-emerald-500/50 bg-[linear-gradient(145deg,rgba(16,185,129,0.22),rgba(5,40,28,0.85))] text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_18px_rgba(16,185,129,0.4)]"
        }`}
      >
        <span className="animate-bounce">📲</span>
        <span>تثبيت التطبيق</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </button>

      {/* Guide modal if browser didn't fire ambient prompt yet or iOS */}
      {showGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-[#d4af37]/50 bg-[#061710] p-6 text-right text-[#eae5d9] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📲</span>
                <h3 className="text-sm font-bold text-[#fff8e7]">تثبيت Beso Studio UI</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>لتثبيت التطبيق على أجهزة iPhone / iPad عبر متصفح Safari:</p>
                <ol className="list-decimal list-inside space-y-2 pr-2 font-medium text-[#f5d77f]">
                  <li>اضغط على زر المشاركة <strong>(Share ⎘)</strong> في شريط متصفح سفاري.</li>
                  <li>مرّر لأسفل واختر <strong>"إضافة إلى الصفحة الرئيسية" (Add to Home Screen)</strong>.</li>
                  <li>اضغط <strong>"إضافة" (Add)</strong> بالأعلى لتثبيت التطبيق فوراً.</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>لتثبيت التطبيق على حاسوبك أو هاتفك الأندرويد:</p>
                <ol className="list-decimal list-inside space-y-2 pr-2 font-medium text-[#f5d77f]">
                  <li>من قائمة المتصفح (Chrome / Edge / Brave)، اضغط على أيقونة الإعدادات <strong>(⋮)</strong>.</li>
                  <li>اختر <strong>"تثبيت التطبيق" (Install Beso Studio UI)</strong> أو <strong>"إضافة إلى الشاشة الرئيسية"</strong>.</li>
                  <li>سيعمل التطبيق بشاشة كاملة وبأداء فائق واستجابة دون اتصال!</li>
                </ol>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="rounded-xl border border-[#d4af37]/40 bg-[#0d2e22] px-4 py-2 text-xs font-semibold text-[#f5d77f] hover:bg-[#144231]"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// components/AdminSettingsPanel.jsx
import React, { useState } from "react";
import { playSoftClick, playHoverTone, playPresetSound } from "../lib/soundEngine";

export default function AdminSettingsPanel({
  isOpen,
  onClose,
  adminConfig,
  onSaveConfig,
  onResetDefaults,
  onLogout,
  theme = "dark",
}) {
  const [activeTab, setActiveTab] = useState("header");
  const [config, setConfig] = useState(adminConfig);
  const [savedNotice, setSavedNotice] = useState(false);
  const [securityForm, setSecurityForm] = useState({
    newUsername: adminConfig.security?.username || "admin",
    newPassword: adminConfig.security?.password || "beso2026",
    newPin: adminConfig.security?.pin || "2026",
  });
  const [securityMsg, setSecurityMsg] = useState("");

  if (!isOpen) return null;

  const isLight = theme === "light";

  const handleUpdate = (section, key, value) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      };
      return next;
    });
  };

  const handleSave = () => {
    playPresetSound("crystal-bell");
    onSaveConfig(config);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        handleUpdate("logo", "url", base64);
        playPresetSound("water-drop");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateSecurity = (e) => {
    e.preventDefault();
    playSoftClick();
    const updatedSec = {
      username: securityForm.newUsername.trim() || "admin",
      password: securityForm.newPassword || "beso2026",
      pin: securityForm.newPin || "2026",
    };
    const updatedConfig = {
      ...config,
      security: updatedSec,
    };
    setConfig(updatedConfig);
    onSaveConfig(updatedConfig);
    playPresetSound("crystal-bell");
    setSecurityMsg("تم تحديث بيانات الأمان بنجاح!");
    setTimeout(() => setSecurityMsg(""), 3000);
  };

  const tabs = [
    { id: "header", label: "نصوص وتنسيقات الهيدر", icon: "✍️" },
    { id: "logo", label: "الهوية والشعار", icon: "🖼️" },
    { id: "rights", label: "الحقوق والربط الإعلاني", icon: "⚖️" },
    { id: "analytics", label: "الإحصائيات والتواصل", icon: "📊" },
    { id: "security", label: "الأمان وكلمة المرور", icon: "🛡️" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-2xl animate-in fade-in duration-300"
      onClick={() => {
        playSoftClick();
        onClose();
      }}
    >
      <div
        className="relative flex flex-col h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-[#d4af37]/50 bg-[#061610] text-[#eae5d9] shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-[#d4af37]/25 bg-[#030e0a] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-gradient-to-br from-[#0e3b2b] to-[#1d0b25] text-lg text-[#f5d77f] shadow-md">
              ⚙️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#fff8e7] font-serif">
                  لوحة التحكم الإدارية الشاملة (Enterprise Suite V4.5)
                </h2>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-950/60 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400">
                  LIVE ADMIN
                </span>
              </div>
              <p className="text-[11px] text-[#aebbb4]">
                تخصيص الهيدر، الهوية، الربط الإعلاني، إحصائيات الزوار وبصمة المصمم
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedNotice && (
              <span className="animate-pulse rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs text-emerald-300 font-semibold">
                ✓ تم الحفظ بنجاح
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              onMouseEnter={playHoverTone}
              className="rounded-xl border border-[#d4af37] bg-gradient-to-r from-[#d4af37] to-[#b38f2b] px-4 py-2 text-xs font-bold text-[#140e04] shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 cursor-pointer"
            >
              💾 حفظ التغييرات
            </button>
            <button
              type="button"
              onClick={() => {
                playSoftClick();
                onClose();
              }}
              className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-[#04110c] px-4 py-2 custom-scrollbar gap-1.5 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playSoftClick();
                setActiveTab(tab.id);
              }}
              onMouseEnter={playHoverTone}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id
                  ? "border border-[#d4af37] bg-[linear-gradient(145deg,#123829,#091a13)] text-[#f5df93] shadow-md font-bold"
                  : "border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-right">
          
          {/* TAB 1: HEADER TEXTS & STYLES */}
          {activeTab === "header" && (
            <div className="space-y-6">
              {/* Section 1: Left Text Area ("Design Beautiful Buttons") */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2">
                    <span>✨</span>
                    نص الهيدر الأيسر (English Typography Badge)
                  </h3>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.header.leftTextVisible}
                      onChange={(e) => handleUpdate("header", "leftTextVisible", e.target.checked)}
                      className="accent-[#d4af37] h-4 w-4"
                    />
                    <span>إظهار في الشاشات الواسعة</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-400">النص (سطور مفصولة بـ Enter):</label>
                    <textarea
                      rows={3}
                      value={config.header.leftText}
                      onChange={(e) => handleUpdate("header", "leftText", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs text-slate-400">لون النص:</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.header.leftTextColor}
                          onChange={(e) => handleUpdate("header", "leftTextColor", e.target.value)}
                          className="h-8 w-10 cursor-pointer rounded-lg border border-[#d4af37]/40 bg-black/40"
                        />
                        <span className="font-mono text-xs text-[#f5df93]">{config.header.leftTextColor}</span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-400">حجم الخط ({config.header.leftTextSize}px):</label>
                      <input
                        type="range"
                        min={9}
                        max={16}
                        value={config.header.leftTextSize}
                        onChange={(e) => handleUpdate("header", "leftTextSize", Number(e.target.value))}
                        className="w-full accent-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Center Tag Badge ("BESO STUDIO UI · أسلوبك الخاص") */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2">
                    <span>🏷️</span>
                    شارة الهوية العلوية (Badge Pill)
                  </h3>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.header.badgePulseVisible}
                      onChange={(e) => handleUpdate("header", "badgePulseVisible", e.target.checked)}
                      className="accent-[#d4af37] h-4 w-4"
                    />
                    <span>إظهار مؤشر النبض الأخضر</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-400">نص الشارة:</label>
                    <input
                      type="text"
                      value={config.header.badgeText}
                      onChange={(e) => handleUpdate("header", "badgeText", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">لون خلفية الشارة:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.header.badgeBgColor}
                        onChange={(e) => handleUpdate("header", "badgeBgColor", e.target.value)}
                        className="h-8 w-10 cursor-pointer rounded-lg border border-[#d4af37]/40 bg-black/40"
                      />
                      <span className="font-mono text-xs text-[#f5df93]">{config.header.badgeBgColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">لون نص الشارة:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.header.badgeTextColor}
                        onChange={(e) => handleUpdate("header", "badgeTextColor", e.target.value)}
                        className="h-8 w-10 cursor-pointer rounded-lg border border-[#d4af37]/40 bg-black/40"
                      />
                      <span className="font-mono text-xs text-[#f5df93]">{config.header.badgeTextColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Main Heading Text ("صمّم أزرارك .. بأسلوبك الخاص") */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-4 space-y-3">
                <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 border-b border-white/10 pb-2">
                  <span>👑</span>
                  العنوان الرئيسي والوصف (Main Title & Subtitle)
                </h3>

                <div>
                  <label className="mb-1 block text-xs text-slate-400">العنوان الرئيسي:</label>
                  <input
                    type="text"
                    value={config.header.mainTitle}
                    onChange={(e) => handleUpdate("header", "mainTitle", e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm font-bold text-[#fff8e7] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">نمط تدرج العنوان:</label>
                    <select
                      value={config.header.mainTitleGradient}
                      onChange={(e) => handleUpdate("header", "mainTitleGradient", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-[#091b14] px-3 py-2 text-xs text-[#f5d77f] focus:outline-none"
                    >
                      <option value="gold">الذهب الملكي (Gold Emboss)</option>
                      <option value="emerald">الزمرد الساطع (Emerald Beam)</option>
                      <option value="purple">الأرجواني الكريستالي (Purple Jewel)</option>
                      <option value="custom">لون مخصص صلب (Custom Color)</option>
                    </select>
                  </div>

                  {config.header.mainTitleGradient === "custom" && (
                    <div>
                      <label className="mb-1 block text-xs text-slate-400">اللون المخصص:</label>
                      <input
                        type="color"
                        value={config.header.mainTitleCustomColor}
                        onChange={(e) => handleUpdate("header", "mainTitleCustomColor", e.target.value)}
                        className="h-9 w-full cursor-pointer rounded-lg border border-[#d4af37]/40 bg-black/40"
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">حجم الخط ({config.header.mainTitleSize}px):</label>
                    <input
                      type="range"
                      min={16}
                      max={34}
                      value={config.header.mainTitleSize}
                      onChange={(e) => handleUpdate("header", "mainTitleSize", Number(e.target.value))}
                      className="w-full accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">سماكة الخط:</label>
                    <select
                      value={config.header.mainTitleWeight}
                      onChange={(e) => handleUpdate("header", "mainTitleWeight", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-[#091b14] px-3 py-2 text-xs text-[#f5d77f] focus:outline-none"
                    >
                      <option value="600">600 — شبه عريض</option>
                      <option value="700">700 — عريض Bold</option>
                      <option value="800">800 — عريض جداً Extra Bold</option>
                      <option value="900">900 — أسود Black</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs text-slate-400">النص الفرعي (الوصف):</label>
                  <textarea
                    rows={2}
                    value={config.header.subTitle}
                    onChange={(e) => handleUpdate("header", "subTitle", e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/40 p-2.5 text-xs text-slate-200 focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">لون النص الفرعي:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.header.subTitleColor}
                        onChange={(e) => handleUpdate("header", "subTitleColor", e.target.value)}
                        className="h-8 w-10 cursor-pointer rounded-lg border border-[#d4af37]/40 bg-black/40"
                      />
                      <span className="font-mono text-xs text-[#f5df93]">{config.header.subTitleColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">الشفافية ({config.header.subTitleOpacity}%):</label>
                    <input
                      type="range"
                      min={30}
                      max={100}
                      value={config.header.subTitleOpacity}
                      onChange={(e) => handleUpdate("header", "subTitleOpacity", Number(e.target.value))}
                      className="w-full accent-[#d4af37]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRANDING & LOGO */}
          {activeTab === "logo" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 border-b border-white/10 pb-2">
                  <span>🖼️</span>
                  شعار الاستوديو (Logo Upload & Sizing)
                </h3>

                {/* Logo Live Preview in Modal */}
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-[#d4af37]/40 bg-black/50">
                  <span className="text-[10px] text-slate-400 mb-2 font-mono">معاينة الشعار الحالية</span>
                  <div
                    style={{
                      width: `${config.logo.width}px`,
                      height: `${config.logo.height}px`,
                    }}
                    className="relative flex items-center justify-center transition-all duration-300"
                  >
                    <img
                      src={config.logo.url}
                      alt="Logo Preview"
                      style={{
                        objectFit: config.logo.objectFit,
                      }}
                      className={`w-full h-full ${
                        config.logo.dropShadow ? "drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Upload & URL Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                      رفع ملف شعار جديد (PNG شفاف / SVG):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-2 text-xs text-slate-300 file:mr-2 file:rounded-lg file:border-0 file:bg-[#d4af37] file:px-3 file:py-1 file:text-xs file:font-bold file:text-black cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-300">
                      أو رابط صورة الشعار (Image URL):
                    </label>
                    <input
                      type="text"
                      value={config.logo.url}
                      onChange={(e) => handleUpdate("logo", "url", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Sizing Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">
                      العرض ({config.logo.width}px):
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={240}
                      value={config.logo.width}
                      onChange={(e) => handleUpdate("logo", "width", Number(e.target.value))}
                      className="w-full accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">
                      الارتفاع ({config.logo.height}px):
                    </label>
                    <input
                      type="range"
                      min={30}
                      max={140}
                      value={config.logo.height}
                      onChange={(e) => handleUpdate("logo", "height", Number(e.target.value))}
                      className="w-full accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">نمط الملاءمة (Object Fit):</label>
                    <select
                      value={config.logo.objectFit}
                      onChange={(e) => handleUpdate("logo", "objectFit", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-[#091b14] px-3 py-2 text-xs text-[#f5d77f] focus:outline-none"
                    >
                      <option value="contain">ملاءمة احتواء (Contain)</option>
                      <option value="cover">ملاءمة تغطية (Cover)</option>
                      <option value="fill">تمدد (Fill)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.logo.dropShadow}
                      onChange={(e) => handleUpdate("logo", "dropShadow", e.target.checked)}
                      className="accent-[#d4af37] h-4 w-4"
                    />
                    <span>تأثير الظل العميق المقاوم للتشوه (Drop Shadow Glow)</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      playSoftClick();
                      handleUpdate("logo", "url", "/brand/beso-studio-ui.png");
                      handleUpdate("logo", "width", 160);
                      handleUpdate("logo", "height", 80);
                    }}
                    className="rounded-lg border border-[#d4af37]/30 bg-black/40 px-3 py-1.5 text-[11px] text-[#f5df93] hover:bg-[#d4af37]/20"
                  >
                    استعادة الشعار الافتراضي
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DESIGNER RIGHTS, ADSENSE & SEO */}
          {activeTab === "rights" && (
            <div className="space-y-6">
              {/* Designer Rights */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 border-b border-white/10 pb-2">
                  <span>🖋️</span>
                  بصمة المصمم وحقوق التطوير (Designer Signature & Rights)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">بصمة المصمم / اسم المطور:</label>
                    <input
                      type="text"
                      value={config.branding.designerSignature}
                      onChange={(e) => handleUpdate("branding", "designerSignature", e.target.value)}
                      placeholder="تصميم وتطوير: أمان للتطوير الرقمي"
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رابط المصمم / الموقع (URL):</label>
                    <input
                      type="url"
                      value={config.branding.designerUrl}
                      onChange={(e) => handleUpdate("branding", "designerUrl", e.target.value)}
                      placeholder="https://github.com"
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">سنة الحقوق:</label>
                    <input
                      type="text"
                      value={config.branding.copyrightYear}
                      onChange={(e) => handleUpdate("branding", "copyrightYear", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">نص سطر الفوتر الإضافي:</label>
                    <input
                      type="text"
                      value={config.branding.licenseText}
                      onChange={(e) => handleUpdate("branding", "licenseText", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Google AdSense Integration */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2">
                    <span>📢</span>
                    ربط Google AdSense والإعلانات
                  </h3>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.adSense.enabled}
                      onChange={(e) => handleUpdate("adSense", "enabled", e.target.checked)}
                      className="accent-[#d4af37] h-4 w-4"
                    />
                    <span>تفعيل وحدات AdSense في الاستوديو</span>
                  </label>
                </div>

                <div>
                  <label className="mb-1 block text-xs text-slate-400">
                    رمز العميل (AdSense Client ID - مثال: ca-pub-XXXXXXXXXXXXXXXX):
                  </label>
                  <input
                    type="text"
                    value={config.adSense.clientCode}
                    onChange={(e) => handleUpdate("adSense", "clientCode", e.target.value)}
                    placeholder="ca-pub-1234567890123456"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-slate-400">
                    كود السكربت الإعلاني المباشر (AdSense Header Snippet):
                  </label>
                  <textarea
                    rows={3}
                    value={config.adSense.headerSnippet}
                    onChange={(e) => handleUpdate("adSense", "headerSnippet", e.target.value)}
                    placeholder="<script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-...' crossorigin='anonymous'></script>"
                    className="w-full rounded-xl border border-white/15 bg-black/40 p-2.5 text-xs font-mono text-emerald-400 focus:border-[#d4af37] focus:outline-none dir-ltr text-left"
                  />
                </div>
              </div>

              {/* SEO Meta Tags */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 border-b border-white/10 pb-2">
                  <span>🌐</span>
                  تهيئة محركات البحث (SEO & Meta Tags)
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">عنوان الصفحة (Page Title):</label>
                    <input
                      type="text"
                      value={config.seo.title}
                      onChange={(e) => handleUpdate("seo", "title", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">وصف الميتا (Meta Description):</label>
                    <textarea
                      rows={2}
                      value={config.seo.description}
                      onChange={(e) => handleUpdate("seo", "description", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs text-slate-400">الكلمات المفتاحية (Keywords):</label>
                      <input
                        type="text"
                        value={config.seo.keywords}
                        onChange={(e) => handleUpdate("seo", "keywords", e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-400">Google Site Verification:</label>
                      <input
                        type="text"
                        value={config.seo.googleSiteVerification}
                        onChange={(e) => handleUpdate("seo", "googleSiteVerification", e.target.value)}
                        placeholder="google-site-verification-token"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANALYTICS & CONTACT SUITE */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Live Analytics Dashboard */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2">
                    <span>📈</span>
                    عداد وإحصائيات الزوار التفاعلية (Live Traffic Counters)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      playSoftClick();
                      handleUpdate("analytics", "visitorCount", 100);
                      handleUpdate("analytics", "pageViews", 200);
                    }}
                    className="text-[10px] text-rose-300 hover:underline"
                  >
                    تصفير العداد
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <span className="text-[10px] text-emerald-400 font-mono">الزوار الفريدون</span>
                    <p className="mt-1 text-2xl font-bold font-mono text-[#f5d77f]">
                      {config.analytics.visitorCount.toLocaleString()}
                    </p>
                    <span className="text-[9px] text-slate-400">جلسات فريدة مسجلة</span>
                  </div>

                  <div className="rounded-xl border border-[#d4af37]/30 bg-black/40 p-4">
                    <span className="text-[10px] text-[#f5d77f] font-mono">مشاهدات الصفحات</span>
                    <p className="mt-1 text-2xl font-bold font-mono text-[#fff8e7]">
                      {config.analytics.pageViews.toLocaleString()}
                    </p>
                    <span className="text-[9px] text-slate-400">إجمالي مرات التفاعل والتحديث</span>
                  </div>

                  <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
                    <span className="text-[10px] text-purple-300 font-mono">آخر نشاط مسجل</span>
                    <p className="mt-2 text-xs font-mono text-purple-200">
                      {new Date(config.analytics.lastVisit || Date.now()).toLocaleTimeString("ar-SA")}
                    </p>
                    <span className="text-[9px] text-slate-400">تحديث تلقائي فوري</span>
                  </div>
                </div>
              </div>

              {/* Social Media Suite Links */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 border-b border-white/10 pb-2">
                  <span>💬</span>
                  روابط منصات التواصل الاجتماعي (Social Media Suite)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رقم واتساب WhatsApp (مع المقدمة):</label>
                    <input
                      type="text"
                      value={config.social.whatsapp}
                      onChange={(e) => handleUpdate("social", "whatsapp", e.target.value)}
                      placeholder="+966500000000"
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">حساب تليجرام Telegram:</label>
                    <input
                      type="text"
                      value={config.social.telegram}
                      onChange={(e) => handleUpdate("social", "telegram", e.target.value)}
                      placeholder="username"
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رابط منصة إكس X (Twitter):</label>
                    <input
                      type="url"
                      value={config.social.twitter}
                      onChange={(e) => handleUpdate("social", "twitter", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رابط انستقرام Instagram:</label>
                    <input
                      type="url"
                      value={config.social.instagram}
                      onChange={(e) => handleUpdate("social", "instagram", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رابط لينكد إن LinkedIn:</label>
                    <input
                      type="url"
                      value={config.social.linkedin}
                      onChange={(e) => handleUpdate("social", "linkedin", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رابط جيت هب GitHub:</label>
                    <input
                      type="url"
                      value={config.social.github}
                      onChange={(e) => handleUpdate("social", "github", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 border-b border-white/10 pb-2">
                  <span>📬</span>
                  بيانات التواصل مع الاستوديو (Contact Information)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">البريد الإلكتروني للاتصال:</label>
                    <input
                      type="email"
                      value={config.contact.email}
                      onChange={(e) => handleUpdate("contact", "email", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رقم الهاتف:</label>
                    <input
                      type="text"
                      value={config.contact.phone}
                      onChange={(e) => handleUpdate("contact", "phone", e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none dir-ltr text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & CREDENTIALS RESET */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#04130d] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#f5d77f] flex items-center gap-2 border-b border-white/10 pb-2">
                  <span>🛡️</span>
                  تغيير بيانات تسجيل الدخول والأمان
                </h3>

                <form onSubmit={handleUpdateSecurity} className="space-y-4 max-w-md">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">اسم المستخدم الجديد:</label>
                    <input
                      type="text"
                      required
                      value={securityForm.newUsername}
                      onChange={(e) => setSecurityForm({ ...securityForm, newUsername: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">كلمة المرور الجديدة:</label>
                    <input
                      type="password"
                      required
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-400">رمز PIN السريع الجديد (4 إلى 6 أرقام):</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={securityForm.newPin}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPin: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  {securityMsg && (
                    <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-2.5 text-xs text-emerald-300">
                      ✓ {securityMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="rounded-xl border border-[#d4af37]/60 bg-[#123829] px-5 py-2.5 text-xs font-bold text-[#f5df93] hover:bg-[#1a4b37] cursor-pointer"
                  >
                    تحديث بيانات الدخول
                  </button>
                </form>
              </div>

              {/* Restore Defaults and Logout */}
              <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-5 space-y-4">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span>
                  إجراءات الإدارة الحساسة
                </h3>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("هل أنت متأكد من رغبتك في استعادة جميع الإعدادات الافتراضية للمختبر والهيدر؟")) {
                        playSoftClick();
                        onResetDefaults();
                        onClose();
                      }
                    }}
                    className="rounded-xl border border-rose-500/50 bg-rose-950/40 px-4 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-900/50 cursor-pointer"
                  >
                    ⟲ استعادة كافة الإعدادات الافتراضية للمصنع
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSoftClick();
                      onLogout();
                      onClose();
                    }}
                    className="rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 cursor-pointer"
                  >
                    🚪 تسجيل الخروج من الإدارة
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

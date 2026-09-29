// ==========================================
// FILE 3: src/components/ParamsEditor.jsx
// ==========================================

import React, { useState, useEffect } from "react";
import { CATEGORY_DEFINITIONS, getComponentCategories } from "../data/effects.js";
import { playPresetSound } from "../lib/soundEngine.js";
import HeroKineticDeck from "./decks/HeroKineticDeck";
import BentoSpotlightDeck from "./decks/BentoSpotlightDeck";
import GeneralDeck from "./decks/GeneralDeck";
import Carousel3DDeck from "./decks/Carousel3DDeck";
import BrandIdentityDeck from "./decks/BrandIdentityDeck";
import SplitHeroDeck from "./decks/SplitHeroDeck";

export default function ParamsEditor({
  activeElement,
  activeEffect,
  params,
  onParamChange,
  dimensions = {},
  onDimensionsChange,
  lighting = {},
  onLightingChange,
  typography = {},
  onTypographyChange,
  animations = {},
  onAnimationsChange,
  media = {},
  onMediaChange,
  globalParams = {},
  onGlobalChange,
  cardParams = {},
  inputParams = {},
  badgeParams = {},
  buttonParams = {},
  onElementParamChange,
  onReset,
  theme = "dark",
}) {
  const isLight = theme === "light";

  if (!activeElement) {
    return (
      <div className="p-6 text-center text-slate-500 text-sm rounded-[24px] border border-slate-800 bg-slate-950">
        يرجى اختيار مكون من اللوحة لعرض إعداداته المخصصة.
      </div>
    );
  }

  const elementId = typeof activeElement === "string" ? activeElement : activeElement?.id;
  const elementName = typeof activeElement === "object" && activeElement?.name
    ? activeElement.name
    : activeEffect?.name || elementId || "Beso Component";

  const allowedCategories = getComponentCategories(elementId);
  const [activeTab, setActiveTab] = useState(() => allowedCategories[0] || "typography");

  // Automatically reset activeTab to the first permitted tab whenever elementId changes to prevent stale inspector views
  useEffect(() => {
    if (allowedCategories.length > 0) {
      setActiveTab(allowedCategories[0]);
    }
  }, [elementId]);

  // Ensure activeTab is strictly within allowedCategories
  const safeActiveTab = allowedCategories.includes(activeTab)
    ? activeTab
    : allowedCategories[0] || "typography";

  // Build tab definitions dynamically
  const tabList = allowedCategories.map((catKey) => {
    const def = CATEGORY_DEFINITIONS[catKey] || { label: catKey, icon: "⚙️" };
    return {
      id: catKey,
      label: def.label || catKey,
      icon: def.icon || "⚙️",
    };
  });

  const cardContainerClass = isLight
    ? "rounded-[24px] border border-[#d4af37]/60 bg-[linear-gradient(165deg,#fcf9f2_0%,#f5eee1_50%,#eae0d0_100%)] text-[#2d2215] shadow-[0_20px_50px_rgba(0,0,0,.18),inset_0_1px_2px_#ffffff] backdrop-blur-xl"
    : "rounded-[24px] border border-[#d4af37]/35 bg-[linear-gradient(150deg,rgba(11,26,19,.98),rgba(3,10,7,.99))] text-[#eae5d9] shadow-[0_20px_50px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl";

  const cardHeaderBorder = isLight ? "border-[#d4af37]/30" : "border-[#d4af37]/15";
  const titleColor = isLight ? "text-[#2d2114]" : "text-[#fff8e7]";

  // Normalize callbacks & parameter objects for sub-decks
  const resolvedParams = params || {
    dimensions,
    lighting,
    typography,
    animations,
    media,
    globalParams,
    cardParams,
    inputParams,
    badgeParams,
    buttonParams,
  };

  const handleGenericParamChange = (category, keyOrObj, val) => {
    if (onParamChange) {
      onParamChange(category, keyOrObj, val);
    }
    if (category === "dimensions" && onDimensionsChange && typeof keyOrObj === "string") {
      onDimensionsChange(keyOrObj, val);
    } else if (category === "lighting" && onLightingChange && typeof keyOrObj === "string") {
      onLightingChange(keyOrObj, val);
    } else if (category === "typography" && onTypographyChange && typeof keyOrObj === "string") {
      onTypographyChange(keyOrObj, val);
    } else if (category === "animations" && onAnimationsChange && typeof keyOrObj === "string") {
      onAnimationsChange(keyOrObj, val);
    } else if (category === "media" && onMediaChange && typeof keyOrObj === "string") {
      onMediaChange(keyOrObj, val);
    } else if (category === "globalParams" && onGlobalChange && typeof keyOrObj === "string") {
      onGlobalChange(keyOrObj, val);
    }
  };

  return (
    <div className="space-y-3.5">
      {/* 1. Header & Dynamic Contextual Tab Bar */}
      <section className={`${cardContainerClass} p-3`}>
        <div className={`flex items-center justify-between px-2 pt-1 pb-2.5 border-b ${cardHeaderBorder}`}>
          <div className="flex items-center gap-2">
            <span className="h-4 w-1.5 rounded-full bg-gradient-to-b from-[#f0d780] to-[#8f6921] shadow-[0_0_10px_rgba(212,175,55,.5)]" />
            <div>
              <span className={`text-xs font-bold ${titleColor} block`}>
                لوحة التحكم السياقية (Contextual Inspector)
              </span>
              <span className="text-[10px] text-slate-400 block">
                {elementName} • ({elementId})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md">
              {allowedCategories.length} أبواب مفعلة
            </span>
          </div>
        </div>

        {/* Dynamic Contextual Tabs Bar */}
        <div className="mt-2.5 flex border-b border-slate-800/40 pb-1.5 overflow-x-auto scrollbar-none gap-1.5">
          {tabList.map((tab) => {
            const isActive = safeActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  try {
                    playPresetSound("soft-click");
                  } catch (_) {}
                  setActiveTab(tab.id);
                }}
                className={`px-3 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? isLight
                      ? "border border-[#bfa143] bg-[linear-gradient(145deg,#fdedcb,#ebd08d)] font-bold text-[#2b1f09] shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                      : "border border-[#f0d779] bg-[linear-gradient(145deg,rgba(212,175,55,.3),rgba(14,40,30,.98))] font-bold text-[#f5df93] shadow-[0_0_14px_rgba(212,175,55,.2)]"
                    : isLight
                    ? "border border-[#d4af37]/20 bg-white/60 text-[#68533d] hover:border-[#bfa143] hover:text-[#1e150a]"
                    : "border border-white/[.06] bg-black/35 text-slate-400 hover:border-[#d4af37]/40 hover:text-[#eae5d9]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Isolated Contextual Controls Panel Routing */}
      <section className={`${cardContainerClass} p-4`}>
        {elementId === "hero-kinetic-dual-track" || safeActiveTab === "kinetic_tracks" ? (
          <HeroKineticDeck
            activeTab={safeActiveTab}
            media={media}
            onMediaChange={onMediaChange}
            lighting={lighting}
            onLightingChange={onLightingChange}
            animations={animations}
            onAnimationsChange={onAnimationsChange}
            typography={typography}
            onTypographyChange={onTypographyChange}
            params={resolvedParams}
            onChange={handleGenericParamChange}
            onParamChange={handleGenericParamChange}
            theme={theme}
          />
        ) : elementId === "magic-bento-card" || safeActiveTab === "bento_glow" ? (
          <BentoSpotlightDeck
            activeTab={safeActiveTab}
            media={media}
            onMediaChange={onMediaChange}
            typography={typography}
            onTypographyChange={onTypographyChange}
            params={resolvedParams}
            onChange={handleGenericParamChange}
            onParamChange={handleGenericParamChange}
            theme={theme}
          />
        ) : ["carousel-3d-cube", "carousel-3d-hexagon", "carousel-3d-octagon", "carousel-3d-sphere"].includes(
            elementId
          ) || safeActiveTab === "3d_carousels" || safeActiveTab === "carousel_3d" ? (
          <Carousel3DDeck
            activeElement={elementId}
            activeTab={safeActiveTab}
            media={media}
            onMediaChange={onMediaChange}
            params={resolvedParams}
            onChange={handleGenericParamChange}
            theme={theme}
          />
        ) : elementId === "brand-identity-card" || safeActiveTab === "brand_identity" ? (
          <BrandIdentityDeck
            activeTab={safeActiveTab}
            media={media}
            onMediaChange={onMediaChange}
            lighting={lighting}
            onLightingChange={onLightingChange}
            globalParams={globalParams}
            onGlobalChange={onGlobalChange}
            typography={typography}
            onTypographyChange={onTypographyChange}
            params={resolvedParams}
            onChange={handleGenericParamChange}
            theme={theme}
          />
        ) : elementId === "split-hero-banner" || safeActiveTab === "split_slider" ? (
          <SplitHeroDeck
            activeTab={safeActiveTab}
            media={media}
            onMediaChange={onMediaChange}
            dimensions={dimensions}
            onDimensionsChange={onDimensionsChange}
            typography={typography}
            onTypographyChange={onTypographyChange}
            params={resolvedParams}
            onChange={handleGenericParamChange}
            theme={theme}
          />
        ) : (
          <GeneralDeck
            activeElement={elementId}
            activeTab={safeActiveTab}
            dimensions={dimensions}
            onDimensionsChange={onDimensionsChange}
            lighting={lighting}
            onLightingChange={onLightingChange}
            typography={typography}
            onTypographyChange={onTypographyChange}
            animations={animations}
            onAnimationsChange={onAnimationsChange}
            media={media}
            onMediaChange={onMediaChange}
            globalParams={globalParams}
            onGlobalChange={onGlobalChange}
            cardParams={cardParams}
            inputParams={inputParams}
            badgeParams={badgeParams}
            buttonParams={buttonParams}
            onElementParamChange={onElementParamChange}
            params={resolvedParams}
            onChange={handleGenericParamChange}
            onParamChange={handleGenericParamChange}
            theme={theme}
          />
        )}
      </section>
    </div>
  );
}

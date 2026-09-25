// app/page.jsx & App.jsx
import React, { useMemo, useState } from "react";
import { createInitialWorkspaceState, ELEMENTS_CONFIG } from "@/data/elementsRegistry";
import { generateElementCode } from "@/lib/generateCode";
import ElementSelector from "@/components/ElementSelector";
import ParamsEditor from "@/components/ParamsEditor";
import LivePreview from "@/components/LivePreview";
import CodePreview from "@/components/CodePreview";

export default function App() {
  const [state, setState] = useState(createInitialWorkspaceState);

  const setDimensionsParam = (key, value) => {
    setState((prev) => {
      const nextDimensions = { ...prev.dimensions, [key]: value };
      return {
        ...prev,
        dimensions: nextDimensions,
        cardParams: {
          ...prev.cardParams,
          padding: key === "padding" ? value : prev.cardParams?.padding,
        },
        globalParams: {
          ...prev.globalParams,
          borderRadius: key === "borderRadius" ? value : prev.globalParams?.borderRadius,
        },
      };
    });
  };

  const setLightingParam = (key, value) => {
    setState((prev) => {
      const nextLighting = { ...prev.lighting, [key]: value };
      return {
        ...prev,
        lighting: nextLighting,
        globalParams: {
          ...prev.globalParams,
          bevelDepth: key === "bevelDepth" ? value : prev.globalParams?.bevelDepth,
          accentColor: key === "glowColor" ? value : prev.globalParams?.accentColor,
          mainColor: key === "colorStop1" ? value : prev.globalParams?.mainColor,
          color: key === "colorStop1" ? value : prev.globalParams?.color,
        },
      };
    });
  };

  const setTypographyParam = (key, value) => {
    setState((prev) => {
      const nextTypography = { ...prev.typography, [key]: value };
      return {
        ...prev,
        typography: nextTypography,
        globalParams: {
          ...prev.globalParams,
          fontSize: key === "titleSize" ? value : prev.globalParams?.fontSize,
          // titleColor and descColor operate independently without cross-overwriting
          textColor: key === "descColor" ? value : prev.globalParams?.textColor,
        },
        cardParams: {
          ...prev.cardParams,
          title: key === "titleText" ? value : prev.cardParams?.title,
          description: key === "descText" ? value : prev.cardParams?.description,
        },
        buttonParams: {
          ...prev.buttonParams,
          text: key === "titleText" ? value : prev.buttonParams?.text,
        },
      };
    });
  };

  const setAnimationsParam = (key, value) => {
    setState((prev) => ({
      ...prev,
      animations: { ...prev.animations, [key]: value },
    }));
  };

  const setGlobalParam = (key, value) => {
    setState((prev) => {
      const nextGlobal = { ...prev.globalParams, [key]: value };
      return {
        ...prev,
        activeSurface: key === "surfaceStyle" ? value : prev.activeSurface,
        globalParams: nextGlobal,
        buttonState: {
          ...prev.buttonState,
          activeSurface: key === "surfaceStyle" ? value : prev.buttonState?.activeSurface,
          globalParams: {
            ...prev.buttonState?.globalParams,
            [key]: value,
            surfaceStyle: key === "surfaceStyle" ? value : prev.buttonState?.globalParams?.surfaceStyle,
            color: key === "mainColor" ? value : prev.buttonState?.globalParams?.color,
          },
        },
      };
    });
  };

  const setElementParam = (elementId, key, value) => {
    setState((prev) => {
      const targetParamKey = `${elementId}Params`;
      const prevElementParams = prev[targetParamKey] || {};
      const nextParams = { ...prevElementParams, [key]: value };

      return {
        ...prev,
        [targetParamKey]: nextParams,
        elementParams: {
          ...prev.elementParams,
          [elementId]: {
            ...prev.elementParams?.[elementId],
            [key]: value,
          },
        },
      };
    });
  };

  const resetToDefault = () => setState(createInitialWorkspaceState());
  const selectedElement = ELEMENTS_CONFIG.find((element) => element.id === state.activeElement);
  const generatedCode = useMemo(() => generateElementCode(state.activeElement, state), [state]);

  return (
    <div dir="rtl" className="isolate relative min-h-screen bg-[#030907] px-4 py-5 font-sans text-[#eae5d9] sm:px-6 lg:px-8">
      {/* Isolated background decorations with their own clipping layer */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 84% 0%, rgba(13,59,46,.5), transparent 38%), radial-gradient(ellipse at 54% 48%, rgba(74,21,75,.12), transparent 42%), radial-gradient(ellipse at 5% 100%, rgba(212,175,55,.08), transparent 30%), repeating-linear-gradient(128deg, transparent 0 118px, rgba(212,175,55,.025) 119px, transparent 120px)",
          }}
        />
        <div className="absolute -right-32 top-44 h-80 w-80 rounded-full bg-[#4a154b]/20 blur-[120px]" />
        <div className="absolute -left-28 bottom-10 h-72 w-72 rounded-full bg-[#0d6a4d]/20 blur-[110px]" />
      </div>

      {/* Header with Luxury Brand Lockup */}
      <header className="relative mx-auto mb-6 flex max-w-[1800px] flex-col gap-4 border-b border-[#d4af37]/20 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src="/brand/beso-studio-ui.png"
            alt="Beso Studio UI"
            width="1774"
            height="887"
            className="h-[76px] w-[152px] shrink-0 object-contain sm:h-[88px] sm:w-[176px]"
          />
          <div className="min-w-0 border-r border-[#d4af37]/25 pr-4">
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#10251c]/70 px-2.5 py-1 text-[9px] font-semibold tracking-[.18em] text-[#d4af37]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#70e6bb] shadow-[0_0_10px_#70e6bb]" />
              BESO MATERIAL PHYSICS LAB · V0.2
            </span>
            <h1 className="text-base font-bold tracking-wide text-[#fff8e7] sm:text-lg">
              استوديو الخامات والفيزياء المادية المركبة
            </h1>
            <p className="mt-1 text-[11px] text-[#a8b7ad]">
              تحكم دقيق بالأبعاد والشفافية، التدرجات والإضاءة LED، الشطف الفيزيائي، النصوص والظلال، وحركات الظهور.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetToDefault}
          className="group shrink-0 self-start rounded-xl border border-[#d4af37]/35 bg-[linear-gradient(145deg,rgba(50,65,49,.9),rgba(10,24,18,.96))] px-4 py-2.5 text-xs font-semibold text-[#f3ead6] shadow-[inset_0_1px_0_rgba(255,255,255,.13),0_8px_24px_rgba(0,0,0,.28)] transition hover:border-[#f0d779]/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_0_24px_rgba(212,175,55,.13)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37] sm:self-center cursor-pointer"
        >
          <span className="ml-2 text-[#d4af37] transition group-hover:rotate-[-35deg]">⟲</span>
          إعادة ضبط المختبر
        </button>
      </header>

      {/* 3-Column Layout: Controls (Right), Live Preview (Center Sticky), Generated Code (Left) */}
      <main className="relative mx-auto grid max-w-[1800px] grid-cols-1 items-start gap-4 lg:grid-cols-12 xl:gap-5">
        {/* Right Column: Library & Physical Parameters Editor with 5 Tabbed Sliders */}
        <section className="space-y-4 lg:col-span-4 xl:col-span-4" aria-label="اختيار العنصر وإعدادات الخامات">
          <ElementSelector
            elements={ELEMENTS_CONFIG}
            activeElementId={state.activeElement}
            onSelectElement={(activeElement) => setState((prev) => ({ ...prev, activeElement }))}
          />

          <ParamsEditor
            activeElement={state.activeElement}
            dimensions={state.dimensions}
            onDimensionsChange={setDimensionsParam}
            lighting={state.lighting}
            onLightingChange={setLightingParam}
            typography={state.typography}
            onTypographyChange={setTypographyParam}
            animations={state.animations}
            onAnimationsChange={setAnimationsParam}
            globalParams={state.globalParams}
            onGlobalChange={setGlobalParam}
            cardParams={state.cardParams}
            inputParams={state.inputParams}
            badgeParams={state.badgeParams}
            buttonParams={state.buttonParams}
            onElementParamChange={setElementParam}
            onReset={resetToDefault}
          />
        </section>

        {/* Center Column: Live Preview (Sticky on desktop) */}
        <section className="min-h-[440px] lg:sticky lg:top-6 lg:col-span-4 xl:col-span-4 self-start z-10" aria-label="مسرح المعاينة المباشرة">
          <LivePreview generatedCode={generatedCode} elementLabel={selectedElement?.label} />
        </section>

        {/* Left Column: Standalone Generated Code */}
        <section className="min-h-[440px] lg:col-span-4 xl:col-span-4" aria-label="الكود المصدّر">
          <CodePreview generatedCode={generatedCode} />
        </section>
      </main>

      <footer className="relative mx-auto mt-6 max-w-[1800px] border-t border-[#d4af37]/10 pt-4 text-center text-[10px] text-[#75867b]">
        Beso Studio UI V0.2 · محرك المواد والفيزياء المادية المتقدمة لواجهات الويب الحديثة
      </footer>
    </div>
  );
}

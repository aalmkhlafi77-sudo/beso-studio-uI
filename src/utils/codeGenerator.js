// ==========================================
// FILE: src/utils/codeGenerator.js
// ==========================================

import { getComponentCategories } from "../data/effects.js";

export function sanitizeParams(componentId, fullParams) {
  const allowed = getComponentCategories(componentId);
  const cleanParams = {};

  if (!fullParams) return cleanParams;

  allowed.forEach((category) => {
    if (fullParams[category]) {
      cleanParams[category] = fullParams[category];
    }
  });

  return cleanParams;
}

export function generateElementCode(element, rawParams) {
  const elemObj = typeof element === "string" ? { id: element, name: element } : element;
  if (!elemObj || !elemObj.id) {
    return { html: "", css: "", js: "" };
  }

  const cleanParams = sanitizeParams(elemObj.id, rawParams);
  const allowedCategories = getComponentCategories(elemObj.id);

  let cssRules = [];

  if (cleanParams.typography) {
    const { fontSize, fontWeight, color, fontFamily } = cleanParams.typography;
    if (fontSize) cssRules.push(`  font-size: ${fontSize}px;`);
    if (fontWeight) cssRules.push(`  font-weight: ${fontWeight};`);
    if (color) cssRules.push(`  color: ${color};`);
    if (fontFamily) cssRules.push(`  font-family: ${fontFamily};`);
  }

  if (cleanParams.materials) {
    const { bg, border, radius, backdropBlur } = cleanParams.materials;
    if (bg) cssRules.push(`  background: ${bg};`);
    if (border) cssRules.push(`  border: ${border};`);
    if (radius !== undefined) cssRules.push(`  border-radius: ${radius}px;`);
    if (backdropBlur) cssRules.push(`  backdrop-filter: blur(${backdropBlur}px);`);
  }

  if (cleanParams.kinetic_tracks) {
    const { speed, direction } = cleanParams.kinetic_tracks;
    cssRules.push(`  --track-speed: ${speed || 10}s;`);
    cssRules.push(`  --track-dir: ${direction || "normal"};`);
  }

  if (cleanParams.bento_glow) {
    const { glowColor, spread } = cleanParams.bento_glow;
    cssRules.push(`  --glow-color: ${glowColor || "rgba(234, 179, 8, 0.15)"};`);
    cssRules.push(`  --glow-spread: ${spread || 200}px;`);
  }

  const formattedCss = `.${elemObj.id}-wrapper {\n${cssRules.join("\n")}\n}`;

  const formattedHtml = `<div class="${elemObj.id}-wrapper" data-beso-component="${elemObj.id}">
  <div class="${elemObj.id}-content">
    <span>${cleanParams.typography?.text || elemObj.name || "Beso Component"}</span>
  </div>
</div>`;

  let formattedJs = "";
  if (allowedCategories.includes("bento_glow")) {
    formattedJs = `// Beso Studio Interactive Spotlight Effect
document.querySelectorAll('[data-beso-component="${elemObj.id}"]').forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mouse-x', \`\${e.clientX - rect.left}px\`);
    element.style.setProperty('--mouse-y', \`\${e.clientY - rect.top}px\`);
  });
});`;
  }

  return {
    html: formattedHtml,
    css: formattedCss,
    js: formattedJs
  };
}

export default generateElementCode;

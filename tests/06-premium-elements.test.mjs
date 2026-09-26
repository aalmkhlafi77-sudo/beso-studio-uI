import test from 'node:test';
import assert from 'node:assert/strict';
import { generateElementCode } from '../src/lib/generateCode.js';
import { createInitialWorkspaceState } from '../src/data/elementsRegistry.js';

test('1. Premium Element: Cyber 3D Tilt Card (Pure CSS Tracker Grid)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'cyber-card';
  state.typography.titleText = 'سايبر نيون 3D';
  state.typography.descText = 'وصف تجربة ثلاثية الأبعاد';

  const code = generateElementCode('cyber-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-3d-container">/);
  assert.match(code.html, /<div class="canvas">/);
  for (let i = 1; i <= 9; i++) {
    assert.match(code.html, new RegExp(`<div class="tracker tr-${i}"></div>`));
  }
  assert.match(code.html, /<div id="card">/);
  assert.match(code.html, /<h3 class="title">سايبر نيون 3D<\/h3>/);
  assert.match(code.html, /<p class="subtitle">وصف تجربة ثلاثية الأبعاد<\/p>/);
  assert.match(code.html, /<div class="glowing-elements">\s*<div class="glow-1"><\/div>\s*<\/div>/);

  // CSS checks
  assert.match(code.css, /perspective:\s*1000px/);
  assert.match(code.css, /grid-template-columns:\s*repeat\(3,\s*1fr\)/);
  assert.match(code.css, /\.tr-1:hover ~ #card\s*\{\s*transform:\s*rotateX\(15deg\)\s*rotateY\(-15deg\)/);
  assert.match(code.css, /\.tr-5:hover ~ #card\s*\{\s*transform:\s*rotateX\(0deg\)\s*rotateY\(0deg\)/);
  assert.match(code.css, /\.tr-9:hover ~ #card\s*\{\s*transform:\s*rotateX\(-15deg\)\s*rotateY\(15deg\)/);
  assert.match(code.css, /transform-style:\s*preserve-3d/);
  assert.match(code.css, /#card \.title\s*\{[^}]*transform:\s*translateZ\(35px\)/);
});

test('2. Premium Element: Action Send Button (Multi-State Animation)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'action-send-btn';
  state.typography.titleText = 'إرسال';

  const code = generateElementCode('action-send-btn', state);

  // HTML checks
  assert.match(code.html, /<button type="button" class="beso-action-btn">/);
  assert.match(code.html, /<div class="state state--default">/);
  assert.match(code.html, /<div class="icon-wrapper plane-icon">/);
  assert.match(code.html, /<span style="--i:1">إ<\/span>/);
  assert.match(code.html, /<span style="--i:2">ر<\/span>/);
  assert.match(code.html, /<div class="state state--sent">/);
  assert.match(code.html, /<div class="icon-wrapper check-icon">/);

  // CSS checks
  assert.match(code.css, /\.beso-action-btn:hover \.label span\s*\{[^}]*animation:\s*wave/);
  assert.match(code.css, /@keyframes wave\s*\{/);
  assert.match(code.css, /@keyframes takeOff\s*\{/);
  assert.match(code.css, /@keyframes slideDown\s*\{/);
  assert.match(code.css, /\.beso-action-btn:active \.state--default/);
  assert.match(code.css, /\.beso-action-btn:active \.state--sent/);
});

test('3. Premium Element: Conic Glow Button (Spinning Gradient Edge)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'conic-glow-btn';
  state.typography.titleText = 'هالة النور الذهبية';

  const code = generateElementCode('conic-glow-btn', state);

  // HTML checks
  assert.match(code.html, /<button type="button" class="conic-gradient-btn">/);
  assert.match(code.html, /<span class="gradient-text">هالة النور الذهبية<\/span>/);

  // CSS checks
  assert.match(code.css, /\.conic-gradient-btn::before\s*\{[^}]*conic-gradient/);
  assert.match(code.css, /animation:\s*rotateConic 2s linear infinite/);
  assert.match(code.css, /\.conic-gradient-btn::after\s*\{[^}]*position:\s*absolute/);
  assert.match(code.css, /\.conic-gradient-btn \.gradient-text\s*\{[^}]*background-clip:\s*text/);
  assert.match(code.css, /@keyframes rotateConic\s*\{/);
  assert.match(code.css, /@keyframes textHue\s*\{/);
});

test('4. Premium Element: Frutiger Aero Glass Button (Shimmer Reflection)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'frutiger-aero-btn';
  state.typography.titleText = 'زجاج أيرو';

  const code = generateElementCode('frutiger-aero-btn', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-frutiger-btn">/);
  assert.match(code.html, /<div class="inner-glass">/);
  assert.match(code.html, /<div class="top-specular-light"><\/div>/);
  assert.match(code.html, /<span class="text-glow">زجاج أيرو<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-frutiger-btn\s*\{[^}]*background:\s*linear-gradient\(180deg,\s*#006caa,\s*#00c3ff\)/);
  assert.match(code.css, /\.beso-frutiger-btn \.inner-glass\s*\{[^}]*radial-gradient/);
  assert.match(code.css, /\.beso-frutiger-btn \.inner-glass::before\s*\{[^}]*animation:\s*aeroShimmer/);
  assert.match(code.css, /\.beso-frutiger-btn \.top-specular-light\s*\{/);
  assert.match(code.css, /@keyframes aeroShimmer\s*\{/);
});

test('5. Premium Element: Space Galaxy Orbit Button (Cosmic Glow & Stars)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'space-orbit-btn';
  state.typography.titleText = 'الفضاء العميق';

  const code = generateElementCode('space-orbit-btn', state);

  // HTML checks
  assert.match(code.html, /<button type="button" class="beso-space-btn">/);
  assert.match(code.html, /<strong class="space-title">الفضاء العميق<\/strong>/);
  assert.match(code.html, /<div id="container-stars">/);
  assert.match(code.html, /<div id="stars-particle-layer"><\/div>/);
  assert.match(code.html, /<div id="glow-aura">/);
  assert.match(code.html, /<div class="glow-circle-1"><\/div>/);
  assert.match(code.html, /<div class="glow-circle-2"><\/div>/);

  // CSS checks
  assert.match(code.css, /\.beso-space-btn\s*\{[^}]*linear-gradient\(137deg,\s*#ffdb3b,\s*#fe53bb,\s*#8f51ea,\s*#0044ff\)/);
  assert.match(code.css, /@keyframes spaceGradientShift\s*\{/);
  assert.match(code.css, /@keyframes starRotation\s*\{/);
  assert.match(code.css, /@keyframes neonPulse\s*\{/);
  assert.match(code.css, /\.beso-space-btn #stars-particle-layer\s*\{[^}]*radial-gradient/);
});

test('6. Premium Element: Adaptive Morphing Shell (Horizontal Reveal)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'adaptive-morph-btn';
  state.typography.titleText = 'المزيد';

  const code = generateElementCode('adaptive-morph-btn', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-morph-btn">/);
  assert.match(code.html, /<div class="sign-icon">/);
  assert.match(code.html, /<svg viewBox="0 0 512 512"/);
  assert.match(code.html, /<div class="morph-text">المزيد<\/div>/);

  // CSS checks
  assert.match(code.css, /\.beso-morph-btn\s*\{[^}]*width:\s*48px;\s*height:\s*48px;\s*border-radius:\s*50%/);
  assert.match(code.css, /\.beso-morph-btn:hover\s*\{[^}]*width:\s*150px;\s*border-radius:\s*30px/);
  assert.match(code.css, /\.beso-morph-btn \.morph-text\s*\{[^}]*opacity:\s*0/);
  assert.match(code.css, /\.beso-morph-btn:hover \.morph-text\s*\{[^}]*opacity:\s*1/);
});

test('7. Premium Element: Beating Heart Interactive Button (Organic Heartbeat)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'like-heart-btn';
  state.typography.titleText = 'إعجاب بالمنتج';

  const code = generateElementCode('like-heart-btn', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-heart-btn">/);
  assert.match(code.html, /<div class="heart-icon-wrapper">/);
  assert.match(code.html, /<svg class="heart-empty"/);
  assert.match(code.html, /<svg class="heart-filled"/);
  assert.match(code.html, /<span class="heart-btn-text">إعجاب بالمنتج<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-heart-btn\s*\{[^}]*transition:\s*transform 400ms cubic-bezier\(0\.68, -0\.55, 0\.27, 2\.5\)/);
  assert.match(code.css, /\.beso-heart-btn:hover \.heart-empty\s*\{[^}]*opacity:\s*0/);
  assert.match(code.css, /\.beso-heart-btn:hover \.heart-filled\s*\{[^}]*opacity:\s*1;\s*transform:\s*scale\(1\);\s*animation:\s*beatingHeart 1\.2s/);
  assert.match(code.css, /@keyframes beatingHeart\s*\{/);
});

test('8. Premium Element: Multi-Layer Difference Button (Blend Mode)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'multi-layer-diff-btn';
  state.typography.titleText = 'زر المزج الفاخر';

  const code = generateElementCode('multi-layer-diff-btn', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-diff-wrapper">/);
  assert.match(code.html, /<div class="diff-light"><\/div>/);
  assert.match(code.html, /<div class="gradient-layer"/);
  assert.match(code.html, /<button class="gradient-btn-base">زر المزج الفاخر<\/button>/);
  assert.match(code.html, /<div class="text-overlay-mask">زر المزج الفاخر<\/div>/);

  // CSS checks
  assert.match(code.css, /\.beso-diff-wrapper \.gradient-layer\s*\{[^}]*mix-blend-mode:\s*difference/);
  assert.match(code.css, /@keyframes rotateDiff\s*\{/);
  assert.match(code.css, /\.beso-diff-wrapper \.text-overlay-mask\s*\{[^}]*mix-blend-mode:\s*overlay/);
});

test('9. Premium Element: Figma Canvas Vector Frame (Dynamic Scaling, Colors & Locked Cursor)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'figma-vector-frame';
  state.dimensions.width = 500;
  state.dimensions.height = 300;
  state.typography.titleText = 'مخطط النظام الديناميكي';
  state.typography.descText = 'عبدالله المخلافي';
  state.typography.titleColor = '#FFEAA7';
  state.typography.descColor = '#55EFC4';
  state.lighting.glowColor = '#0984E3';

  const code = generateElementCode('figma-vector-frame', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-figma-container">/);
  assert.match(code.html, /<svg class="figma-svg-canvas" viewBox="0 0 500 300">/);
  assert.match(code.html, /<text[^>]*fill="#FFEAA7"[^>]*>مخطط النظام الديناميكي<\/text>/);
  assert.match(code.html, /<g class="figma-unified-cursor">/);
  assert.match(code.html, /<path stroke="#FFFFFF" stroke-width="1.5" fill="#0984E3" d="M 0 0 L 0 22 L 6 16 L 15 16 Z" \/>/);
  assert.match(code.html, /<text[^>]*fill="#55EFC4"[^>]*>عبدالله المخلافي<\/text>/);

  // CSS checks
  assert.match(code.css, /\.beso-figma-container\s*\{[^}]*width:\s*500px;\s*max-width:\s*100%;\s*height:\s*300px;/);
  assert.match(code.css, /\.figma-unified-cursor\s*\{[^}]*animation:\s*figmaUnifiedMove 6s/);
  assert.match(code.css, /@keyframes figmaUnifiedMove\s*\{/);
});

test('10. Premium Element: Animated Wave Button (Ripple & Arrows)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'ripple-wave-btn';
  state.typography.titleText = 'موجة انطلاق';

  const code = generateElementCode('ripple-wave-btn', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-wave-btn">/);
  assert.match(code.html, /<span>موجة انطلاق<\/span>/);
  assert.match(code.html, /<svg class="wave-svg-arrows" viewBox="0 0 66 43"/);

  // CSS checks
  assert.match(code.css, /\.beso-wave-btn\s*\{[^}]*--color-background:\s*#0d3b2e/);
  assert.match(code.css, /\.beso-wave-btn:hover::before\s*\{[^}]*width:\s*300px/);
  assert.match(code.css, /@keyframes ripple\s*\{/);
});

test('11. Premium Element: Cyber Scanline & Glow Card (Laser & Corners)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'cyber-glimmer-card';
  state.typography.titleText = 'رادار المسح';
  state.typography.descText = 'تفاصيل المسح السيبراني';

  const code = generateElementCode('cyber-glimmer-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-cyber-glimmer-card">/);
  assert.match(code.html, /<div class="cyber-corners"><span><\/span><span><\/span><span><\/span><span><\/span><\/div>/);
  assert.match(code.html, /<div class="scanline-bar"><\/div>/);
  assert.match(code.html, /<h3 class="cyber-title">رادار المسح<\/h3>/);
  assert.match(code.html, /<p class="cyber-desc">تفاصيل المسح السيبراني<\/p>/);

  // CSS checks
  assert.match(code.css, /\.beso-cyber-glimmer-card \.scanline-bar\s*\{[^}]*animation:\s*scanMove 2\.5s/);
  assert.match(code.css, /@keyframes scanMove\s*\{/);
});

test('12. Premium Element: 3D Holographic Orbit Ring (Perspective Spin)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'holographic-3d-ring';
  state.typography.titleText = 'مدار هولوغرافي';
  state.typography.descText = 'حلقة ثلاثية الأبعاد';

  const code = generateElementCode('holographic-3d-ring', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-holo-ring-container">/);
  assert.match(code.html, /<div class="holo-orbit-ring"><\/div>/);
  assert.match(code.html, /<div class="holo-orbit-ring ring-secondary"><\/div>/);
  assert.match(code.html, /<h3 class="holo-title">مدار هولوغرافي<\/h3>/);

  // CSS checks
  assert.match(code.css, /\.beso-holo-ring-container\s*\{[^}]*perspective:\s*900px/);
  assert.match(code.css, /@keyframes holoSpin\s*\{/);
  assert.match(code.css, /@keyframes holoSpinReverse\s*\{/);
});

test('13. Premium Element: Cyber Matrix Badge (Matrix Grid & Scan)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'cyber-matrix-badge';
  state.typography.titleText = 'عقدة الأمان';
  state.typography.descText = 'ONLINE::0xFF';

  const code = generateElementCode('cyber-matrix-badge', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-matrix-badge">/);
  assert.match(code.html, /<div class="matrix-grid-bg"><\/div>/);
  assert.match(code.html, /<div class="matrix-scan-bar"><\/div>/);
  assert.match(code.html, /<span class="matrix-dot"><\/span>/);
  assert.match(code.html, /<span class="matrix-label">عقدة الأمان<\/span>/);
  assert.match(code.html, /<span class="matrix-code">ONLINE::0xFF<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-matrix-badge\s*\{[^}]*font-family:\s*monospace/);
  assert.match(code.css, /@keyframes matrixPulse\s*\{/);
  assert.match(code.css, /@keyframes matrixScan\s*\{/);
});

test('14. Premium Element: 3D Glassmorphic Prism Card (Spectral Refraction)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'glass-morph-card-3d';
  state.typography.titleText = 'منشور بلوري';
  state.typography.descText = 'انكسار ضوئي ثلاثي الأبعاد';

  const code = generateElementCode('glass-morph-card-3d', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-prism-card">/);
  assert.match(code.html, /<div class="prism-refraction"><\/div>/);
  assert.match(code.html, /<span class="prism-tag">PRISM 3D<\/span>/);
  assert.match(code.html, /<h3 class="prism-title">منشور بلوري<\/h3>/);
  assert.match(code.html, /<p class="prism-desc">انكسار ضوئي ثلاثي الأبعاد<\/p>/);

  // CSS checks
  assert.match(code.css, /\.beso-prism-card\s*\{[^}]*backdrop-filter:\s*blur\(20px\)/);
  assert.match(code.css, /@keyframes prismRotate\s*\{/);
});

test('15. Premium Element: Flowing Neon Border Button (Conic Edge Beam)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'glowing-border-button';
  state.typography.titleText = 'تأكيد العملية';

  const code = generateElementCode('glowing-border-button', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-flowing-border-btn">/);
  assert.match(code.html, /<div class="flowing-border-beam"><\/div>/);
  assert.match(code.html, /<span>تأكيد العملية<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-flowing-border-btn \.flowing-border-beam\s*\{[^}]*conic-gradient/);
  assert.match(code.css, /@keyframes flowingRotate\s*\{/);
});

test('16. Premium Element: Biometric Laser Scanner Card (Laser Scan & Pulse)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'biometric-auth-card';
  state.typography.titleText = 'مسح بيومتري';
  state.typography.descText = 'تأكيد الصلاحية المشفرة';

  const code = generateElementCode('biometric-auth-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-biometric-card">/);
  assert.match(code.html, /<div class="bio-laser-beam"><\/div>/);
  assert.match(code.html, /<svg class="bio-fingerprint-svg"/);
  assert.match(code.html, /<div class="bio-ring-pulse"><\/div>/);
  assert.match(code.html, /<h4 class="bio-title">مسح بيومتري<\/h4>/);
  assert.match(code.html, /<p class="bio-desc">تأكيد الصلاحية المشفرة<\/p>/);

  // CSS checks
  assert.match(code.css, /\.beso-biometric-card \.bio-laser-beam\s*\{[^}]*animation:\s*laserScan 2\.2s/);
  assert.match(code.css, /@keyframes laserScan\s*\{/);
  assert.match(code.css, /@keyframes bioPulse\s*\{/);
});

test('17. Quantum Glass Physics Toggle (Sliding Neon Core)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'quantum-toggle-switch';

  const code = generateElementCode('quantum-toggle-switch', state);

  // HTML checks
  assert.match(code.html, /<label class="beso-quantum-toggle">/);
  assert.match(code.html, /<input type="checkbox" class="toggle-input" \/>/);
  assert.match(code.html, /<span class="toggle-track">/);
  assert.match(code.html, /<span class="thumb-core"><\/span>/);
  assert.match(code.html, /<span class="toggle-label-on">ON<\/span>/);
  assert.match(code.html, /<span class="toggle-label-off">OFF<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-quantum-toggle \.toggle-input:checked \+ \.toggle-track \.toggle-thumb\s*\{[^}]*transform:\s*translateX\(36px\)/);
  assert.match(code.css, /\.beso-quantum-toggle \.toggle-track\s*\{[^}]*backdrop-filter:\s*blur\(12px\)/);
});

test('18. Holographic Luxury Pricing Card (Conic Sweep & CTA)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'holographic-price-card';
  state.typography.titleText = '999 $ / سنويًا';
  state.typography.descText = 'VIP DIAMOND';

  const code = generateElementCode('holographic-price-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-holo-price-card">/);
  assert.match(code.html, /<div class="holo-shimmer-bg"><\/div>/);
  assert.match(code.html, /<div class="holo-badge">VIP DIAMOND<\/div>/);
  assert.match(code.html, /<h3 class="holo-price-title">999 \$ \/ سنويًا<\/h3>/);
  assert.match(code.html, /<button class="holo-cta-btn">تفعيل الاشتراكات<\/button>/);

  // CSS checks
  assert.match(code.css, /\.beso-holo-price-card \.holo-shimmer-bg\s*\{[^}]*conic-gradient/);
  assert.match(code.css, /@keyframes holoBorderSweep\s*\{/);
  assert.match(code.css, /\.beso-holo-price-card:hover\s*\{[^}]*transform:\s*translateY\(-8px\) rotateX\(4deg\)/);
});

test('19. Premium Element: Cyber Delivery Truck Card (Road Drive & Smoke)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'cyber-truck-card';
  state.typography.titleText = 'توصيل شاحنة سيبرانية';
  state.typography.descText = 'تتبع الشحنة الفورية';

  const code = generateElementCode('cyber-truck-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-truck-card">/);
  assert.match(code.html, /<div class="moving-road-lines"><\/div>/);
  assert.match(code.html, /<div class="moving-truck">/);
  assert.match(code.html, /<svg class="truck-svg"/);
  assert.match(code.html, /<div class="exhaust-smoke"><\/div>/);
  assert.match(code.html, /<h3 class="truck-title">توصيل شاحنة سيبرانية<\/h3>/);

  // CSS checks
  assert.match(code.css, /\.beso-truck-card \.moving-road-lines\s*\{[^}]*animation:\s*driveRoad 0\.8s/);
  assert.match(code.css, /@keyframes driveRoad\s*\{/);
  assert.match(code.css, /@keyframes truckBob\s*\{/);
  assert.match(code.css, /@keyframes smokePuff\s*\{/);
});

test('20. Premium Element: Anime Treadmill Runner Card (Strides & Belt)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'anime-treadmill-card';
  state.typography.titleText = 'جلسة تدريب رياضية';
  state.typography.descText = 'حرق الدهون النشط';

  const code = generateElementCode('anime-treadmill-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-treadmill-card">/);
  assert.match(code.html, /<span class="workout-badge">WORKOUT LIVE<\/span>/);
  assert.match(code.html, /<div class="anime-runner">/);
  assert.match(code.html, /<div class="runner-head"><\/div>/);
  assert.match(code.html, /<div class="runner-leg leg-left"><\/div>/);
  assert.match(code.html, /<div class="belt-track"><\/div>/);

  // CSS checks
  assert.match(code.css, /\.beso-treadmill-card \.leg-left\s*\{[^}]*animation:\s*legStrides 0\.6s/);
  assert.match(code.css, /@keyframes legStrides\s*\{/);
  assert.match(code.css, /@keyframes beltMove\s*\{/);
});

test('21. Premium Element: Kinetic Marquee Ticker Tape Card (Endless Scrolling)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'ticker-tape-card';
  state.typography.titleText = 'خصم خاص';
  state.typography.descText = 'لفترة محدودة فقط';

  const code = generateElementCode('ticker-tape-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-ticker-card">/);
  assert.match(code.html, /<div class="marquee-tape-wrapper">/);
  assert.match(code.html, /<div class="marquee-track">/);
  assert.match(code.html, /<span>✨ خصم خاص • 🚀 لفترة محدودة فقط/);

  // CSS checks
  assert.match(code.css, /\.beso-ticker-card \.marquee-track\s*\{[^}]*animation:\s*tickerInfinite 10s/);
  assert.match(code.css, /@keyframes tickerInfinite\s*\{/);
});

test('22. Premium Element: Slot Machine Fortune Card (Spinning Reels)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'slot-machine-card';
  state.typography.titleText = 'دولاب الجوائز';
  state.typography.descText = 'اربح هدايا فورية';

  const code = generateElementCode('slot-machine-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-slot-card">/);
  assert.match(code.html, /<span class="slot-badge">LUCKY WIN<\/span>/);
  assert.match(code.html, /<div class="slot-machine-display">/);
  assert.match(code.html, /<div class="reel-strip reel-1">/);
  assert.match(code.html, /<h3 class="slot-title">دولاب الجوائز<\/h3>/);

  // CSS checks
  assert.match(code.css, /\.beso-slot-card \.reel-1\s*\{[^}]*animation:\s*spinReel 1\.2s/);
  assert.match(code.css, /@keyframes spinReel\s*\{/);
});

test('23. Premium Element: Retro CRT Glitch Card (Scanlines & RGB Glitch)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'retro-crt-glitch';
  state.typography.titleText = 'إشارة كاثودية';
  state.typography.descText = 'بث تناظري مشفر';

  const code = generateElementCode('retro-crt-glitch', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-crt-card">/);
  assert.match(code.html, /<div class="crt-scanline-overlay"><\/div>/);
  assert.match(code.html, /<div class="crt-signal-indicator">/);
  assert.match(code.html, /<h3 class="crt-title" data-text="إشارة كاثودية">إشارة كاثودية<\/h3>/);

  // CSS checks
  assert.match(code.css, /\.beso-crt-card \.crt-scanline-overlay\s*\{[^}]*animation:\s*crtScan 8s/);
  assert.match(code.css, /\.beso-crt-card:hover \.crt-title\s*\{[^}]*animation:\s*rgbGlitch 0\.3s/);
  assert.match(code.css, /@keyframes rgbGlitch\s*\{/);
});

test('24. Premium Element: Dynamic Audio Spectrum Equalizer Card (Neon Jumping Bars)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'audio-equalizer-card';
  state.typography.titleText = 'موجات صوتية';
  state.typography.descText = 'ترددات حية';

  const code = generateElementCode('audio-equalizer-card', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-audio-card">/);
  assert.match(code.html, /<div class="equalizer-visualizer">/);
  assert.match(code.html, /<span class="eq-bar bar-1"><\/span>/);
  assert.match(code.html, /<span class="eq-bar bar-8"><\/span>/);
  assert.match(code.html, /<h3 class="audio-title">موجات صوتية<\/h3>/);

  // CSS checks
  assert.match(code.css, /\.beso-audio-card \.bar-1\s*\{[^}]*animation:\s*jumpBar1 0\.7s/);
  assert.match(code.css, /@keyframes jumpBar1\s*\{/);
  assert.match(code.css, /@keyframes jumpBar4\s*\{/);
});

test('25. Premium Element: Kinetic Sliding Shopping Cart Button (Wheel Slide & Particle)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'kinetic-cart-slide';
  state.typography.titleText = 'إضافة للسلة';

  const code = generateElementCode('kinetic-cart-slide', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-kinetic-cart-btn">/);
  assert.match(code.html, /<div class="cart-icon-container">/);
  assert.match(code.html, /<svg class="cart-svg-wheel"/);
  assert.match(code.html, /<span class="item-particle-drop"><\/span>/);
  assert.match(code.html, /<span class="text-default">إضافة للسلة<\/span>/);
  assert.match(code.html, /<span class="text-added">تمت الإضافة ✔️<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-kinetic-cart-btn:hover \.item-particle-drop\s*\{[^}]*animation:\s*dropParticle 0\.5s/);
  assert.match(code.css, /@keyframes dropParticle\s*\{/);
});

test('26. Premium Element: Interactive Quick Quantity Counter Button (Pill Morph)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'quick-quantity-counter';
  state.typography.titleText = 'طلب فوري';

  const code = generateElementCode('quick-quantity-counter', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-counter-btn-wrapper">/);
  assert.match(code.html, /<button class="counter-trigger-btn">/);
  assert.match(code.html, /<span>طلب فوري<\/span>/);
  assert.match(code.html, /<div class="active-counter-pill">/);
  assert.match(code.html, /<button class="qty-btn btn-minus">-<\/button>/);
  assert.match(code.html, /<span class="qty-number">1<\/span>/);
  assert.match(code.html, /<button class="qty-btn btn-plus">\+<\/button>/);

  // CSS checks
  assert.match(code.css, /\.beso-counter-btn-wrapper:hover \.counter-trigger-btn/);
  assert.match(code.css, /\.beso-counter-btn-wrapper \.qty-btn:hover/);
});

test('27. Premium Element: 3D Liquid Fill Tote Bag Button (Wave Rise)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'liquid-tote-fill';
  state.typography.titleText = 'شراء المنتجات';

  const code = generateElementCode('liquid-tote-fill', state);

  // HTML checks
  assert.match(code.html, /<button class="beso-liquid-tote-btn">/);
  assert.match(code.html, /<div class="tote-icon-wrapper">/);
  assert.match(code.html, /<svg class="tote-svg"/);
  assert.match(code.html, /<span class="tote-btn-label">شراء المنتجات<\/span>/);
  assert.match(code.html, /<div class="liquid-wave-bg"><\/div>/);

  // CSS checks
  assert.match(code.css, /\.beso-liquid-tote-btn \.liquid-wave-bg\s*\{[^}]*bottom:\s*-100%/);
  assert.match(code.css, /\.beso-liquid-tote-btn:hover \.liquid-wave-bg\s*\{[^}]*bottom:\s*0/);
});

test('28. Premium Element: Continuous Pulsing Ripple WhatsApp (Ripple Rings)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'wa-pulse-glow';

  const code = generateElementCode('wa-pulse-glow', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-wa-pulse-wrapper">/);
  assert.match(code.html, /<div class="wa-ripple-ring ring-1"><\/div>/);
  assert.match(code.html, /<div class="wa-ripple-ring ring-2"><\/div>/);
  assert.match(code.html, /<a href="https:\/\/wa\.me\/" target="_blank" rel="noopener noreferrer" class="beso-wa-btn pulse-main">/);

  // CSS checks
  assert.match(code.css, /\.beso-wa-pulse-wrapper \.ring-1\s*\{[^}]*animation:\s*waPulseRipple 2s/);
  assert.match(code.css, /@keyframes waPulseRipple\s*\{/);
  assert.match(code.css, /\.beso-wa-pulse-wrapper:hover \.pulse-main\s*\{[^}]*transform:\s*scale\(1\.12\)/);
});

test('29. Premium Element: Continuous Orbiting WhatsApp (Conic 360 Spin)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'wa-continuous-spin';

  const code = generateElementCode('wa-continuous-spin', state);

  // HTML checks
  assert.match(code.html, /<div class="beso-wa-orbit-wrapper">/);
  assert.match(code.html, /<div class="wa-orbit-border"><\/div>/);
  assert.match(code.html, /<a href="https:\/\/wa\.me\/" target="_blank" rel="noopener noreferrer" class="beso-wa-btn orbit-inner">/);

  // CSS checks
  assert.match(code.css, /\.beso-wa-orbit-wrapper \.wa-orbit-border\s*\{[^}]*animation:\s*waOrbitSpin 4s/);
  assert.match(code.css, /@keyframes waOrbitSpin\s*\{/);
});

test('30. Premium Element: Expandable Live Badge WhatsApp (Hover Width Expand)', () => {
  const state = createInitialWorkspaceState();
  state.activeElement = 'wa-expandable-badge';
  state.typography.titleText = 'تحدث معنا';
  state.typography.descText = 'فريق الدعم متاح';

  const code = generateElementCode('wa-expandable-badge', state);

  // HTML checks
  assert.match(code.html, /<a href="https:\/\/wa\.me\/" target="_blank" rel="noopener noreferrer" class="beso-wa-expandable-btn">/);
  assert.match(code.html, /<span class="live-status-dot"><\/span>/);
  assert.match(code.html, /<span class="badge-title">تحدث معنا<\/span>/);
  assert.match(code.html, /<span class="badge-sub">فريق الدعم متاح<\/span>/);

  // CSS checks
  assert.match(code.css, /\.beso-wa-expandable-btn\s*\{[^}]*width:\s*52px/);
  assert.match(code.css, /\.beso-wa-expandable-btn:hover\s*\{[^}]*width:\s*190px/);
  assert.match(code.css, /@keyframes liveDotPulse\s*\{/);
});









import Lenis from './vendor/lenis-1.3.27.mjs';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const targets = [...document.querySelectorAll('.studio-section-heading, .studio-intro-columns, .studio-team article, .studio-service, .support-copy, .studio-benefits li, .studio-contact .studio-wrap')];
let lenis;
let observer;

function setupMotion() {
 lenis?.destroy();
 observer?.disconnect();
 targets.forEach(element => element.removeAttribute('data-reveal'));
 root.removeAttribute('data-motion');
 if (reducedMotion.matches) return;
 // Same smoothing as jrepas.hu; retain native touch scrolling on phones.
 lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: true });
 root.setAttribute('data-motion', 'true');
 if (!('IntersectionObserver' in window)) return;
 observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   entry.target.setAttribute('data-reveal', 'visible');
   observer.unobserve(entry.target);
  }
 }, { rootMargin: '0px 0px 40px 0px', threshold: 0.04 });
 targets.forEach(element => {
  if (element.getBoundingClientRect().top < innerHeight) return;
  element.setAttribute('data-reveal', 'pending');
  observer.observe(element);
 });
}

// Reuse the original site's Safari-compatible progressive viewport blur styles.
const glass = document.createElement('div');
glass.className = 'top-glass';
glass.setAttribute('aria-hidden', 'true');
glass.innerHTML = '<span></span><span></span><span></span>';
document.body.append(glass);
function updateGlass() {
 root.setAttribute('data-scrolled', String(window.scrollY > 24));
}
window.addEventListener('scroll', updateGlass, { passive: true });
window.addEventListener('pageshow', updateGlass);
document.addEventListener('focusin', event => {
 const target = event.target.closest?.('[data-reveal]');
 if (target) target.setAttribute('data-reveal', 'visible');
});
setupMotion();
updateGlass();
if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', setupMotion);
else reducedMotion.addListener(setupMotion);

// Continuous Bezier paths gently change shape with the section's scroll progress.
const branding = document.querySelector('.branding-block');
const vectorArt = branding?.querySelector('.branding-vectors');
let curveFrame = 0;
function drawBrandCurves() {
 curveFrame = 0;
 if (!vectorArt) return;
 const rect = branding.getBoundingClientRect();
 if (rect.bottom < 0 || rect.top > innerHeight) return;
 const progress = reducedMotion.matches ? .5 : Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
 const wave = Math.sin((progress - .5) * Math.PI) * 42;
 const paths = vectorArt.querySelectorAll('.branding-curves path');
 paths[0].setAttribute('d', `M-240 230C100 ${65 + wave} 350 ${85 - wave} 700 230S1200 ${350 - wave} 1680 150`);
 paths[1].setAttribute('d', `M-240 150C100 ${350 - wave} 350 ${325 + wave} 700 170S1200 ${65 + wave} 1680 250`);
 // Construction handles follow the same control points as the curves.
 const guides = vectorArt.querySelectorAll('.branding-guides path');
 guides[0].setAttribute('d', `M-240 230 100 ${65 + wave}M350 ${85 - wave} 700 230 1050 ${375 + wave}`);
 guides[1].setAttribute('d', `M-240 150 100 ${350 - wave}M350 ${325 + wave} 700 170 1050 ${15 - wave}`);
 const nodes = vectorArt.querySelectorAll('.branding-nodes rect');
 [[100,65+wave],[350,85-wave],[700,230],[350,325+wave]].forEach(([x,y],index) => {
  nodes[index].setAttribute('x', x - 6); nodes[index].setAttribute('y', y - 6);
 });
 const circles = vectorArt.querySelectorAll('.branding-nodes circle');
 circles[0].setAttribute('cx',100);circles[0].setAttribute('cy',350-wave);
 circles[1].setAttribute('cx',700);circles[1].setAttribute('cy',170);
}
function scheduleBrandCurves() { if (!curveFrame) curveFrame = requestAnimationFrame(drawBrandCurves); }
window.addEventListener('scroll', scheduleBrandCurves, { passive: true });
window.addEventListener('resize', scheduleBrandCurves, { passive: true });
window.addEventListener('pageshow', scheduleBrandCurves);
reducedMotion.addEventListener?.('change', scheduleBrandCurves);
scheduleBrandCurves();

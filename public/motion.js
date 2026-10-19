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

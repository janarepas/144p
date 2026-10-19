const themeButton = document.querySelector('.theme-toggle');
function updateThemeLabel() {
 const dark = document.documentElement.dataset.theme === 'dark';
 const hu = document.documentElement.lang === 'hu';
 themeButton.setAttribute('aria-label', hu ? (dark ? 'Világos mód' : 'Sötét mód') : (dark ? 'Switch to light mode' : 'Switch to dark mode'));
}
function applyTheme(dark) {
 document.documentElement.dataset.theme = dark ? 'dark' : 'light';
 themeButton.setAttribute('aria-pressed', String(dark));
 themeButton.dataset.iconTheme = dark ? 'sun' : 'moon';
 updateThemeLabel();
}
applyTheme(document.documentElement.dataset.theme === 'dark');
themeButton.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme !== 'dark'));
function renderArrows() {
 const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
 const nodes = [];
 while (walker.nextNode()) if (walker.currentNode.textContent.trim() === '↗') nodes.push(walker.currentNode);
 for (const node of nodes) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');svg.setAttribute('class', 'vector-arrow');svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5 19 19 5M5 5h14v14');path.setAttribute('fill', 'none');path.setAttribute('stroke', 'currentColor');path.setAttribute('stroke-width', '1.6');
  svg.append(path);node.replaceWith(svg);
 }
}
function setLanguage(language, remember = false) {
 const lang = language === 'en' ? 'en' : 'hu';
 document.documentElement.lang = lang;
 document.querySelectorAll('[data-i18n]').forEach(node => {
  const entry = window.STUDIO_TRANSLATIONS[node.dataset.i18n];
  if (entry) node.innerHTML = entry[lang];
 });
 document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
 document.title = lang === 'hu' ? '144p Group | Kreatív tervező- és grafikai stúdió' : '144p Group | Creative Design & Production Studio';
 document.querySelector('meta[name="description"]').content = lang === 'hu' ? 'Két tapasztalt tervező. Egy megbízható kreatív partner. Grafikai tervezés, digitális kreatívok, nyomtatott anyagok és gyártásra kész grafika.' : 'Two experienced designers. One reliable creative production partner. Graphic design, digital marketing assets, print design, and production-ready artwork.';
 document.querySelector('.brand').setAttribute('aria-label', lang === 'hu' ? '144p Group kezdőlap' : '144p Group home');
 document.querySelector('.site-header nav').setAttribute('aria-label', lang === 'hu' ? 'Főmenü' : 'Main navigation');
 document.querySelector('.agency-ribbon').setAttribute('aria-label', lang === 'hu' ? 'Szakterületeink' : 'Our expertise');
 updateThemeLabel();renderArrows();
 if (remember) { try { localStorage.setItem('144p-language', lang); } catch {} }
}
let preferredLanguage;
try { preferredLanguage = localStorage.getItem('144p-language'); } catch {}
if (!['hu', 'en'].includes(preferredLanguage)) preferredLanguage = (navigator.language || 'hu').toLowerCase().startsWith('hu') ? 'hu' : 'en';
setLanguage(preferredLanguage);
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang, true)));
const menuButton = document.querySelector('.studio-menu-toggle');
const mainNav = document.querySelector('#main-navigation');
function setMenu(open) {
 menuButton.setAttribute('aria-expanded', String(open));
 const hu = document.documentElement.lang === 'hu';
 menuButton.setAttribute('aria-label', hu ? (open ? 'Menü bezárása' : 'Menü megnyitása') : (open ? 'Close menu' : 'Open menu'));
 mainNav.classList.toggle('is-open', open);
 menuButton.querySelector('path').setAttribute('d', open ? 'M6 6l12 12M6 18 18 6' : 'M4 7h16M4 12h16M4 17h16');
}
setMenu(false);
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setMenu(false)));
window.matchMedia('(min-width: 1001px)').addEventListener('change', () => setMenu(false));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
  toggle.textContent = open ? '×' : '☰';
  nav.classList.toggle('open', open);
});
function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menü megnyitása');
  toggle.textContent = '☰';
}
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();

// Use vector arrows so their appearance never depends on installed symbol fonts.
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const arrowNodes = [];
while (walker.nextNode()) {
  if (/[↗↖↳↑↓]/.test(walker.currentNode.textContent) && walker.currentNode.parentElement.tagName !== 'SCRIPT') arrowNodes.push(walker.currentNode);
}
for (const node of arrowNodes) {
  const fragment = document.createDocumentFragment();
  for (const part of node.textContent.split(/([↗↖↳↑↓])/)) {
    if (!/^[↗↖↳↑↓]$/.test(part)) { fragment.append(document.createTextNode(part)); continue; }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'vector-arrow');
    svg.setAttribute('aria-hidden', 'true');
    const rotations = {'↗': 0, '↖': -90, '↑': -45, '↓': 135, '↳': 90};
    svg.style.transform = `rotate(${rotations[part]}deg)`;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M5 19 19 5M5 5h14v14');
    path.setAttribute('fill', 'none'); path.setAttribute('stroke', 'currentColor'); path.setAttribute('stroke-width', '1.6');
    svg.append(path); fragment.append(svg);
  }
  node.replaceWith(fragment);
}

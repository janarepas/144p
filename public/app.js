const themeButton = document.querySelector('.theme-toggle');
function applyTheme(dark) {
 document.documentElement.dataset.theme = dark ? 'dark' : 'light';
 themeButton.setAttribute('aria-pressed', String(dark));
 themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
 themeButton.dataset.iconTheme = dark ? 'sun' : 'moon';
}
applyTheme(document.documentElement.dataset.theme === 'dark');
themeButton.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme !== 'dark'));
// Draw arrows as vectors so rendering does not rely on system symbol fonts.
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];
while(walker.nextNode())if(walker.currentNode.textContent.trim()==='↗')nodes.push(walker.currentNode);
for(const node of nodes){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','vector-arrow');svg.setAttribute('aria-hidden','true');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M5 19 19 5M5 5h14v14');path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.6');svg.append(path);node.replaceWith(svg)}

import { loadYouTubeAPI } from './youtube-api.js';
const control = document.createElement('div');
control.className = 'studio-music';
control.innerHTML = `<button class="music-toggle" type="button" aria-controls="music-panel" aria-expanded="false"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M9 18V5l11-2v13M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/></svg><span></span></button><section id="music-panel" hidden><div class="music-panel-heading"><span></span><button class="music-close" type="button">×</button></div><div id="studio-music-player"></div><p class="music-status" role="status"></p><a class="music-source" href="https://youtu.be/pHWQNbVDb3Y" target="_blank" rel="noopener noreferrer">YouTube ↗</a></section>`;
document.body.append(control);
const button = control.querySelector('.music-toggle');
const panel = control.querySelector('#music-panel');
const close = control.querySelector('.music-close');
const status = control.querySelector('.music-status');
let player;
let loading = false;
function translate() {
 const hu = document.documentElement.lang === 'hu';
 button.querySelector('span').textContent = hu ? 'Zene' : 'Music';
 button.setAttribute('aria-label', hu ? 'Zene megnyitása vagy leállítása' : 'Open or stop music');
 control.querySelector('.music-panel-heading>span').textContent = hu ? 'Háttérzene · 60%' : 'Music · 60%';
 close.setAttribute('aria-label', hu ? 'Zene leállítása' : 'Stop music');
}
translate();
new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
function stop() {
 player?.pauseVideo?.();panel.hidden = true;button.setAttribute('aria-expanded', 'false');
}
button.addEventListener('click', async () => {
 if (!panel.hidden) { stop();return; }
 panel.hidden = false;button.setAttribute('aria-expanded', 'true');
 if (player) { player.setVolume(60);player.playVideo();return; }
 if (loading) return;
 loading = true;
 status.textContent = document.documentElement.lang === 'hu' ? 'Betöltés…' : 'Loading…';
 try {
  const YT = await loadYouTubeAPI();
  player = new YT.Player('studio-music-player', {
   host: 'https://www.youtube-nocookie.com',videoId: 'pHWQNbVDb3Y',
   width: '280',height: '200',
   playerVars: { autoplay: 1, controls: 1, playsinline: 1, fs: 0, rel: 0, origin: location.origin },
   events: {
    onReady(event) { status.textContent = '';event.target.setVolume(60);if (!panel.hidden) event.target.playVideo(); },
    onError() { status.textContent = document.documentElement.lang === 'hu' ? 'A videó itt nem játszható le. Megnyitás a YouTube-on.' : 'This video cannot be played here. Open it on YouTube.'; }
   }
  });
 } catch {
  status.textContent = document.documentElement.lang === 'hu' ? 'A YouTube most nem érhető el.' : 'YouTube is currently unavailable.';
 } finally { loading = false; }
});
close.addEventListener('click', stop);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { stop();button.focus(); } });

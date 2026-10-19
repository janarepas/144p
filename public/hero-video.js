import { loadYouTubeAPI } from './youtube-api.js';
const hero = document.querySelector('.studio-hero');
const layer = document.querySelector('.studio-video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let player;
let revealTimer;
let revealStarted = false;
function sizeVideo() {
 // Crop the letterboxed edges while keeping the video centered and responsive.
 const width = Math.max(hero.clientWidth, hero.clientHeight * 16 / 9) * 1.35;
 layer.style.setProperty('--video-width', `${Math.ceil(width)}px`);
 layer.style.setProperty('--video-height', `${Math.ceil(width * 9 / 16)}px`);
}
sizeVideo();
if ('ResizeObserver' in window) new ResizeObserver(sizeVideo).observe(hero);
else window.addEventListener('resize', sizeVideo);
function hideVideo() {
 clearTimeout(revealTimer);
 revealStarted = false;
 hero.classList.remove('video-playing');
}
function syncPlayback() {
 if (!player?.playVideo) return;
 if (reducedMotion.matches || document.hidden) {
  hideVideo();
  player.pauseVideo();
 }
 else player.playVideo();
}
function startPlayer() {
 if (player || reducedMotion.matches || !window.YT?.Player) return;
 player = new window.YT.Player('studio-video-player', {
  host: 'https://www.youtube-nocookie.com',
  videoId: 'ybrYeRqn3sg',
  playerVars: { autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, playsinline: 1, loop: 1, playlist: 'ybrYeRqn3sg', rel: 0, iv_load_policy: 3, origin: location.origin },
  events: {
   onReady(event) {
    const iframe = event.target.getIframe();
    iframe.setAttribute('tabindex', '-1');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('title', 'Decorative studio video background');
    event.target.mute();
    const rates = event.target.getAvailablePlaybackRates();
    event.target.setPlaybackRate(rates.includes(0.5) ? 0.5 : rates.find(rate => rate < 1) || 1);
    syncPlayback();
   },
   onStateChange(event) {
    if (event.data === window.YT.PlayerState.PLAYING) {
     if (reducedMotion.matches || document.hidden) { event.target.pauseVideo();return; }
     if (!revealStarted) {
      revealStarted = true;
      // Keep YouTube's transient start overlay behind the poster while playback settles.
      revealTimer = window.setTimeout(() => {
       if (!reducedMotion.matches && !document.hidden && event.target.getPlayerState() === window.YT.PlayerState.PLAYING) hero.classList.add('video-playing');
       else revealStarted = false;
      }, 3500);
     }
    } else {
     hideVideo();
    }
   },
   onError: hideVideo
  }
 });
}
function loadAPI() {
 if (reducedMotion.matches) return;
 loadYouTubeAPI().then(startPlayer).catch(() => hero.classList.remove('video-playing'));
}
// Keep playing while the visitor scrolls: resuming the iframe can flash YouTube overlays.
document.addEventListener('visibilitychange', syncPlayback);
reducedMotion.addEventListener('change', () => {
 hero.classList.toggle('reduce-video-motion', reducedMotion.matches);
 if (!reducedMotion.matches) loadAPI();
 syncPlayback();
});
loadAPI();

import translations from '../public/translations-data.json';

export async function onRequest(context) {
 const response = await context.next();
 if (!response.headers.get('content-type')?.includes('text/html')) return response;
 const country = context.request.cf?.country || '';
 const savedLanguage = context.request.headers.get('Cookie')?.match(/(?:^|;\s*)144p-language=(hu|en)(?:;|$)/)?.[1];
 const language = savedLanguage || (country === 'HU' ? 'hu' : 'en');
 const titles = { hu: '144p Group | Kreatív tervező- és grafikai stúdió', en: '144p Group | Creative Design & Production Studio' };
 const descriptions = {
  hu: 'Két tapasztalt tervező. Egy megbízható kreatív partner. Grafikai tervezés, digitális kreatívok, nyomtatott anyagok és gyártásra kész grafika.',
  en: 'Two experienced designers. One reliable creative production partner. Graphic design, digital marketing assets, print design, and production-ready artwork.'
 };
 const headers = new Headers(response.headers);
 // Country-specific HTML must not be shared between visitors from different regions.
 headers.set('Cache-Control', 'private, no-store');
 const output = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
 return new HTMLRewriter()
  .on('html', { element(element) { element.setAttribute('lang', language);element.setAttribute('data-country', country); } })
  .on('[data-i18n]', { element(element) {
   const entry = translations[element.getAttribute('data-i18n')];
   if (entry) element.setInnerContent(entry[language], { html: true });
  } })
  .on('title', { element(element) { element.setInnerContent(titles[language]); } })
  .on('meta[name="description"]', { element(element) { element.setAttribute('content', descriptions[language]); } })
  .on('meta[property="og:title"], meta[name="twitter:title"]', { element(element) { element.setAttribute('content', titles[language]); } })
  .on('meta[property="og:description"], meta[name="twitter:description"]', { element(element) { element.setAttribute('content', descriptions[language]); } })
  .on('meta[property="og:locale"]', { element(element) { element.setAttribute('content', language === 'hu' ? 'hu_HU' : 'en_US'); } })
  .on('[data-lang]', { element(element) { element.setAttribute('aria-pressed', String(element.getAttribute('data-lang') === language)); } })
  .transform(output);
}

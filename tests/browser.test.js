import test from 'node:test';
import assert from 'node:assert/strict';
import { launchBrowser } from './browser.js';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const widths = [320,360,390,430,600,700,701,768,820,950,1000,1001,1024,1100,1280,1440,1920,2560];
const run = (name, fn) => test(name, { timeout: 180_000 }, async () => {
 const browser = await launchBrowser();
 try { await fn(browser); } finally { await browser.close(); }
});
run('runtime: saved choices, themes, cookies and script errors', async browser => {
 for (const width of [390,1440]) {
  const context = await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page = await context.newPage(); const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto(base); await page.locator('[data-lang="hu"]').click();
  await page.locator('.theme-toggle').click();
  const theme=await page.locator('html').getAttribute('data-theme');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'),'hu');
  assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
  await page.locator('[data-lang="en"]').click(); await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.ok(await page.locator('.studio-language').isVisible());
  assert.deepEqual(errors,[]); await context.close();
 }
});
run('SEO: both languages, metadata, schema, robots, sitemap and real 404', async browser => {
 const page=await browser.newPage();await page.goto(base);
 for(const lang of ['hu','en']) {
  await page.locator(`[data-lang="${lang}"]`).click();
  assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'),await page.title());
  assert.equal(await page.locator('meta[name="twitter:title"]').getAttribute('content'),await page.title());
  const description=await page.locator('meta[name="description"]').getAttribute('content');
  for(const selector of ['meta[property="og:description"]','meta[name="twitter:description"]'])assert.equal(await page.locator(selector).getAttribute('content'),description);
  assert.equal(await page.locator('meta[property="og:locale"]').getAttribute('content'),lang==='hu'?'hu_HU':'en_US');
 }
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://144p.hu/');
 const schema=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
 assert.ok(schema['@graph'].some(s=>s['@type']==='Organization'));
 assert.equal(await page.locator('h1').count(),1);
 for(const path of ['/robots.txt','/sitemap.xml','/images/social-preview.png'])assert.equal((await page.request.get(base+path)).status(),200);
 assert.match(await (await page.request.get(base+'/robots.txt')).text(),/Sitemap: https:\/\/144p.hu\/sitemap.xml/);
 assert.match(await (await page.request.get(base+'/sitemap.xml')).text(),/<loc>https:\/\/144p.hu\/<\/loc>/);
 for(const path of ['/missing-audit-page','/missing/nested/path']) {
  assert.equal((await page.goto(base+path)).status(),404);
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex, follow');
  assert.match(await page.title(),/nem található/);
 }
});
run('UX: mobile menu, Escape, hash navigation and contact destination', async browser => {
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto(base);const menu=page.locator('.studio-mobile-menu');
 await menu.locator('summary').click();assert.notEqual(await menu.getAttribute('open'),null);
 await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('open'),null);
 await menu.locator('summary').click();await menu.locator('a[href="#about"]').click();
 assert.equal(await menu.getAttribute('open'),null);assert.equal(new URL(page.url()).hash,'#about');
 assert.equal(await page.locator('.studio-contact a').getAttribute('href'),'https://www.upwork.com/agencies/144p/');
 const brand=page.locator('.brand');assert.match(await brand.getAttribute('aria-label'),/Low resolution\. High standards\./);
});
run('motion: progressive reveal and reduced-motion fallback', async browser => {
 const page=await browser.newPage();await page.goto(base);
 await page.waitForSelector('html[data-motion="true"]');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-motion'));
 assert.equal(await page.locator('[data-reveal="pending"]').count(),0);
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.waitForSelector('html[data-motion="true"]');
});
run('FAQ: native mouse and keyboard disclosure in both languages', async browser => {
 const page=await browser.newPage({reducedMotion:'reduce'});await page.goto(base);
 for(const lang of ['hu','en']) {
  await page.locator(`[data-lang="${lang}"]`).click();
  assert.equal(await page.locator('.studio-faq details').count(),4);
  for(const item of await page.locator('.studio-faq details').all()){
   const summary=item.locator('summary');await summary.focus();await page.keyboard.press('Enter');
   assert.notEqual(await item.getAttribute('open'),null);assert.ok(await item.locator('p').isVisible());
   await summary.click();assert.equal(await item.getAttribute('open'),null);
  }
 }
});
run('sizing: 18 widths, both languages and both themes', async browser => {
 const page=await browser.newPage({reducedMotion:'reduce'});
 await page.route(/https:\/\/[^/]*typekit\.net\//, route=>route.abort());
 await page.goto(base);await page.evaluate(()=>document.fonts.ready);
 for(const lang of ['hu','en']) {
  await page.locator(`[data-lang="${lang}"]`).click();
  for(const theme of ['light','dark']) {
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('.theme-toggle').click();
   for(const width of widths){
    await page.setViewportSize({width,height:1000});
    const failures=await page.evaluate(()=>{
     const failures=[];if(document.documentElement.scrollWidth>innerWidth+1)failures.push('Page overflow');
     for(const el of document.querySelectorAll('h1,h2,h3,p,.site-header a,.site-header button')){
      const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;
      if(r.left< -1||r.right>innerWidth+1||el.scrollWidth>el.clientWidth+2)failures.push(el.textContent.trim());
     }return failures;
    });assert.deepEqual(failures,[],`${width}/${lang}/${theme}`);
   }
  }
 }
});
run('no JavaScript: readable content, FAQ and homepage recovery', async browser => {
 const page=await browser.newPage({javaScriptEnabled:false});await page.goto(base);
 assert.ok((await page.locator('h1').innerText()).length>5);
 await page.locator('.studio-faq summary').first().click();assert.notEqual(await page.locator('.studio-faq details').first().getAttribute('open'),null);
 assert.equal(await page.locator('.studio-contact a').getAttribute('href'),'https://www.upwork.com/agencies/144p/');
 assert.equal((await page.goto(base+'/missing-nojs')).status(),404);
 await page.locator('a[href="/"]').first().click();assert.ok(await page.locator('.studio-hero').isVisible());
});

# 144p Group

**Low resolution. High standards.**

Két tapasztalt tervező. Egy megbízható kreatív partner.

A **144p Group** Lengyel Balázs és Répás János grafikai stúdiója. Digitális kampányok, nyomtatott kiadványok, csomagolásgrafika és gyártásra kész anyagok — egy projektre vagy hosszú távú együttműködésre. Ez a kódtár a stúdió magyar és angol nyelvű weboldalát tartalmazza.

[Weboldal](https://144p.hu/) · [Upwork](https://www.upwork.com/agencies/144p/) · [Répás János](https://jrepas.hu/)

![144p Group – Creative Design & Production Studio](public/images/social-preview.png)

## Funkciók

- Reszponzív elrendezés mobilra, tabletre és asztali kijelzőre.
- Magyar és angol tartalom, ország szerinti alapértelmezett nyelvvel és megjegyzett kézi választással.
- Világos és sötét mód, mentett beállítással és animált átmenettel.
- Nappali és esti fejlécfotó; sötét módban világító monitor és kintről beszűrődő fény.
- Kijelzőmérethez és pixelsűrűséghez igazodó AVIF-képek, WebP tartalékformátummal.
- Finom görgetés, fokozatos tartalommegjelenés és görgetésre mozgó Bézier-görbék.
- A lábléc logóján visszafogott fénycsillanás, amely a logó megjelenésekor indul el.
- Natív mobilmenü, billentyűzetes navigáció és csökkentett mozgás támogatása.
- Keresőbarát metaadatok, megosztási kép, strukturált adatok, robots.txt és sitemap.
- Kétnyelvű, lenyitható Gyakori kérdések az árazásról, ajánlatkérésről, folyamatos támogatásról és fájlátadásról.

## Technológia

Az oldal HTML-re, CSS-re és JavaScriptre épül, alkalmazáskeretrendszer nélkül. A Cloudflare Pages statikus fájlokat szolgál ki; a nyelv szerveroldali kiválasztását egy Pages Function végzi. A helyi előnézethez Node.js, a CSS összeállításához a `purgecss` és a `clean-css`, a simított görgetéshez helyben tárolt Lenis szükséges.

## Helyi indítás

**Követelmény:** Node.js 20 vagy újabb, npm.

```sh
git clone https://github.com/janarepas/144p-group.git
cd 144p-group
npm ci
npm run build
npm run dev
```

Az előnézet címe: **http://localhost:3000**. Az `npm start` ugyanazt a helyi szervert indítja el. Más port például:

```sh
PORT=8080 npm run dev
```

A helyi szerver a `public` könyvtárat szolgálja ki. Nem futtatja a Cloudflare middleware-t, az országfelismerést, illetve a Pages átirányítási és HTTP-fejlécszabályait. Helyben mentett választás nélkül az angol HTML jelenik meg; a nyelvváltó és a témaváltó itt is működik. A Cloudflare-specifikus működést a telepített oldalon kell ellenőrizni.

## Fájlszerkezet

| Hely | Feladat |
| --- | --- |
| `public/index.html` | Tartalom, navigáció, metaadatok és strukturált adatok |
| `public/style.css` | Alapstílusok és tipográfia |
| `public/agency.css` | Stúdióspecifikus alapstílusok és logók |
| `public/agency-design.css` | Elrendezés, reszponzív szabályok és vizuális effektek |
| `public/assets/studio.*.css` | Generált, tisztított és tömörített CSS-pillanatkép |
| `public/app.js` | Nyelv, téma, mobilmenü és logócsillanás |
| `public/motion.js` | Simított görgetés, megjelenési effektek és háttérgörbék |
| `public/translations-data.json` | A szerveroldali fordítások |
| `public/translations.js` | A böngészőben használt fordítások |
| `public/images/`, `public/fonts/` | Képek, logók és helyi tartalék betűkészletek |
| `public/vendor/` | Lenis és a hozzá tartozó licenc |
| `functions/_middleware.js` | Ország és mentett nyelv alapján előállított HTML |
| `scripts/build-css.mjs` | A CSS összeállítása és a HTML-hivatkozás frissítése |
| `server.js` | Helyi statikus előnézeti szerver |
| `wrangler.jsonc` | Cloudflare Pages projektbeállítások |

## Tartalom és megjelenés módosítása

### Szövegek

A `data-i18n` attribútummal jelölt elemeket a fordítások töltik ki. Szövegmódosításkor a következő három helyet tartsd összhangban:

1. `public/translations-data.json`: magyar és angol fordítások a szerver számára.
2. `public/translations.js`: ugyanazok az adatok a `window.STUDIO_TRANSLATIONS` objektumban.
3. `public/index.html`: az adott elem angol alapértelmezett tartalma.

A lapcímek és leírások az `index.html`, az `app.js` és a middleware fájlban is szerepelnek; ezek változtatásakor mindhárom helyet ellenőrizd.

### Stílusok

A három forrás-stíluslapot szerkeszd, ne a `public/assets` generált fájlját. Módosítás után:

```sh
npm run build
git diff --check
git status --short
```

A build sorrendben egyesíti a `style.css`, `agency.css` és `agency-design.css` fájlokat, eltávolítja a HTML-ben és JavaScriptben nem használt szelektorokat, majd tömörít. Az eredményt a HTML `studio-styles` stílusblokkjába illeszti, így az első megjelenítéshez nem kell külön CSS-kérésre várni. Egy tartalom alapján elnevezett CSS-pillanatképet is megőriz a `public/assets` alatt. **A forrásokkal együtt a frissített HTML-t, az új CSS-t és a régi generált fájl törlését is commitolni kell.** Új, JavaScriptből képzett osztályneveknél ellenőrizd a build safelist beállításait és mindkét témát.

### Képek és arculat

A fejléc `studio-hero-{szélesség}` és `studio-hero-moonlight-{szélesség}` képeket használ AVIF és WebP formátumban, 960, 1920, 3840 és 6880 pixeles szélességben. A böngésző a `<picture>` elem alapján választ támogatott formátumot. A nappali képek hivatkozásai a HTML-ben és annak előtöltésében, a témaváltás képhivatkozásai az `app.js` fájlban találhatók. Képcserekor ezeket együtt frissítsd. A nagy változatok részletjavított, felnagyított képek.

A megosztási kép a `public/images/social-preview.png` fájl, 1200 × 630 pixel méretben. Azonos fájlnéven cserélt képet a böngésző és a CDN átmenetileg gyorsítótárazhat; biztos frissítéshez használj új fájlnevet és módosítsd a hivatkozásokat.

Az arculati színek sárga (`#ffdd00`), arany (`#ffc20e`) és narancs (`#f26522`), világos és sötét semleges felületekkel. A címsorok IvyPresto Display, a törzsszövegek Freight Text Pro betűt használnak az Adobe Fonts készletéből. Az Adobe-stíluslap közvetlenül töltődik; hálózati vagy tartalomblokkolás esetén helyi/rendszerbetűk helyettesítik. A készlet és a domainbeállítások az Adobe Fonts projektben kezelhetők.

## Nyelv és téma

Mentett választás nélkül a Cloudflare magyarországi látogatóknak magyar, más országokból érkezőknek angol tartalmat ad. A kézzel kiválasztott nyelv elsőbbséget élvez az ország szerinti alapértelmezéssel szemben.

| Beállítás | Tárolás |
| --- | --- |
| Nyelv | `144p-language` a localStorage-ban; azonos nevű, egy évre beállított cookie a szerveroldali kiválasztáshoz |
| Világos/sötét mód | `144p-theme` a localStorage-ban |

Mentett téma nélkül az oldal világos módban indul. A nyelvi cookie `Secure` és `SameSite=Lax` beállítású. A személyre szabott HTML `private, no-store` fejlécet kap, így nem kerül más látogató számára megosztott gyorsítótárba.

## Telepítés Cloudflare Pages-re

A jelenlegi munkafolyamat a repóba commitolt, már összeállított statikus fájlokat telepíti:

| Beállítás | Érték |
| --- | --- |
| Projekt | `144p-group` |
| Éles ág | `main` |
| Keretrendszer | Nincs |
| Build parancs | Üres; a CSS-build feltöltés előtt helyben fut |
| Kimeneti könyvtár | `public` |
| Egyéni domain | `144p.hu` |

A `main` ágra feltöltött változásokat a GitHubhoz kapcsolt Pages-projekt telepíti. A gyökérben lévő `functions` könyvtár a nyelvi middleware-t adja; ehhez Cloudflare Pages Functions támogatás szükséges. A funkció útvonalait a `public/_routes.json`, a statikus cache-szabályokat a `public/_headers`, az átirányításokat a `public/_redirects` határozza meg.

A helyi indításhoz és a CSS-buildhez nincs szükség titkos környezeti változóra. A `PORT` csak a helyi előnézeti szerver portját módosítja.

## Ellenőrzés feltöltés előtt

- Futtasd az `npm run build` és a `git diff --check` parancsot.
- Ellenőrizd a mobilmenüt, a belső navigációt és a külső linkeket.
- Nézd meg a magyar/angol szövegeket, valamint mindkét témát mobilon és nagy kijelzőn.
- Frissítés után is maradjon meg a kézzel választott nyelv és téma.
- Ellenőrizd a mozgáscsökkentett megjelenést és a képek betöltését.

Az `npm test` hét valódi Playwright böngészős tesztet futtat: runtime, SEO és 404, UX és mobilmenü, mozgáscsökkentés, GYIK, 18 szélességes HU/EN világos/sötét méretellenőrzés, valamint JavaScript nélküli használat.

```sh
npm ci
npx playwright install chromium
npm start
# Másik terminálban:
npm test
```

A Playwright saját, verzióhoz illesztett Chromiumát használjuk, rögzített rendszerútvonal nélkül. Linuxon a rendszerfüggőségekhez: `npx playwright install --with-deps chromium`. Másik böngésző a `CHROMIUM_EXECUTABLE_PATH`, másik tesztcím a `TEST_BASE_URL` változóval adható meg. Az egyes csomagok külön is futnak: `npm run test:runtime`, `test:seo`, `test:ux`, `test:motion`, `test:faq`, `test:sizing`. Az `npm run test:all` az `npm test` megfelelője.

A GitHub Actions pull requestnél és a `main` frissítésekor telepíti a Chromiumot, ellenőrzi a CSS-buildet, elindítja a helyi szervert, futtatja a teszteket és menti a naplókat. A helyi teszt nem helyettesíti a Cloudflare DNS és éles HTTP-státuszok ellenőrzését.

A `public/404.html` saját, kétnyelvű, `noindex` hibaoldal. A Cloudflare Pages és a helyi szerver a nem létező útvonalakra 404-et ad; a nyelvi middleware az ilyen hibaválaszokat nem írja át. A nyelvváltás a lapcímmel együtt az Open Graph és Twitter címet, leírást és locale-adatokat is frissíti. Az Adobe-stíluslap nem blokkolja az első megjelenést; JavaScript nélkül a noscript hivatkozás tölti be. A korábbi mobilos Lighthouse-mérés és az optimalizálások összefoglalója a [mérési jegyzetben](docs/optimization-review.md) található. A pontszámok az ott rögzített verzióra és mérési környezetre vonatkoznak.

## Felhasználás

A repó nem tartalmaz általános nyílt forráskódú licencet. A márkaelemek, képek és tartalmak további felhasználásához egyeztess a 144p Grouppal. A Lenis saját MIT-licence a [vendor könyvtárban](public/vendor/lenis-LICENSE.txt) található; az Adobe-betűk használatára az Adobe licencfeltételei vonatkoznak.

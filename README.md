# 144p Group

Magyar és angol nyelvű, reszponzív creative design & production studio oldal Lengyel Balázs és Répás János csapatának. Az eredeti jrepas.hu arculati betűit és színeit önálló elrendezéssel, teljes szélességű stúdió-nyitóképpel használja. A szakmai tartalmat a felhasználó által megadott agency-bemutatkozás biztosítja.

## Futtatás

Node.js 20+; külső npm-függőség nélkül:

```sh
npm start
```

Alapértelmezett port: 3000, a `PORT` változóval módosítható. Cloudflare Pages: `main` ág, nincs build parancs, kimeneti könyvtár `public` (a `wrangler.jsonc` rögzíti).

## Arculat

Az eredeti CSS-ben megadott színek: `#ffdd00`, `#ffc20e`, `#f26522`. Címsor: IvyPresto Display italic; szöveg: Freight Text Pro. Az eredeti Adobe Fonts kit (`https://use.typekit.net/qtn2utl.css`) hivatkozása megmaradt. A kit lekérését az ellenőrző környezet 403-mal blokkolja, ezért itt a tényleges Adobe-betűbetöltés nem igazolható. Az Adobe Fonts projekt domainjogosultságát a 144p.hu és a Pages címen külön ellenőrizni kell; a fontok nem kerültek jogosulatlanul másolásra. A jrepas.hu helyi fallback fontjai a `public/fonts/` könyvtárban találhatók.

Az eredeti stíluslap a `public/style.css`, az agency kiegészítései a `public/agency.css` fájlban vannak. A világos/sötét megjelenés váltója működik. A fejlécben nincs nem működő nyelvválasztó.

## Véglegesítendő tartalom

- A csapat valódi, a felhasználó által átadott 100×100 pixeles portréi bekerültek. Nagyobb megjelenítéshez nagyobb felbontású eredeti képek szükségesek; Lengyel Balázs részletes szakmai bemutatkozása még egyeztetendő.
- A szolgáltatások, ongoing support és együttműködési előnyök a felhasználó által átadott teljes angol stúdióbemutatkozást követik. Három szolgáltatáskategória, összesen 15 felsorolt szolgáltatással.
- Minden agency kapcsolatfelvételi gomb a megadott Upwork profilra vezet.

A csapatblokk Balázzsal kezdődik (körportré balra, szöveg jobbra), utána János következik tükrözött elrendezéssel. A nyitókép generált, szöveg és szerkesztőikonok nélküli háttér; helye: `public/images/creative-studio-hero.png`.

## Nyelvválasztás

A statikus HTML magyar. A `public/translations.js` tartalmazza mind a 64 kétnyelvű szövegelemet. A fejléc HU/EN gombjai azonnal váltanak; a kézi választást helyi tároló őrzi meg. Első látogatáskor magyar böngészőnyelvnél magyar, más böngészőnyelvnél angol változat jelenik meg. Nincs IP-alapú helymeghatározás vagy külső geolokációs szolgáltatás. A lapcím, leírás és akadálymentes navigációs címkék is nyelvet váltanak.

Balázs magyar és angol bemutatkozása a felhasználó által átadott LinkedIn-képernyőképek alapján készült: ALDI és PENNY grafikai tapasztalat, online és nyomtatott marketinganyagok, bannerek, retusálás és TV-szpotgrafikák.

## Mozgás és elmosás

A `public/motion.js` a jrepas.hu nyilvános animációs megoldására épül: Lenis 1.3.27 (`lerp: 0.1`, simított görgő, natív mobilérintés), IntersectionObserver-alapú fokozatos megjelenés és Safari-kompatibilis felső elmosás. A Lenis helyi példány és MIT-licence a `public/vendor/` könyvtárban található. Csökkentett mozgás beállításnál nincs animált görgetés vagy rejtett tartalom; JavaScript nélkül az oldal tartalma és a natív mobilmenü elérhető marad.

## Ország szerinti nyelv és megosztás

A Cloudflare Pages `functions/_middleware.js` a `request.cf.country` alapján már az első HTML-válaszban magyar tartalmat ad magyarországi látogatóknak. Minden magyarországi újratöltés magyarra áll vissza, más országokban az angol az alap; a kézi váltó továbbra is működik. A szerveroldali nyelvi adatok a `public/translations-data.json` fájlban vannak; szövegmódosításkor ez és a kliensoldali `translations.js` együtt frissítendő. A megosztási kép `public/images/social-preview.png`, 1200×630 px. A HTML tartalmazza az Open Graph- és Twitter-metaadatokat is.

## Fejléc

A fejléc az eredeti `public/images/creative-studio-hero.png` állóképet használja. Nincs YouTube-beágyazás, videó vagy zene. A fokozatos tartalommegjelenés, a felső elmosás és a finom görgetés megmaradt.

## Frissítés és optimalizálás

A forrás-stíluslapok továbbra is a `public/style.css`, `public/agency.css` és `public/agency-design.css` fájlok. Módosításuk után futtasd az `npm ci && npm run build` parancsot, és a létrejövő `public/assets/studio.*.css` fájlt, valamint a frissített `public/index.html` fájlt is commitold. A build egyetlen tömörített, tartalom alapján verziózott stíluslapra cseréli a HTML hivatkozásait. A Cloudflare Pages a commitolt `public` könyvtárat szolgálja ki, nincs szükség új telepítési beállításra.

A nyitókép HTML-ben megadott, prioritásos, reszponzív WebP: 960, 1920, 3840 és 6880 pixel széles változatokból választ a böngésző a képernyő és pixelsűrűség alapján. A Retina-változatok részletjavított, felnagyított képek. Az Adobe Fonts aszinkron töltődik, az oldal helyi fallback betűkkel is használható. A `robots.txt`, `sitemap.xml`, szervezeti és szolgáltatási JSON-LD adatok, valamint statikus cache-szabályok a `public` könyvtárban vannak. A nyelvet továbbra is a Cloudflare országadata és a felhasználó választása kezeli.

A két alapító megnevezése „Társalapító · Grafikus”; Répás János neve a jrepas.hu oldalra mutat. A navigáció külön körvonalas kapcsolatgombot használ; a nagy projektgombok sárga háttere és animációja megmarad.

# 144p.hu – ellenőrzés, 2026. október 19.

Mindkét összehasonlító Lighthouse-futtatás az élő https://144p.hu/ oldalt mérte, azonos környezetben, az alapértelmezett mobilos hálózat- és processzorlassítással. Egyedi laboreredmények, nem Search Console terepadatok és nem Google-helyezések.

| Mutató | Előtte | Utána |
|---|---:|---:|
| Teljesítmény | 68 | 94 |
| Akadálymentesség | 100 | 100 |
| Bevált gyakorlatok | 96 | 96 |
| SEO | 92 | 100 |
| LCP | 5.7 s | 2.6 s |
| CLS | 0.006 | 0 |
| TBT | 380 ms | 110 ms |

## Elkészült

- Répás János neve a jrepas.hu oldalra mutat.
- Mindkét alapító: Társalapító · Grafikus / Co-founder · Graphic designer.
- A navigációs gomb átlátszó hátterű, sárga körvonalas, kompakt; a nagy projektgombok külön stílusa megmaradt.
- Az arculati blokk 1200 pixeles, középre rendezett tartalmi szélessége egyezik a többi szekcióval.
- Reszponzív WebP nyitókép közvetlen HTML-felfedezéssel és prioritásos betöltéssel; 960 pixeles változata kb. 81 KB, a korábbi mobilon is letöltött kép kb. 681 KB volt.
- Egy minifikált, tartalom alapján verziózott CSS-fájl, cache-szabályok, aszinkron Adobe Fonts, kisebb képernyőkre kisebb kártyaképek.
- Valódi robots.txt, sitemap.xml és szervezeti/szolgáltatási JSON-LD.

## Ellenőrzések

390, 768, 1440 és 2560 pixeles nézet; magyar/angol megnevezések; mobilmenü; névlink; nincs oldalirányú kilógás vagy hiányzó helyi erőforrás. A publikus HTML, CSS, robots.txt és képhivatkozások frissülése is ellenőrizve.

A mérőkörnyezet egy külső erőforrás hálózati hibáját naplózta; ezért a Bevált gyakorlatok eredménye 96 maradt. A fontbetöltéshez helyi fallback is rendelkezésre áll. A további CSS-takarítás és a külső betűkészlet valós felhasználói mérése későbbi finomítás lehet.

## Újramérés – 2026. október 23.

Az új optimalizálási kör az élő https://144p.hu/ oldalról indult. A végső mobilos és asztali futtatások külön, egymás után történtek.

| Kategória | Mobil előtte | Mobil utána | Asztali utána |
|---|---:|---:|---:|
| Teljesítmény | 95 | 98 | 100 |
| Akadálymentesség | 100 | 100 | 100 |
| Bevált gyakorlatok | 96 | 96 | 96 |
| SEO | 100 | 100 | 100 |

| Mérőszám | Mobil előtte | Mobil utána | Asztali utána |
|---|---:|---:|---:|
| FCP | 1.8 s | 1.4 s | 0.4 s |
| LCP | 2.5 s | 2.1 s | 0.6 s |
| Speed Index | 3.4 s | 2.7 s | 0.6 s |
| TBT | 10 ms | 0 ms | 0 ms |
| CLS | 0.007 | 0.007 | 0 |

Változtatások:

- Használaton kívüli CSS-szelektorok kiszűrése a tényleges HTML és JavaScript alapján; kb. 190 KB helyett 79 KB minifikált CSS.
- A kompakt CSS közvetlenül a HTML-be kerül, így nem blokkol külön stíluslapkérés. Az ismételt build azonos kimenetet ad.
- AVIF fejlécfotók mindkét témához, WebP tartalékformátummal és reszponzív képválasztással. A legkisebb nappali kép kb. 81 KB helyett 37 KB.
- A téma előtöltése a ténylegesen támogatott képformátumot használja, felesleges párhuzamos WebP-letöltés nélkül.
- A megjelenítési effekt mérései és DOM-módosításai külön fázisba kerültek; a Lenis csak finom mutatóeszközzel töltődik be. Mobilon marad a natív görgetés.
- Rövidebb nyitóanimáció, a fokozatos megjelenés és a görgetési effektek megtartásával.

Ellenőrzés: a CSS-takarítás után hat teljes oldalas képernyőkép változatlan volt három szélességben, mindkét témával. A teljes kilenc böngészős teszt sikeres, köztük a 18 szélesség, a mentett beállítások, a GYIK animációja, valamint az AVIF/WebP tartalék és a nappali–esti váltás.

A Bevált gyakorlatok egyetlen pontlevonása mindkét végső mérésben az Adobe-stíluslap `ERR_TUNNEL_CONNECTION_FAILED` hálózati hibája volt ebben az ellenőrző környezetben. Az Adobe Fonts megmaradt; a 96 pontos eredményből nem következik, hogy a betűk minden látogatónál hibásan töltődnek. A nyilvános Google-mérő API-ja ebből a környezetből szintén nem volt elérhető.

A laborpontszámok függnek a futtatási környezettől és a hálózattól. A mobilos 98 és az asztali 100 az itt rögzített végső futtatások eredménye, nem állandó garancia vagy keresési helyezés.

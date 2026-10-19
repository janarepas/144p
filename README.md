# 144p Group

Angol nyelvű, reszponzív creative design & production studio oldal Lengyel Balázs és Répás János csapatának. Az eredeti jrepas.hu arculati betűit és színeit önálló elrendezéssel, teljes szélességű stúdió-nyitóképpel használja. A szakmai tartalmat a felhasználó által megadott agency-bemutatkozás biztosítja.

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

# 144p Group

Magyar nyelvű, reszponzív agency oldal Répás János és Balázs csapatának. A jrepas.hu eredeti stíluslapjára, arculati elemeire és helyileg tárolt képeire épül.

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

- A csapat portréi egyértelműen jelölt illusztrációk; a valódi fotók és Balázs teljes neve, személyes bemutatkozása még szükséges.
- A szolgáltatáskártyák a jrepas.hu ellenőrzött kínálatát követik. Az Upwork agency oldal anti-bot védelme miatt annak teljes szolgáltatáslistája még nem ellenőrizhető; további agency szolgáltatásokhoz szükséges a pontos lista.
- Minden agency kapcsolatfelvételi gomb a megadott Upwork profilra vezet.

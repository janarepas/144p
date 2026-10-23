import {readFile,writeFile,mkdir,readdir,unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import CleanCSS from 'clean-css';
import {PurgeCSS} from 'purgecss';
const root=new URL('../public/',import.meta.url);
const sources=await Promise.all(['style.css','agency.css','agency-design.css'].map(name=>readFile(new URL(name,root),'utf8')));
const content = await Promise.all(['index.html','app.js','motion.js','translations.js','vendor/lenis-1.3.27.mjs'].map(async name => ({raw:(await readFile(new URL(name,root),'utf8')).replace(/<style id="studio-styles">[\s\S]*?<\/style>/g,''),extension:name.endsWith('.html')?'html':'js'})));
const [used] = await new PurgeCSS().purge({
 content, css:[{raw:sources.join('\n')}],
 dynamicAttributes:['data-theme','data-motion','data-reveal','data-scrolled','data-country'],
 safelist:{greedy:[/view-transition/,/theme-transition-curtain/]},
});
const result=new CleanCSS({level:1,rebase:false}).minify(used.css);
if(result.errors.length)throw new Error(result.errors.join('\n'));
const name=`studio.${createHash('sha256').update(result.styles).digest('hex').slice(0,12)}.css`;
const assets=new URL('assets/',root);await mkdir(assets,{recursive:true});
// CSS URLs remain relative to their original public root.
const css=result.styles.replaceAll("url(fonts/","url(/fonts/").replaceAll('url(images/','url(/images/').replaceAll('url("fonts/','url("/fonts/').replaceAll('url("images/','url("/images/').replaceAll("url('fonts/","url('/fonts/").replaceAll("url('images/","url('/images/");
await writeFile(new URL(name,assets),css);
const index=new URL('index.html',root);let html=await readFile(index,'utf8');
html=html.replace(/<link\b[^>]*href="(?:style\.css|agency\.css|agency-design\.css|\/assets\/studio\.[^"]+)(?:\?[^\"]*)?"[^>]*\/?>(?:\n)?/g,'');
html=html.replace(/<style id="studio-styles">[\s\S]*?<\/style>/g,'');
// Inline the compact landing-page CSS to avoid a render-blocking network round trip.
html=html.replace('</head>',`<style id="studio-styles">${css}</style></head>`);
await writeFile(index,html);
for(const old of await readdir(assets))if(/^studio\..*\.css$/.test(old)&&old!==name)await unlink(new URL(old,assets));
console.log(`Built ${name} (${css.length} characters)`);

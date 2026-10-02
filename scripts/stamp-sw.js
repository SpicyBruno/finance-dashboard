// Dà a sw.js un nome di cache che cambia insieme ai file che mette in cache.
//
// Il browser installa un service worker nuovo solo se sw.js cambia di almeno
// un byte. Finché il nome restava 'finanze-v5' a mano, una build che toccava
// solo app.js o index.html non cambiava sw.js: la scheda aperta sul desktop
// non sapeva che c'era una versione nuova e continuava a mostrare la vecchia.
// Qui il nome diventa un'impronta dei file precaricati, così ogni build che
// cambia qualcosa cambia anche sw.js. Gira in coda a `npm run build`.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const swPath = path.join(root, 'sw.js');
const sw = fs.readFileSync(swPath, 'utf8');

const list = sw.match(/const ASSETS = \[([\s\S]*?)\];/);
if (!list) throw new Error('stamp-sw: elenco ASSETS non trovato in sw.js');

// './' è index.html servito dalla radice: lo copre già './index.html'
const files = [...list[1].matchAll(/'\.\/([^']+)'/g)].map((m) => m[1]);

const hash = crypto.createHash('sha256');
for (const f of files) {
  hash.update(f);
  hash.update(fs.readFileSync(path.join(root, f)));
}
const name = `finanze-${hash.digest('hex').slice(0, 10)}`;

const next = sw.replace(/const CACHE = '[^']*';/, `const CACHE = '${name}';`);
if (next === sw && !sw.includes(`'${name}'`)) throw new Error('stamp-sw: riga CACHE non trovata in sw.js');

fs.writeFileSync(swPath, next);
console.log(`sw.js → ${name} (${files.length} file)`);

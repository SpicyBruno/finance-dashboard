// Scrive fonts/file-fallback.js: le regole @font-face di index.html con i font
// incorporati (data:), per quando index.html si apre da disco.
//
// Da file:// la pagina ha origine "null" e Chrome blocca per CORS i font di
// fonts/: l'interfaccia ripiegava sui font di sistema. Un <script> classico
// invece si carica anche da disco, e un font in data: non chiede permessi.
// Le regole si copiano da index.html, così restano le stesse (pesi,
// unicode-range). Gira dentro `npm run build`.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const rules = html.match(/@font-face\s*\{[^}]*\}/g);
if (!rules) throw new Error('font-fallback: nessuna regola @font-face in index.html');

const css = rules
  .map((rule) => rule.replace(/url\('(fonts\/[^']+\.woff2)'\)/g, (_, file) => {
    const data = fs.readFileSync(path.join(root, file)).toString('base64');
    return `url(data:font/woff2;base64,${data})`;
  }))
  .map((rule) => rule.replace(/\s+/g, ' '))
  .join('\n');

const out = `// Generato da scripts/font-fallback.js con \`npm run build\`: non modificarlo a mano.
// Si carica solo aprendo index.html da disco (file://), dove Chrome blocca i
// file di fonts/: aggiunge le stesse regole @font-face con i font incorporati.
(function () {
  var s = document.createElement('style');
  s.textContent = ${JSON.stringify(css)};
  document.head.appendChild(s);
})();
`;

fs.writeFileSync(path.join(root, 'fonts', 'file-fallback.js'), out);
console.log(`fonts/file-fallback.js → ${rules.length} regole, ${Math.round(out.length / 1024)} KB`);

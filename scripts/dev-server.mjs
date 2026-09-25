// Dependency-free local preview of the existing Netlify static site.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const value = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const port = Number(value('--port', '4173'));
const host = value('--host', '0.0.0.0');
const mime = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json', '.ico':'image/x-icon' };
createServer(async (req,res) => {
  try {
    let route = decodeURIComponent(new URL(req.url, 'http://preview').pathname);
    if (route === '/__qa') {
      const q = new URL(req.url, 'http://preview').searchParams;
      const width = Math.max(320, Math.min(1600, Number(q.get('width')) || 390));
      const target = q.get('page') || '/';
      if (!/^\/[a-z0-9/]*$/i.test(target)) throw new Error('Invalid route');
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(`<body style="margin:0;background:#999"><iframe title="Responsive preview" src="${target}" style="border:0;width:${width}px;height:100vh;display:block"></iframe></body>`);
      return;
    }
    if (/^\/(app|observatory|analytics|portal)(\/|$)/.test(route) || ['/profile','/reports','/legal','/creative','/campaign'].includes(route)) route = '/dashboard.html';
    let file = resolve(root, '.' + route);
    if (!file.startsWith(root + sep)) { if (file !== root) throw new Error('Invalid path'); }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, {'Content-Type':mime[extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}); res.end(body);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html'}); res.end(await readFile(resolve(root,'404.html')));
  }
}).listen(port,host,()=>console.log(`The Pull preview listening on ${host}:${port}`));

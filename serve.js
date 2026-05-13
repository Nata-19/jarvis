const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;
const ROOT = __dirname;

const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon'};

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/lead-magnet.html';
  const file = path.join(ROOT, url);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {'Content-Type': types[ext] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(PORT, () => console.log('http://localhost:' + PORT));

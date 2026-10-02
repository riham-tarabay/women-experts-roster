const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, 'public');

const categories = [
  { id: 'policy', nameEn: 'Public Policy', nameAr: 'السياسات العامة' },
  { id: 'technology', nameEn: 'Technology', nameAr: 'التكنولوجيا' },
  { id: 'governance', nameEn: 'Governance', nameAr: 'الحوكمة' }
];

const profiles = [
  {
    id: 'demo-1',
    email: 'synthetic@example.test',
    name: 'Demo Expert',
    headlineEn: 'Public-sector transformation specialist',
    headlineAr: 'متخصصة في التحول في القطاع العام',
    bioEn: 'Synthetic portfolio profile demonstrating approved-only public discovery.',
    bioAr: 'ملف تجريبي اصطناعي يوضح إتاحة الملفات المعتمدة فقط للاكتشاف العام.',
    location: 'Beirut',
    languages: ['Arabic', 'English'],
    categoryId: 'policy',
    consentVersion: 'portfolio-v1',
    status: 'APPROVED',
    createdAt: new Date().toISOString()
  }
];

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'access-control-allow-origin': '*'
  });
  res.end(body);
}

function publicProfile(profile) {
  const { email, status, reason, ...safe } = profile;
  return safe;
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1000000) reject(new Error('Payload too large')); });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function isValidSubmission(body) {
  const required = ['email', 'name', 'headlineEn', 'headlineAr', 'bioEn', 'bioAr', 'location', 'categoryId', 'consentVersion'];
  if (required.some(key => typeof body[key] !== 'string' || body[key].trim().length < 2)) return false;
  if (!/^\S+@\S+\.\S+$/.test(body.email)) return false;
  if (!Array.isArray(body.languages) || body.languages.length === 0 || body.languages.some(x => typeof x !== 'string')) return false;
  return categories.some(category => category.id === body.categoryId);
}

function searchExperts(url) {
  const query = (url.searchParams.get('query') || '').toLowerCase().trim();
  const category = url.searchParams.get('category') || '';
  const location = (url.searchParams.get('location') || '').toLowerCase().trim();
  const language = url.searchParams.get('language') || '';
  return profiles
    .filter(profile => profile.status === 'APPROVED')
    .filter(profile => !query || [profile.name, profile.headlineEn, profile.headlineAr, profile.bioEn, profile.bioAr].join(' ').toLowerCase().includes(query))
    .filter(profile => !category || profile.categoryId === category)
    .filter(profile => !location || profile.location.toLowerCase() === location)
    .filter(profile => !language || profile.languages.includes(language))
    .map(publicProfile);
}

async function handleApi(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/health') return json(res, 200, { status: 'ok', service: 'women-experts-roster' });
  if (req.method === 'GET' && url.pathname === '/api/categories') return json(res, 200, categories);
  if (req.method === 'GET' && url.pathname === '/api/experts') return json(res, 200, { data: searchExperts(url), filters: Object.fromEntries(url.searchParams) });

  if (req.method === 'POST' && url.pathname === '/api/submissions') {
    const body = await parseBody(req);
    if (!isValidSubmission(body)) return json(res, 400, { message: 'Please complete all required bilingual fields with valid information.' });
    const profile = {
      id: crypto.randomUUID(),
      email: body.email.trim(), name: body.name.trim(), headlineEn: body.headlineEn.trim(), headlineAr: body.headlineAr.trim(),
      bioEn: body.bioEn.trim(), bioAr: body.bioAr.trim(), location: body.location.trim(), languages: body.languages.map(x => x.trim()).filter(Boolean),
      categoryId: body.categoryId, consentVersion: body.consentVersion, status: 'SUBMITTED', createdAt: new Date().toISOString()
    };
    profiles.push(profile);
    return json(res, 201, { message: 'Submitted for review. This portfolio demo uses synthetic data.', profile: publicProfile(profile) });
  }

  if (url.pathname === '/api/admin/submissions') {
    if (req.headers['x-role'] !== 'REVIEWER' && req.headers['x-role'] !== 'ADMIN') return json(res, 403, { message: 'Reviewer role required.' });
    return json(res, 200, { data: profiles.filter(p => p.status === 'SUBMITTED' || p.status === 'REJECTED') });
  }

  const decisionMatch = url.pathname.match(/^\/api\/admin\/profiles\/([^/]+)\/decision$/);
  if (req.method === 'POST' && decisionMatch) {
    if (req.headers['x-role'] !== 'REVIEWER' && req.headers['x-role'] !== 'ADMIN') return json(res, 403, { message: 'Reviewer role required.' });
    const profile = profiles.find(p => p.id === decisionMatch[1]);
    if (!profile) return json(res, 404, { message: 'Profile not found.' });
    const body = await parseBody(req);
    if (!['APPROVED', 'REJECTED'].includes(body.status)) return json(res, 400, { message: 'Decision must be APPROVED or REJECTED.' });
    if (body.status === 'REJECTED' && (!body.reason || body.reason.length < 3)) return json(res, 400, { message: 'A rejection reason is required.' });
    profile.status = body.status;
    profile.reason = body.reason;
    return json(res, 200, { id: profile.id, status: profile.status, reason: profile.reason, audit: { action: `PROFILE_${profile.status}`, entityId: profile.id, at: new Date().toISOString() } });
  }

  return json(res, 404, { message: 'API route not found.' });
}

function serveStatic(res, pathname) {
  const safePath = pathname === '/' || pathname === '/submit' || pathname === '/admin' || pathname === '/overview'
    ? 'index.html'
    : pathname.replace(/^\//, '');
  const filePath = path.resolve(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR)) return json(res, 403, { message: 'Forbidden.' });
  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (fallbackError, fallback) => {
        if (fallbackError) return json(res, 500, { message: 'Website is not ready.' });
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(fallback);
      });
      return;
    }
    const ext = path.extname(filePath);
    const type = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': type, 'cache-control': ext === '.json' ? 'no-store' : 'public, max-age=300' });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    if (req.method !== 'GET') return json(res, 405, { message: 'Method not allowed.' });
    serveStatic(res, url.pathname);
  } catch (error) {
    json(res, error.message === 'Payload too large' ? 413 : 400, { message: error.message || 'Request failed.' });
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`Women Experts Roster listening on ${PORT}`));

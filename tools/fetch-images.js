#!/usr/bin/env node
/**
 * يملأ صوراً حقيقية لكل عنصر ويحمّلها محلياً داخل public/images (تعمل بدون إنترنت لاحقاً).
 * يحتاج Node 18+ واتصال إنترنت وقت التشغيل فقط:
 *   npm run fetch-images                # يملأ العناصر التي لا صورة لها
 *   npm run fetch-images -- --force     # يعيد جلب الكل
 *   npm run fetch-images -- --remote    # يكتب روابط ويكيبيديا بدل تحميل الملفات
 *   npm run fetch-images -- --no-gallery# بدون صورة احتياطية من معرض اللعبة
 *   npm run fetch-images -- --dry       # تقرير فقط
 * ترتيب المحاولات لكل عنصر:
 *   0) public/data/images.override.json (تصحيحاتك اليدوية، لا تُمحى أبداً)
 *   1) صفحة wiki  2) صور مقالة اللعبة المطابقة للاسم  3) ويكيميديا كومنز  4) بحث ويكيبيديا
 *   5) صورة من معرض مقالة اللعبة (imageSource = "gallery:...") حتى لا يبقى عنصر بلا صورة
 * التقرير: tools/image-report.json
 */
const fs = require('fs');
const path = require('path');

const PUB = path.join(__dirname, '..', 'public');
const DATA = path.join(PUB, 'data');
const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force'), DRY = args.has('--dry'), REMOTE = args.has('--remote'), GALLERY = !args.has('--no-gallery');
const UA = { 'User-Agent': 'RetroArcadeGuide/1.0 (educational app; contact: you@example.com)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const words = (s = '') => s.toLowerCase().replace(/\.[a-z0-9]+$/, '').split(/[^a-z0-9]+/).filter((w) => w.length > 2);
const overlap = (text, name) => { const t = new Set(words(text)); return words(name).filter((w) => w.length > 3).some((w) => t.has(w)); };
const BAD = /logo|flag_of|icon|commons-|wikiquote|question_book|symbol|disambig|edit-|ambox|\.svg$/i;

const getJson = async (url) => { const r = await fetch(url, { headers: UA }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); };
const big = (u) => (u.startsWith('//') ? 'https:' + u : u).replace(/\/\d+px-/, '/800px-');

async function fromPage(title) {
  const j = await getJson('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title));
  if (j.type === 'disambiguation' || !j.thumbnail) return null;
  return { url: big(j.thumbnail.source), page: j.title };
}
const galleryCache = {};
async function gallery(title) {
  if (!title) return [];
  if (!galleryCache[title]) {
    try {
      const j = await getJson('https://en.wikipedia.org/api/rest_v1/page/media-list/' + encodeURIComponent(title));
      galleryCache[title] = (j.items || []).filter((m) => m.type === 'image' && m.srcset && m.srcset.length && !BAD.test(m.title))
        .map((m) => ({ file: m.title, caption: (m.caption && m.caption.text) || '', url: big(m.srcset[m.srcset.length - 1].src) }));
    } catch (_) { galleryCache[title] = []; }
  }
  return galleryCache[title];
}
async function fromCommons(name, gameTitle) {
  const u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&gsrsearch=' + encodeURIComponent(`${name} ${gameTitle}`);
  const j = await getJson(u);
  for (const p of Object.values((j.query && j.query.pages) || {})) {
    const ii = p.imageinfo && p.imageinfo[0];
    if (ii && /image\/(jpeg|png|webp)/.test(ii.mime) && !BAD.test(p.title) && overlap(p.title, name)) return { url: ii.thumburl || ii.url, page: p.title };
  }
  return null;
}
async function fromSearch(name, gameTitle) {
  const j = await getJson('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=4&srsearch=' + encodeURIComponent(`${name} ${gameTitle}`));
  for (const h of (j.query && j.query.search) || []) {
    if (!overlap(h.title, name)) continue;
    const t = await fromPage(h.title.replace(/ /g, '_')).catch(() => null);
    if (t) return t;
  }
  return null;
}

let galleryIdx = 0;
async function resolve(e, game) {
  const name = e.nameEn || e.title || '';
  const gTitle = game ? game.title : '';
  if (e.wiki) { const t = await fromPage(e.wiki).catch(() => null); if (t) return { ...t, how: 'wiki' }; }
  if (name && game) {
    const m = (await gallery(game.wiki)).find((g) => overlap(g.file + ' ' + g.caption, name));
    if (m) return { url: m.url, page: m.file, how: 'game-article' };
    const c = await fromCommons(name, gTitle).catch(() => null); if (c) return { ...c, how: 'commons' };
    const s = await fromSearch(name, gTitle).catch(() => null); if (s) return { ...s, how: 'search' };
  }
  if (GALLERY && game) {
    const g = await gallery(game.wiki);
    if (g.length) { const m = g[galleryIdx++ % g.length]; return { url: m.url, page: m.file, how: 'gallery' }; }
  }
  return null;
}

async function save(url, rel) {
  if (REMOTE || DRY) return url;
  const r = await fetch(url, { headers: UA }); if (!r.ok) throw new Error('download ' + r.status);
  const ext = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' })[(r.headers.get('content-type') || '').split(';')[0]] || 'jpg';
  const file = `${rel}.${ext}`, abs = path.join(PUB, file);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, Buffer.from(await r.arrayBuffer()));
  return file;
}

(async () => {
  const report = { filled: [], failed: [], skipped: 0, overrides: 0 };
  const ovPath = path.join(DATA, 'images.override.json');
  const override = fs.existsSync(ovPath) ? JSON.parse(fs.readFileSync(ovPath, 'utf8')) : {};
  const slug = (s) => s.replace(/[^a-z0-9_-]+/gi, '-');

  async function handle(ref, key, game, relBase) {
    if (override[key]) { ref.image = override[key]; report.overrides++; return; }
    if (ref.image && !FORCE) { report.skipped++; return; }
    try {
      const r = await resolve(ref, game);
      await sleep(150);
      if (!r) { report.failed.push(key); return; }
      ref.image = await save(r.url, relBase); ref.imageSource = `${r.how}:${r.page}`;
      report.filled.push(`${key} <- ${r.page} (${r.how})`);
    } catch (err) { report.failed.push(`${key} (${err.message})`); }
    process.stdout.write('.');
  }

  const regPath = path.join(DATA, 'games.json');
  const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
  for (const g of reg.games) await handle(g, `registry/${g.id}`, null, `images/covers/${slug(g.id)}`);
  if (!DRY) fs.writeFileSync(regPath, JSON.stringify(reg, null, 2));

  for (const dir of fs.readdirSync(path.join(DATA, 'games'))) {
    const file = path.join(DATA, 'games', dir, 'data.json');
    if (!fs.existsSync(file)) continue;
    const game = JSON.parse(fs.readFileSync(file, 'utf8'));
    await handle(game, `${dir}/cover`, game, `images/${dir}/cover`);
    for (const [k, sec] of Object.entries(game.sections))
      for (const it of sec.items || []) await handle(it, `${dir}/${k}/${it.id}`, game, `images/${dir}/${k}-${slug(it.id)}`);
    if (!DRY) fs.writeFileSync(file, JSON.stringify(game, null, 2));
  }
  fs.writeFileSync(path.join(__dirname, 'image-report.json'), JSON.stringify(report, null, 2));
  const by = (h) => report.filled.filter((x) => x.endsWith(`(${h})`)).length;
  console.log(`\nتم: ${report.filled.length} | wiki ${by('wiki')} · مقالة اللعبة ${by('game-article')} · كومنز ${by('commons')} · بحث ${by('search')} · معرض ${by('gallery')} | فشل ${report.failed.length} | متخطّى ${report.skipped} | يدوي ${report.overrides}${DRY ? ' (dry-run)' : ''}`);
  console.log('راجع tools/image-report.json: صور "gallery" عامة للّعبة وليست خاصة بالعنصر، استبدلها عبر images.override.json.');
})().catch((e) => { console.error('خطأ:', e.message); process.exit(1); });

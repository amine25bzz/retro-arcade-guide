// جلب البيانات مع التخزين المؤقت النظيف
const cache = { registry: null, games: {} };

export async function loadRegistry() {
  if (!cache.registry) cache.registry = await (await fetch('data/games.json')).json();
  return cache.registry;
}

export async function loadGame(id) {
  if (!cache.games[id]) {
    const res = await fetch(`data/games/${id}/data.json`);
    if (!res.ok) throw new Error('لا توجد بيانات لهذه اللعبة بعد');
    cache.games[id] = await res.json();
  }
  return cache.games[id];
}

// صورة مصغرة من ويكيبيديا للألعاب التي تستخدم مقالات ويكيبيديا
async function wikiThumb(title) {
  if (!title) return null;
  const key = 'wk:' + title;
  try { const hit = localStorage.getItem(key); if (hit) return hit === 'none' ? null : hit; } catch (_) {}
  try {
    const r = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title));
    if (!r.ok) throw new Error('no page');
    const j = await r.json();
    const small = j.thumbnail ? j.thumbnail.source.replace(/\/\d+px-/, '/640px-') : null;
    try { localStorage.setItem(key, small || 'none'); } catch (_) {}
    return small;
  } catch (_) {
    try { localStorage.setItem(key, 'none'); } catch (_) {}
    return null;
  }
}

const words = (t = '') => t.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);
async function searchThumb(q) {
  if (!q) return null;
  const key = 'wq:' + q;
  try { const hit = localStorage.getItem(key); if (hit) return hit === 'none' ? null : hit; } catch (_) {}
  const [name, game = ''] = q.split('|');
  try {
    const r = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=4&srsearch=' + encodeURIComponent(name + ' ' + game));
    const j = await r.json();
    for (const hit of (j.query && j.query.search) || []) {
      const rt = new Set(words(hit.title));
      if (!words(name).some((w) => rt.has(w))) continue;
      const url = await wikiThumb(hit.title.replace(/ /g, '_'));
      if (url) { try { localStorage.setItem(key, url); } catch (_) {} return url; }
    }
  } catch (_) {}
  try { localStorage.setItem(key, 'none'); } catch (_) {}
  return null;
}

// التأكد من جاهزية الصور والتعامل مع روابط ويكيبيديا للألعاب الأخرى
export function hydrateImages(root = document) {
  root.querySelectorAll('img').forEach(async (img) => {
    // إذا كانت الصورة تملك رابطاً مباشراً (مثل كاديلاك)، اتركها فوراً بدون لمس
    if (img.getAttribute('src')) {
      img.onerror = () => { img.style.display = 'none'; };
      return;
    }

    // للألعاب الأخرى التي تستخدم مقال أو بحث ويكيبيديا
    if (img.dataset.wiki) {
      const url = await wikiThumb(img.dataset.wiki);
      if (url) {
        img.src = url;
        img.onerror = () => { img.style.display = 'none'; };
        return;
      }
    }

    if (img.dataset.q) {
      const url = await searchThumb(img.dataset.q);
      if (url) {
        img.src = url;
        img.onerror = () => { img.style.display = 'none'; };
        return;
      }
    }

    img.style.display = 'none';
  });
}

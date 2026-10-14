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

// التأكد من جاهزية الصور والتعامل الهادئ مع أي صورة مفقودة
export function hydrateImages(root = document) {
  root.querySelectorAll('img').forEach((img) => {
    img.onerror = () => {
      img.style.display = 'none';
    };
  });
}

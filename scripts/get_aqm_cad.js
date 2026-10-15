async function inspectPages() {
  const pages = ['cad_items.html', 'cad_enemies.html', 'cad_bosses.html'];
  for (const p of pages) {
    const res = await fetch('https://www.arcadequartermaster.com/' + p, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html'
      }
    });
    const html = await res.text();
    console.log('=== ' + p + ' ===');
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let m;
    const imgs = [];
    while ((m = regex.exec(html)) !== null) {
      if (!m[1].includes('layout') && !m[1].includes('banner') && !m[1].includes('logo') && !m[1].includes('nav')) {
        imgs.push(m[1]);
      }
    }
    console.log(imgs);
  }
}
inspectPages();

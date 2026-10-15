async function run() {
  const res = await fetch('https://spritedatabase.net/game/101', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const re = /<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
  let m;
  const links = [];
  while ((m = re.exec(html)) !== null) {
    if (m[1].includes('file/') || m[1].includes('sprite') || m[1].includes('sheet')) {
      links.push({ href: m[1], text: m[2] });
    }
  }
  console.log('Found links:', links.slice(0, 30));
}
run();

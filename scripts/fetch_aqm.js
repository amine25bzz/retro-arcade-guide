async function run() {
  const res = await fetch('https://www.arcadequartermaster.com/ffight/items.html', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const re = /src="([^"]+)"/gi;
  let m;
  const imgs = [];
  while ((m = re.exec(html)) !== null) {
    imgs.push(m[1]);
  }
  console.log('Arcade Quartermaster images:', imgs);
}
run();

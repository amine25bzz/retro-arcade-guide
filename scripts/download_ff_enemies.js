const fs = require('fs');
const path = require('path');

const downloads = [
  {
    name: 'enemy-bred.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/e/e3/Bred.webp'
  },
  {
    name: 'enemy-twop.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/8/83/TwoP.png'
  },
  {
    name: 'enemy-elgado.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/0/02/ElGado.PNG'
  },
  {
    name: 'enemy-axl.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/7/75/Axl.webp'
  },
  {
    name: 'enemy-billbull.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/0/00/BillBull.png'
  },
  {
    name: 'enemy-andore.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/9/9b/HugoPt.png'
  },
  {
    name: 'char-select.jpg',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/1/18/Ffg_charaselect.jpg'
  },
  {
    name: 'title-screen.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/e/ed/FFOriginalTitle.png'
  },
  {
    name: 'team-poster.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/8/87/FFPosterArt.png'
  }
];

async function run() {
  for (const it of downloads) {
    const dest = path.join(__dirname, '..', 'public', 'images', 'final-fight', it.name);
    try {
      const res = await fetch(it.url, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://capcom.fandom.com/' }
      });
      if (res.ok) {
        fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        console.log('Saved FF enemy/art:', it.name);
      } else {
        console.error('Failed:', res.status, it.name);
      }
    } catch (e) {
      console.error('Error:', it.name, e.message);
    }
  }
}
run();

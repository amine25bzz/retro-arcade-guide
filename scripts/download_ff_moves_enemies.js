const fs = require('fs');
const path = require('path');

const downloads = [
  {
    name: 'move-cody-upper.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/e/e2/Cody_Criminal_Upper.png'
  },
  {
    name: 'move-cody-knee.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/6/6a/Cody_Knee_Bash.png'
  },
  {
    name: 'move-cody-throw.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/a/a0/Cody_Shoulder_Throw.png'
  },
  {
    name: 'move-guy-spin.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/f/f6/FFGuyBushinSenpuuKyaku.png'
  },
  {
    name: 'move-guy-kick.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/7/72/Guy_Flying_Kick.png'
  },
  {
    name: 'move-haggar-piledriver.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/b/b2/FFHaggarPiledriver.png'
  },
  {
    name: 'move-haggar-suplex.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/4/40/Haggar_Suplex.png'
  },
  {
    name: 'enemy-grandpa-andore.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/3/36/FFGAndore.png'
  },
  {
    name: 'enemy-goriber.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/5/51/FFGOriber.png'
  },
  {
    name: 'story-jessica.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/c/cb/FFJessica.png'
  },
  {
    name: 'metro-city.png',
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/e/ec/MetroCity.png'
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
        console.log('Saved:', it.name);
      } else {
        console.error('Failed:', res.status, it.name);
      }
    } catch (e) {
      console.error('Error:', it.name, e.message);
    }
  }
}
run();

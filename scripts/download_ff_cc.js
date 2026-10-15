const fs = require('fs');
const path = require('path');

const downloads = [
  // Final Fight
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'logo.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/b/b4/FFLogo.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'char-cody.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/9/9a/Final_Fight_Cody_Knife.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'char-guy.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/b/b9/Final_Fight_Guy.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'char-haggar.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/1/1d/Final_Fight_Haggar.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'boss-damnd.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/7/75/Final_Fight_Damnd.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'boss-sodom.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/a/a2/Final_Fight_Sodom.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'boss-edie.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/7/7d/FFCDEdiE.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'boss-abigail.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/7/7c/Final_Fight_Abigail.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'enemy-poison.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/c/cf/FFCDPoison.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'enemy-roxy.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/0/08/FFRoxy.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'move-lariat.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/7/76/Haggar_Double_Lariat.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'move-pipe.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/e/e8/Final_Fight_Haggar_Pipe.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'flyer.png'),
    url: 'https://upload.wikimedia.org/wikipedia/en/c/ca/Final_Fight_Promo_Poster.png'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'gameplay.png'),
    url: 'https://upload.wikimedia.org/wikipedia/en/b/be/Final_Fight_gameplay.png'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'final-fight', 'roxy-sid.png'),
    url: 'https://upload.wikimedia.org/wikipedia/en/0/01/Sid_and_Roxy_in_Final_Fight.PNG'
  },

  // Captain Commando
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'logo.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/d/d8/CCLogo.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'char-captain.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/2/21/CCCaptainCommando2.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'char-mack.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/f/fb/CCMackTheKnife.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'char-ginzu.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/f/f6/CCGinzu.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'char-baby.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/7/72/CCBabyHead.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'boss-scumocide.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/4/42/Scumocide.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'boss-doppel.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/9/9b/Doppel.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'team-art.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/f/fa/CCArt.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'flyer.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/1/16/CCFlyer.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'instructions.png'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/b/bf/CC_Arcade_Instructions.png',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'move-collider.gif'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/5/56/Captain_Commando_Captain_Colleder.gif',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'move-cannon.gif'),
    url: 'https://static.wikia.nocookie.net/capcomdatabase/images/e/ef/CaptainCannon.gif',
    referer: 'https://capcom.fandom.com/'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'cover.png'),
    url: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Captain_Commando.png'
  },
  {
    target: path.join(__dirname, '..', 'public', 'images', 'captain-commando', 'gameplay.png'),
    url: 'https://upload.wikimedia.org/wikipedia/en/b/b6/ARC_Captain_Commando.png'
  }
];

async function run() {
  console.log(`Starting download of ${downloads.length} assets...`);
  let success = 0;
  let failed = 0;

  for (const item of downloads) {
    const filename = path.basename(item.target);
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
    if (item.referer) headers['Referer'] = item.referer;

    try {
      const res = await fetch(item.url, { headers });
      if (!res.ok) {
        console.error(`FAILED (${res.status}): ${filename} from ${item.url}`);
        failed++;
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.target, buffer);
      console.log(`OK: ${filename} (${buffer.length} bytes)`);
      success++;
    } catch (e) {
      console.error(`ERROR: ${filename}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nFinished: Success=${success}, Failed=${failed}`);
}

run();

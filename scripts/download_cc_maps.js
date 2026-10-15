const fs = require('fs');
const path = require('path');

const maps = [
  { name: 'stage-city.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage1-City.png' },
  { name: 'stage-museum.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage2-Museum.png' },
  { name: 'stage-ninjahouse.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage3-NinjaHouse.png' },
  { name: 'stage-circus.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage4-CircusCamp.png' },
  { name: 'stage-seaport.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage5-SeaPort.png' },
  { name: 'stage-aquarium.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage6-Aquarium.png' },
  { name: 'stage-underground.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage7-UndergroundBase.png' },
  { name: 'stage-spaceship.png', url: "https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-Stage8-Enemy'sSpaceship.png" },
  { name: 'stage-callisto.png', url: 'https://www.vgmaps.com/Atlas/Arcade/CaptainCommando-LastStage-Callisto.png' }
];

async function run() {
  for (const m of maps) {
    try {
      const res = await fetch(m.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(path.join(__dirname, '..', 'public', 'images', 'captain-commando', m.name), buf);
        console.log('Saved CC map:', m.name, buf.length, 'bytes');
      } else {
        console.error('Failed:', res.status, m.name);
      }
    } catch (e) {
      console.error('Error:', m.name, e.message);
    }
  }
}
run();

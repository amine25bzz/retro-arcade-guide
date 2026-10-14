const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'street-fighter-2');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const downloads = [
  // Character portraits
  { name: 'char-ryu.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-ryu.png' },
  { name: 'char-ken.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-ken.png' },
  { name: 'char-chunli.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-chunli.png' },
  { name: 'char-guile.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-guile.png' },
  { name: 'char-blanka.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-blanka.png' },
  { name: 'char-honda.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-honda.png' },
  { name: 'char-zangief.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-zangief.png' },
  { name: 'char-dhalsim.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-dhalsim.png' },
  { name: 'char-balrog.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-balrog.png' },
  { name: 'char-vega.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-vega.png' },
  { name: 'char-sagat.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-sagat.png' },
  { name: 'char-bison.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-bison.png' },
  { name: 'char-grid.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/char-grid.png' },
  { name: 'world-map.png', url: 'https://raw.githubusercontent.com/trevzix/street-fighter-2-selection/main/images/map.png' },

  // Stages
  { name: 'stage-japan-ryu.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/ryu_stage.png' },
  { name: 'stage-usa-ken.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/ken_stage.png' },
  { name: 'stage-china.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/chunLi_stage.png' },
  { name: 'stage-usa-guile.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/guile_stage.png' },
  { name: 'stage-brazil.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/blanka_stage.png' },
  { name: 'stage-japan-honda.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/honda_stage.png' },
  { name: 'stage-ussr.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/zangief_stage.png' },
  { name: 'stage-india.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/dhalsim_stage.png' },
  { name: 'stage-vegas.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/balrog_stage.png' },
  { name: 'stage-spain.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/vega_stage.png' },
  { name: 'stage-thailand-sagat.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/sagat_stage.png' },
  { name: 'stage-thailand-bison.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/mBison_stage.png' },
  { name: 'bonus-car.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/bonus_car.png' },
  { name: 'bonus-barrels.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/bonus_barrels.png' },
  { name: 'title-screen.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/title_screen.png' },

  // UI & Logos
  { name: 'sf2-logo.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/ui/logo1.png' },
  { name: 'character-select.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/ui/character_selection.png' },

  // Moves & Attacks
  { name: 'move-shoryuken.png', url: 'https://raw.githubusercontent.com/jkneb/street-fighter-css/master/images/ken-shoryuken.png' },
  { name: 'move-tatsumaki.png', url: 'https://raw.githubusercontent.com/jkneb/street-fighter-css/master/images/ken-tatsumaki-senpuu-kyaku.png' },
  { name: 'move-hadoken.png', url: 'https://raw.githubusercontent.com/rodrigoguedes-lab/Java2D_SF2_StageScrollingTest/master/src/res/hadouken_5.png' },
  { name: 'move-fireball.png', url: 'https://raw.githubusercontent.com/rodrigoguedes-lab/Java2D_SF2_StageScrollingTest/master/src/res/fireball_5.png' },

  // Endings
  { name: 'ending-ryu.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/ryu_ending.png' },
  { name: 'ending-ken.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/ken_ending.png' },
  { name: 'ending-chunli.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/chunLi_ending_1.png' },
  { name: 'ending-guile.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/guile_ending.png' },
  { name: 'ending-blanka.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/blanka_ending.png' },
  { name: 'ending-honda.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/honda_ending.png' },
  { name: 'ending-dhalsim.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/dhalsim_ending.png' },
  { name: 'ending-zangief.png', url: 'https://raw.githubusercontent.com/Rengrow/Street-Fighter-II-Gamusinos-Fighters-/master/Game/assets/images/wiki/zangief_ending.png' }
];

async function run() {
  console.log(`Starting download of ${downloads.length} Street Fighter II assets...`);
  let success = 0;
  let failed = 0;

  for (const item of downloads) {
    const dest = path.join(targetDir, item.name);
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        console.error(`FAILED (${res.status}): ${item.name} from ${item.url}`);
        failed++;
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`OK: ${item.name} (${buffer.length} bytes)`);
      success++;
    } catch (err) {
      console.error(`ERROR: ${item.name}:`, err.message);
      failed++;
    }
  }

  console.log(`\nFinished! Success: ${success}, Failed: ${failed}`);
}

run();

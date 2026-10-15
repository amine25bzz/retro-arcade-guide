const fs = require('fs');
const path = require('path');

const downloads = [
  // Weapons
  { src: 'cad/weapon_knife.png', dst: 'weapon-knife.png' },
  { src: 'cad/weapon_rod.png', dst: 'weapon-rod.png' },
  { src: 'cad/weapon_stone1.png', dst: 'weapon-stone.png' },
  { src: 'cad/weapon_club.png', dst: 'weapon-club.png' },
  { src: 'cad/weapon_torch.png', dst: 'weapon-torch.png' },
  { src: 'cad/weapon_butcher.png', dst: 'weapon-b-knife.png' },
  { src: 'cad/item_barrel.png', dst: 'weapon-barrel.png' },
  { src: 'cad/weapon_grenade.png', dst: 'weapon-grenade.png' },
  { src: 'cad/weapon_dynamite.png', dst: 'weapon-dynamite.png' },
  { src: 'cad/weapon_gun.png', dst: 'weapon-pistol.png' },
  { src: 'cad/weapon_shotgun.png', dst: 'weapon-shotgun.png' },
  { src: 'cad/weapon_rifle.png', dst: 'weapon-rifle.png' },
  { src: 'cad/weapon_uzi.png', dst: 'weapon-uzi.png' },
  { src: 'cad/weapon_m16a1.png', dst: 'weapon-m16.png' },
  { src: 'cad/weapon_bazooka.png', dst: 'weapon-bazooka.png' },
  { src: 'cad/weapon_ammo.png', dst: 'weapon-ammo.png' },
  { src: 'cad/point_radio.png', dst: 'weapon-radio.png' },
  { src: 'cad/cadillac.png', dst: 'weapon-cadillac.png' },
  { src: 'cad/food_barbecue.png', dst: 'item-food.png' },
  { src: 'cad/point_gold.png', dst: 'item-treasure.png' },

  // Bosses
  { src: 'cad/boss_vicet.png', dst: 'boss-vice.png' },
  { src: 'cad/boss_butcher.png', dst: 'boss-butcher.png' },
  { src: 'cad/boss_hogg.png', dst: 'boss-hogg.png' },
  { src: 'cad/boss_slice.png', dst: 'boss-slice.png' },
  { src: 'cad/boss_morgan.png', dst: 'boss-morgan.png' },
  { src: 'cad/boss_morgue.png', dst: 'boss-morgue.png' },
  { src: 'cad/bosstyrog.png', dst: 'boss-tyrog.png' },
  { src: 'cad/boss_slisaur.png', dst: 'boss-slisaur.png' },
  { src: 'cad/boss_fessenden.png', dst: 'boss-fessenden.png' },
  { src: 'cad/boss_fessenden2.png', dst: 'boss-fessenden-dino.png' },

  // Enemies & Dinosaurs
  { src: 'cad/enemy_ferris.png', dst: 'enemy-bikers.png' },
  { src: 'cad/enemy_punk.png', dst: 'enemy-punk.png' },
  { src: 'cad/enemy_blade.png', dst: 'enemy-blade.png' },
  { src: 'cad/enemy_hammer.png', dst: 'enemy-hammer.png' },
  { src: 'cad/enemy_poacher.png', dst: 'enemy-poacher.png' },
  { src: 'cad/enemy_lash.png', dst: 'enemy-lash.png' },
  { src: 'cad/enemy_walther.png', dst: 'enemy-walther.png' },
  { src: 'cad/enemy_bludge.png', dst: 'enemy-bludge.png' },
  { src: 'cad/enemytyrog2.png', dst: 'enemy-tyrog2.png' },
  { src: 'cad/dino_hopper.png', dst: 'dino-hopper.png' },
  { src: 'cad/dino_mack.png', dst: 'dino-mack.png' },
  { src: 'cad/dino_zeke.png', dst: 'dino-zeke.png' },
  { src: 'cad/dino_shivat.png', dst: 'dino-shivat.png' }
];

async function run() {
  const targetDir = path.join(__dirname, '..', 'public', 'images', 'cadillacs');
  let downloaded = 0;
  for (const item of downloads) {
    const url = 'https://www.arcadequartermaster.com/' + item.src;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Referer': 'https://www.arcadequartermaster.com/cad_items.html'
        }
      });
      if (res.ok) {
        const dest = path.join(targetDir, item.dst);
        fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        downloaded++;
        console.log(`Saved [${downloaded}/${downloads.length}]: ${item.dst}`);
      } else {
        console.error(`Failed ${res.status}: ${item.src}`);
      }
    } catch (e) {
      console.error(`Error ${item.src}: ${e.message}`);
    }
  }
  console.log(`Finished downloading ${downloaded}/${downloads.length} sprites!`);
}

run();

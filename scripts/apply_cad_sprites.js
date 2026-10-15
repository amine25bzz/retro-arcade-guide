const fs = require('fs');
const path = require('path');

const cadPath = path.join(__dirname, '..', 'public', 'data', 'games', 'cadillacs-and-dinosaurs', 'data.json');
const data = JSON.parse(fs.readFileSync(cadPath, 'utf8'));

// 1. Update weapons
const weaponImages = {
  'knife': 'images/cadillacs/weapon-knife.png',
  'rod': 'images/cadillacs/weapon-rod.png',
  'stone': 'images/cadillacs/weapon-stone.png',
  'club': 'images/cadillacs/weapon-club.png',
  'torch': 'images/cadillacs/weapon-torch.png',
  'b-knife': 'images/cadillacs/weapon-b-knife.png',
  'barrel': 'images/cadillacs/weapon-barrel.png',
  'grenade': 'images/cadillacs/weapon-grenade.png',
  'dynamite': 'images/cadillacs/weapon-dynamite.png',
  'pistol': 'images/cadillacs/weapon-pistol.png',
  'shotgun': 'images/cadillacs/weapon-shotgun.png',
  'rifle': 'images/cadillacs/weapon-rifle.png',
  'uzi': 'images/cadillacs/weapon-uzi.png',
  'm16': 'images/cadillacs/weapon-m16.png',
  'bazooka': 'images/cadillacs/weapon-bazooka.png',
  'ammo': 'images/cadillacs/weapon-ammo.png',
  'radio': 'images/cadillacs/weapon-radio.png',
  'cadillac': 'images/cadillacs/weapon-cadillac.png',
  'food-items': 'images/cadillacs/item-food.png',
  'score-items': 'images/cadillacs/item-treasure.png'
};

data.sections.weapons.image = 'images/cadillacs/weapon-knife.png';
for (const it of data.sections.weapons.items) {
  if (weaponImages[it.id]) {
    it.image = weaponImages[it.id];
  }
}

// 2. Update enemies & dinosaurs
const enemyImages = {
  'vice': 'images/cadillacs/boss-vice.png',
  'butcher': 'images/cadillacs/boss-butcher.png',
  'hogg': 'images/cadillacs/boss-hogg.png',
  'slice': 'images/cadillacs/boss-slice.png',
  'morgan': 'images/cadillacs/boss-morgan.png',
  'tyrog': 'images/cadillacs/boss-tyrog.png',
  'slisaurs': 'images/cadillacs/boss-slisaur.png',
  'fessenden': 'images/cadillacs/boss-fessenden.png',
  'bikers': 'images/cadillacs/enemy-bikers.png',
  'punks': 'images/cadillacs/enemy-punk.png',
  'blade-razor': 'images/cadillacs/enemy-blade.png',
  'heavy-thugs': 'images/cadillacs/enemy-hammer.png',
  'poachers': 'images/cadillacs/enemy-poacher.png',
  'lash': 'images/cadillacs/enemy-lash.png',
  'walther': 'images/cadillacs/enemy-walther.png',
  'bludge': 'images/cadillacs/enemy-bludge.png',
  'tyrog-2': 'images/cadillacs/enemy-tyrog2.png',
  'rock-hopper': 'images/cadillacs/dino-hopper.png',
  'mack': 'images/cadillacs/dino-mack.png',
  'zeke': 'images/cadillacs/dino-zeke.png',
  'shivat': 'images/cadillacs/dino-shivat.png'
};

data.sections.enemies.image = 'images/cadillacs/boss-vice.png';
for (const it of data.sections.enemies.items) {
  if (enemyImages[it.id]) {
    it.image = enemyImages[it.id];
  }
}

// 3. Update stage bossImages
const stageBosses = {
  'city-sea': 'images/cadillacs/boss-vice.png',
  'swamp': 'images/cadillacs/boss-butcher.png',
  'hell-road': 'images/cadillacs/boss-hogg.png',
  'garage': 'images/cadillacs/boss-slice.png',
  'stage5': 'images/cadillacs/boss-morgan.png',
  'jungle-mine': 'images/cadillacs/boss-tyrog.png',
  'the-vault': 'images/cadillacs/boss-slisaur.png',
  'lab': 'images/cadillacs/boss-fessenden.png'
};

for (const st of data.sections.stages.items) {
  if (stageBosses[st.id]) {
    st.bossImage = stageBosses[st.id];
  }
}

fs.writeFileSync(cadPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated Cadillacs and Dinosaurs data.json with authentic sprites!');

const fs = require('fs');
const path = require('path');

const games = ['cadillacs-and-dinosaurs', 'street-fighter-2', 'final-fight', 'captain-commando'];

console.log('=== VERIFYING ALL 4 GUIDES ===\n');

for (const gameId of games) {
  const jsonPath = path.join(__dirname, '..', 'public', 'data', 'games', gameId, 'data.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`ERROR: ${gameId}/data.json does not exist!`);
    continue;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let totalImgs = 0;
  let missingImgs = 0;

  function check(u) {
    if (!u) return;
    totalImgs++;
    const full = path.join(__dirname, '..', 'public', u);
    if (!fs.existsSync(full)) {
      console.error(`[${gameId}] MISSING: ${u} (expected at ${full})`);
      missingImgs++;
    }
  }

  check(data.image);
  for (const s of Object.values(data.sections || {})) {
    check(s.image);
    for (const it of (s.items || s.blocks || [])) {
      check(it.image);
      check(it.bossImage);
      check(it.specialAttackImage);
      check(it.teamMoveImage);
      check(it.endingImage);
      if (it.movesGallery) {
        for (const m of it.movesGallery) {
          check(m.image);
        }
      }
    }
  }

  console.log(`✓ [${gameId}]: Title="${data.titleAr}", Sections=${Object.keys(data.sections || {}).length}, Images Checked=${totalImgs}, Missing=${missingImgs}`);
}

console.log('\n=== VERIFYING GAMES.JSON ===');
const reg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'games.json'), 'utf8'));
const openGuides = reg.games.filter(g => g.hasGuide);
console.log(`Total games in registry: ${reg.games.length}`);
console.log(`Active Guides (hasGuide: true): ${openGuides.length}`);
for (const g of openGuides) {
  const full = path.join(__dirname, '..', 'public', g.image);
  const exists = fs.existsSync(full);
  console.log(`  - ${g.id} (${g.titleAr}): cover="${g.image}" exists=${exists}`);
}

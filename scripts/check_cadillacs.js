const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'public', 'images', 'cadillacs'));
const cad = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'games', 'cadillacs-and-dinosaurs', 'data.json'), 'utf8'));

const str = JSON.stringify(cad);
const regex = /images\/cadillacs\/[^"]+/g;
const matches = str.match(regex) || [];

console.log('Total image references found in Cadillacs JSON:', matches.length);
let missing = 0;
let mismatch = 0;

for (const m of matches) {
  const base = m.split('/').pop();
  const found = files.find(f => f.toLowerCase() === base.toLowerCase());
  if (!found) {
    console.log('MISSING:', m);
    missing++;
  } else if (found !== base) {
    console.log('MISMATCH:', base, '=> exact on disk is:', found);
    mismatch++;
  }
}

console.log(`Summary: Missing: ${missing}, Case Mismatches: ${mismatch}`);

// Check sections
console.log('Cadillacs sections:', Object.keys(cad.sections));
for (const [k, s] of Object.entries(cad.sections)) {
  console.log(`Section [${k}]: title="${s.title}", image="${s.image || ''}", icon="${s.icon || ''}", items=${(s.items || s.blocks || []).length}`);
}

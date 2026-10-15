const fs = require('fs');
const path = require('path');

const cad = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'games', 'cadillacs-and-dinosaurs', 'data.json'), 'utf8'));
const str = JSON.stringify(cad);
const urls = str.match(/https?:\/\/[^"]+/g) || [];
console.log('External URLs in cadillacs:', urls);

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'public', 'data', 'games', 'cadillacs-and-dinosaurs', 'data.json');
let s = fs.readFileSync(file, 'utf8');

const bad = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSoOehp5FIfnaPEsMLGdMaRoE7lRnMm0eeGUGRTPaZNtDEVZBFIar_MwB9&s=10';

// Line 16: main game image
s = s.replace(`"image": "${bad}",`, `"image": "images/cadillacs/CADlogo.PNG",`);

// Line 1313: story section image
s = s.replace(`"image": "${bad}"\n    },\n    "info"`, `"image": "images/cadillacs/heroes-banner.jpg"\n    },\n    "info"`);

// Line 1337: dev item in info
s = s.replace(`"image": "${bad}"\n        },\n        {\n          "id": "nickname"`, `"image": "images/cadillacs/CADlogo.PNG"\n        },\n        {\n          "id": "nickname"`);

// Line 1409: title-history item in info
s = s.replace(`"image": "${bad}"\n        },\n        {\n          "id": "no-home"`, `"image": "images/cadillacs/CADlogo.PNG"\n        },\n        {\n          "id": "no-home"`);

// Line 1617: dip-switches item in secrets
s = s.replace(`"image": "${bad}"\n        },\n        {\n          "id": "hidden-m16"`, `"image": "images/cadillacs/CADweapon18.PNG"\n        },\n        {\n          "id": "hidden-m16"`);

fs.writeFileSync(file, s, 'utf8');
console.log('Fixed Cadillacs URLs cleanly!');

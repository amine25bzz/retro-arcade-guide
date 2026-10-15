const fs = require('fs');
const html = fs.readFileSync('temp_sdb.html', 'utf8');
const regex = /href=['"]\/file\/(\d+)['"][^>]*>([^<]+)<\/a>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[2].trim(), m[1]);
}

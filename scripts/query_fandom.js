const pages = [
  'Final_Fight',
  'Captain_Commando_(video_game)',
  'Cody_Travers',
  'Guy',
  'Mike_Haggar',
  'Jessica_Haggar',
  'Damnd',
  'Sodom',
  'Edi._E',
  'Rolento_F._Schugerg',
  'Abigail',
  'Horace_Belger',
  'Hugo_Andore',
  'Poison',
  'Roxy',
  'Axl',
  'Captain_Commando_(character)',
  'Mack_the_Knife',
  'Ginzu_the_Ninja',
  'Baby_Head',
  'Scumocide',
  'Blood',
  'Shtrom_Jr.',
  'Yamato_(Captain_Commando)',
  'Monster_(Captain_Commando)',
  'Carol'
];

async function run() {
  const titles = pages.join('|');
  const url = `https://capcom.fandom.com/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=pageimages|images&pithumbsize=600&format=json`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://capcom.fandom.com/' }
  });
  const data = await res.json();
  console.log('Results from Capcom Fandom:');
  for (const [id, p] of Object.entries(data.query.pages)) {
    console.log(`- ${p.title}: thumb=${p.thumbnail ? p.thumbnail.source : 'NO THUMB'}, images count=${(p.images || []).length}`);
    if (p.images) {
      console.log('   first images:', p.images.slice(0, 5).map(i => i.title).join(', '));
    }
  }
}
run();

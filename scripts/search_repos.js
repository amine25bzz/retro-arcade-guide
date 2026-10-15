async function search() {
  const query = encodeURIComponent('final fight');
  const res = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const data = await res.json();
  console.log('Final Fight repos by stars:');
  for (const item of (data.items || []).slice(0, 15)) {
    console.log(`- ${item.full_name} (${item.stargazers_count} stars): ${item.description}`);
  }

  const res2 = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent('captain commando')}&sort=stars&order=desc`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const data2 = await res2.json();
  console.log('\nCaptain Commando repos by stars:');
  for (const item of (data2.items || []).slice(0, 15)) {
    console.log(`- ${item.full_name} (${item.stargazers_count} stars): ${item.description}`);
  }
}
search();

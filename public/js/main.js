import { hydrateImages } from './store.js';
import { homePage, gamePage, sectionPage, itemPage, privacyPage, aboutPage, soonToast } from './pages.js';


const app = document.getElementById('app');
const state = { company: 'all', q: '' };

async function route() {
  const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean).map(decodeURIComponent);
  app.innerHTML = '<div class="loading">⏳ جاري التحميل...</div>';
  try {
    let html;
    if (!parts.length) html = await homePage(state);
    else if (parts[0] === 'game' && parts.length === 2) html = await gamePage(parts[1]);
    else if (parts[0] === 'game' && parts.length === 3) html = await sectionPage(parts[1], parts[2]);
    else if (parts[0] === 'game' && parts.length === 4) html = await itemPage(parts[1], parts[2], parts[3]);
    else if (parts[0] === 'privacy') html = privacyPage();
    else if (parts[0] === 'about') html = await aboutPage();
    else html = await homePage(state);
    app.innerHTML = html;
    window.scrollTo(0, 0);
    hydrateImages(app);
  } catch (e) {
    app.innerHTML = `<div class="loading">😕 ${e.message}<br><br><a class="chip on" href="#/">العودة للرئيسية</a></div>`;
  }
}

app.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-company]');
  if (chip) {
    state.company = chip.dataset.company;
    route();
  }
  const soon = e.target.closest('[data-soon]');
  if (soon) {
    e.preventDefault();
    soonToast();
  }
});

// بحث فوري في بطاقات الألعاب وعناصر الأقسام
app.addEventListener('input', (e) => {
  if (e.target.id === 'game-search') {
    state.q = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.gcard');
    cards.forEach((c) => {
      const match = !state.q || c.textContent.toLowerCase().includes(state.q);
      c.style.display = match ? '' : 'none';
    });
  }
  if (e.target.id === 'item-search') {
    const q = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.icard');
    cards.forEach((c) => {
      c.style.display = !q || c.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }
});

window.addEventListener('hashchange', route);

// شاشة الترحيب السريعة
const splash = document.getElementById('splash');
const seen = sessionStorage.getItem('splash');
route();
if (seen) {
  if (splash) splash.remove();
} else {
  setTimeout(() => {
    if (splash) {
      splash.classList.add('hide');
      sessionStorage.setItem('splash', '1');
      setTimeout(() => splash.remove(), 700);
    }
  }, 1800);
}

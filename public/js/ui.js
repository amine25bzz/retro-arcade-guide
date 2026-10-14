// مكوّنات واجهة صغيرة قابلة لإعادة الاستخدام
export const esc = (s = '') => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

export function stars(rating = 0) {
  const full = Math.floor(rating), half = rating - full >= 0.5;
  return `<span class="stars">${'★'.repeat(full)}${half ? '⯪' : ''}${'☆'.repeat(Math.max(0, 5 - full - (half ? 1 : 0)))}<b>${rating.toFixed(1)}</b></span>`;
}

// صندوق صورة نقي يعرض الصورة مباشرة بدون أي أيقونات أو تداخل
export function pic({ image, color, contain = false, alt = '' }) {
  if (!image) return '';
  return `<div class="pic ${contain ? 'contain' : ''}" ${color ? `style="--c:${esc(color)}"` : ''}><img src="${esc(image)}" alt="${esc(alt)}" loading="lazy" onerror="this.style.display='none'"></div>`;
}

export function topbar(title, backHref) {
  return `<div class="top">${backHref ? `<a class="back" href="${backHref}" aria-label="رجوع">➜</a>` : ''}
    <h2>${esc(title)}</h2><span class="brand">AG</span></div>`;
}

export function footer() {
  return `<footer class="foot"><a href="#/privacy">🔒 سياسة الخصوصية</a><a href="#/about">ℹ️ حول التطبيق</a></footer>`;
}

export function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), 2200);
}

import { loadRegistry, loadGame } from './store.js';
import { esc, stars, pic, topbar, footer, toast } from './ui.js';

const SECTION_ORDER = ['heroes', 'weapons', 'stages', 'enemies', 'story', 'info', 'howto', 'secrets'];
const wrap = (inner, color) => `<main style="${color ? `--c:${esc(color)}` : ''}">${inner}</main>${footer()}`;

/* ---------------- الرئيسية ---------------- */
export async function homePage(state = {}) {
  const reg = await loadRegistry();
  const filter = state.company || 'all';
  const query = (state.q || '').toLowerCase();

  const games = reg.games.filter((g) => {
    const matchCompany = filter === 'all' || g.company === filter;
    const matchQuery = !query || g.title.toLowerCase().includes(query) || (g.titleAr && g.titleAr.toLowerCase().includes(query));
    return matchCompany && matchQuery;
  });

  const chips = [{ id: 'all', name: 'الكل' }, ...reg.companies.map((c) => ({ id: c.id, name: c.name }))]
    .map((c) => `<button class="chip ${c.id === filter ? 'on' : ''}" data-company="${c.id}">${esc(c.name)}</button>`).join('');

  const cards = games.map((g) => {
    const open = g.hasGuide;
    return `<a class="gcard ${open ? '' : 'disabled'}" style="--c:${esc(g.color)}" href="${open ? `#/game/${g.id}` : '#/'}" ${open ? '' : 'data-soon="1"'}>
      ${pic({ image: g.image, color: g.color, contain: true })}
      <span class="badge">${esc(g.companyName)}</span>${open ? '<span class="guide-tag">دليل شامل ⭐</span>' : '<span class="soon">قريباً</span>'}
      <div class="body"><h3>${esc(g.titleAr)}</h3><span class="en">${esc(g.title)}</span>
      <div class="meta">${stars(g.rating)}<span>${esc(g.year)}</span></div></div></a>`;
  }).join('');

  return wrap(`
    <header class="hero">
      <div class="brand px" style="font-size:15px">ARCADE GUIDE · RETRO CLASSICS</div>
      <h1>موسوعة الأركيد الكلاسيكية</h1>
      <p>دليلك العربي الشامل لأعظم ألعاب الزمن الجميل: الأبطال، الحركات الخاصة، ترسانة الأسلحة، المراحل، الأسرار ونقاط الضعف.</p>
    </header>
    <div class="search-box">
      <input type="search" id="game-search" class="search-input" placeholder="ابحث عن اسم لعبة (مثل: كاديلاك، سلاغ، ستريت فايتر)..." value="${esc(state.q || '')}">
    </div>
    <div class="chips">${chips}</div>
    <div class="grid">${cards.length ? cards : '<div class="box" style="grid-column:1/-1;text-align:center;padding:40px 20px;">لا توجد ألعاب مطابقة لبحثك</div>'}</div>`);
}

/* ---------------- مركز اللعبة ---------------- */
export async function gamePage(id) {
  const g = await loadGame(id);
  const tiles = SECTION_ORDER.filter((k) => g.sections && g.sections[k]).map((k) => {
    const s = g.sections[k];
    const n = s.items ? `${s.items.length} عنصر` : `${(s.blocks || []).length} فصول`;
    const tileVisual = s.image ? `<span class="tile-img"><img src="${esc(s.image)}" alt="" loading="lazy"></span>` : '';
    return `<a class="tile" style="--c:${esc(s.color || g.color)}" href="#/game/${id}/${k}">
      ${tileVisual}
      <b>${esc(s.title)}</b>
      <small>${n}</small>
    </a>`;
  }).join('');

  return wrap(`${topbar(g.titleAr, '#/')}
    <div class="ghero">${pic({ image: g.image, color: g.color, contain: true })}<div class="shade"></div>
      <div class="txt">
        <div class="en">${esc(g.title)}${g.titleJp ? ` · <span style="font-family:sans-serif;font-size:12px;opacity:0.85;">${esc(g.titleJp)}</span>` : ''}</div>
        <h1>${esc(g.titleAr)}</h1>
        <div class="pills">
          <span class="pill">شركة ${esc(g.companyName)}</span>
          <span class="pill">عام ${esc(g.year)}</span>
          <span class="pill">${esc(g.genre)}</span>
          <span class="pill">${esc(g.players)}</span>
          <span class="pill">${esc(g.platform)}</span>
        </div>
        <div style="margin-top:10px">${stars(g.rating)}</div>
      </div>
    </div>
    <p class="lead">${esc(g.summary)}</p>
    <div class="tiles">${tiles}</div>`, g.color);
}

/* ---------------- قسم (قائمة عناصر أو مقال) ---------------- */
export async function sectionPage(id, key) {
  const g = await loadGame(id), s = g.sections && g.sections[key];
  if (!s) throw new Error('القسم غير موجود');
  
  const secVisual = s.image ? `<div class="sec-img"><img src="${esc(s.image)}" alt="" loading="lazy"></div>` : '';
  const head = `<div class="sec-head">
    ${secVisual}
    <div>
      <h1>${esc(s.title)}</h1>
      <p>${esc(s.intro || '')}</p>
    </div>
  </div>`;
  let body = '';

  if (s.items) {
    const searchBar = `
      <div class="search-box" style="margin-bottom:14px">
        <input type="search" id="item-search" class="search-input" placeholder="ابحث في ${esc(s.title)}...">
      </div>`;

    body = searchBar + `<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(165px,1fr))">${s.items.map((it) => {
      const typeBadge = it.ammo ? `ذخيرة: ${it.ammo}` : (it.tag || it.type || '');
      return `
      <a class="icard" style="--c:${esc(s.color || g.color)}" href="#/game/${id}/${key}/${it.id}">
        ${pic({ image: it.image, color: s.color, contain: true })}
        <div class="b">
          <h3>${esc(it.name)}</h3>
          ${it.nameEn ? `<span class="en-sub">${esc(it.nameEn)}</span>` : ''}
          <p>${esc(it.summary || '')}</p>
          ${typeBadge ? `<span class="tag">${esc(typeBadge)}</span>` : ''}
        </div>
      </a>`;
    }).join('')}</div>`;
  } else if (s.blocks) {
    body = s.blocks.map((b) => `
      <section class="chapter" style="--c:${esc(s.color || g.color)}">
        <h3>${esc(b.title)}</h3>
        <p>${esc(b.text)}</p>
      </section>`).join('');
  }

  return wrap(`${topbar(`${g.titleAr} · ${s.title}`, `#/game/${id}`)}${head}${body}`, s.color || g.color);
}

/* ---------------- صفحة عنصر مستقلة ---------------- */
export async function itemPage(id, key, itemId) {
  const g = await loadGame(id), s = g.sections && g.sections[key];
  if (!s || !s.items) throw new Error('القسم غير موجود');
  const idx = s.items.findIndex((i) => i.id === itemId);
  if (idx < 0) throw new Error('العنصر غير موجود');
  const it = s.items[idx], prev = s.items[idx - 1], next = s.items[idx + 1];

  // الحقول السريعة
  const fields = it.fields ? Object.entries(it.fields).map(([k, v]) => `
    <div class="field"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('') : '';

  // الروابط المرتبطة
  const links = (it.links || []).map((l) => `
    <a href="#/game/${id}/${l.section}/${l.id}">${esc(l.label)}</a>`).join('');

  // شريط الإحصائيات (القوة، السرعة، المهارة)
  let statsHtml = '';
  if (it.stats) {
    const statLabels = { power: 'القوة البدنية', speed: 'السرعة والرشاقة', skill: 'المهارة والأسلحة' };
    const statRows = Object.entries(it.stats).map(([k, val]) => {
      const label = statLabels[k] || k;
      return `<div class="stat-row">
        <span class="stat-name">${esc(label)}</span>
        <b class="stat-val">${esc(val)}</b>
      </div>`;
    }).join('');
    statsHtml = `<div class="box"><h3>إحصائيات المقاتل</h3><div class="fields">${statRows}</div></div>`;
  }

  // الهجوم الخاص وحركة الفريق
  let specialMovesHtml = '';
  if (it.specialAttack || it.teamMove) {
    specialMovesHtml = `
      <div class="box">
        <h3>الضربات الخارقة وحركات الفريق</h3>
        <div class="moves-grid">
          ${it.specialAttack ? `
            <div class="move-card special">
              ${it.specialAttackImage ? pic({ image: it.specialAttackImage, color: '#ff3d7f', contain: true }) : ''}
              <div class="move-info">
                <span class="move-tag">الهجوم الخاص (Special Attack)</span>
                <h4>${esc(it.specialAttack)}</h4>
                <div class="move-input-badge">زر الهجوم + زر القفز معاً (Attack + Jump)</div>
                <p>ضربة دفاعية دائرية خارقة تطيح بجميع الخصوم المحيطين بك وتنقذك من الحصار.</p>
              </div>
            </div>` : ''}
          ${it.teamMove ? `
            <div class="move-card team">
              ${it.teamMoveImage ? pic({ image: it.teamMoveImage, color: '#00d2d3', contain: true }) : ''}
              <div class="move-info">
                <span class="move-tag">حركة الفريق التعاونية (Team Move)</span>
                <h4>${esc(it.teamMove)}</h4>
                <div class="move-input-badge">قف بجانب زميلك لمدة ثانية (Co-op 3P)</div>
                <p>حركة مشتركة يقذف فيها البطل زميله في الهواء لينطلق كسهم قاطع يدمر كل من أمامه.</p>
              </div>
            </div>` : ''}
        </div>
      </div>`;
  }

  // جدول الحركات والضربات الكاملة للبطل
  let movesGalleryHtml = '';
  if (it.movesGallery && it.movesGallery.length) {
    movesGalleryHtml = `
      <div class="box">
        <h3>دليل الحركات والضربات القتالية (Move List)</h3>
        <div class="moves-grid">
          ${it.movesGallery.map((m) => `
            <div class="move-card">
              ${m.image ? `<div class="move-sprite">${pic({ image: m.image, color: s.color, contain: true })}</div>` : ''}
              <div class="move-info">
                <h4>${esc(m.name)}</h4>
                <div class="move-input-badge">${esc(m.input)}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // صورة الزعيم للمراحل
  let bossHtml = '';
  if (it.boss || it.bossImage) {
    bossHtml = `
      <div class="box boss-box">
        <h3>زعيم المرحلة: ${esc(it.boss || '')}</h3>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          ${it.bossImage ? `<div style="width:120px;height:120px;flex:none">${pic({ image: it.bossImage, color: '#ff3d7f', contain: true })}</div>` : ''}
          <div style="flex:1;min-width:200px">
            <h4 style="margin:0 0 6px;font-size:18px">${esc(it.boss || '')}</h4>
            <p style="margin:0;line-height:1.8;color:var(--muted)">تأكد من حفظ نمط هجماته وتفادي قفزاته المباغتة للانتصار عليه بأقل ضرر ممكن.</p>
          </div>
        </div>
      </div>`;
  }

  // شارة الذخيرة والنوع للأسلحة
  let weaponMeta = '';
  if (it.ammo || it.type) {
    weaponMeta = `<div class="pills" style="margin-top:8px">
      ${it.ammo ? `<span class="pill" style="border-color:#ff8a1f;color:#ff8a1f">عدد الطلقات: ${it.ammo}</span>` : ''}
      ${it.type ? `<span class="pill">تصنيف: ${esc(it.type)}</span>` : ''}
    </div>`;
  }

  return wrap(`${topbar(it.name, `#/game/${id}/${key}`)}
    <div class="dhero">
      ${pic({ image: it.image, color: s.color, contain: true })}
      <div>
        <h1>${esc(it.name)}</h1>
        ${it.nameEn ? `<div class="en">${esc(it.nameEn)}</div>` : ''}
        ${it.namesJp ? `<div class="meta" style="margin-top:4px;font-size:13px">الاسم بالنسخة اليابانية: <b>${esc(it.namesJp)}</b></div>` : ''}
        ${it.tag ? `<div class="pills"><span class="pill">${esc(it.tag)}</span></div>` : ''}
        ${weaponMeta}
        <p class="lead" style="margin-top:14px">${esc(it.summary || '')}</p>
      </div>
    </div>
    ${bossHtml}
    ${it.description ? `<div class="box"><h3>الشرح والتفاصيل</h3><p>${esc(it.description)}</p></div>` : ''}
    ${statsHtml}
    ${specialMovesHtml}
    ${movesGalleryHtml}
    ${fields ? `<div class="box"><h3>معلومات وبطاقة العنصر</h3><div class="fields">${fields}</div></div>` : ''}
    ${it.tips && it.tips.length ? `<div class="box"><h3>نصائح وتكتيكات احترافية</h3><ul class="tips">${it.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>` : ''}
    ${links ? `<div class="box"><h3>مرتبط بهذا العنصر</h3><div class="rel">${links}</div></div>` : ''}
    <div class="pager">
      ${prev ? `<a href="#/game/${id}/${key}/${prev.id}">⬅ ${esc(prev.name)}</a>` : '<span></span>'}
      ${next ? `<a href="#/game/${id}/${key}/${next.id}">${esc(next.name)} ➡</a>` : '<span></span>'}
    </div>`, s.color || g.color);
}

/* ---------------- صفحات ثابتة ---------------- */
export function privacyPage() {
  return wrap(`${topbar('سياسة الخصوصية', '#/')}<article class="doc box">
    <h1>سياسة الخصوصية وحماية البيانات</h1>
    <p>هذا التطبيق دليل مرجعي ومعلوماتي تثقيفي مخصص لعشاق ألعاب الأركيد الكلاسيكية القديمة، وهو متوافق تماماً مع إرشادات وسياسات متجر Google Play.</p>
    <h3>عدم جمع البيانات الشخصية</h3>
    <p>التطبيق لا يجمع ولا يخزن ولا يشارك أي بيانات شخصية، ولا يتطلب إنشاء حساب أو تسجيل دخول أو أي أذونات وصول حساسة (مثل الكاميرا أو الموقع الجغرافي أو جهات الاتصال).</p>
    <h3>حقوق الملكية الفكرية وإخلاء المسؤولية</h3>
    <p>جميع أسماء الألعاب والشخصيات والعلامات التجارية والرسومات ملك لشركاتها الأصلية (مثل Capcom و SNK و Konami). هذا التطبيق دليل غير رسمي من إعداد المعجبين لأغراض توثيقية وتعليمية واسترجاع ذكريات ألعاب الأركيد، ولا يتبع لأي من تلك الشركات.</p>
    <h3>الامتثال لسياسات Google Play</h3>
    <p>التطبيق لا يتضمن أي ألعاب مقرصنة أو محاكيات غير مصرح بها أو علامات تجارية منتهكة، ويقدم محتوى توثيقياً خالصاً يلتزم بسياسات الاستخدام العادل (Fair Use).</p>
    <h3>التواصل</h3>
    <p>لأي استفسار أو تصحيح تاريخي حول بيانات الألعاب، يمكنك التواصل عبر البريد الإلكتروني المخصص للتطبيق.</p>
  </article>`);
}

export async function aboutPage() {
  const reg = await loadRegistry();
  return wrap(`${topbar('حول التطبيق', '#/')}<article class="doc box">
    <h1>حول موسوعة الأركيد الكلاسيكية</h1>
    <p>تطبيق عربي متكامل ومصمم خصيصاً لتوثيق روائع العصر الذهبي لألعاب الأركيد من التسعينات والثمانينات. يقدم التطبيق دليلاً مفصلاً لكل لعبة يشمل الأبطال، قوائم الحركات والضربات الخاصة، ترسانة الأسلحة، المراحل، أسرار المطورين، وحيل شاشات المتابعة.</p>
    <h3>الشركات العريقة المشمولة</h3>
    <ul>${reg.companies.map((c) => `<li><b>${esc(c.name)}</b>: ${esc(c.note)}</li>`).join('')}</ul>
    <h3>المميزات الحصرية</h3>
    <ul>
      <li>تفصيل شامل لأزرار التحكم وحركات الكومبو والضربات الصاعدة.</li>
      <li>استعراض لكامل الأسلحة الحقيقية والمقذوفات والمركبات وسعة الذخيرة.</li>
      <li>كشف أسرار المطورين وقوائم الـ Dip Switches وخفايا الزعماء.</li>
      <li>تصميم نيون مستوحى من كبائن الأركيد القديمة مع صور أصلية نقية وخالية من أي تشويش.</li>
    </ul>
    <h3>الإصدار</h3><p>2.0.0 (النسخة المعززة)</p>
  </article>`);
}

export const soonToast = () => toast('دليل هذه اللعبة قيد التجهيز وسيضاف قريباً!');

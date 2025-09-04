// ===== Language data =====
const i18n = {
  ja: {
    'nav.home': 'ホーム',
    'nav.about': '自己紹介',
    'nav.projects': 'プロジェクト',
    'nav.contact': '連絡',
    'hero.title': 'Anthony — IT学生 / サーバー構築 / マルチリンガル',
    'hero.sub': 'PC・サーバー・WordPressなど、実用的なシステムを作ります。',
    'hero.cta': '連絡する',
    'about.title': '自己紹介',
    'about.body': '高校時代にPCパーツの小さな事業を立ち上げ、社員十名規模に成長させました。現在は日本の大学でC言語やJavaを学びつつ、サーバー構築やWordPressにも取り組んでいます。英語・日本語・ミャンマー語を使え、新しい環境でも素早く学び成果を出せます。',
    'projects.title': 'プロジェクト',
    'projects.p1.title': 'WordPressサーバー',
    'projects.p1.date': '2024',
    'projects.p1.desc': 'Apache/Nginx、SSL、バックアップ。簡易ブログ基盤。',
    'projects.p2.title': 'PCパーツ取引',
    'projects.p2.date': '2021',
    'projects.p2.desc': 'PCの組立・販売、顧客対応、在庫管理。',
    'projects.p3.title': 'C / Java 課題',
    'projects.p3.date': '2024',
    'projects.p3.desc': 'コンソールツール、データ構造、基礎実装。',
    'projects.p4.title': 'ホームサーバー構築',
    'projects.p4.date': '2025',
    'projects.p4.desc': 'Firewall、ポート開放、DDNS、SSL。',
    'projects.view': '詳細',
    'contact.title': '連絡',
    'contact.sub': 'お問い合わせはメールでどうぞ。',
    'contact.button': 'メールを送る',
    'footer.updated': '最終更新:'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.title': 'Anthony — IT Student / Server Builder / Multilingual',
    'hero.sub': 'I design practical systems: PCs, servers, and WordPress.',
    'hero.cta': 'Contact',
    'about.title': 'About Me',
    'about.body': 'I started a small PC‑parts business in high school and grew it into a ten‑person operation. Now I study C and Java in Japan while building servers and running WordPress sites. I speak English, Japanese, and Burmese, learn fast, and deliver results in new environments.',
    'projects.title': 'Featured Projects',
    'projects.p1.title': 'WordPress Server',
    'projects.p1.date': '2024',
    'projects.p1.desc': 'Apache/Nginx, SSL, backups. Simple blog infra.',
    'projects.p2.title': 'PC Parts Trading',
    'projects.p2.date': '2021',
    'projects.p2.desc': 'Built/sold PCs, customer support, inventory.',
    'projects.p3.title': 'C / Java Coursework',
    'projects.p3.date': '2024',
    'projects.p3.desc': 'Console tools, data structures, fundamentals.',
    'projects.p4.title': 'Home Server Setup',
    'projects.p4.date': '2025',
    'projects.p4.desc': 'Firewall, port forwarding, dynamic DNS, SSL.',
    'projects.view': 'View',
    'contact.title': 'Contact',
    'contact.sub': 'Prefer email for inquiries.',
    'contact.button': 'Send Email',
    'footer.updated': 'Last updated:'
  }
};

let currentLang = 'ja';

function applyI18n(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    if(i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.documentElement.lang = (lang === 'ja' ? 'ja' : 'en');
  // toggle active chips
  document.getElementById('lang-ja').classList.toggle('active', lang==='ja');
  document.getElementById('lang-en').classList.toggle('active', lang==='en');
  document.getElementById('lang-ja').setAttribute('aria-pressed', lang==='ja');
  document.getElementById('lang-en').setAttribute('aria-pressed', lang==='en');
}

document.getElementById('lang-ja').addEventListener('click', ()=>{ currentLang='ja'; applyI18n('ja'); });
document.getElementById('lang-en').addEventListener('click', ()=>{ currentLang='en'; applyI18n('en'); });

// ===== Header solid on scroll =====
const root = document.documentElement;
function onScroll(){
  const y = window.scrollY || 0;
  document.body.classList.toggle('solid', y>40);

  // progress bar
  const h = document.body.scrollHeight - window.innerHeight;
  const p = Math.max(0, Math.min(1, y / (h || 1)));
  document.getElementById('progress').style.width = (p*100)+'%';

  // back to top
  document.getElementById('toTop').classList.toggle('show', p>0.5);
}
window.addEventListener('scroll', onScroll, {passive:true});

// ===== Back to top =====
document.getElementById('toTop').addEventListener('click', ()=>{
  window.scrollTo({top:0, behavior:'smooth'});
});

// ===== Reveal animations =====
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReduced){
  const revealEls = document.querySelectorAll('.reveal, [data-stagger], .reveal-child');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target); // once:true
      }
    });
  }, {threshold:0.3});
  revealEls.forEach(el=>io.observe(el));
}

// ===== Hero parallax =====
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
function parallax(){
  if(!hero || !heroBg) return;
  const rect = hero.getBoundingClientRect();
  const viewH = window.innerHeight;
  const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height) / (viewH + rect.height)));
  // translateY from -8% to +8%
  const translate = (progress * 16) - 8;
  heroBg.style.transform = `translateY(${translate}%)`;
}
window.addEventListener('scroll', parallax, {passive:true});
window.addEventListener('resize', parallax);
parallax();

// ===== Footer: year + last updated =====
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('updated').textContent = new Date().toISOString().slice(0,10);

// ===== Init language on load =====
applyI18n(currentLang);
onScroll();


// ===== Modal for project details =====
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.querySelector('.modal-close');

function openModal(title, desc){
  modalTitle.textContent = title || 'Project';
  modalDesc.textContent = desc || '';
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){ modal.setAttribute('aria-hidden','true'); }

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target.classList.contains('modal-backdrop')) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

document.querySelectorAll('#projects .card .btn').forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const card = btn.closest('.card');
    const title = card.querySelector('h3')?.textContent.trim();
    const desc = (currentLang==='ja' ? (btn.dataset.descJa||btn.dataset.desc||'') : (btn.dataset.descEn||btn.dataset.desc||''));
    openModal(title, desc);
  });
});

// remove visible dates if any remained (defense-in-depth)
document.querySelectorAll('#projects .muted').forEach(el=>{
  if(/^\d{4}$/.test(el.textContent.trim())) el.remove();
});

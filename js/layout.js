/* 共用導覽列與頁尾 */
function initSharedLayout() {
 const header = '<header class="site-header">\n  <div class="nav-wrap">\n    <a class="brand" href="index.html#home" aria-label="可樂旅遊，回到首頁"><img src="image/main/logo.png" alt="可樂旅遊 Logo" class="brand-logo"></a>\n    <button class="menu-toggle" aria-expanded="false" aria-label="開啟選單">☰ 選單</button>\n    <nav class="nav" aria-label="主要導覽">\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">永續藍圖 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#home">永續願景</a><a href="index.html#story">永續策略</a><a href="index.html#commitment">未來承諾</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">永續經營 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#stats">公司治理</a><a href="index.html#stats">環境管理</a><a href="index.html#stats">責任供應鏈</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">最新消息 <span class="chevron">⌄</span></button><div class="dropdown"><a href="news.html">永續焦點</a><a href="index.html#story">活動消息</a><a href="index.html#story">媒體報導</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">幸福里程碑 <span class="chevron">⌄</span></button><div class="dropdown"><a href="milestones.html">永續成果</a><a href="index.html#stats">年度報告</a></div></div>      <div class="nav-item"><button class="nav-link" aria-expanded="false">永續旅遊 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">友善旅遊</a><a href="index.html#story">生態保育</a><a href="index.html#story">在地共好</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">公益行動 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">公益參與</a><a href="index.html#story">志工行動</a><a href="index.html#commitment">合作夥伴</a></div></div>\n    </nav>\n  </div>\n</header>';
 const footer = '<footer class="site-footer">\n  <div class="footer-inner">\n    <a class="brand" href="index.html#home"><img src="image/main/logo.png" alt="可樂旅遊 Logo" class="brand-logo"></a>\n    <div class="footer-links"><a href="index.html#home">永續藍圖</a><a href="index.html#stats">永續成果</a><a href="index.html#story">公益行動</a><a href="index.html#commitment">聯絡我們</a></div>\n    <div>© 2026 ColaTour Co., Ltd. All rights reserved.\u3000｜\u3000網站互動 Demo</div>\n  </div>\n</footer>';
 const h = document.getElementById('site-header');
 const f = document.getElementById('site-footer');
 if(h) h.innerHTML=header;
 if(f) f.innerHTML=footer;
 const nav=document.querySelector('.site-header .nav');
 const toggle=document.querySelector('.site-header .menu-toggle');
 if(!nav||!toggle)return;
 const path=location.pathname.split('/').pop()||'index.html';
 if(path==='milestones.html')document.querySelector('.site-header a[href="milestones.html"]')?.setAttribute('aria-current','page');
 toggle.addEventListener('click',()=>{const opened=nav.classList.toggle('mobile-open');toggle.setAttribute('aria-expanded',String(opened));});
 document.querySelectorAll('.site-header button.nav-link').forEach(button=>button.addEventListener('click',()=>{
  const item=button.closest('.nav-item');const opened=!item.classList.contains('open');
  document.querySelectorAll('.site-header .nav-item').forEach(other=>{other.classList.remove('open');other.querySelector('button.nav-link')?.setAttribute('aria-expanded','false')});
  item.classList.toggle('open',opened);button.setAttribute('aria-expanded',String(opened));
 }));
 document.querySelectorAll('.site-header .dropdown a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('mobile-open');toggle.setAttribute('aria-expanded','false')}));
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header .nav-item'))document.querySelectorAll('.site-header .nav-item.open').forEach(item=>{item.classList.remove('open');item.querySelector('button.nav-link')?.setAttribute('aria-expanded','false')})});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSharedLayout);
} else {
  initSharedLayout();
}

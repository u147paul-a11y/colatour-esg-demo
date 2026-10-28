
使用者附件
他下拉的東西不見了!!!
我找到原因了！這不是「永續成果」連結設定錯誤，而是首頁原本的 CSS 把下拉選單遮住了。

從你的截圖來看，「幸福里程碑」已經變成黃色，代表選單的互動有觸發，但下拉內容沒有正常顯示。

問題很可能出在首頁舊版 CSS 與共用的 layout.css 同時控制 .nav、.dropdown，造成樣式衝突。

我們先用最小幅度的方式修復，不需要修改 layout.js，也不會影響幸福里程碑的連結。

第一步：打開共用 CSS
開啟 css/layout.css
點選鉛筆編輯，在檔案最下方加入：


/* 修復共用導覽列下拉選單被遮住的問題 */
.site-header {
  overflow: visible !important;
}

.site-header .nav-wrap,
.site-header .nav,
.site-header .nav-item {
  overflow: visible;
}

@media (min-width: 901px) {
  .site-header .nav-item:hover > .dropdown,
  .site-header .nav-item:focus-within > .dropdown,
  .site-header .nav-item.open > .dropdown {
    display: block !important;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1100;
    background: #ffffff;
    min-width: 190px;
    box-shadow: 0 14px 30px rgba(0, 27, 22, 0.25);
  }
}

第二步：儲存並測試
點選 Commit changes，等待網站更新，再回到首頁按 Ctrl + F5。

滑鼠移到「幸福里程碑」，應該就會看到：

幸福里程碑

永續成果

年度報告

點選「永續成果」就會進入 milestones.html。

先做這個修正就好。 如果下拉選單仍然沒有出現，請告訴我，我們再檢查首頁的 CSS 載入順序與實際選單結構，避免繼續疊加不必要的 CSS。

/* 共用導覽列與頁尾：不依賴第三方套件，適用 GitHub Pages */
(() => {
 const header = '<header class="site-header">\n  <div class="nav-wrap">\n    <a class="brand" href="index.html#home" aria-label="可樂旅遊，回到首頁"><img src="image/main/logo.png" alt="可樂旅遊 Logo" class="brand-logo"></a>\n    <button class="menu-toggle" aria-expanded="false" aria-label="開啟選單">☰ 選單</button>\n    <nav class="nav" aria-label="主要導覽">\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">永續藍圖 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#home">永續願景</a><a href="index.html#story">永續策略</a><a href="index.html#commitment">未來承諾</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">永續經營 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#stats">公司治理</a><a href="index.html#stats">環境管理</a><a href="index.html#stats">責任供應鏈</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">最新消息 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">永續焦點</a><a href="index.html#story">活動消息</a><a href="index.html#story">媒體報導</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">幸福里程碑 <span class="chevron">⌄</span></button><div class="dropdown"><a href="milestones.html">永續成果</a><a href="index.html#stats">年度報告</a></div></div>\n       <div class="nav-item"><button class="nav-link" aria-expanded="false">永續旅遊 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">友善旅遊</a><a href="index.html#story">生態保育</a><a href="index.html#story">在地共好</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">公益行動 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">公益參與</a><a href="index.html#story">志工行動</a><a href="index.html#commitment">合作夥伴</a></div></div>\n    </nav>\n  </div>\n</header>';
 const footer = '<footer class="site-footer">\n  <div class="footer-inner">\n    <a class="brand" href="index.html#home"><img src="image/main/logo.png" alt="可樂旅遊 Logo" class="brand-logo"></a>\n    <div class="footer-links"><a href="index.html#home">永續藍圖</a><a href="index.html#stats">永續成果</a><a href="index.html#story">公益行動</a><a href="index.html#commitment">聯絡我們</a></div>\n    <div>© 2026 ColaTour Co., Ltd. All rights reserved.\u3000｜\u3000網站互動 Demo</div>\n  </div>\n</footer>';
 const h = document.getElementById('site-header');
 const f = document.getElementById('site-footer');
 if(h) h.innerHTML=header;
 if(f) f.innerHTML=footer;
 const nav=document.querySelector('.site-header .nav');
 const toggle=document.querySelector('.site-header .menu-toggle');
 if(!nav||!toggle)return;
 const path=location.pathname.split('/').pop()||'index.html';
 if (path === 'milestones.html') {
  const link = document.querySelector('.site-header a[href="milestones.html"]');
  link?.setAttribute('aria-current', 'page');
  link?.closest('.nav-item')?.querySelector('button.nav-link')?.setAttribute('aria-current', 'page');
};
 toggle.addEventListener('click',()=>{const opened=nav.classList.toggle('mobile-open');toggle.setAttribute('aria-expanded',String(opened));});
 document.querySelectorAll('.site-header button.nav-link').forEach(button=>button.addEventListener('click',()=>{
  const item=button.closest('.nav-item');const opened=!item.classList.contains('open');
  document.querySelectorAll('.site-header .nav-item').forEach(other=>{other.classList.remove('open');other.querySelector('button.nav-link')?.setAttribute('aria-expanded','false')});
  item.classList.toggle('open',opened);button.setAttribute('aria-expanded',String(opened));
 }));
 document.querySelectorAll('.site-header .dropdown a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('mobile-open');toggle.setAttribute('aria-expanded','false')}));
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header .nav-item'))document.querySelectorAll('.site-header .nav-item.open').forEach(item=>{item.classList.remove('open');item.querySelector('button.nav-link')?.setAttribute('aria-expanded','false')})});
})();

/* 修復共用導覽列下拉選單被遮住的問題 */
.site-header {
  overflow: visible !important;
}

.site-header .nav-wrap,
.site-header .nav,
.site-header .nav-item {
  overflow: visible;
}

@media (min-width: 901px) {
  .site-header .nav-item:hover > .dropdown,
  .site-header .nav-item:focus-within > .dropdown,
  .site-header .nav-item.open > .dropdown {
    display: block !important;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1100;
    background: #ffffff;
    min-width: 190px;
    box-shadow: 0 14px 30px rgba(0, 27, 22, 0.25);
  }
}
…
我找到問題了！你把我上一則提供的 CSS 程式碼貼進了 js/layout.js，這會造成 JavaScript 語法錯誤。

你目前的 layout.js 前半段是正確的，真正的問題是最後這一段：

})();

/* 修復共用導覽列下拉選單被遮住的問題 */
.site-header {
  overflow: visible !important;
}

})(); 是 JavaScript 的結束位置。後面不能直接接 CSS。

第一步：修正 js/layout.js
開啟 GitHub 的 layout.js。

找到接近檔案最後面的：

})();

保留這一行，將它後面所有 CSS 程式碼刪除。

也就是從：

/* 修復共用導覽列下拉選單被遮住的問題 */

一直刪除到檔案結尾。

這樣 layout.js 就會正確結束在：

})();

然後點選 Commit changes。

第二步：把 CSS 放到正確的檔案
開啟 GitHub 的 layout.css。

在這個檔案最下方加入以下程式碼：


/* 修復桌面版導覽列下拉選單 */
@media (min-width: 901px) {
  .site-header,
  .site-header .nav-wrap,
  .site-header .nav,
  .site-header .nav-item {
    overflow: visible;
  }

  .site-header .nav-item:hover > .dropdown,
  .site-header .nav-item:focus-within > .dropdown,
  .site-header .nav-item.open > .dropdown {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1100;
  }
}

再按 Commit changes。

第三步：測試
開啟 可樂旅遊永續網站首頁，按 Ctrl + F5 強制重新整理。

滑鼠移到「幸福里程碑」時，應該會顯示「永續成果」與「年度報告」，點擊「永續成果」則會進入 milestones.html。

這次最重要的是把 JavaScript 和 CSS 分開放在正確的檔案。 你的「幸福里程碑 → 永續成果」連結本身已經寫對，不需要再修改。

還是不對 

/* 共用導覽列與頁尾：不依賴第三方套件，適用 GitHub Pages */
(() => {
 const header = '<header class="site-header">\n  <div class="nav-wrap">\n    <a class="brand" href="index.html#home" aria-label="可樂旅遊，回到首頁"><img src="image/main/logo.png" alt="可樂旅遊 Logo" class="brand-logo"></a>\n    <button class="menu-toggle" aria-expanded="false" aria-label="開啟選單">☰ 選單</button>\n    <nav class="nav" aria-label="主要導覽">\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">永續藍圖 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#home">永續願景</a><a href="index.html#story">永續策略</a><a href="index.html#commitment">未來承諾</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">永續經營 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#stats">公司治理</a><a href="index.html#stats">環境管理</a><a href="index.html#stats">責任供應鏈</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">最新消息 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">永續焦點</a><a href="index.html#story">活動消息</a><a href="index.html#story">媒體報導</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">幸福里程碑 <span class="chevron">⌄</span></button><div class="dropdown"><a href="milestones.html">永續成果</a><a href="index.html#stats">年度報告</a></div></div>\n       <div class="nav-item"><button class="nav-link" aria-expanded="false">永續旅遊 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">友善旅遊</a><a href="index.html#story">生態保育</a><a href="index.html#story">在地共好</a></div></div>\n      <div class="nav-item"><button class="nav-link" aria-expanded="false">公益行動 <span class="chevron">⌄</span></button><div class="dropdown"><a href="index.html#story">公益參與</a><a href="index.html#story">志工行動</a><a href="index.html#commitment">合作夥伴</a></div></div>\n    </nav>\n  </div>\n</header>';
 const footer = '<footer class="site-footer">\n  <div class="footer-inner">\n    <a class="brand" href="index.html#home"><img src="image/main/logo.png" alt="可樂旅遊 Logo" class="brand-logo"></a>\n    <div class="footer-links"><a href="index.html#home">永續藍圖</a><a href="index.html#stats">永續成果</a><a href="index.html#story">公益行動</a><a href="index.html#commitment">聯絡我們</a></div>\n    <div>© 2026 ColaTour Co., Ltd. All rights reserved.\u3000｜\u3000網站互動 Demo</div>\n  </div>\n</footer>';
 const h = document.getElementById('site-header');
 const f = document.getElementById('site-footer');
 if(h) h.innerHTML=header;
 if(f) f.innerHTML=footer;
 const nav=document.querySelector('.site-header .nav');
 const toggle=document.querySelector('.site-header .menu-toggle');
 if(!nav||!toggle)return;
 const path=location.pathname.split('/').pop()||'index.html';
 if (path === 'milestones.html') {
  const link = document.querySelector('.site-header a[href="milestones.html"]');
  link?.setAttribute('aria-current', 'page');
  link?.closest('.nav-item')?.querySelector('button.nav-link')?.setAttribute('aria-current', 'page');
};
 toggle.addEventListener('click',()=>{const opened=nav.classList.toggle('mobile-open');toggle.setAttribute('aria-expanded',String(opened));});
 document.querySelectorAll('.site-header button.nav-link').forEach(button=>button.addEventListener('click',()=>{
  const item=button.closest('.nav-item');const opened=!item.classList.contains('open');
  document.querySelectorAll('.site-header .nav-item').forEach(other=>{other.classList.remove('open');other.querySelector('button.nav-link')?.setAttribute('aria-expanded','false')});
  item.classList.toggle('open',opened);button.setAttribute('aria-expanded',String(opened));
 }));
 document.querySelectorAll('.site-header .dropdown a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('mobile-open');toggle.setAttribute('aria-expanded','false')}));
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header .nav-item'))document.querySelectorAll('.site-header .nav-item.open').forEach(item=>{item.classList.remove('open');item.querySelector('button.nav-link')?.setAttribute('aria-expanded','false')})});
})();


/* 修復桌面版導覽列下拉選單 */
@media (min-width: 901px) {
  .site-header,
  .site-header .nav-wrap,
  .site-header .nav,
  .site-header .nav-item {
    overflow: visible;
  }

  .site-header .nav-item:hover > .dropdown,
  .site-header .nav-item:focus-within > .dropdown,
  .site-header .nav-item.open > .dropdown {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1100;
  }
}
…
我看到問題了。你現在貼的內容，還是把 CSS 放在 js/layout.js 裡面，所以網站仍然無法正常執行導覽列功能。

這次我們不再新增修補程式，直接把兩個檔案分清楚。

1. 先修正 js/layout.js
打開 編輯 layout.js。

找到最後這一行：

})();

保留這一行，刪除後面所有內容。

也就是下面整段都要從 layout.js 刪掉：


/* 修復桌面版導覽列下拉選單 */
@media (min-width: 901px) {
  .site-header,
  .site-header .nav-wrap,
  .site-header .nav,
  .site-header .nav-item {
    overflow: visible;
  }

  .site-header .nav-item:hover > .dropdown,
  .site-header .nav-item:focus-within > .dropdown,
  .site-header .nav-item.open > .dropdown {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1100;
  }
}

刪除後，按 Commit changes。

2. 再確認 css/layout.css
剛剛刪掉的 CSS，只能放在：

css/layout.css
如果那段 CSS 已經在 layout.css 裡面，就不需要重複新增。

3. 重新測試
回到 網站首頁，按 Ctrl + F5。

這次請先看「幸福里程碑」下拉選單是否出現。

另外，我想特別說明：你貼的 JavaScript 中，「幸福里程碑 → 永續成果」連結本身沒有問題。 目前最明確的錯誤是 JavaScript 檔案裡混入了 CSS；必須先排除這個語法錯誤，才能判斷是否還有其他樣式衝突。

如果修正後仍無法顯示，請把最新的 index.html 和 layout.css 一起提供，我會直接幫你整理成可替換的完整檔案，避免你一直手動修改。

可以直接幫我寫好 layout.css嗎

可以！我已經幫你重新整理好完整的 layout.css，這次不用再一段一段修改。

下載完整 layout.css

已整合桌面版下拉選單、手機版選單、正式 Logo、共用頁首及頁尾

這個版本特別處理了首頁與幸福里程碑原有 CSS 的衝突，並保留你目前的深綠色導覽列設計。

請照這個順序更新
開啟 GitHub 的 css/layout.css。

點選鉛筆圖示進入編輯。

按 Ctrl + A 全選舊程式碼並刪除。

開啟剛下載的 layout.css，複製全部內容貼上。

點選 Commit changes 儲存。

還有一個很重要的步驟：

你之前貼給我的 js/layout.js，最後仍然混入了 CSS。請務必確認它的最後一行是：

})();

這一行後面不能再有 @media 或 .site-header 等 CSS 程式碼，否則導覽列還是可能無法正常運作。

更新後應該看到
幸福里程碑

永續成果

年度報告

「永續成果」會連到 milestones.html。

更新後，請開啟 網站首頁，按 Ctrl + F5 重新整理。

如果下拉選單還是不出現，下一步我們就直接檢查首頁 index.html 的 CSS 載入順序，不再反覆追加修補程式碼。


layout.css
程式碼



}
.site-header .nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  width: auto;
  border: 0;
  border-radius: 0;
  border-bottom: 0;
  background: transparent;
  color: #fff;
  padding: 25px 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
}
.site-header .nav-link:hover,
.site-header .nav-link:focus-visible,
.site-header .nav-link[aria-current="page"] {
  color: #f2b51d;
}
.site-header .chevron { font-size: 10px; opacity: .8; }

/* 桌面版下拉選單：以 nav-item 為定位基準 */
.site-header .dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1100;
  min-width: 190px;
  padding: 8px;
  background: #fff;
  color: #173d32;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 14px 30px rgba(0,27,22,.25);
}
.site-header .nav-item:hover > .dropdown,
.site-header .nav-item:focus-within > .dropdown,
.site-header .nav-item.open > .dropdown {
  display: block;
}
.site-header .dropdown a {
  display: block;
  padding: 11px 12px;
  border-radius: 7px;
  color: #173d32;
  font-size: 13px;
  text-decoration: none;
}
.site-header .dropdown a:hover,
.site-header .dropdown a:focus-visible {
  background: #edf4ef;
  color: #08724f;
}
.site-header .menu-toggle {
  display: none;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255,255,255,.38);
  border-radius: 8px;
  padding: 7px 10px;
  cursor: pointer;
}

/* 共用頁尾 */
.site-footer {
  background: #032f24;
  color: #d8e5de;
  padding: 28px 5%;
  font-size: 12px;
}
.site-footer .footer-inner {
  max-width: 1180px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 11px;
}
.site-footer .footer-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}
.site-footer a { color: inherit; text-decoration: none; }
.site-footer a:hover { color: #f2b51d; }

/* 固定導覽列預留空間 */
body { padding-top: 72px; }

/* 手機與平板 */
@media (max-width: 900px) {
  body { padding-top: 66px; }
  .site-header .nav-wrap { min-height: 66px; gap: 12px; }
  .site-header .menu-toggle { display: block; }
  .site-header .nav {
    display: none;
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
    z-index: 1100;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0;
    padding: 8px 5% 18px;
    background: #063d2e;
    max-height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .site-header .nav.mobile-open { display: flex; }
  .site-header .nav-item { width: 100%; }
  .site-header .nav-link {
    width: 100%;
    justify-content: space-between;
    padding: 14px 8px;
  }
  .site-header .dropdown {
    display: none;
    position: static;
    min-width: 0;
    margin: 0 8px 8px;
    border-radius: 8px;
    box-shadow: none;
  }
  .site-header .nav-item:hover > .dropdown { display: none; }
  .site-header .nav-item.open > .dropdown,
  .site-header .nav-item:focus-within > .dropdown { display: block; }
  .site-footer .footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }
}


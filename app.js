/**
 * 润金簿 · 落地页脚本
 * 主要职责：
 *   1) 用 config.js 的内容渲染品牌、版本、下载链接到页面
 *   2) 检测当前操作系统，高亮推荐版本
 *   3) 微信/QQ 内打开提示用户右上角浏览器打开（GitHub 直链在微信内会被拦截）
 */
(function () {
  var cfg = window.LANDING_CONFIG || {};

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el && text != null) el.textContent = text;
  }

  function setHref(id, url) {
    var el = document.getElementById(id);
    if (el && url) el.href = url;
  }

  // 1) 渲染基础文案
  setText('brand', cfg.brand);
  setText('brand-en', cfg.brandEn);
  setText('tagline', cfg.tagline);
  setText('sub-tagline', cfg.subTagline);
  setText('version', cfg.version);
  setText('release-date', cfg.releaseDate);
  setText('footer-brand', cfg.brand);
  setText('footer-tagline', cfg.tagline);
  document.title = (cfg.brand || '润金簿') + ' · ' + (cfg.tagline || '发票凭证助手') + ' | 立即下载';

  // 2) 渲染下载按钮
  var dl = cfg.downloads || {};
  setHref('btn-windows', dl.windows);
  setHref('btn-windows-2', dl.windows);
  setHref('btn-macos', dl.macos);
  setHref('btn-macos-2', dl.macos);

  // download attribute hint to prompt browsers to download instead of navigate
  ['btn-windows', 'btn-windows-2', 'btn-macos', 'btn-macos-2'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.setAttribute('download', '');
  });

  setHref('all-releases', cfg.releasesUrl);

  // footer links
  var footerLinks = document.getElementById('footer-links');
  if (footerLinks) {
    var html = '';
    if (cfg.releasesUrl) html += '<a href="' + cfg.releasesUrl + '" target="_blank" rel="noopener">所有版本</a>';
    if (cfg.contact && cfg.contact.email) html += '<a href="mailto:' + cfg.contact.email + '">' + cfg.contact.email + '</a>';
    if (cfg.contact && cfg.contact.wechat) html += '<span>微信：' + cfg.contact.wechat + '</span>';
    footerLinks.innerHTML = html;
  }

  // 3) 检测平台
  var ua = navigator.userAgent || '';
  var platform = navigator.platform || '';
  var isMac = /Mac/i.test(platform) || /Mac OS X/i.test(ua);
  var isWin = /Win/i.test(platform);
  var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua);
  var isAndroid = /Android/i.test(ua);

  var tipEl = document.getElementById('auto-tip');
  if (tipEl) {
    if (isWin && !isMobile) {
      tipEl.textContent = '已自动识别您当前在 Windows 系统';
      addRecommend('btn-windows');
    } else if (isMac && !isIOS) {
      tipEl.textContent = '已自动识别您当前在 macOS 系统';
      addRecommend('btn-macos');
    } else if (isIOS) {
      tipEl.textContent = '当前是 iOS 设备，请在 Mac 电脑上下载使用';
    } else if (isAndroid) {
      tipEl.textContent = '当前是 Android 设备，请在 Windows 电脑上下载使用';
    } else {
      tipEl.textContent = '请根据您的电脑系统选择对应版本';
    }
  }

  function addRecommend(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('recommended');
  }

  // 4) 微信/QQ 内打开拦截（GitHub 直链会被屏蔽）
  var isWechat = /MicroMessenger/i.test(ua);
  var isQQ = /QQ\//i.test(ua) || /\bQQBrowser\b/i.test(ua);

  function showWechatMask() {
    var mask = document.getElementById('wechat-mask');
    if (!mask) {
      mask = document.createElement('div');
      mask.id = 'wechat-mask';
      mask.className = 'wechat-mask';
      mask.innerHTML =
        '<div class="wechat-mask-inner">' +
          '<div class="arrow">↗</div>' +
          '<h3>请在浏览器中打开</h3>' +
          '<p>由于微信/QQ 安全限制，无法直接下载文件。<br/>请点击右上角「···」选择「在浏览器中打开」后再下载。</p>' +
          '<button type="button" id="wechat-mask-close">我知道了</button>' +
        '</div>';
      document.body.appendChild(mask);
      document.getElementById('wechat-mask-close').addEventListener('click', function () {
        mask.classList.remove('show');
      });
      mask.addEventListener('click', function (e) {
        if (e.target === mask) mask.classList.remove('show');
      });
    }
    mask.classList.add('show');
  }

  if (isWechat || isQQ) {
    ['btn-windows', 'btn-windows-2', 'btn-macos', 'btn-macos-2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        showWechatMask();
      });
    });
  }
})();

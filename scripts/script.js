function showLoadingPopup(event, url) {
    event.preventDefault();
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    setTimeout(() => {
      window.open(url, '_blank');
      popup.classList.add('hidden');
    }, 1400);
  }
  function showProfilePopup() {
    document.getElementById('profilePopup').classList.remove('hidden');
  }
  function hideProfilePopup() {
    document.getElementById('profilePopup').classList.add('hidden');
  }
  

(function initPlatform() {
  const ua = navigator.userAgent || '';
  const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isMac = /Mac/.test(platform) && !isIOS;
  const isWindows = /Win/.test(platform);
  const isLinux = (/Linux|X11/.test(platform) || /Linux/.test(ua)) && !isAndroid;
  let os = 'unknown';
  if (isIOS) os = 'ios'; else if (isAndroid) os = 'android'; else if (isMac) os = 'mac'; else if (isWindows) os = 'windows'; else if (isLinux) os = 'linux';
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('os-' + os);
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      document.body.classList.add('pointer-coarse');
    }
    const cards = document.querySelectorAll('.bento-grid > .card, .about-cards .card');
    cards.forEach(card => {
      const bar = document.createElement('div');
      bar.className = 'window-chrome';
      if (document.body.classList.contains('os-mac') || document.body.classList.contains('os-ios')) {
        bar.classList.add('mac');
        bar.innerHTML = '<span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>';
      } else if (document.body.classList.contains('os-windows')) {
        bar.classList.add('win');
        bar.innerHTML = '<span class="btn min"></span><span class="btn max"></span><span class="btn close"></span>';
      } else if (document.body.classList.contains('os-android')) {
        bar.classList.add('android');
        bar.innerHTML = '<span class="bar"></span><span class="menu"></span>';
      } else if (document.body.classList.contains('os-linux')) {
        bar.classList.add('linux');
        bar.innerHTML = '<span class="dot red"></span><span class="dot green"></span><span class="dot blue"></span>';
      } else {
        return;
      }
      card.prepend(bar);
    });
  });
})();

(function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const applyIcon = () => { btn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙'; };
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');
  applyIcon();
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const theme = document.body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    applyIcon();
  });
})();

(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const hours = new Date().getHours();
  const timeGreeting = hours < 12 ? 'อรุณสวัสดิ์' : hours < 18 ? 'สวัสดียามบ่าย' : 'สวัสดียามค่ำ';
  const messages = [
    'ยินดีต้อนรับสู่โลกของ ฮู เจ!   ✨',
    `${timeGreeting}! ขอให้เป็นวันที่ดีนะ 😄`,
    'คลิกที่รูปโปรไฟล์เพื่อทักทายกัน 👋'
  ];
  let msgIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const type = () => {
    const current = messages[msgIndex];
    if (!deleting) {
      el.textContent = current.slice(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
        charIndex = 0;
      }
    }
    const delay = deleting ? 45 : 65;
    setTimeout(type, delay + Math.random() * 60);
  };
  setTimeout(type, 500);
})();

(function initReveal() {
  const targets = Array.from(document.querySelectorAll('.container > *'));
  targets.forEach((el, i) => {
    el.classList.add('reveal');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) * 60) + 'ms';
        el.classList.add('revealed');
        io.unobserve(el);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(el => io.observe(el));
})();

(function initRipple() {
  const buttons = document.querySelectorAll('.link-button, .bento-grid > a.card');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();


(function smoothScroll() {
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

(function tiltCards() {
  if ((window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      document.body.classList.contains('os-ios') ||
      document.body.classList.contains('os-android')) {
    return;
  }
  const cards = document.querySelectorAll('.tilt');
  const damp = 22;
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      const rx = ((cy / r.height) - 0.5) * -damp;
      const ry = ((cx / r.width) - 0.5) * damp;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

(function miscDynamic() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const st = document.getElementById('nowStatus');
  if (st) {
    const h = new Date().getHours();
    st.textContent = h < 12 ? 'จิบกาแฟเตรียมทำคลิป ☕' : h < 18 ? 'กำลังตัดต่ออยู่เลย 🎬' : 'กำลังไลฟ์ชิล ๆ 🌙';
  }
})();

(function initAutoIcons() {
  const toLetter = (str) => {
    if (!str) return '?';
    const m = (str.match(/[A-Za-zก-ฮา-๙]/) || ['?'])[0];
    return m.toUpperCase();
  };
  const pickBrand = (host, title) => {
    const s = (host + ' ' + title).toLowerCase();
    if (s.includes('discord')) return 'discord';
    if (s.includes('youtu')) return 'youtube';
    if (s.includes('tiktok')) return 'tiktok';
    if (s.includes('donate') || s.includes('ezdn')) return 'donate';
    return 'generic';
  };
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.bento-grid > a.card').forEach(card => {
      const titleEl = card.querySelector('.card-title');
      const iconEl = card.querySelector('.card-emoji');
      if (!iconEl) return;
      const title = titleEl ? titleEl.textContent.trim() : '';
      let host = '';
      try { host = new URL(card.href).hostname; } catch {}
      const brand = pickBrand(host, title);
      const letter = toLetter(title || host);
      iconEl.classList.add('icon', `icon-${brand}`);
      iconEl.setAttribute('data-letter', letter);
      iconEl.setAttribute('aria-label', `${title || host} icon`);
    });
  });
})();


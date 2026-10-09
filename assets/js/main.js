// Shared behaviour for both language versions
(function () {
  const root = document.documentElement;

  // ----- Theme toggle (remembered per browser) -----
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ----- Mobile menu -----
  const menuBtn = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // ----- Scroll-spy -----
  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = navAnchors.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // ----- Reveal on scroll -----
  const revealEls = document.querySelectorAll('.reveal');
  const rev = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); } });
  }, { threshold: 0.08 });
  revealEls.forEach(el => rev.observe(el));

  // ----- Publication filter -----
  const chips = document.querySelectorAll('.pub-toolbar .chip');
  const pubs = document.querySelectorAll('.pub');
  chips.forEach(chip => {
    const f = chip.dataset.filter;
    const n = f === 'all' ? pubs.length : [...pubs].filter(p => p.dataset.type.split(' ').includes(f)).length;
    const c = chip.querySelector('.count');
    if (c) c.textContent = n;
    chip.addEventListener('click', () => {
      chips.forEach(c => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
      pubs.forEach(p => { p.hidden = !(f === 'all' || p.dataset.type.split(' ').includes(f)); });
    });
  });

  // ----- Back to top -----
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 700), { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ----- Footer year -----
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

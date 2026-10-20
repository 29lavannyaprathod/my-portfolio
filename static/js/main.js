/* ── Mobile navigation toggle ─────────────────────────────── */
(function () {
  'use strict';

  /* ── Nav menu ───────────────────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');

  if (toggle && menu) {
    function openMenu()  {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
    }
    function closeMenu() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }

    toggle.addEventListener('click', function () {
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) { closeMenu(); }
    });
  }

  /* ── Active nav highlight on scroll ─────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = menu ? menu.querySelectorAll('a[href^="#"]') : [];

  function highlightNav() {
    let current = '';
    const offset = 80;
    sections.forEach(function (section) {
      if (section.offsetTop - offset <= window.scrollY) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  /* ── Project slider ─────────────────────────────────────── */
  const slides    = document.querySelectorAll('.proj-slide');
  const dots      = document.querySelectorAll('.proj-dot');
  const counter   = document.getElementById('projCounter');
  const btnPrev   = document.getElementById('projPrev');
  const btnNext   = document.getElementById('projNext');
  const total     = slides.length;

  if (!total) return;   // no projects — bail out

  let current = 0;

  function goTo(index) {
    // bounds
    if (index < 0 || index >= total) return;

    // deactivate current
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('active');

    // activate new
    current = index;
    slides[current].classList.add('active');
    slides[current].setAttribute('aria-hidden', 'false');
    dots[current].classList.add('active');

    // counter
    if (counter) counter.textContent = (current + 1) + ' / ' + total;

    // arrow states
    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current === total - 1;
  }

  // initial state
  if (btnPrev) btnPrev.disabled = true;
  if (btnNext) btnNext.disabled = total <= 1;

  // dot clicks
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.dataset.index, 10));
    });
  });

  // arrow clicks
  if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
  if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });

  // keyboard left/right when focused inside slider section
  const projSection = document.getElementById('projects');
  if (projSection) {
    projSection.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  goTo(current + 1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    goTo(current - 1);
    });
  }

})();

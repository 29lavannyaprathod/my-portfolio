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
  const sliderEl  = document.getElementById('projSlider');
  const total     = slides.length;

  if (!total) return;   // no projects — bail out

  let current = 0;
  let isAnimating = false;

  function goTo(index, direction) {
    // bounds
    if (index < 0 || index >= total || index === current || isAnimating) return;

    isAnimating = true;
    const prevIndex = current;
    const dir = direction || (index > current ? 'bottom' : 'top');

    // deactivate current
    const prevSlide = slides[prevIndex];
    prevSlide.classList.remove('active', 'slide-from-bottom', 'slide-from-top');
    prevSlide.setAttribute('aria-hidden', 'true');
    dots[prevIndex].classList.remove('active');

    // activate new
    current = index;
    const nextSlide = slides[current];
    nextSlide.classList.remove('slide-from-bottom', 'slide-from-top');
    nextSlide.classList.add('active', dir === 'bottom' ? 'slide-from-bottom' : 'slide-from-top');
    nextSlide.setAttribute('aria-hidden', 'false');
    dots[current].classList.add('active');

    // counter with subtle bounce animation
    if (counter) {
      counter.textContent = (current + 1) + ' / ' + total;
      counter.classList.add('counter-pulse');
      setTimeout(function () { counter.classList.remove('counter-pulse'); }, 300);
    }

    // arrow states
    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current === total - 1;

    setTimeout(function () {
      isAnimating = false;
    }, 380);
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
  if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1, 'top'); });
  if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1, 'bottom'); });

  // mouse wheel on slider
  if (sliderEl) {
    let wheelTimeout;
    sliderEl.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) < 35) return;
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(function () {
        if (e.deltaY > 0) {
          goTo(current + 1, 'bottom');
        } else {
          goTo(current - 1, 'top');
        }
      }, 50);
    }, { passive: true });
  }

  // keyboard left/right or up/down when focused inside slider section
  const projSection = document.getElementById('projects');
  if (projSection) {
    projSection.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  goTo(current + 1, 'bottom');
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    goTo(current - 1, 'top');
    });
  }

})();

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

  /* ── Interactive Background & Cursor Spotlight ─────────── */
  (function initInteractiveBg() {
    // 1. Mouse Spotlight Tracker
    const spotlight = document.getElementById('cursorSpotlight');
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('pointermove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    function updateSpotlight() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (spotlight) {
        spotlight.style.setProperty('--mouse-x', currentX.toFixed(1) + 'px');
        spotlight.style.setProperty('--mouse-y', currentY.toFixed(1) + 'px');
      }
      requestAnimationFrame(updateSpotlight);
    }
    requestAnimationFrame(updateSpotlight);

    // 2. Interactive Constellation Canvas
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    }

    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('pointermove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('pointerleave', function () {
      mouse.x = null;
      mouse.y = null;
    });

    // Ripple wave effect on click
    let ripples = [];
    window.addEventListener('click', function (e) {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        maxR: 130,
        opacity: 0.45
      });
    });

    function createParticles() {
      particles = [];
      const count = Math.min(50, Math.max(25, Math.floor(width / 32)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          radius: Math.random() * 2 + 1.2,
          color: Math.random() > 0.4 ? 'rgba(112, 96, 168, 0.55)' : 'rgba(82, 122, 91, 0.45)',
        });
      }
    }

    resize();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw & update click ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.r += 3.8;
        rip.opacity -= 0.014;
        if (rip.opacity <= 0) {
          ripples.splice(r, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(142, 122, 212, ' + rip.opacity + ')';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Draw & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.6;
            p.y -= (dy / dist) * force * 1.6;

            // Connect mouse to particle with glowing purple thread
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = 'rgba(142, 122, 212, ' + (force * 0.4) + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist2 / 115) * 0.28;
            ctx.strokeStyle = 'rgba(112, 96, 168, ' + alpha + ')';
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  })();

})();

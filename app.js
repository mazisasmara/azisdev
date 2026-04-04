/* app.js — AzisDev static site */
'use strict';

/* ══════════════════════════════════════════════════
   DARK MODE
══════════════════════════════════════════════════ */
(function () {
  var html = document.documentElement;
  var btn  = document.getElementById('themeBtn');
  var KEY  = 'az-theme';

  // Init (no-flash handled by inline preload in CSS or OS pref)
  var saved = localStorage.getItem(KEY);
  if (saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.setAttribute('data-theme', 'dark');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem(KEY, isDark ? 'light' : 'dark');
    });
  }
})();

/* ══════════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════════ */
(function () {
  var burger = document.getElementById('burger');
  var menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  burger.addEventListener('click', function () {
    var isOpen = menu.hidden === false;
    menu.hidden = isOpen;
    burger.setAttribute('aria-expanded', String(!isOpen));
    burger.classList.toggle('open', !isOpen);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('open');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) {
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('open');
      burger.focus();
    }
  });
})();

/* ══════════════════════════════════════════════════
   NAVBAR SCROLL SHADOW
══════════════════════════════════════════════════ */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ══════════════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════════════ */
(function () {
  var buttons = document.querySelectorAll('.faq__btn');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var answerId = this.getAttribute('aria-controls');
      var answer   = document.getElementById(answerId);

      // Close all
      buttons.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        var aid = b.getAttribute('aria-controls');
        var ans = document.getElementById(aid);
        if (ans) ans.hidden = true;
      });

      // Toggle clicked
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        if (answer) answer.hidden = false;
      }
    });
  });
})();

/* ══════════════════════════════════════════════════
   AOS — Animate on Scroll
══════════════════════════════════════════════════ */
(function () {
  var els = document.querySelectorAll('.aos');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { obs.observe(el); });
})();

/* ══════════════════════════════════════════════════
   ACTIVE NAV LINK on scroll
══════════════════════════════════════════════════ */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (link) {
          var href = link.getAttribute('href');
          link.style.color = (href === '#' + entry.target.id) ? 'var(--violet-600)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) { obs.observe(s); });
})();

/* ══════════════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════════════ */
(function () {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ══════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links (cross-browser)
══════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id  = this.getAttribute('href').slice(1);
      var el  = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ══════════════════════════════════════════
   KALIA — shared.js v2
   ══════════════════════════════════════════ */

// ── NAV scroll + hamburger ──
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.style.boxShadow = window.scrollY > 60
      ? '0 4px 30px rgba(0,0,0,.35)' : 'none';
  });

  // Hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll(
    '.card,.conseil-card,.testi-card,.repere-step,.proc-item,.value-card,.article-card,.pricing-card,.fade-in'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// ── Radio button visual select ──
function initRadios() {
  document.querySelectorAll('.radio-label').forEach(label => {
    label.addEventListener('click', () => {
      const name = label.querySelector('input')?.name;
      if (name) {
        document.querySelectorAll(`.radio-label input[name="${name}"]`).forEach(inp => {
          inp.closest('.radio-label').classList.remove('selected');
        });
      }
      label.classList.add('selected');
      const inp = label.querySelector('input');
      if (inp) inp.checked = true;
    });
  });
}

document.addEventListener('DOMContentLoaded', initRadios);

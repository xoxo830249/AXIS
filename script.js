/* ============================================
   AXIS — JavaScript 인터랙션
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 네비게이션 스크롤 효과 ===== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ===== 모바일 메뉴 ===== */
  const mobileBtn = document.getElementById('nav-mobile-btn');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  mobileBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ===== 스크롤 등장 애니메이션 ===== */
  const targets = document.querySelectorAll(
    '.purpose-text, .purpose-img-wrap, .science-intro-inner, ' +
    '.wgrid-item, .collection-header, .collection-main, .collection-sub, ' +
    '.tech-item, .innovation-quote, .innovation-img-wrap, .cta-inner'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));

  /* ===== 네비 링크 활성화 (스크롤 스파이) ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }, { passive: true });

});

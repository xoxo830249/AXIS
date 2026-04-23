/* ============================================
   AXIS — JavaScript 인터랙션
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 네비게이션 스크롤 효과 ===== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ===== 모바일 메뉴 토글 ===== */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // 모바일 링크 클릭 시 메뉴 닫기
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ===== 히어로 슬라이드 ===== */
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let slideTimer;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = idx;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startSlideShow() {
    slideTimer = setInterval(nextSlide, 4500);
  }

  // 인디케이터 클릭
  indicators.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      clearInterval(slideTimer);
      goToSlide(idx);
      startSlideShow();
    });
  });

  if (slides.length > 1) startSlideShow();

  /* ===== 제품 썸네일 클릭 → 메인 이미지 교체 ===== */
  const thumbItems = document.querySelectorAll('.thumb-item');
  const mainImg = document.getElementById('detail-main-img');

  thumbItems.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // 활성 클래스 이동
      document.querySelector('.thumb-item.active')?.classList.remove('active');
      thumb.classList.add('active');
      // 메인 이미지 교체 (페이드 효과)
      mainImg.style.opacity = '0';
      mainImg.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        mainImg.src = thumb.dataset.img;
        mainImg.style.opacity = '1';
      }, 280);
    });
  });

  /* ===== 라이트박스 ===== */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');

  // 라이트박스 열 이미지 배열
  let lbImages = [];
  let lbIndex = 0;

  function openLightbox(imgs, idx) {
    lbImages = imgs;
    lbIndex = idx;
    lbImg.src = imgs[idx];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function lbNavigate(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = lbImages[lbIndex];
      lbImg.style.opacity = '1';
    }, 200);
  }

  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => lbNavigate(-1));
  lbNext?.addEventListener('click', () => lbNavigate(1));
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // 키보드 내비게이션
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbNavigate(-1);
    if (e.key === 'ArrowRight') lbNavigate(1);
  });

  // 착용 이미지 라이트박스 연결
  const wearingImgs = [
    './착용이미지/착용이미지 (1).png',
    './착용이미지/착용이미지 (9).png',
    './착용이미지/착용이미지 (10).png',
    './착용이미지/착용이미지 (11).png',
    './착용이미지/착용이미지 (12).png',
    './착용이미지/착용이미지 (13).png',
    './착용이미지/착용이미지 (14).png',
    './착용이미지/착용이미지 (15).png',
    './착용이미지/착용이미지 (16).png',
    './착용이미지/착용이미지 (17).png',
  ];

  document.querySelectorAll('.masonry-item').forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(wearingImgs, idx));
    item.style.cursor = 'zoom-in';
  });

  // 서브 이미지 라이트박스 연결
  const subImgs = [
    './서브이미지/서브이미지 (1).jpg',
    './서브이미지/서브이미지 (2).png',
    './서브이미지/서브이미지 (3).png',
  ];
  document.querySelectorAll('.sub-img-wrap').forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(subImgs, idx));
    item.style.cursor = 'zoom-in';
  });

  /* ===== 스크롤 등장 애니메이션 ===== */
  const revealEls = document.querySelectorAll(
    '.feature-card, .thumb-item, .masonry-item, .sub-img-wrap, .swatch, .section-header'
  );

  // 클래스 추가
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // 약간의 지연으로 순차 등장
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (i % 6));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  /* ===== 컬러 스와치 호버 효과 ===== */
  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('mouseenter', () => {
      const color = swatch.style.background;
      swatch.style.boxShadow = `0 20px 40px ${color}60`;
    });
    swatch.addEventListener('mouseleave', () => {
      swatch.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
    });
  });

});

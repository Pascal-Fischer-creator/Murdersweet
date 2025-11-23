document.addEventListener('DOMContentLoaded', () => {

  /* --- SCROLL REVEAL --- */
  const revealEls = document.querySelectorAll('.fade-in, .fade-slide-up, .scroll-reveal, .wipe-section');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  revealEls.forEach(el => observer.observe(el));

  /* --- CTA BG CHANGE --- */
  const scrollBg = document.querySelector('.scroll-bg-change');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) scrollBg.classList.add('scrolled');
    else scrollBg.classList.remove('scrolled');
  });

  /* --- LIQUID-DEATH STYLE SWIPER --- */
  new Swiper('.sachet-swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 40,
    loop: true,
    grabCursor: true,
    speed: 500,
    freeMode: false,
    mousewheel: { forceToAxis: true }
  });

  /* --- 360 VIEWER --- */
  const viewer = document.querySelector('.viewer360');
  if (viewer) {
    const img = viewer.querySelector('.viewer360-img');
    const frames = parseInt(viewer.dataset.frames) || 24;
    const prefix = viewer.dataset.prefix;
    const ext = viewer.dataset.ext;

    let dragging = false;
    let currentFrame = 1;

    const updateFrame = (n) => {
      const pad = String(n).padStart(2, '0');
      img.src = `${prefix}${pad}.${ext}`;
    };

    const onDrag = (clientX) => {
      const rect = viewer.getBoundingClientRect();
      const percent = (clientX - rect.left) / rect.width;
      let frame = Math.floor(percent * frames) + 1;
      frame = Math.max(1, Math.min(frames, frame));
      if (frame !== currentFrame) {
        currentFrame = frame;
        updateFrame(frame);
      }
    };

    viewer.addEventListener('mousedown', e => {
      dragging = true;
      onDrag(e.clientX);
    });
    viewer.addEventListener('mousemove', e => {
      if (dragging) onDrag(e.clientX);
    });
    window.addEventListener('mouseup', () => dragging = false);

    viewer.addEventListener('touchstart', e => {
      dragging = true;
      onDrag(e.touches[0].clientX);
    }, { passive: true });

    viewer.addEventListener('touchmove', e => {
      if (dragging) onDrag(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => dragging = false);
  }

  /* --- EMAIL POPUP --- */
  const popup = document.getElementById('email-popup');
  const closeBtn = document.querySelector('.popup-close');

  let shown = false;
  const show = () => {
    if (!shown) {
      popup.classList.add('open');
      shown = true;
    }
  };
  setTimeout(show, 7000);

  window.addEventListener('scroll', () => {
    if (!shown && (window.scrollY + window.innerHeight) / document.body.scrollHeight > 0.5) show();
  });

  closeBtn.addEventListener('click', () => popup.classList.remove('open'));
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('open');
  });

  document.getElementById('popup-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('popup-email').value;
    alert(`Thanks, rebel. We'll notify: ${email}`);
    popup.classList.remove('open');
  });

});





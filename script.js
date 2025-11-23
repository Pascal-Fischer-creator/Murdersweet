document.addEventListener('DOMContentLoaded', () => {

  /* HERO SWIPER */
  new Swiper('.hero-swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.hero-swiper .swiper-pagination',
      clickable: true
    }
  });

  /* SACHET LIQUID-DEATH SWIPER */
  new Swiper('.sachet-swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 40,
    loop: true,
    grabCursor: true,
    speed: 500,
  });

  /* 360 VIEWER */
  const viewer = document.querySelector('.viewer360');
  if (viewer) {
    const img = viewer.querySelector('.viewer360-img');
    const frames = parseInt(viewer.dataset.frames);
    const prefix = viewer.dataset.prefix;
    const ext = viewer.dataset.ext;

    let dragging = false;
    let frame = 1;

    const setFrame = f => {
      img.src = `${prefix}${String(f).padStart(2,'0')}.${ext}`;
    };

    const update = x => {
      const rect = viewer.getBoundingClientRect();
      const percent = (x - rect.left) / rect.width;
      let newFrame = Math.floor(percent * frames) + 1;
      newFrame = Math.max(1, Math.min(frames, newFrame));
      if (newFrame !== frame) {
        frame = newFrame;
        setFrame(frame);
      }
    };

    viewer.addEventListener('mousedown', e => {
      dragging = true;
      update(e.clientX);
    });

    window.addEventListener('mouseup', () => dragging = false);

    viewer.addEventListener('mousemove', e => {
      if (dragging) update(e.clientX);
    });

    viewer.addEventListener('touchstart', e => {
      dragging = true;
      update(e.touches[0].clientX);
    }, { passive: true });

    viewer.addEventListener('touchmove', e => {
      if (dragging) update(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => dragging = false);
  }

});




const swiper = new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  spaceBetween: 2,
  centeredSlides: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    // cuando la ventana es >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 2
    },
    // cuando la ventana es >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 5
    },
    // cuando la ventana es >= 768px
    768: {
      slidesPerView: 2.5,
      spaceBetween: 5
    }
  },
  on: {
    init: function () {
      updateSlidesScale(this);
    },
    slideChange: function () {
      updateSlidesScale(this);
    },
    resize: function () {
      updateSlidesScale(this);
    }
  }
});

// Escalado progresivo para los slides (solo en desktop)
function updateSlidesScale(swiper) {
  const slides = swiper.slides;
  const activeIndex = swiper.activeIndex;
  const isMobile = window.innerWidth < 768;

  slides.forEach(function(slide, index) {
    if (isMobile) {
      // En móvil, todo igual (sin escalado ni opacidad)
      slide.style.transform = 'scale(1)';
      slide.style.opacity = '1';
      slide.style.zIndex = '1';
      slide.style.width = '90vw'; // Asegura que coincida con el CSS
      slide.style.maxWidth = '90vw'; // Asegura que coincida con el CSS
    } else {
      // En escritorio, escalado progresivo
      let distance = Math.min(
        Math.abs(index - activeIndex),
        Math.abs(index - activeIndex - slides.length),
        Math.abs(index - activeIndex + slides.length)
      );
      let scale = 1 - (distance * 0.1); // Cambiado de 0.15 a 0.1
      scale = Math.max(scale, 0.7); // Cambiado de 0.5 a 0.7 para que los laterales sean más grandes
      let opacity = 1 - (distance * 0.2);
      opacity = Math.max(opacity, 0.4);
      slide.style.transform = `scale(${scale})`;
      slide.style.opacity = opacity;
      slide.style.zIndex = 10 - distance;
    }
  });
}

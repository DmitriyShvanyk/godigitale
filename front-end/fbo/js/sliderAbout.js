(function () {

  'use strict';  


  function init() {

    // about slider
    new Swiper('.about__slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      direction: 'horizontal',
      preloadImages: false,
      lazy: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    });

  }

  document.addEventListener('DOMContentLoaded', init);



})();
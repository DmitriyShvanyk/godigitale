(function () {

  'use strict';


  // navbar
  let navbarHamburger = document.querySelector('.navbar__hamburger');
  let navbarMenu = document.querySelector('.navbar__menu');
  let navbarClose = document.querySelector('.navbar__close');
  let navbarOverlay = document.querySelector('.navbar__overlay');

  function openMenu() {
    navbarMenu.classList.add('navbar__menu--active')
  }

  function closeMenu() {
    navbarMenu.classList.remove('navbar__menu--active');        
  }

  navbarHamburger.addEventListener('click', openMenu);
  navbarClose.addEventListener('click', closeMenu);
  navbarOverlay.addEventListener('click', closeMenu);



  // accordion
  const accordion = document.querySelector('.accordion');

  if(!accordion){
    return
  }

  function toggleAccordion(e){
    console.log(e.target)
    if(e.target.classList.contains('accordion__head')){
      e.target.classList.toggle('accordion__head--active');
      e.target.nextElementSibling.classList.toggle('accordion__body--active');
    }
  }
  accordion.addEventListener('click', toggleAccordion);

})();
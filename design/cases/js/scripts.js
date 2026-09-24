;(function(){
	
	"use strict";
	
	// load fonts
	function loadFonts(linkHref){
		
		var head = document.querySelector('head'),
		link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = linkHref;
		
		head.appendChild(link);
	}
	loadFonts('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext');
	loadFonts('https://use.fontawesome.com/releases/v5.8.1/css/all.css');
	
	
	// navbar		
	// if($('.navbar').length > 0) {
		
	// 	var scrollTop = window.pageYOffset;
	// 	var navbar = document.querySelector('.navbar');				
	// 	var body = document.querySelector('body');
		
	// 	window.onscroll = function(){		
			
	// 		if(window.pageYOffset > scrollTop){					
	// 			navbar.classList.add('slideUp');
				
	// 			body.classList.remove('styling');
	// 			navbar.classList.remove('styling');
	// 		}				
	// 		else if(window.pageYOffset < scrollTop) {
	// 			body.classList.add('styling');
	// 			navbar.classList.add('styling');
	// 			navbar.classList.remove('slideUp');
	// 		}			
			
	// 		scrollTop = window.pageYOffset;
			
	// 		if (scrollTop === 0) {
	// 			body.classList.remove('styling');
	// 			navbar.classList.remove('styling');
	// 		}	
			
	// 	}	
		
	// }
	
	
	
	
	// carousel color style
	if($('.carousel-color-style').length > 0){
		$('.carousel-color-style').owlCarousel({
			items:1,
			loop: true,
			margin:0,
			responsiveClass:true,
			dots: true,
			nav: true,		
			navText: ['<i class="icon-arrow-prev"></i>', '<i class="icon-arrow-next"></i>'],
			responsive:{
				0:{
					items:1
				},			
				767:{
					items:1
				},
				991:{
					items:1
				},
				1100:{
					items:1
				}
				
			}
		});
	}	
	
	
	// lazy load
	var bLazy = new Blazy({
		// Options
		offset: 100
	});	
	
	
	// before/after
	$(window).load(function(){
	  	if ($(".reclame-banners-slider").length > 0){
			$(".reclame-banners-slider").twentytwenty({
				default_offset_pct: 0.5,
				orientation: 'horizontal'
			});
		}		
	});	
	
	
	if($('.cases-bo-slider-counts').length > 0){
		var controllerProcess = new ScrollMagic.Controller({
			globalSceneOptions: {
				duration: 561
			}
		});
		new ScrollMagic.Scene({
			triggerElement: ".cases-bo-slider-counts"
		})
		.setClassToggle(".cases-bo-slider-counts", "active")
		.addTo(controllerProcess);
		
		
		var controllerProcess2 = new ScrollMagic.Controller({
			globalSceneOptions: {
				duration: 561
			}
		});
		new ScrollMagic.Scene({
			triggerElement: ".js-cases-bo-design"
		})
		.setClassToggle(".js-cases-bo-design", "active")
		.addTo(controllerProcess2);
	}		
	
	
	// parallax
	if($('.parallax').length > 0){
		$('.parallax').paroller();
	}
	
	
	// perfect-scrollbar
	if($('.js-scrollbar').length > 0){
		var scrollbar = document.querySelectorAll('.js-scrollbar');
		for(var j = 0; j < scrollbar.length; j++){
			var ps = new PerfectScrollbar(scrollbar[j]);
		}
	}  
	 
	
})();	
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
	
	
	// get touch
	// function getTouch(){
	
	// 	var touchBtn = document.querySelector('.touch-btn');
	// 	var touchBlock = document.querySelector('.touch-block');
		
	// 	touchBtn.addEventListener('click', function(){		
	// 		this.classList.toggle('touch-btn-close');
	// 		touchBlock.classList.toggle('show');		
	// 	});
	// }
	// getTouch();	
	
	
	// parallax
	if($('.parallax').length > 0){
		$('.parallax').paroller();
	}	
	
	
	// tabs	
	// if($('.g-tabs').length > 0){
	// 	$('.g-tabs-list').on('click', 'li:not(.current)', function() {
	// 		$(this).addClass('current').siblings().removeClass('current')
	// 		.parents('.g-tabs').find('.g-tabs-box').eq($(this).index()).fadeIn(150).siblings('.g-tabs-box').hide();			
	// 	});	
		
	// }
	
	
	// typed text when scroll page
	// function isScrolledIntoView(elem) {
	// 	var docViewTop = $(window).scrollTop();
	// 	var docViewBottom = docViewTop + $(window).height();
	// 	var elemTop = $(elem).offset().top;
	// 	var elemBottom = elemTop + $(elem).height();
	// 	return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	// }		
	
	// $(window).scroll(function() {
		
		// if (isScrolledIntoView($('.g-speak-support'))) {
			
		// 	$(".g-women-robot-text-typed-js").typed({
		// 		strings: ["I think you understand why it’s so important."],
		// 		typeSpeed: 20,  
		// 		startDelay: 200, 
		// 		backSpeed: 80,   
		// 		backDelay: 500, 
		// 		smartBackspace: true,  
				
		// 	});			
		// }
		
		// if (isScrolledIntoView($('.section-launch-new-products'))) {
			
		// 	$(".g-launch-new-products-typed-js").typed({
		// 		strings: ["We can launch new products in the digital space comprehensively — starting from advertising and completing with mailings and integrations."],
		// 		typeSpeed: 20,  
		// 		startDelay: 200, 
		// 		backSpeed: 80,   
		// 		backDelay: 500, 
		// 		smartBackspace: true,  
				
		// 	});			
		// }
		
	// });
	
	
	// background text animation
	if($('.g-design').length > 0){
		var controllerProcess = new ScrollMagic.Controller({
			globalSceneOptions: {
				duration: 561
			}
		});
		new ScrollMagic.Scene({
			triggerElement: ".g-design"
		})
		.setClassToggle(".g-design", "active")
		.addTo(controllerProcess);
		
		
		var controllerProcess2 = new ScrollMagic.Controller({
			globalSceneOptions: {
				duration: 561
			}
		});
		new ScrollMagic.Scene({
			triggerElement: ".section-wework"
		})
		.setClassToggle(".section-wework", "active")
		.addTo(controllerProcess2);
	}		
	
	
	// background text animation
	if($('.marquee').length > 0){
		$('.marquee').marquee({
			duration: 10000,
			startVisible: true,
			duplicated: true
		});
	}	
	
})();
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
	loadFonts('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
	loadFonts('https://use.fontawesome.com/releases/v5.8.1/css/all.css');
	
	
	// rellax
	new Rellax('.rellax');

	
	// tabs	
	document.querySelectorAll('.tabs__list').forEach((list) => {
		list.addEventListener('click', (e) => {
			const tab = e.target.closest('li:not(.current)');
			if (!tab || !list.contains(tab)) return;

			const tabItems = [...tab.parentElement.children];
			tabItems.forEach((li) => li.classList.toggle('current', li === tab));

			const boxes = tab.closest('.tabs')?.querySelectorAll('.tabs__box') ?? [];
			const box = boxes[tabItems.indexOf(tab)];
			if (!box) return;

			[...box.parentElement.children].forEach((el) => {
				if (el !== box && el.matches('.tabs__box')) el.style.display = 'none';
			});

			box.style.display = 'block';
			box.animate([{ opacity: 0 }, { opacity: 1 }], 150);
		});
	});


	// banners
	/*const design = document.querySelector('.design');
  	if (design) new HorizontalScrollPin(design, { strip: '.design__banners' });*/

	new HorizontalScrollPin(document.querySelector('.design'), {
		strip: '.design__banners',
		ratio: 3,     
		smooth: 0.1
	});
	
	
	// typed text when scroll page
	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();
		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}		
	
	$(window).scroll(function() {
		
		if (isScrolledIntoView($('.g-speak-support'))) {
			
			$(".g-women-robot-text-typed-js").typed({
				strings: ["I think you understand why it’s so important."],
				typeSpeed: 20,  
				startDelay: 200, 
				backSpeed: 80,   
				backDelay: 500, 
				smartBackspace: true,  
				
			});			
		}
		
		if (isScrolledIntoView($('.section-launch-new-products'))) {
			
			$(".g-launch-new-products-typed-js").typed({
				strings: ["Digital marketing for startups & products"],
				typeSpeed: 20,  
				startDelay: 200, 
				backSpeed: 80,   
				backDelay: 500, 
				smartBackspace: true,  
				
			});			
		}
		
	});
	
	
	// background text animation
	/*if($('.g-design').length > 0){
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
	}	*/	
	
	
	// marquee
	Marquee.init('.g-marquee', {
      duration: 10000,
      startVisible: true,
      duplicated: true
    });
	
})();
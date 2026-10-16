(function () {
	"use strict";

	// load fonts
	function loadFonts(linkHref) {
		const head = document.querySelector("head");
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = linkHref;
		head.appendChild(link);
	}

	loadFonts("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");
	loadFonts("https://use.fontawesome.com/releases/v5.8.1/css/all.css");


	// rellax
	new Rellax(".rellax");


	// banners
	new HorizontalScrollPin(document.querySelector(".design"), {
		strip: ".design__banners",
		ratio: 3,
		smooth: 0.1,
	});


	// typed text
	const typingTasks = [
		{
			trigger: ".new-products",
			target: ".new-products__typed-js",
			options: {
				strings: ["Digital marketing for startups & products"],
				typeSpeed: 20,
				startDelay: 200,
				backSpeed: 80,
				backDelay: 500,
			},
		},
	];

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const triggerEl = entry.target;
					const task = typingTasks.find((t) => triggerEl.matches(t.trigger));

					if (task) {
						const targetEl = document.querySelector(task.target);

						if (targetEl) {
							new Typed(targetEl, task.options);
							observer.unobserve(triggerEl);
						} else {
							console.warn(
								`Typed.js: Target element "${task.target}" not found in DOM.`,
							);
						}
					}
				}
			});
		},
		{
			root: null,
			threshold: 0.2,
		},
	);

	typingTasks.forEach((task) => {
		const triggerEl = document.querySelector(task.trigger);
		if (triggerEl) {
			observer.observe(triggerEl);
		}
	});


	// marquee
	Marquee.init(".marquee", {
		duration: 10000,
		startVisible: true,
		duplicated: true,
	});
	
})();

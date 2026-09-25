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

	loadFonts("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
	loadFonts("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

	// rellax
	new Rellax(".rellax");

	// tabs
	document.querySelectorAll(".tabs__list").forEach((list) => {
		list.addEventListener("click", (e) => {
			const tab = e.target.closest("li:not(.current)");
			if (!tab || !list.contains(tab)) return;

			const tabItems = [...tab.parentElement.children];
			tabItems.forEach((li) => li.classList.toggle("current", li === tab));

			const boxes = tab.closest(".tabs")?.querySelectorAll(".tabs__box") ?? [];
			const box = boxes[tabItems.indexOf(tab)];
			if (!box) return;

			[...box.parentElement.children].forEach((el) => {
				if (el !== box && el.matches(".tabs__box")) el.style.display = "none";
			});

			box.style.display = "block";
			box.animate([{ opacity: 0 }, { opacity: 1 }], 150);
		});
	});

	// banners
	new HorizontalScrollPin(document.querySelector(".design"), {
		strip: ".design__banners",
		ratio: 3,
		smooth: 0.1,
	});

	// typed text
	const typingTasks = [
		{
			trigger: ".g-speak-support",
			target: ".g-women-robot-text-typed-js",
			options: {
				strings: ["I think you understand why it’s so important."],
				typeSpeed: 20,
				startDelay: 200,
				backSpeed: 80,
				backDelay: 500,
			},
		},
		{
			trigger: ".section-launch-new-products",
			target: ".g-launch-new-products-typed-js",
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
	Marquee.init(".g-marquee", {
		duration: 10000,
		startVisible: true,
		duplicated: true,
	});
	
})();

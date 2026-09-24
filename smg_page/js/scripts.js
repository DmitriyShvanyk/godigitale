; (function () {

	"use strict";




	





	/*
		* -------------------------------------------------------
		*  PARALLAX
		* -------------------------------------------------------
	*/
	if ($('.parallax').length > 0) {
		$('.parallax').paroller();
	}




	

	/*
		* -------------------------------------------------------
		*  COPYRIGHT YEARS
		* -------------------------------------------------------
	*/
	function getCopyrightYears() {
		var dateCopyrightHTML = document.querySelector('.js-copyright-years');
		var date = new Date();
		var dateYears = date.getFullYear();
		dateCopyrightHTML.innerHTML = dateYears;
	}
	getCopyrightYears();



	/*
	* -------------------------------------------------------
	*  WOW - ANIMATION SCROLL PAGE
   * -------------------------------------------------------
   */

	document.addEventListener("DOMContentLoaded", function (event) {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 50,
			mobile: false,
			live: true,
			callback: function (box) {

			},
			scrollContainer: null
		}
		);
		wow.init();
	});



	var scrollbarCustom = document.querySelector('.js-scrollbar');
	var ps = new PerfectScrollbar(scrollbarCustom);


	/*
		* -------------------------------------------------------
		*  LAZY LOAD
		* -------------------------------------------------------
	*/
	var bLazy = new Blazy({
		// Options
		offset: 100
	});


})();

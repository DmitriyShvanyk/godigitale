(function () {

  'use strict';

  // video 
  const videoInner = document.querySelector('.video');

  function playVideo() {
    const videoIframe = document.createElement('iframe');
    videoIframe.classList.add('video__iframe');
    videoIframe.src = 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&loop=1&autopause=0';
    videoIframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    videoInner.appendChild(videoIframe);
  }

  videoInner.addEventListener('click', playVideo);


})();
/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';
  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here

  $(document).ready(function(){
    var lightboxInitialized = false;

    function closeLightbox(e) {
      $("body").removeClass("modal-open");
      $('.gallery-modal-carousel').slick('unslick');
      $(document).off('keydown', lightboxKeyActions);
    }

    function lightboxKeyActions(e) {
      console.log("hit");
        if (e.keyCode == 27) {
          closeLightbox();
        }
        if(e.keyCode == 37) {
          $('.gallery-modal-carousel').slick('slickPrev');
        }
        if(e.keyCode == 39) {
          $('.gallery-modal-carousel').slick('slickNext');
        }
    }

    $(".gallery-trigger").on("click", function(e){
      var selectedSlide = $(this).data("slide") - 1;

      e.preventDefault();

      $("body").addClass("modal-open");

      $('.gallery-modal-carousel').slick({
        dots: true     
      });

      $(document).on('keydown', lightboxKeyActions);

      $('.gallery-modal-carousel').slick("slickGoTo", selectedSlide);
    });

    $('.gallery-modal-carousel').on('init', function(){
      lightboxInitialized = true;
    });

    $(".gallery-modal-carousel").on("click", function(e){
      e.stopPropagation();
    });

    $(".gallery-modal-dialog").on("click", closeLightbox);

    $(".potionomics-logo").on("click", function(e){
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $(".menu-cta").on("click", function(){
      $(".menu-hamburger").toggleClass("open");
      $(".mobile-menu").toggleClass("active");
      $("body").toggleClass("menu-open");
    });

    $('.gallery-carousel-container').slick({
      dots: true,
      arrows: false
    });

    $('.section-hero').delay(200).animate({
        opacity: 1
      }, 800
    );

    $(document).on("scroll", function(){
      var heroHeight = $(".section-hero").outerHeight(),
          topDistance = $(window).scrollTop();

      if($(window).width() >= 1200){
        $(".hero-layer").each(function(index, layer){
          var depth = $(layer).data("depth"),
              movement = -(topDistance * depth),
              translate3d = 'translate3d(0, ' + movement + 'px, 0)';

          $(layer).css("transform", translate3d);
        });
      }

      if (topDistance > heroHeight) {
        if(!$(".site-header").hasClass("active")){
          $(".site-header").addClass("active");
        }
      } else {
        if($(".site-header").hasClass("active")){
          $(".site-header").removeClass("active");
        }
      }
    });
  });
})();

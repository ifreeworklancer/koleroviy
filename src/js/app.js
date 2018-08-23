import jquery from 'jquery';

import Flickity from 'flickity';
import 'flickity-as-nav-for';
import 'flickity/dist/flickity.css';
import 'fullpage.js/dist/jquery.fullpage.css'
import { Transform } from 'stream';

try {
  window.$ = window.jQuery = jquery
  require('fullpage.js')
} catch (e) {
  console.error(e)
}

(function () {

  /**
   * Header animate
   */
  $("#header-banner-section .header-banner-description").addClass('animated zoomIn');



  /**
   * Burger-menu
   */
  $('.menu-button').on('click', function () {
    var menu = $('.menu-content');
    $(this).toggleClass('active');
    $('.logo').toggleClass('active');
    if (menu.is(':visible')) {
      menu.slideUp();
    } else {
      menu.slideDown();
    }
  });

  /**
   * Menu link
   */
  $('.menu-nav-list__item-link').on('click', function () {
    $('.menu-content').slideUp(100);
  })

  /**
   * Fullpage slider
   */
  const items = ['header-banner', 'about', 'briefcases', 'team', 'services', 'reviews', 'footer'];

  const pageParams = {
    menu: '#app-header',
    anchors: items,
    sectionSelector: 'section',
    onLeave: function (origin) {

      if (origin === 1) {
        $("#about-section .section-title-container").addClass('animated slideInRight');
        $("#about-section .section-description").addClass('animated slideInLeft');
      }
      if (origin === 2) {
        $("#briefcases-section .briefcases-container").addClass('animated slideInRight');
        $("#briefcases-section .briefcases-dotted-circle-list").addClass('animated slideInRight');
        $("#briefcases-section .briefcases-dotted-img-list").addClass('animated slideInRight');
      }
      if (origin === 3) {
        $("#team-section .section-descriprion").addClass('animated slideInLeft');
        $("#team-section .team-list").addClass('animated zoomIn');
      }
      if (origin === 4) {
        $("#services-section .section-title-container").addClass('animated bounceInDown');
        $("#services-section .services-card").addClass('animated zoomIn');
        $("#services-section .services-description").addClass('animated slideInLeft');
      }
      if (origin === 5) {
        $("#reviews-section .reviews-slider").addClass('animated zoomIn');
      }
    }
  }

  if ($('#fullpage')) {
    $('#fullpage').fullpage(pageParams);
  }

  $("#briefcases-page-first .section-title-container").addClass('animated bounceInDown');
  $("#briefcases-page-first .briefcases-page-item").addClass('animated slideInRight');
  $("#briefcases-page-first .briefcases-page-decoration-line").addClass('animated slideInLeft');

  const itemsBriefcases = ['briefcases-first', 'briefcases-second', 'briefcases-third', 'footer'];

  const pageParamsBriefcases = {
    menu: '#app-header',
    anchors: itemsBriefcases,
    sectionSelector: 'section',
    onLeave: function (origin) {
      if (origin === 1) {
        $("#briefcases-page-second .briefcases-page-item").addClass('animated slideInRight');
        $("#briefcases-page-second .briefcases-page-decoration-line").addClass('animated slideInLeft');
      }
      if (origin === 2) {
        $("#briefcases-page-third .briefcases-page-item").addClass('animated slideInRight');
        $("#briefcases-page-third .briefcases-page-decoration-line").addClass('animated slideInLeft');
      }
    }
  }

  if ($('#fullpage-briefcases')) {
    $('#fullpage-briefcases').fullpage(pageParamsBriefcases);
  }

  /**
   * Team list img
   */

  var teamImgItem = $(".team-list-img__item")
  if ($(window).width() > 768) {
    for (var i = 0; i < teamImgItem.length; i++) {
      var offsetAngle = 360 / teamImgItem.length;
      var rotateAngle = offsetAngle * i;
      $(teamImgItem[i]).css("transform", "rotate(" + rotateAngle + "deg) translate(-220px, 0) rotate(-" + rotateAngle + "deg)");
    };
  }
  /**
   * Team list tabs
   */
  $('ul.team-list-img').on('click', 'li:not(.active)', function () {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.team-list', '').find('div.team-list-description-item').removeClass('active').eq($(this).index()).addClass('active')
      .closest('section#team-section').find('div.team-item-descriprion').removeClass('active').eq($(this).index()).addClass('active');
  });


  /**
   * Form
   */
  $('.form-control').on('focus', function () {
    $(this).parent().addClass('in-focus');
  });

  $('.form-control').on('blur', function () {
    if ($(this).val() !== "") {
      $(this).parent().addClass('in-focus');
    } else {
      $(this).parent().removeClass('in-focus');
    }
  });

  /**
   * Modal
   */
  $('.connect').on('click', function (e) {
    e.preventDefault();

    var modal = $('.feedback-modal');

    $(modal).fadeIn();

    $('.close-modal').on('click', function (event) {
      event.preventDefault();
      $(modal).fadeOut();
    });

    $('.menu-nav-list__item-link').on('click', function () {
      $(modal).slideUp(100);
    })

  });

  $('.services-card-modal').fadeOut();



  $('.services-card-item__more-info').on('click', function (e) {
    e.preventDefault();
    var i = 0;
    var modal = $('.services-card-modal');
    var indexOpen = $(this).data('indexOpen');

    $(modal[indexOpen]).fadeIn();

    $('.services-card-item__close').on('click', function (event) {
      event.preventDefault();
      var indexClose = $(this).data('indexClose');
      $(modal[indexClose]).fadeOut();
    });

    $('.services-card-item__next').on('click', function (event) {
      event.preventDefault();
      var indexNext = $(this).data('indexNext');
      i = i + 1;
      $(modal[indexNext]).fadeOut();
      $(modal[indexNext + 1]).fadeIn();
    });

  });


})(jQuery)




/**
 * Sliders briefcases
 */

var elem1 = document.querySelector('.briefcases-slider');
var dottedImg = document.querySelector('.briefcases-dotted-img-list')
if (elem1) {

  const flkty1 = new Flickity(elem1, {
    prevNextButtons: false,
    cellAlign: 'left',
    contain: true,
    draggable: false,
    pageDots: false,
    wrapAround: true
  });

  const navFor = new Flickity(dottedImg, {
    asNavFor: elem1,
    cellAlign: 'left',
    contain: false,
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true
  });

  var cellElements = flkty1.getCellElements().length;
  var dottedCircle = $('.briefcases-dotted-circle-list');

  for (var i = 0; i < cellElements; i++) {
    dottedCircle.append(`<div class='briefcases-dotted-circle-list__item'>${i + 1}</div>`);
  };

  var listItems = $(".briefcases-dotted-circle-list__item")

  for (var i = 0; i < listItems.length; i++) {
    var offsetAngle = 120 / listItems.length;
    var rotateAngle = offsetAngle * i;
    $(listItems[i]).css("transform", "rotate(" + rotateAngle + "deg) translate(-175px, 0) rotate(-" + rotateAngle + "deg)");
  };

  $('.briefcases-dotted-circle-list__item').removeClass('active');
  $('.briefcases-dotted-circle-list__item').eq(0).addClass('active');

  $('.briefcases-dotted-circle-list__item').on('click', function () {
    var index = $(this).index();
    $('.briefcases-dotted-circle-list__item').removeClass('active');
    $(this).addClass('active');
    flkty1.select((index - 2));
  })

  $('.briefcases-dotted-circle-list__item').eq(0).addClass('active');

  var prevArrowComments = document.querySelector('#briefcases-prev-arrow');
  prevArrowComments.addEventListener('click', function (e) {
    var itemCircleDots = $('.briefcases-dotted-circle-list__item');
    var indexSlider = flkty1.selectedIndex;

    $(itemCircleDots).removeClass('active');
    $(itemCircleDots[indexSlider - 1]).addClass('active');

    console.log(indexSlider);
    console.log(itemCircleDots[indexSlider - 1]);

    if (itemCircleDots[indexSlider - 1] === undefined) {
      $(itemCircleDots[itemCircleDots.length - 1]).addClass('active');
    }

    flkty1.previous(false, false);
  });

  var nextArrowComments = document.querySelector('#briefcases-next-arrow');
  nextArrowComments.addEventListener('click', function () {

    var itemCircleDots = $('.briefcases-dotted-circle-list__item');
    var indexSlider = flkty1.selectedIndex;

    $(itemCircleDots).removeClass('active');
    $(itemCircleDots[indexSlider + 1]).addClass('active');

    if (itemCircleDots.length == indexSlider + 1) {
      $(itemCircleDots[0]).addClass('active');

    }
    flkty1.next(false, false);
  });

  $('.briefcases-dotted-img-list__item').on('click', function () {

    var itemCircleDots = $('.briefcases-dotted-circle-list__item');
    var indexSlider = navFor.selectedIndex;

    $('.briefcases-dotted-circle-list__item').removeClass('active');
    $(itemCircleDots).removeClass('active');
    $(itemCircleDots[indexSlider]).addClass('active');

  })
}




/**
 * Sliders reviews
 */

var elem2 = document.querySelector('.reviews-slider');

if (elem2) {

  const flkty2 = new Flickity(elem2, {
    prevNextButtons: false,
    cellAlign: 'left',
    contain: true,
    draggable: false,
    pageDots: true
  });



  var prevArrowReviews = document.querySelector('#reviews-prev-arrow');
  var indexSliderReviews = document.getElementById('reviews-slider-index-now');
  indexSliderReviews.innerText = flkty2.selectedIndex + 1;

  prevArrowReviews.addEventListener('click', function (e) {
    flkty2.previous(true, false);
    indexSliderReviews.innerText = flkty2.selectedIndex + 1;
  });

  var nextArrowReviews = document.querySelector('#reviews-next-arrow');

  nextArrowReviews.addEventListener('click', function () {
    flkty2.next(true, false);
    indexSliderReviews.innerText = flkty2.selectedIndex + 1;
  });


  var cellElementsReviews = flkty2.getCellElements().length;
  var lastSliderReviews = document.getElementById('reviews-slider-index-last');

  lastSliderReviews.innerText = cellElementsReviews;
}


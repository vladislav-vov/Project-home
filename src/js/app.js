import './libs/dynamicAdapt.js';

import '../scss/style.scss';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

const currentSlideEkem = document.querySelector('.promo__slider-current');
const totalSlidesElem = document.querySelector('.promo__slider-total');

const swiper = new Swiper('.swiper', {
  modules: [Navigation],
  loop: true,
  spaceBetween: 30,
  navigation: {
    nextEl: '.promo__slider-next',
    prevEl: '.promo__slider-prev',
  },
  on: {
    init: async function (swiper) {
      totalSlidesElem.textContent =
        swiper.slides.length < 9
          ? `0${swiper.slides.length}`
          : swiper.slides.length;
    },
    slideChange: function (swiper) {
      const index =
        swiper.realIndex < 9
          ? `0${swiper.realIndex + 1}`
          : swiper.realIndex + 1;

      currentSlideEkem.textContent = index;
    },
  },
});

import './libs/dynamicAdapt.js';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import '../scss/style.scss';

const currentSlideEkem = document.querySelector('.promo__slider-current');
const totalSlidesElem = document.querySelector('.promo__slider-total');

new Swiper('.swiper', {
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

const parent = document.querySelector('.projects__list');
const childs = parent.querySelectorAll('.projects__item');

function resizeHeadings() {
  childs.forEach((child) => {
    const heading = child.querySelector('.projects__item-title');
    const parentWidth = child.offsetWidth;
    const headingSize = Math.min(parentWidth * 0.12, 64);
    heading.style.fontSize = headingSize + 'px';
  });
}

resizeHeadings();

window.addEventListener('load', resizeHeadings);
window.addEventListener('resize', resizeHeadings);

const bodyLockToggle = () => {
  if (!document.documentElement.classList.contains('lock')) {
    document.documentElement.classList.add('lock');
  } else {
    document.documentElement.classList.remove('lock');
  }
};

if (document.querySelector('.menu__btn')) {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.menu__btn')) {
      bodyLockToggle();
      document.documentElement.classList.toggle('menu-open');
    }
  });
}

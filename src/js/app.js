import './libs/dynamicAdapt.js';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { v4 as uuidv4 } from 'uuid';

import throttle from './helpers/throttle.js';

import 'swiper/css';

import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {
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

  window.addEventListener('resize', throttle(resizeHeadings, 200));

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

  const _baseUrl = 'http://localhost:3001';

  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(form);
        const formAction = form.getAttribute('action')
          ? form.getAttribute('action').trim()
          : '';

        if (!formAction.replace('/', '').length)
          throw new Error('Action is empty!');

        const formDataObject = Object.fromEntries(formData.entries());

        formDataObject.id = uuidv4();

        const response = await fetch(`${_baseUrl}${formAction}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObject),
        });

        if (!response.ok) {
          const res = await response.json();
          throw new Error(
            `Failed to fetch data. Status: ${response.status}. Response: ${res.message}`,
          );
        } else {
          form.querySelectorAll('input').forEach((input) => {
            input.value = '';
            if (input.checked) {
              input.checked = false;
            }
          });
        }
      } catch (e) {
        console.error(`Error in form submission: ${e.message}`);
      }
    });
  });
});

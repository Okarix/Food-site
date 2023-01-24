import tabs from './modules/tabs';
import modal from './modules/modal';
import slider from './modules/slider';
import cards from './modules/cards';
import calc from './modules/calc';
import timer from './modules/timer';
import forms from './modules/forms';
import { openModal } from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {
        openModal('.modal', modalTimerId);
    }, 50000); // устанавливаем таймоут для окна

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentCounter: '#current',
        totalCounter: '#total'
    });
    cards();
    calc();
    timer('.timer', '2023-01-30');
    forms('form', modalTimerId);
});
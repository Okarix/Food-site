/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span'); // получаем результат(та часть где выводятся калории)

    let sex, ratio, height, age, weight;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');



    function calcTotal() { // считающая функция 
        if (!sex || !height || !age || !weight || !ratio) { // проверка если ничего не задано
            result.textContent = '____'; // выводится это
            return; // эта часть останавливается
        }

        if (sex === 'female') { // для женщин
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else { // для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal(); // вызываем

    function getStaticInformation(selector, activeClass) { // функция по получению статической информации(пол и активность)
        const elements = document.querySelectorAll(selector); // получаем родительский див(делегирование событий)

        elements.forEach(elem => { // перебираем наши элементы
            elem.addEventListener('click', (e) => { // навешиваем обработчик на каждый элемент 
                if (e.target.getAttribute('data-ratio')) { // если элемент на которой кликнули равен дата атрибуту активности
                    ratio = +e.target.getAttribute('data-ratio'); // то записываем значение этого атрибута в соответствующую переменную
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else { // если нет(значит мы кликаем на выбор пола)
                    sex = e.target.getAttribute('id'); // присваиваем значение из айди 
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => { // перебираем все элементы и убираем класс активности
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass); // добавляем класс активности на кликнутый элемент

                calcTotal(); // вызываем функцию чтобы фиксировала изменения 
            });
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) { // получение инфы с динамических элементов(рост вес возраст)
        const input = document.querySelector(selector); // получаем инпут 

        input.addEventListener('input', () => { // вешаем обработчик с инпутом

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) { // получаем айди инпута
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal(); // вызываем функцию чтобы фиксировала изменения 
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard { // создаем наш класс
        constructor(src, alt, title, text, price, parentSelector, ...classes) { // конструируем его(добавляем аргументы смотря на верстку карточек на страницу, так же добавляем родителя куда будет пушиться наша карточка)
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes; // наши классы через rest будут передаваться в виде массива
            this.parent = document.querySelector(parentSelector); // получаем нашего родителя(он будет в DOM структуре  у него будет будет доступен метод append, наши классы передадим в моменте создания экземпляра объекта)
            this.transfer = 27; // наш "курс валюты"
            this.changeToUAH(); // вызываем метод который конвертирует нашу валюту в гривны
        }

        changeToUAH() {
            this.price = this.price * this.transfer; // метод по конвертированию валюты
        }

        render() { // метод который рендерит нашу верстку 
            const element = document.createElement('div'); // создаем нашу карточку

            if (this.classes.length === 0) { // проверка на пустоту массиву(то есть если ничего не будет передано, то элемент примет значение по умолчанию)
                this.classes = 'menu__item'; // наш класс по умолчанию который будет принимать наш элемент
                element.classList.add(this.classes); // добавляем этот класс нашему элементу
            } else { // если будут переданы классы
                this.classes.forEach(className => element.classList.add(className)); // проходимся по каждому классу и добавляем его к нашему элементу
            }

            element.innerHTML = ` 
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `; // создаем верстку и туда вкладываем наши свойства
            this.parent.append(element); // добавляем наш элемент в конец родителя
        }
    }


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => { // деструктуризация объекта
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({ img, altimg, title, descr, price }) => { // деструктуризация объекта
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector); // получаем все формы по тегу form

    const message = {
        loading: 'img/form/spinner.svg', // путь к нашей картинке загрузки
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }; // объект который содержит список фраз для разных статусов загрузки запроса 

    forms.forEach(item => {
        bindPostData(item);
    }); // перебираем наши формы и подвязываем к каждой из них функцию 

    function bindPostData(form) { // функция которая отвечает за привязку отправки данных
        form.addEventListener('submit', (e) => { // улавливаем наш обработчик submit(это событие отправки, когда мы нажимаем на кнопку отправить)
            e.preventDefault(); // это команда идет первой в AJAX запросах, чтобы не было перезагрузки страницы

            const statusMessage = document.createElement('img'); // создаем div с ответом(где будет выводится сообщение о статусе)
            statusMessage.src = message.loading; // в путь нашего тега img подставляем путь из объекта
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; // задаем inline стиль прямо здесь
            form.insertAdjacentElement('afterend', statusMessage); // добавляем наш элемент после конца формы

            const formData = new FormData(form); // создаем специальный объект formData который позволяет с определенной формы данные записать в видео объекта 

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // элегантный способ преобразить объект formData в json

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);  // в аргументе сообщение из нашего объекта 
                    statusMessage.remove(); // удаляем сообщение о статусе
                }).catch(() => {
                    showThanksModal(message.failure); // в аргументе сообщение из нашего объекта 
                }).finally(() => {
                    form.reset(); // сбрасываем нашу форму
                });
        });
    }

    function showThanksModal(message) { // функцию по созданию блока с сообщением после отправки данных
        const prevModalDialog = document.querySelector('.modal__dialog'); // получаем наш modal dialog класс с размерами формы

        prevModalDialog.classList.add('hide'); // скрываем нашу форму заполнения данных
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); // открываем модальное окно

        const thanksModal = document.createElement('div'); // создаем окно с сообщением статусом
        thanksModal.classList.add('modal__dialog'); // добавляем класс modal dialog
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `; // собираем верстку 

        document.querySelector('.modal').append(thanksModal); // добавляем на страницу 
        setTimeout(() => { // ставим таймаут с определенными действиями
            thanksModal.remove(); // удаляем наше окно
            prevModalDialog.classList.add('show'); // показываем предыдущее окно
            prevModalDialog.classList.remove('hide'); // удаляем класс скрытия
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); // закрываем окно
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector); // получаем само модальное окно
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // отмена прокрутки при открытии модального окна

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); // если пользователь сам открыл окно то таймер останавливается 
    }
}

function closeModal(modalSelector) { // так как этот скрипт будет повторяться несколько раз выносим его в отдельную функцию 
    const modal = document.querySelector(modalSelector); // получаем само модальное окно
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // если в оверфлоу будет пустая строка то оно примет начальное значение, т.е. можно будет снова прокручивать  страницу
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalOpen = document.querySelectorAll(triggerSelector), // получаем триггер открытия окна(кнопка) по дата атрибуту
        modal = document.querySelector(modalSelector); // получаем само модальное окно

    modalOpen.forEach(btn => { // навешиваем обработчик на несколько кнопок для открытия 
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => { // функция закрытия окна при нажатии на подложку 
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // если наш объект клика равен modal то окно закроется 
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // функция закрытия окна при помощи ESCAPE
        if (e.code === 'Escape' && modal.classList.contains('show')) { // при помощи e.code можно получить тип события нажатия
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    } // функция открытия окна при пролистывании страницы к концу

    window.addEventListener('scroll', showModalByScroll); // навешиваем на окно скролл и функцию
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ slide, nextArrow, prevArrow, totalCounter, currentCounter, field }) {
    const slides = document.querySelectorAll(slide), // количество слайдов которые есть на странице
        prev = document.querySelector(prevArrow), // кнопка назад
        next = document.querySelector(nextArrow), // кнопка вперед
        current = document.querySelector(currentCounter), // получаем указатель нашего слайда на странице
        total = document.querySelector(totalCounter); // получаем указатель общего количества слайдов на странице

    let slideIndex = 1; // наш индекс для слайдов(он равен одному а не 0 так как будет выводится для показа на страницу)

    showSlides(slideIndex); // вызываем функцию показа слайдов и передаем туда индекс

    if (slides.length < 10) { // если всего слайдов меньше десяти по списку то, к индексу спереди добавляется ноль к общему количеству
        total.textContent = `0${slides.length}`;
    } else { // если же больше, то без нуля
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) { // если слайдер выйдет за границы(например 4 слайда) мы будем листать дальше, то он вернется к 1 слайду
            slideIndex = 1;
        }

        if (n < 1) { // если слайдер выйдет за границы единицы, то значение равно последнему слайду
            slideIndex = slides.length;
        }

        slides.forEach(item => { // скрываем все слайды
            item.classList.add('hide');
            item.classList.remove('show');
        });

        slides[slideIndex - 1].classList.add('show');  // показываем наш нужный слайд(-1 так как счет с 0 в прог)
        slides[slideIndex - 1].classList.remove('hide');


        if (slides.length < 10) { // если наш слайд меньше десяти по списку то, к индексу спереди добавляется ноль
            current.textContent = `0${slideIndex}`;
        } else { // обратная 
            current.textContent = slideIndex;
        }

    }

    function plusSLides(n) { // функция по перелистыванию слайдера
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => { // назад
        plusSLides(-1);
    });

    next.addEventListener('click', () => { // вперед
        plusSLides(1);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector), // получаем нашы табы(кнопочки на которые кликаем)
        tabsContent = document.querySelectorAll(tabsContentSelector), // получаем контент табов(картинки и надписи)
        tabsParent = document.querySelector(tabsParentSelector); // получаем оболочку всех табов(родителя) 

    function hideTabContent() { // функция скрывающая ненужные табы
        tabsContent.forEach(item => { // перебираем все табы в псевдомассиве 
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => { // перебираем все кнопки табы
            item.classList.remove(activeClass); // удаляем с этих кнопок класс активности(эффект наведения на кнопку)
        });
    }

    function showTabContent(i = 0) { // функция показывающая нужный контент
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass); // добавляем класс активности на первую кнопку таба
    }

    hideTabContent();// вызываем функцию скрытия 
    showTabContent(); // вызываем функцию показа

    tabsParent.addEventListener('click', (event) => { // используем делегирование событий(на родителя табов навешиваем обработчик событий)
        const target = event.target; // наш элемент на котором производится событие записываем в переменную

        if (target && target.classList.contains(tabsSelector.slice(1))) { // определяем то что мы точно кликнули в таб
            tabs.forEach((item, i) => { // перебираем все табы(записываем аргументы(наш элемент и его индекс))
                if (target === item) { // если наш элемент на котором происходит событие равен нашему элементу в псевдомассиве(т.е. нашей нажимаемой кнопке(табу))
                    hideTabContent();// вызываем функцию скрытия 
                    showTabContent(i); // вызываем функцию показа в аргументах с индексом того элемента на котором происходит событие
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

    function getTimeDifference(endtime) { // функция которая определяет разницу между дедлайном и нашим текущим временем 
        const t = Date.parse(endtime) - Date.parse(new Date()), // получаем разницу в миллисекундах(дедлайн минус наше время)
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // получаем дни(нужно разделить количество миллисекунд с разницы на миллисекунды в одном дне)
            hours = Math.floor(t / (1000 * 60 * 60) % 24), // получаем часы(нужно разделить количество миллисекунд с разницы на миллисекунды в одном часе)
            minutes = Math.floor((t / 1000 / 60) % 60), // минуты
            seconds = Math.floor((t / 1000) % 60); // секунды

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }; // возвращаем объект со всеми значениями 
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { // функция которая устанавливает наши часы на страницу
        const timer = document.querySelector(selector);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000); // запускает наш таймер каждую секунду

        updateClock();

        function updateClock() { // обновляет наш таймер каждую секунду
            const t = getTimeDifference(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => { // функция которая отправляет данные
    // Так как fetch работает асинхронно, мы не знаем через сколько вернутся данные
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json(); // обрабатываем из формата json
};

const getResource = async (url) => { // функция получения данных с сервера
    const res = await fetch(url); // запрос на сервер

    if (!res.ok) { // если будет ошибка в http запросе, то выведет в консоль
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");










document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId);
    }, 50000); // устанавливаем таймоут для окна

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentCounter: '#current',
        totalCounter: '#total'
    });
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])('.timer', '2023-01-30');
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
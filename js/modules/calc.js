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

export default calc;
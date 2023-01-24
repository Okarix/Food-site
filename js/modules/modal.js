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

export default modal;
export { closeModal };
export { openModal };

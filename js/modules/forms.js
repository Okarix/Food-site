import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId); // открываем модальное окно

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
            closeModal('.modal'); // закрываем окно
        }, 4000);
    }
}

export default forms;
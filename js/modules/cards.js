import { getResource } from "../services/services";

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


    getResource('http://localhost:3000/menu')
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

export default cards;
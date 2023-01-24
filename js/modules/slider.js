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

export default slider;
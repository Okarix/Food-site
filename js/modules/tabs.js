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

export default tabs;
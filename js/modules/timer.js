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

export default timer;
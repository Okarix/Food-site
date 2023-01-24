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

export { postData };
export { getResource };
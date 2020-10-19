"use strict";

//http://localhost:5000/page.html

let data_games = [];

function fill_data()
{
    data_games.push({"name": "Portal 2", "decsr": "Вторая часть Portal - идеальная игра для любителей ностальгии. Та же самая главгероиня, но не обошлось и без новинок - загадки будут более сложными и хитроумными, а часть сюжета пройдет за пределами научного комплекса.", "age_limit": 10});
    data_games.push({"name": "Minecraft", "decsr": "Исследуйте случайным образом генерируемые миры и стройте самые разные сооружения.", "age_limit": 10});
    data_games.push({"name": "Gris", "decsr": "Грис — наивная девочка, запершаяся в собственном мире из-за боли, окутавшей ее в реальности. Ее скорбь находит воплощение в ее платье, которое дает разные способности, позволяющие лучше ориентироваться в своем мире. По ходу сюжета Грис эмоционально крепнет и начинает видеть свой мир немного иначе, открывая все новые и новые пути.", "age_limit": 0});
    data_games.push({"name": "Deponia", "decsr": "Главгерой по имени Руфус живет на планете, превращенной в гигантскую мусорную свалку. Он целыми днями перебирает мусор и мечтает о лучшей жизни. И однажды судьба дает ему шанс - надо лишь вернуть домой красавицу Гоул, которая рухнула с неба на соседнюю кучу мусора...", "age_limit": 13});
    data_games.push({"name": "National Geographic Challenge!", "decsr": "Паззл от National Geographic - разгадывайте (можно вместе с друзьями!) легкие задачки на знание окружающего нас мира.", "age_limit": 0});
}

function get_games(age)
{
    let res = [];

    for (let i = 0; i < data_games.length; i++)
        if (data_games[i].age_limit < age)
            res.push(data_games[i]);

    return res;
}

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// активируем шаблонизатор
app.set("view engine", "hbs");

fill_data();

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/find_games", function(request, response) {
    const age = request.query.age;

    const infoObject = {
        age : age,
        games : get_games(age)
    }

    response.render("pageGames.hbs", infoObject);
});
"use strict";

//http://localhost:5000/page.html

let data_users = [];

function fill_data()
{
    data_users.push({"login": "_qwe_", "password": "1234", "hobby": "Собираю марки","age": 15});
    data_users.push({"login": "elena75", "password": "123qwe", "hobby": "Книги", "age": 40});
    data_users.push({"login": "oleg0205", "password": "password", "hobby": "Дайвинг", "age": 37});
    data_users.push({"login": "gorik", "password": "5", "hobby": "Охота и рыбалка", "age": 48});
    data_users.push({"login": "my_login_2", "password": "1a2b3c", "hobby": "Оперное пение", "age": 10});
}

function is_exist(login)
{
    for (let i = 0; i < data_users.length; i++)
        if (data_users[i].login === login)
            return data_users[i];

    return null;
}

// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

app.use(cookieSession({
    login: '',
    password: '',
    keys: ['hhh', 'qqq', 'vvv']
}));

fill_data();

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/save", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;

    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");

    let res = is_exist(login);

    if (res === null)
        return response.end("Such login NOT FOUND");

    if (res.password != password)
        return response.end("Wrong password");

    // выставляем cookie
    request.session.login = login;
    request.session.password = password;

    response.end();
});

app.get("/show_profile", function(request, response) {
    if(!request.session.login) return response.end(" Login is not exists");
    if(!request.session.password) return response.end("Password is not exists");
    
    const login = request.session.login;
    const password = request.session.password;

    let res = is_exist(login);

    if (res === null)
        return response.end("Such login NOT FOUND");

    if (res.password != password)
        return response.end("Wrong password");

    const infoObject = {
        login : res.login,
        age : res.age,
        hobby : res.hobby
    }

    response.render("User.hbs", infoObject);
});
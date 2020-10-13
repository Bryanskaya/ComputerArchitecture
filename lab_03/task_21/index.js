"use strict";

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// выдача страницы с информацией о кафедре
app.get("/page/department", function(request, response) {
    const infoObject = {
        facultyValue: "Информатика и системы управления",
        departmentValue: "Компьютерные системы и сети",
        indexValue: 6
    };
    response.render("pageDepartment.hbs", infoObject);
});

// выдача страницы с массивом учеников
app.get("/page/pupils", function(request, response) {
    const infoObject = {
        descriptionValue: "Список учеников",
        pupilsArray: [
            {a: "Петров", b: "Пётр"},
            {a: "Иванов", b: "Иван"},
            {a: "Дмитриев", b: "Дмитрий"},
            {a: "Александров", b: "Александр"}
        ]
    };
    response.render("pagePupils.hbs", infoObject);
});
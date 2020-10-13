"use strict";

//http://localhost:5000/page.html

const file = "file.txt";


function get_data(filename)
{
    let data = [];
    
    data.push(fs.readFileSync(filename, "utf-8"));

    if (data != '')     
        data = JSON.parse(data);

    return data;
}

function find_person(email)
{
    let res = null;
    let data = get_data(file);

    for (let i = 0; i < data.length; i++)
        if (data[i].email == email)
        {
            res = data[i];
            break;
        }

    return res;
}

// импортируем библиотеку
const express = require("express");

// запускаем сервер
const app = express();
const fs = require("fs");
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/find", function(request, response) {
    const email = request.query.email;
    let res = find_person(email);
    
    response.end(JSON.stringify(res));
});
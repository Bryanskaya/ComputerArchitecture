"use strict";

let file = "stores.txt";

// импорт библиотек
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5003;
app.listen(port);
console.log(`Server on port ${port}`);

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

function add_record(name, cars) {
    let data = [];
    
    data.push(fs.readFileSync(file, "utf-8"));

    if (data != '')
    {            
        let temp = JSON.parse(data);

        for (let i = 0; i < temp.length; i++)
            if (temp[i].name == name)
                return "ERROR: store is already exist";

        temp.push({"name": name, "cars": cars});
        data = temp;
    }
    else
        data[0] = {"name": name, "cars": cars};

    fs.writeFileSync(file, JSON.stringify(data))

    return "Information was added";
}

function show_record(name)
{
    let data = [];
    
    data.push(fs.readFileSync(file, "utf-8"));

    if (data != '')
    {            
        let temp = JSON.parse(data);

        for (let i = 0; i < temp.length; i++)
            if (temp[i].name == name)
                return temp[i];
    }

    return {"name": null, "price": null};
}

// приём запроса
app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj["name"];
        const cars = obj["cars"];

        let msg = add_record(name, cars);

        response.end(JSON.stringify(msg));
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj["name"];

        let store_info = show_record(name);

        response.end(JSON.stringify(store_info));
    });
});
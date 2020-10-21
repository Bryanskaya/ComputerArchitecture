"use strict";

const express = require("express");
const request = require("request");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);



// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

app.set("view engine", "hbs");

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";

    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

app.get("/insert/car", function(request, response) {
    const name = request.query.name;
    const price = request.query.price;

    sendPost("http://localhost:5002/insert/record", JSON.stringify({
        name: name,
        price: price
    }), function(answerString) {
        response.end(answerString);
    });
})

app.get("/select/car", function(request, response) {
    const name = request.query.name;

    sendPost("http://localhost:5002/select/record", JSON.stringify({
        name: name,
    }), function(answerString) {
        response.end(answerString);
    });
})

app.get("/insert/store", function(request, response) {
    const name = request.query.name;
    const cars = request.query.cars.split(" ");

    sendPost("http://localhost:5003/insert/record", JSON.stringify({
        name: name,
        cars: cars
    }), function(answerString) {
        response.end(answerString);
    });
})

app.get("/select/store", function(request, response) {
    const name = request.query.name;
    
    sendPost("http://localhost:5003/select/record", JSON.stringify({
        name: name,
    }), function(answerString) {
        response.end(answerString);
    });
})



app.get("/insert/record/car", function(request, response) {
    response.render("page_add_car.hbs", null);
})

app.get("/select/record/car", function(request, response) {
    response.render("page_show_car.hbs", null);
})

app.get("/insert/record/store", function(request, response) {
    response.render("page_add_store.hbs", null);
})

app.get("/select/record/store", function(request, response) {
    response.render("page_show_store.hbs", null);
})
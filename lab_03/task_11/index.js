//http://localhost:5000/page.html

"use strict";

const express = require("express");
const fs = require("fs");
const file = "file.txt";

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}


function is_exist(surname, phone, email)
{
    let data = [];
    
    data.push(fs.readFileSync(file, "utf-8"));

    if (data != '')
    {            
        let temp = JSON.parse(data);

        for (let i = 0; i < temp.length; i++)
            if (temp[i].phone == phone || temp[i].email == email)
                return "ERROR: not unique";

        temp.push({"Surname": surname, "phone": phone, "email": email});
        data = temp;
    }
    else
        data[0] = {"Surname": surname, "phone": phone, "email": email};

    fs.writeFileSync(file, JSON.stringify(data))

    return "Information was added";
}

// it is post
app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const surname = obj["surname"];
        const phone = obj["phone"];
        const email = obj["email"];
        let msg = is_exist(surname, phone, email);
        response.end(JSON.stringify({
            result: msg
        }));
    });
});
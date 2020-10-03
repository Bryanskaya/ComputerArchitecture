"use strict";

function show_numbers(a, b, c){
    if (a > b)
        return "Wrong borders";
    if (c == 0)
        return "Wrong c (prohibited c = 0)";

    let arr = [];
    for (let i = a; i <=b; i++){
        if (i % c == 0)
            arr.push(i);
    }

    return arr;
}

function run_server(){
    const fs = require("fs");

    const express = require("express");

    const app = express();
    const port = 5015;
    app.listen(port);
    console.log("My server on port " + port);

    app.get("/me/page", function(request, response) {
        const nameString = request.query.p;
        if (fs.existsSync(nameString)) {
            const contentString = fs.readFileSync(nameString, "utf8");
            response.end(contentString);
        } else {
            const contentString = fs.readFileSync("bad.html", "utf8");
            response.end(contentString);
        }
    });

    app.get("/show/numbers", function(request, response) {
        const a = request.query.a;
        const b = request.query.b;
        const c = request.query.c;
        const aInt = parseInt(a);
        const bInt = parseInt(b);
        const cInt = parseInt(c);

        const answerJSON = JSON.stringify({result: show_numbers(aInt, bInt, cInt)});
        response.end(answerJSON);
    });
}

function main(){
    run_server();
}

main();
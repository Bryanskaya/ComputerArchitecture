"use strict";

function show_element(ind){
    const fs = require("fs");

    const fileName = "data.txt";

    let strings = fs.readFileSync(fileName, "utf8");
    strings = JSON.parse(strings);

    if (ind >= strings.length)
        return "Wrong index: out of range";
    else if (ind < 0)
        return "Wrong index: <0";

    return strings[ind];
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

    app.get("/find/ind", function(request, response) {
        const ind = request.query.ind;
        const answerJSON = JSON.stringify({result : show_element(ind)});
        response.end(answerJSON);
    });
}

function main(){
    run_server();
}

main();
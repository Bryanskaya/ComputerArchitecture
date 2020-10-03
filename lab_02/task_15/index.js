"use strict";

function make_whole_file(){
    let strings = "";

    const readlineSync = require('readline-sync');

    const arr = [];
    const fs = require("fs");
    const nameString = "result.txt";

    const n = readlineSync.question("Input amount of files: ");
    console.log()

    if (n <= 0){
        console.log("ОШИБКА: недопустимое значение n");
        console.log();
        return;
    }

    for (let i = 0; i < n; i++){
        let fileName = readlineSync.question("Input name of file: ");
        if (!fs.existsSync(fileName)) {
            console.log("File was not found");
            continue;
        }
        strings += fs.readFileSync(fileName, "utf8");
    }

    const jsonString = JSON.stringify(strings);
    fs.writeFileSync(nameString, jsonString);
}

function main(){
    make_whole_file();
}

main();
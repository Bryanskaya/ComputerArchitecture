"use strict";

function work_n_str(){
    const readlineSync = require('readline-sync');

    const arr = [];
    const fs = require("fs");
    const nameString = "result.txt";

    const n = readlineSync.question("Input amout of strings: ");
    console.log()

    if (n <= 0){
        console.log("ОШИБКА: недопустимое значение n");
        console.log();
        return;
    }

    for (let i = 0; i < n; i++){
        let str = readlineSync.question("Input string: ");

        if (str.length % 2){
            continue;
        }

        arr.push(str);
    }

    const jsonString = JSON.stringify(arr);
    fs.writeFileSync(nameString, jsonString);

    console.log()
}

function main(){
    work_n_str();
}

main();
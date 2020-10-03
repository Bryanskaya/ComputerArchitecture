"use strict";

function work_with_file(){
    const fs = require("fs");

    const nameString = "data.txt";
    let found = false;

    if (fs.existsSync(nameString)) {
        console.log("Файл существует");
        console.log();
    } 
    else {
        console.log("Файл не найден");
        return;
    }

    let strings = fs.readFileSync(nameString, "utf8");
    if (strings == ""){
        console.log("Пустой файл");
        console.log();
        return;
    }

    strings = JSON.parse(strings);

    for (let i = 0; i < strings.length; i++){
        let print_str = true;

        for (let j = 0; j < strings[i].length; j++){
            if (vowels.indexOf(strings[i].charAt(j)) == -1){
                print_str = false;
                break;
            }
        }
        if (print_str){
            found = true;
            console.log(strings[i])
        }
    }

    if (found === false){
        console.log("Не найдено");
        console.log();
    }

    console.log();
}

let vowels = "УЕЭОАЫЯИЮЁуеэоаыяиюё";

function main(){
    work_with_file();
}

main();
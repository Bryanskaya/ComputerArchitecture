"use strict";

function read_file(folder, fileName){
    const fs = require("fs");

    let strings = fs.readFileSync(folder + "/" + fileName, "utf8");

    if (strings == ""){
        console.log("Empty file");
        console.log();
        return;
    }
    
    console.log(strings);
    console.log();
}

function choose_files(){
    let found = false;

    const readlineSync = require('readline-sync');

    const ext = readlineSync.question("Input extention: ");
    const folder = readlineSync.question("Input address: ");

    console.log();

    const fs = require("fs");

    const arr = fs.readdirSync(folder);

    for(let i = 0; i < arr.length; i++) {
        const fileName = arr[i];
        let temp_folder = fileName.split('.');
        if (temp_folder.length != 2)
            continue;
        
        if (temp_folder[1] === ext){
            console.log(fileName);
            read_file(folder, fileName);
            found = true;
        }
    }

    if (!found){
        console.log("NOT found");
        console.log();
    }
}

function main(){
    choose_files();
}

main();
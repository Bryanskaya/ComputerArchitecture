"use strict";

const readlineSync = require('readline-sync');

const a = readlineSync.question("Input extention: ");

const fs = require("fs");

const folder = "./";

const arr = fs.readdirSync(folder);

console.log("Length: " + arr.length);

for(let i = 0; i < arr.length; i++) {
    const fileName = arr[i];
    console.log(fileName);
}
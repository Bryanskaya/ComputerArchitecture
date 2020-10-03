"use strict";

function show_all_subfolders(folder){
    const fs = require("fs");

    let arr = fs.readdirSync(folder, "utf8");

    if (!arr.length)
            return;

    for(let i = 0; i < arr.length; i++) {
        let fileName = arr[i];

        if (fileName.split('.').length == 1)
            show_all_subfolders(folder + "/" + fileName);
        else{
            let strings = fs.readFileSync(folder + "/" + fileName, "utf8");
            if (strings.length <= 10){
                console.log(folder + "/" + fileName);
                console.log();
            }
        }
    }
}

function main()
{
    const folder = "./" + "test";
    show_all_subfolders(folder);
}

main();
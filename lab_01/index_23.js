"use strict";

function func_1(){
    if (circle === 2){
        clearInterval(interval);
        return;
    }

    console.log(number + "       " + (Date.now() - time_start));

    number++;
    
    if (number > 10){
        clearInterval(interval);
        interval = setInterval(func_2, 1000)
    }
}

function func_2(){
    console.log(number + "      " + (Date.now() - time_start));

    number++;
    
    if (number > 20){
        clearInterval(interval);
        circle++;

        number = 1;
        interval = setInterval(func_1, 2000)
    }
}

function main(){
    console.log("Число  Время, мс");
    time_start = Date.now();
    interval = setInterval(func_1, 2000);
}


let number = 1, circle = 0;
let interval, time_start;

main();
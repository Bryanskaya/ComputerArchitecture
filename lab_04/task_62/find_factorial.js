"use strict";

function factorial(num) {
    if (num < 0)
        return;

    let temp = 1;
    for (let i = 2; i <= num; i++)
        temp *= i;

    return temp;
}

console.log(factorial(parseInt(process.argv[2])));
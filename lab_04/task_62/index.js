"use strict";

const execSync = require("child_process").execSync;

function find_factorial(number) {
	const options = {encoding: 'utf8'};
	const cmd = `node find_factorial.js ${number}`;
	const answer = execSync(cmd, options);
	return parseInt(answer);
}

console.log("Число          Факториал");
for (let i = 2; i < process.argv.length; i++)
    console.log(`${process.argv[i]}                ${find_factorial(process.argv[i])}`);
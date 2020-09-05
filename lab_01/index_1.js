"use strict";

function create(surname, age) {
	console.log("-----------------CREATE-----------------");
	if (check_unique(surname)){
		console.log("ERROR: " + surname + " wasn't added (non-unique)");
		console.log("----------------------------------------");
		console.log();

		return;
	}
		
	kids.push({surname : surname, age : age});
	console.log(surname + " " + age + " was added");
	console.log("----------------------------------------");
	console.log();
}

function check_unique(surname) {
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname === surname)
			return true;
	}
	
	return false;
}

function is_exist(surname) {
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname === surname)
			return true;
	}
	
	return false;
}

function read() {
	console.log("------------------READ------------------");
	for (let i = 0; i < kids.length; i++)
		console.log(kids[i].surname + " " + kids[i].age);
	console.log("----------------------------------------");
	console.log();
}

function update(surname, key, value) {
	console.log("-----------------UPDATE-----------------");
	
	if (!is_exist(surname)) {
		console.log("ERROR: " + surname + " isn't exist");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname === surname) {
			kids[i][key] = value;
			break;
		}
	}
	
	console.log(surname + " was updated");
	console.log("----------------------------------------");
	console.log();
}

function delete_kid(surname) {
	console.log("-----------------DELETE-----------------");
	
	if (kids.length === 0) {
		console.log("ERROR: Storage is empty");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	if (!is_exist(surname)) {
		console.log("ERROR: " + surname + " isn't exist");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname === surname)
			kids.splice(i, 1);
	}
	
	console.log(surname + " was deleted");
	console.log("----------------------------------------");
	console.log();
}

function get_average_age() {
	if (kids.length === 0) {
		console.log("ERROR: Storage is empty");
		console.log();
		
		return;
	}
	
	let s = 0;
	
	for (let i = 0; i < kids.length; i++)
		s += parseInt(kids[i].age);
		
	console.log("Average age: " + (s / kids.length).toFixed(3));
	console.log();
}

function data_oldest_kid() {
	if (kids.length === 0) {
		console.log("ERROR: Storage is empty");
		console.log();
		
		return;
	}
	
	let max_age = kids[0].age;
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].age > max_age)
			max_age = kids[i].age;
	}
	
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].age === max_age)
			console.log("Oldest kid: " + kids[i].surname + " " + kids[i].age);
	}
	
	console.log();
}

function show_in_range(start, end) {
	if (kids.length === 0) {
		console.log("ERROR: Storage is empty");
		console.log();
		
		return;
	}
	
	console.log("Kids in age range [ " + start + " ; " + end + " ]:");
	if (start > end || start < 0){
		console.log("ERROR: wrong range");
		console.log();
		
		return;
	}
	
	let found = false;
	for (let i = 0; i < kids.length; i++)
		if (start <= kids[i].age && kids[i].age <= end) {
			console.log(kids[i].surname + " " + kids[i].age);
			found = true;
		}
		
	if (!found)
		console.log("Not found");
			
	console.log();			
}

function show_surname_certain_letter(letter) {
	if (kids.length === 0) {
		console.log("ERROR: Storage is empty");
		console.log();
		
		return;
	}
	
	console.log("Kids with surname starting with " + letter + ":");
	
	let found = false;
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname.charAt(0) === letter){
			console.log(kids[i].surname + " " + kids[i].age);
			found = true;
		}
	}
	
	if (!found)
		console.log("Not found");
			
	console.log();
}

function show_surname_current_length(length) {
	if (kids.length === 0) {
		console.log("ERROR: Storage is empty");
		console.log();
		
		return;
	}
	
	console.log("Kids with surname more than " + length + " letters: ");
	if (length <= 0){
		console.log("ERROR: wrong length");
		console.log();
		
		return;
	}
	
	let found = false;
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname.length > length) {
			console.log(kids[i].surname + " " + kids[i].age);
			found = true;
		}
	}
	
	if (!found)
		console.log("Not found");
			
	console.log();
}

function show_surname_vowel_letter(letter) {
	if (kids.length === 0) {
		console.log("ERROR: Storage is empty");
		console.log();
		
		return;
	}
	
	console.log("Kids with surname begining with " + letter + ":");

	let vowels = "AEIOUY";
	
	if (vowels.indexOf(letter) === -1) {
		console.log("ERROR: wrong letter");
		console.log();
		
		return;
	}
		
	let found = false;
	for (let i = 0; i < kids.length; i++) {
		if (vowels.indexOf(kids[i].surname.charAt(0)) != -1 && 
			kids[i].surname.charAt(0) === letter){
			console.log(kids[i].surname + " " + kids[i].age);
			found = true;
		}
	}
	
	if (!found)
		console.log("Not found");
	
	console.log();
}

function main() {
	create("Bryanskaya", 20);
	create("Ivanov", 48);
	create("Myagkova", 19);
	create("Azizov", 5);
	create("Anikina", 37);
	create("Popova", 8);
	create("Pirogov", 10);
	create("Pavlov", 19);
	create("Pavlov", 29);
	read();
	update("Alinn", "surname", "Alin");
	update("Ivanov", "age", 20);
	update("Myagkova", "surname", "My");
	read();
	delete_kid("Myagkova");
	delete_kid("My");
	read();
	
	get_average_age();
	
	data_oldest_kid();
	
	show_in_range(5, 10);
	show_in_range(25, 10);
	show_in_range(-5, 15);
	show_in_range(5, -15);
	show_in_range(100, 105);
	
	show_surname_certain_letter("B");
	show_surname_certain_letter("Q");
	show_surname_certain_letter("P");
	
	show_surname_current_length(-1);
	show_surname_current_length(0);
	show_surname_current_length(6);
	show_surname_current_length(100);
	
	show_surname_vowel_letter("B");
	show_surname_vowel_letter("A");
	show_surname_vowel_letter("U");
}

let kids = [];
main();
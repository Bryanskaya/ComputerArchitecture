"use strict";

function create(surname, age) {
	console.log("-----------------CREATE-----------------");
	if (is_exist(surname)){
		console.log("ОШИБКА: " + surname + " не удалось добавить (ребёнок с такой фамилией уже существует)");
		console.log("----------------------------------------");
		console.log();

		return;
	}
		
	kids.push({surname : surname, age : age});
	console.log(surname + " " + age + " добавлен");
	console.log("----------------------------------------");
	console.log();
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

	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}

	for (let i = 0; i < kids.length; i++)
		console.log(kids[i].surname + " " + kids[i].age);
	console.log("----------------------------------------");
	console.log();
}

function update(surname, key, value) {
	console.log("-----------------UPDATE-----------------");

	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	if (!is_exist(surname)) {
		console.log("ОШИБКА: " + surname + " НЕ существует");
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
	
	console.log(surname + " изменён");
	console.log("----------------------------------------");
	console.log();
}

function delete_kid(surname) {
	console.log("-----------------DELETE-----------------");
	
	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	if (!is_exist(surname)) {
		console.log("ОШИБКА: " + surname + " НЕ существует");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname === surname)
			kids.splice(i, 1);
	}
	
	console.log(surname + " удалён");
	console.log("----------------------------------------");
	console.log();
}

function get_average_age() {
	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
	}
	
	let s = 0;
	
	for (let i = 0; i < kids.length; i++)
		s += parseInt(kids[i].age);
		
	console.log("Средний возраст: " + (s / kids.length).toFixed(3));
	console.log();
}

function data_oldest_kid() {
	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
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
			console.log("Старший ребёнок: " + kids[i].surname + " " + kids[i].age);
	}
	
	console.log();
}

function show_in_range(start, end) {
	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
	}
	
	console.log("Дети, возраст которых входит в отрезок [ " + start + " ; " + end + " ]:");
	if (start > end || start < 0){
		console.log("ОШИБКА: неверный отрезок");
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
		console.log("Не найдено");
			
	console.log();			
}

function show_surname_certain_letter(letter) {
	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
	}
	
	console.log("Дети, фамилия которых начинается с буквы " + letter + ":");
	
	let found = false;
	for (let i = 0; i < kids.length; i++) {
		if (kids[i].surname.charAt(0) === letter){
			console.log(kids[i].surname + " " + kids[i].age);
			found = true;
		}
	}
	
	if (!found)
		console.log("Не найдено");
			
	console.log();
}

function show_surname_current_length(length) {
	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
	}
	
	console.log("Дети, фамилия которых длиннее заданного количества символов " + length + " letters: ");
	if (length <= 0){
		console.log("ОШИБКА: неверное число символов");
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
		console.log("Не найдено");
			
	console.log();
}

function show_surname_vowel_letter() {
	if (kids.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
	}
	
	console.log("Дети, фамилия которых начинается с гласной буквы:");

	let vowels = "АЕЁИОУЫЭЮЯ";
		
	let found = false;
	for (let i = 0; i < kids.length; i++) {
		if (vowels.indexOf(kids[i].surname.charAt(0)) != -1){
			console.log(kids[i].surname + " " + kids[i].age);
			found = true;
		}
	}
	
	if (!found)
		console.log("Не найдено");
	
	console.log();
}

function main() {
	create("Брянская", 20);
	create("Иванов", 48);
	create("Мягкова", 19);
	create("Азизов", 5);
	create("Аникина", 20);
	create("Попова", 8);
	create("Пирогов", 10);
	create("Павлов", 19);
	create("Павлов", 29);

	read();

	update("Алинн", "surname", "Алин");
	update("Иванов", "age", 20);
	update("Мягкова", "surname", "Мя");
	read();

	delete_kid("Мягкова");
	delete_kid("Мя");
	read();

	get_average_age();

	data_oldest_kid();

	show_in_range(5, 10);
	show_in_range(25, 10);
	show_in_range(-5, 15);
	show_in_range(5, -15);
	show_in_range(100, 105);

	show_surname_certain_letter("Б");
	show_surname_certain_letter("Я");
	show_surname_certain_letter("П");

	show_surname_current_length(-1);
	show_surname_current_length(0);
	show_surname_current_length(6);
	show_surname_current_length(100);

	show_surname_vowel_letter();
}

let kids = [];
main();
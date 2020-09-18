"use strict";

function create(group, number, marks) {
    console.log("-----------------CREATE-----------------");

    if (is_exist(number)){
		console.log("ОШИБКА: " + number + " не удалось добавить (уже существует)");
		console.log("----------------------------------------");
		console.log();

		return;
    }
    
    students.push({group : group, number : number, marks : marks});
	console.log(number + " добавлен");
	console.log("----------------------------------------");
	console.log();
}

function is_exist(number) {
	for (let i = 0; i < students.length; i++) {
		if (students[i].number === number)
			return true;
	}
	
	return false;
}

function read() {
	console.log("------------------READ------------------");

	if (students.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}

	for (let i = 0; i < students.length; i++)
		console.log(students[i].group + " " + students[i].number + " " + students[i].marks);
	console.log("----------------------------------------");
	console.log();
}

function update(number, key, value) {
	console.log("-----------------UPDATE-----------------");

	if (students.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	if (!is_exist(number)) {
		console.log("ОШИБКА: " + number + " НЕ существует");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	for (let i = 0; i < students.length; i++) {
		if (students[i].number === number) {
			students[i][key] = value;
			break;
		}
	}
	
	console.log(number + " изменён");
	console.log("----------------------------------------");
	console.log();
}

function delete_student(number) {
	console.log("-----------------DELETE-----------------");
	
	if (students.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	if (!is_exist(number)) {
		console.log("ОШИБКА: " + number + " НЕ существует");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	for (let i = 0; i < students.length; i++) {
		if (students[i].number === number)
            students.splice(i, 1);
	}
	
	console.log(number + " удалён");
	console.log("----------------------------------------");
	console.log();
}

function get_average_mark(student) {
    if (students.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
    }
    
    if (!is_exist(student)) {
		console.log("ОШИБКА: " + student + " НЕ существует");
		console.log();
		
		return;
    }

    let s = 0, count = 0;
    for (let i = 0; i < students.length; i++) {
        if (students[i].number === student) {
            for (let j = 0; j < students[i].marks.length; j++) {
                s += students[i].marks[j];
                count++;
            }
            break;
        }
    }

    if (s)
        console.log("Средний оценка студента " + student + ": " + (s / count).toFixed(3));
    else
        console.log("Средний оценка студента " + student + ": " + s);
    console.log();
}

function get_students_in_group(group) {
    if (students.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
    }

    console.log("Студенты из группы " + group + ":");

    let found = false;
    for (let i = 0; i < students.length; i++){
        if (students[i].group === group){
            found = true;
            console.log(students[i].number + " " + students[i].marks)
        }
    }

    if (!found)
        console.log("ОШИБКА: не найдено");

    console.log();
}

function get_max_num_marks(group) {
    if (students.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
    }

    console.log("Студент, у которого наибольшее количество оценок в заданной группе " + group + ":");

    let max_num = -1;
    for (let i = 0; i < students.length; i++){
        if (students[i].group === group){
            if (students[i].marks.length > max_num)
                max_num = students[i].marks.length;
        }
    }

    if (max_num === -1){
        console.log("ОШИБКА: группа не найдена");
        console.log();

        return;
    }

    for (let i = 0; i < students.length; i++){
        if (students[i].group === group && students[i].marks.length === max_num)
            console.log(students[i].number + " " + students[i].marks);
    }

    console.log();
}

function get_student_without_marks(){
    if (students.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log();
		
		return;
    }

    console.log("Студент, у которого нет оценок:");

    let found = false;
    for (let i = 0; i < students.length; i++){
        if (!students[i].marks.length){
            console.log(students[i].group + " " + students[i].number);
            found = true;
        }
    }

    if (!found)
        console.log("ОШИБКА: не найдено");

    console.log();
}


function main() {
    create("иу7-52", 1000, [10, 10, 10]);
    create("иу7-52", 1001, [10, 9, 8, 7, 5, 10]);
    create("иу7-52", 1002, [5, 5]);
    create("иу7-51", 1003, [7, 5, 2, 9]);
    create("иу7-51", 1004, []);
    create("иу7-51", 1005, [6]);
    create("иу7-52", 1005, [10, 4, 7]);

    read();

    update(1003, "marks", [7, 5, 10, 9])
    update(1000, "number", 1010);
    update(1005, "group", "иу7-53");
    update(1111, "group", "иу7-72");
    read();

    delete_student(1005);
    delete_student(5555);
    read();

    get_average_mark(1003);
    get_average_mark(5555);
    get_average_mark(1004);

    get_students_in_group("иу7-52");
    get_students_in_group("иу7-72");

    get_max_num_marks("иу7-52");
    get_max_num_marks("иу7-72");

    get_student_without_marks();
}

let students = [];
main();
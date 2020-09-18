"use strict";

function create(name, pos_x, pos_y){
    console.log("-----------------CREATE-----------------");

	if (is_exist(name)){
		console.log("ОШИБКА: " + name + " не удалось добавить (такая точка уже существует)");
		console.log("----------------------------------------");
		console.log();

		return;
	}
		
	points.push({name : name, x : pos_x, y : pos_y});
	console.log(name + " [" + pos_x + ";" + pos_y + "] добавлен");
	console.log("----------------------------------------");
	console.log();
}

function is_exist(name) {
	for (let i = 0; i < points.length; i++) {
		if (points[i].name === name)
			return true;
	}
	
	return false;
}

function read() {
	console.log("------------------READ------------------");

	if (points.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}

	for (let i = 0; i < points.length; i++)
		console.log(points[i].name + " [" + points[i].x + ";" + points[i].y + "]");
	console.log("----------------------------------------");
	console.log();
}

function update(name, key, value) {
	console.log("-----------------UPDATE-----------------");

	if (points.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	if (!is_exist(name)) {
		console.log("ОШИБКА: " + name + " НЕ существует");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	for (let i = 0; i < points.length; i++) {
		if (points[i].name === name) {
			points[i][key] = value;
			break;
		}
	}
	
	console.log(name + " изменён");
	console.log("----------------------------------------");
	console.log();
}

function delete_point(name) {
	console.log("-----------------DELETE-----------------");
	
	if (points.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	if (!is_exist(name)) {
		console.log("ОШИБКА: " + name + " НЕ существует");
		console.log("----------------------------------------");
		console.log();
		
		return;
	}
	
	for (let i = 0; i < points.length; i++) {
		if (points[i].name === name)
            points.splice(i, 1);
	}
	
	console.log(name + " удалён");
	console.log("----------------------------------------");
	console.log();
}

function find_distance(pnt1, pnt2){
    return Math.sqrt(Math.pow((pnt2.x - pnt1.x), 2) + Math.pow((pnt2.y - pnt1.y), 2));
}

function find_points_max_distance()
{
    if (points.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		return;
    }
    
    if (points.length === 1){
        console.log("ОШИБКА: в хранилище только одна точка");
		console.log("----------------------------------------");
		console.log();
		return;
    }

    console.log("Точки с наибольшем расстоянием между ними: ");

    let max_distance = -1;
    let temp_distance;
    let pnt1 = [], pnt2 = [];
    for (let i = 0; i < points.length; i++){
        for (let j = i + 1; j < points.length; j++){
            temp_distance = find_distance(points[i], points[j]);
            if (temp_distance > max_distance){
                max_distance = temp_distance;
                pnt1 = [];
                pnt2 = [];
                pnt1.push(points[i]);
                pnt2.push(points[j]);
            }
            else if (Math.abs(temp_distance - max_distance) < 1e-5){
                pnt1.push(points[i]);
                pnt2.push(points[j]);
            }
        }
    }

    for (let i = 0; i < pnt1.length; i++)
        console.log(pnt1[i].name + " [" + pnt1[i].x + ";" + pnt1[i].y + "] и " 
                    + pnt2[i].name + " [" + pnt2[i].x + ";" + pnt2[i].y + "]");
    console.log();
}

function find_current_points(pnt, cur_distance){
    if (points.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		return;
    }

    console.log("Точки, находящиеся от точки [" + pnt.x + ";" + pnt.y + "] на расстоянии, не превышающем " + cur_distance + ":");

    if (cur_distance < 0){
        console.log("ОШИБКА: неверно заданное расстояние");
		console.log();
		return;
    }

    let found = false;
    for (let i = 0; i < points.length; i++){
        if (find_distance(pnt, points[i]) <= cur_distance)
        {
            found = true;
            console.log(points[i].name + " " + points[i].x + " " + points[i].y);
        }
    }

    if (!found)
        console.log("Не найдено");

    console.log();
}

function find_current_points_axis(ax, pos){
    if (points.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		return;
    }

    if (ax === axis[0]){
        console.log("Ось ох: ");

        if (pos === position[2]) {     // up
            console.log("- выше оси");

            for (let i = 0; i < points.length; i++){
                if (points[i].y > 0)
                    console.log(points[i].name + " [" + points[i].x + ";" + points[i].y + "]");
            }
        }
        else if (pos === position[3]){      // down
            console.log("- ниже оси");
            
            for (let i = 0; i < points.length; i++){
                if (points[i].y < 0)
                        console.log(points[i].name + " [" + points[i].x + ";" + points[i].y + "]");
            }
        }
    }
    else if (ax === axis[1]){
        console.log("Ось оy: ");

        if (pos === position[0]) {     // left
            console.log("- левее оси");

            for (let i = 0; i < points.length; i++){
                if (points[i].x < 0)
                    console.log(points[i].name + " [" + points[i].x + ";" + points[i].y + "]");
            }
        }
        else if (pos === position[1]){      // right
            console.log("- правее оси");

            for (let i = 0; i < points.length; i++){
                if (points[i].x > 0)
                    console.log(points[i].name + " [" + points[i].x + ";" + points[i].y + "]");
            }
        }
    }

    console.log();
}

function find_points_in_area(corner1, corner2){
    if (points.length === 0) {
		console.log("ОШИБКА: пустое хранилище");
		console.log("----------------------------------------");
		console.log();
		return;
    }

    console.log("Точки, расположенные внутри прямоугольной области [" + corner1.x + ";" + corner1.y + "] [" + 
                corner2.x + ";" + corner2.y + "]");

    let result;
    let found = false;
    for (let i = 0; i < points.length; i++){
        if (corner1.x <= points[i].x && points[i].x <= corner2.x &&
            corner1.y >= points[i].y && points[i].y >= corner2.y){
            console.log(points[i].name + " " + points[i].x + " " + points[i].y);
            found = true;
            }
    }

    if (!found)
        console.log("Не найдено");

    console.log();
}


function main(){
    create("point1", 0, 1);
    create("point20", 10, -5);
    create("point3", -1, -1);
    create("point4", 3, 2);
    create("point5", -1, -7);

    read();

    update("point5", "x", 0);
    update("point4", "y", 4);
    update("point20", "name", "point2");
    update("point100", "x", 0);
    read();

    delete_point("point4");
    delete_point("point100");
    delete_point("point5");
    read();

    find_points_max_distance();

    find_current_points({x : 0, y : 0}, 7);
    find_current_points({x : 0, y : 0}, 1);
    find_current_points({x : 0, y : 0}, 0.5);

    find_current_points_axis(axis[0], position[2]);
    find_current_points_axis(axis[0], position[3]);
    find_current_points_axis(axis[1], position[0]);
    find_current_points_axis(axis[1], position[1]);

    find_points_in_area({x : -2, y : 2}, {x : 1, y : -1});
    find_points_in_area({x : -5, y : 2}, {x : -4, y : -1});
}

let points = [];
let axis = ["ox", "oy"];
let position = ["left", "right", "up", "down"];

main();
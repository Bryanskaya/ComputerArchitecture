"use strict";

class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    print(){
        console.log("Точка [" + this.x + ";" + this.y + "]")
    }
}

class Segment{
    constructor(pnt1, pnt2) {
        this.point1 = new Point(pnt1.x, pnt1.y);
        this.point2 = new Point(pnt2.x, pnt2.y);
    }

    print() {
        console.log("Отрезок: ");
        this.point1.print();
        this.point2.print();
    }

    get_length() {
        return Math.sqrt(Math.pow(this.point2.x - this.point1.x, 2) + 
                         Math.pow((this.point2.y - this.point1.y), 2)).toFixed(3);
    }
}

function main() {
    let pnt1 = new Point(0, 0);
    let pnt2 = new Point(10, 5);
    let s = new Segment(pnt1, pnt2)

    s.print();

    console.log("Длина отрезка: " + s.get_length());
}

main();
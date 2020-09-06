"use strict";

class Triangle {
    constructor(a, b, c){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    is_exist() {
        if (this.a + this.b > this.c && this.a + this.c > this.b && this.b + this.c > this.a)
            return true;
        
        return false;
    }

    get_perimeter() {
        return this.a + this.b + this.c;
    }

    get_square() {
        let p = this.get_perimeter() / 2;

        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)).toFixed(3);
    }

    is_rectangular() {
        if (Math.abs(this.a ** 2 + this.b ** 2 - this.c ** 2) < Number.EPSILON || 
            Math.abs(this.a ** 2 + this.c ** 2 - this.b ** 2) < Number.EPSILON || 
            Math.abs(this.a ** 2 + this.b ** 2 - this.c ** 2) < Number.EPSILON)
            return true;

        return false;
    }
}

function main(){
    let fig1 = new Triangle(3, 4, 5);
    let fig2 = new Triangle(5, 6, 10);
    let fig3 = new Triangle(100, 5, 10);
    let fig4 = new Triangle(1, 1, 1);

    console.log("Треугольник " + fig1.a + " " + fig1.b + " " + fig1.c + " существует: " + fig1.is_exist());
    console.log("Треугольник " + fig2.a + " " + fig2.b + " " + fig2.c + " существует: " + fig2.is_exist());
    console.log("Треугольник " + fig3.a + " " + fig3.b + " " + fig3.c + " существует: " + fig3.is_exist());
    console.log("Треугольник " + fig4.a + " " + fig4.b + " " + fig4.c + " существует: " + fig4.is_exist());
    console.log();

    console.log("Периметр треугольника " + fig1.a + " " + fig1.b + " " + fig1.c + ": " + fig1.get_perimeter());
    console.log("Периметр треугольника " + fig2.a + " " + fig2.b + " " + fig2.c + ": " + fig2.get_perimeter());
    console.log("Периметр треугольника " + fig4.a + " " + fig4.b + " " + fig4.c + ": " + fig4.get_perimeter());
    console.log();

    console.log("Площадь треугольника " + fig1.a + " " + fig1.b + " " + fig1.c + ": " + fig1.get_square());
    console.log("Площадь треугольника " + fig2.a + " " + fig2.b + " " + fig2.c + ": " + fig2.get_square());
    console.log("Площадь треугольника " + fig4.a + " " + fig4.b + " " + fig4.c + ": " + fig4.get_square());
    console.log();

    console.log("Треугольник " + fig1.a + " " + fig1.b + " " + fig1.c + " прямоугольный: " + fig1.is_rectangular());
    console.log("Треугольник " + fig2.a + " " + fig2.b + " " + fig2.c + " прямоугольный: " + fig2.is_rectangular());
    console.log("Треугольник " + fig4.a + " " + fig4.b + " " + fig4.c + " прямоугольный: " + fig4.is_rectangular());
    console.log();
}

main();
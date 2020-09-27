"use strict";

const fs = require("fs");
const file_name = "test.txt";

class Obj
    {
        constructor (depth)
        {
            this.dpth = depth;
            this.leaf_1 = null;
            this.leaf_2 = null;

            if (Math.random() > 0.5)
                this.leaf_1 = new Obj(depth + 1);
            if (Math.random() > 0.5)
                this.leaf_2 = new Obj(depth + 1);
        }
    }

function create_file()
{
    let str = new Obj(0);
    let jstr = JSON.stringify(str);
    console.log(jstr);
    fs.writeFileSync(file_name, jstr);
}

function proccessing_tree(tree)
{
    let path = "";
    let depth = 0;

    for (let key in tree)
    {
        if (typeof(tree[key]) == "object" && tree[key] != null)
        {
            let res = proccessing_tree(tree[key]);
            if (res[1] > depth)
            {
                depth = res[1];
                path = key + "/" + res[0];
            }
        }
    }

    return [path, depth + 1];
}

function main()
{
    //create_file();

    let str = fs.readFileSync(file_name, "utf-8");
    console.log("Stirng: " + str);

    let tree = JSON.parse(str);
    let result = proccessing_tree(tree);

    console.log();
    console.log("Максимальная вложенность: " + result[0].slice(0, result[0].length - 1));
    console.log("Максимальная длина: " + (result[1] - 1));
    console.log();
}

main()
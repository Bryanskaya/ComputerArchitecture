"use strict";

const express = require("express");

class Obj
{
    constructor (depth)
    {
        this.dpth = depth;
        if (depth > 0)
            this.next = new Obj(depth - 1);
        else
            this.next = null;
    }
}

function find_depth()
{
    let size = 1;

    while (true)
    {
        try
        {
            let temp = new Obj(size);
            let strjson = JSON.stringify(temp);
            size += 1;
        }catch (RangeError)
        {
            console.log(RangeError);
            size -= 1;
            break;
        }
    }

    console.log(size);
    console.log();
}

function main()
{
    find_depth();
}

main()
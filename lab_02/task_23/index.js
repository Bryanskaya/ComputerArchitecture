"use strict";
//http://localhost:5015/me/page?p=a.html

const readFileSync = require('readline-sync');
const fs = require('fs');
const express = require('express');
const html_file = 'test.html';

function generate_html_file(fields, addr)
{
    let page = '<!DOCTYPE html>\n\
<html>\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <title>Страница А</title>\n\
</head>\n';

    page += '<body>\n\
    <h1>Сгенерированная страница</h1>\n\
    <form method="GET" action="' + addr + '">\n';
                
    for (let i = 0; i < fields.length; i++)
    {
        page += '       <p>Введите ' + fields[i] + ': ' + '</p>\n\
        <input name="' + fields[i] + '" spellcheck="false" autocomplete="off">\n';
    }

    page += '       <input type="submit" value="Отправить запрос">\n\
    </form>\n\
</body>\n\
</html>';

    return page;
}

function show_page_html()
{
    const app = express();
    const port = 5015;
    app.listen(port);
    console.log("My server on port " + port);

    app.get("/me/page", function(request, response) {
        let contentString;
        if (fs.existsSync(html_file)) {
            contentString = fs.readFileSync(html_file, "utf8");
            response.end(contentString);
        } else {
            contentString = "ERROR: page isn's available now";
        }
        response.end(contentString);
    });
}

function main()
{
    const fields = readFileSync.question("Input fields separated ', ': ").split(", ");
    const addr = readFileSync.question("Input address: ");
    fs.writeFileSync(html_file, generate_html_file(fields, addr));

    show_page_html();
}

main()
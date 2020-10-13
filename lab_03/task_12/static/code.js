"use strict";

window.onload = function() {
    // input fields
    const f1 = document.getElementById("field-email");

    // button
    const btn = document.getElementById("find-btn");

    // labels
    const label_surname = document.getElementById("result-surname");
    const label_phone = document.getElementById("result-phone");
    const label_email = document.getElementById("result-email");

    // ajax get
    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    };

    // click event
    btn.onclick = function() {
        console.lod("*****");
        const email = f1.value;
        console.lod(email);


        const url = `/find?email=${email}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`;
        });
    };
};
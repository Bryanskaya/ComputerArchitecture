"use strict";

window.onload = function() {
    const f1 = document.getElementById("field-first");
    const f2 = document.getElementById("field-second");
    const f3 = document.getElementById("field-third");

    const btn = document.getElementById("save-info-btn");

    function ajaxPost(urlString, bodyString, callback) {
        let r = new XMLHttpRequest();
        r.open("POST", urlString, true);
        r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        r.send(bodyString);
        r.onload = function() {
            callback(r.response);
        }
    }

    btn.onclick = function() {
        const surname = f1.value;
        const phone = f2.value;
        const email = f3.value;
        
        ajaxPost("/save/info", JSON.stringify({
            surname, phone, email
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const result = answerObject.result;
            alert(result);
        });
    };
};
"use strict";

window.onload = function() {
    // input fields
    const f1 = document.getElementById("field-email");

    // button
    const btn = document.getElementById("find-btn");

    // labels
    const label_result = document.getElementById("result");
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
        const email = f1.value;

        const url = `/find?email=${email}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);

            if (objectAnswer != null)
            {
                label_result.innerHTML = `Ответ:`
                label_surname.innerHTML = `Фамилия: ${objectAnswer.Surname}`;
                label_phone.innerHTML = `Телефон: ${objectAnswer.phone}`;
                label_email.innerHTML = `Почта: ${objectAnswer.email}`;
            }
            else
            {
                label_result.innerHTML = `Ответ:`
                label_surname.innerHTML = `Фамилия: -`;
                label_phone.innerHTML = `Телефон: -`;
                label_email.innerHTML = `Почта: -`;
                alert(`Человек с данной почтой ${email} НЕ найден`);

            }
        });
    };
};
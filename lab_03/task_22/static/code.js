"use strict";

window.onload = function() {
    // input fields
    const f1 = document.getElementById("login");
    const f2 = document.getElementById("password");

    // button
    const btn_in = document.getElementById("btn_in");
    const btn_prof = document.getElementById("btn_prof");

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

    function change_btn()
    {
        document.getElementById("btn_in").hidden = true;
        document.getElementById("btn_prof").hidden = false;
        document.getElementById("login").setAttribute('disabled', 'disabled');
        document.getElementById("password").setAttribute('disabled', 'disabled');
    }

    // click event
    btn_in.onclick = function() {
        const login = f1.value;
        const password = f2.value;

        const url = `/api/save?login=${login}&password=${password}`;
        ajaxGet(url, function(stringAnswer) {
            if (stringAnswer)
                alert(stringAnswer);
            else
                change_btn();
        });
    };
};
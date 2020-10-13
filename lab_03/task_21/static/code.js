"use strict";

window.onload = function() {
    // input fields
    console.log("****");
    const f1 = document.getElementById("field-age");

    // button
    const btn = document.getElementById("find-btn");

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
        const url = `/find_games`;
        ajaxGet(url, function(stringAnswer) {});
    };
};
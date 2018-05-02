/* Main js module */
"use strict";

var main = (function () {

    	// set content to start
    	var saved = JSON.parse(localStorage.getItem("saved_schools"));
        console.log("hello");
        console.log(saved);

        window.wrapper = document.querySelector('.rb_search');
        window.mainContainer = document.createElement("main");
        window.mainContainer.className = "rb_container";
        // var search = document.querySelector('.rb_search');
        // search.appendChild(window.mainContainer);
        // Add navigation elements
        window.navigation = document.createElement("nav");
        window.navigation.className = "top-nav";

        nav.buildNav();

        start.startPage();

        return {
            saved: saved
        };

})(main);

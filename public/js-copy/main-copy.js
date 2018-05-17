/* Main js module */
"use strict";

var main = (function () {

    	// set content to start
    	var saved = JSON.parse(localStorage.getItem("saved_schools"));

        let search = 'saved_info';
        let saved_info = Object.keys(localStorage)
                   .filter( (key)=> key.startsWith(search) )
                   .map( (key)=> localStorage[key] );

        var globalNavElements = [{name: "Start", class: "rb_start", nav: start.startPage}];

        window.wrapper = document.querySelector('.rb_search');
        window.mainContainer = document.createElement("main");
        window.mainContainer.className = "rb_container";

        // Add navigation elements
        window.navigation = document.createElement("nav");
        window.navigation.className = "top-nav";

        start.startPage();

        return {
            saved: saved,
            globalNavElements: globalNavElements,
            saved_info: saved_info
        };

})(main);

/* Main js module */
"use strict";

var main = (function () {

    	// set content to start
    	var saved = JSON.parse(localStorage.getItem("saved_schools"));
        console.log("hello");
        console.log(saved);

        var globalNavElements = [{name: "Start", class: "rb_start", nav: start.startPage}];

        window.wrapper = document.querySelector('.rb_search');
        window.mainContainer = document.createElement("main");
        window.mainContainer.className = "rb_container";
        // var search = document.querySelector('.rb_search');
        // search.appendChild(window.mainContainer);
        // Add navigation elements
        window.navigation = document.createElement("nav");
        window.navigation.className = "top-nav";

        // var navElements = [{name: "Start", class: "rb_start", nav: start.startPage}];
        // // ,
        // // {name: "School", class: "rb_school", nav: school.createSchoolPage},
        // // {name: "Info", class: "rb_info", nav: {}}];
        //
        // var selected = "rb_start";
        // nav.buildNav(navElements, selected);

        start.startPage();

        return {
            saved: saved,
            globalNavElements: globalNavElements
        };

})(main);

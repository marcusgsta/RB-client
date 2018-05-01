/* Main js module */
"use strict";

var main = (function () {

    	// START PAGE

    	// set content to start
    	var saved = JSON.parse(localStorage.getItem("saved_schools"));
        console.log("hello");
        console.log(saved);

        start.startPage();

        return {
            saved: saved
        };

})(main);

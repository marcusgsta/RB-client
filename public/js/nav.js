"use strict";

var nav = (function() {

    var buildNav = function() {
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = "start";
        a.setAttribute("href", "/");
        var a_text = document.createTextNode('Skolor');
        li.appendChild(a);
        a.appendChild(a_text);

        ul.appendChild(li);
        window.navigation.appendChild(ul);

        window.wrapper.appendChild(window.navigation);

        var links = document.querySelectorAll('.rb_search nav a');
        console.log(links);

        for (var i = 0, len = links.length; i < len; i++) {
            links[i].onclick = function (e) {
                e.preventDefault();
                console.log(e.target.className);
                if (e.target.className === "start") {
                    
                    start.startPage();
                }
                // let id = e.target.attributes[0].nodeValue;
                // testing this:
                // var stateObj = { foo: "schools" };
                // history.pushState(stateObj, "page 2", "schools/" + id);
                // console.log(history);
                // end of test


                // school.buildEducations(id);
                //createSchoolPage(id);
            }
        }
    }


    return {
        buildNav: buildNav
    }

})(nav);

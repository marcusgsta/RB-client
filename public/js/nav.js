"use strict";

var nav = (function() {

    var school_id = "";

    var buildNav = function(navElements, selected) {

        window.navigation.innerHTML = "";

        var ul = document.createElement('ul');

        navElements.forEach(function (element) {
            var li = document.createElement('li');
            var navElement = document.createElement("a");

            if (selected === element.class) {
                navElement.className = "active";
            }

            if (element.class === "rb_school") {
                school_id = element.id;
                element.nav = function() {
                    school.createSchoolPage(school_id);
                }
            }
            navElement.addEventListener("click", element.nav);
            var text = document.createElement("span");
            text.className = element.class;
            text.textContent = element.name;
            navElement.appendChild(text);
            li.appendChild(navElement);

            if (element.class !== "rb_info" && navElements.length > 1) {
                var arrow = document.createElement("span");
                arrow.className = "rb_arrow";
                arrow.textContent = "–>";
                li.appendChild(arrow);
            }

            ul.appendChild(li);
        });
        window.navigation.appendChild(ul);
        window.wrapper.insertBefore(window.navigation, window.wrapper.childNodes[0]);

                // testing this:
                // var stateObj = { foo: "schools" };
                // history.pushState(stateObj, "page 2", "schools/" + id);
                // console.log(history);
                // end of test

    }


    return {
        buildNav: buildNav,
        school_id: school_id
    }

})(nav);

"use strict";

var start = (function() {

    /**
    * Creates start page, fetches schools from api if needed
    * @param void
    */
    var startPage = function () {
        // Check if the parent element exists, which means that the plugin is activated and included in the document

        let search_el = document.querySelector('.rb_search');
        console.log(search_el);
        if (search_el !== null) {

            if (localStorage.getItem('saved_schools') === null) {
                // fetch schools
                let schools = [];

                 fetch('https://susanavet2.skolverket.se/api/1.1/providers?municipality=1060%2C1080%2C1081%2C1082%2C1083&organisationForm=gymnasieskola&size=25')
                  .then(function(response) {
                        return response.json();
                  })
                 .then(function(myJson) {

                    myJson.content.map(function(result) {

                        schools.push({
                            "name": result.content.educationProvider.name.string[0].content,
                            "id": result.content.educationProvider.identifier});
                        })

                        // add to saved_schools if no prev api call
                        // localStorage only takes strings, so convert array
                        localStorage.setItem('saved_schools', JSON.stringify(schools));

                     })
                    .then(function() {
                        // buildSchools(schools);
                        createSchoolsElements(schools);
                  });

              } else {
                  // use saved schools
                  console.log("Using cached schools from local storage. To erase local storage and fetch new data from API, write localStorage.removeItem('saved_schools') in your console.");
                  let saved_schools = JSON.parse(localStorage.getItem("saved_schools"));
                  // buildSchools(saved_schools);
                  createSchoolsElements(saved_schools);
              }
          }
    }

    /**
    * Creates elements from school array of objects
    *
    * @param {array} schools
    */
    var createSchoolsElements = function(schools) {
        var search_div = document.querySelector('.rb_search')
        helpers.buildTitle("Alla skolor");

        let selector_id = 'school_list';
        var ul = helpers.arrToUl(schools, selector_id);
        search_div.appendChild(ul);

        let links = search_div.getElementsByTagName("a");

        // Make school names clickable
        for (var i = 0, len = links.length; i < len; i++) {
            links[i].onclick = function (e) {
                e.preventDefault();
                let id = e.target.attributes[0].nodeValue;
                // testing this:
                // var stateObj = { foo: "schools" };
                // history.pushState(stateObj, "page 2", "schools/" + id);
                // console.log(history);
                // end of test


                school.buildEducations(id);
                //createSchoolPage(id);
            }
        }
    }

    return {
        startPage: startPage
    };



})(start);

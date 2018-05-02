"use strict";
var school = (function() {


    /**
    * Fetches info about school from id
    *
    * @param school id
    *
    */
    // var createSchoolPage = function(id, titles) {
    var createSchoolPage = function(id) {
        let url = "https://susanavet2.skolverket.se/api/1.1/providers/" + id;

        fetch(url)
        .then(function(response) {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function(myJson) {
            // create / update navElements
            let name = myJson.content.educationProvider.name.string[0].content;
            let navElements = [
                {name: "Start", class: "rb_start", nav: start.startPage},
                {name: name, class: "rb_school", id: id, nav: {}}
            ];
            // let school_id = id;

            nav.buildNav(navElements, "rb_school");
            main.globalNavElements = navElements;
            
            createSchoolInfoElements(myJson);
            buildEducations(id);
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }


    /**
    * Fetches educations from school id
    *
    * @param {string} id
    *
    */
    var buildEducations = function(id) {

       let url = "https://susanavet2.skolverket.se/api/1.1/infos?id=" + id;
       let titles = [];

       fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
              myJson.content.map(function(result) {
                  titles.push({
                      "name": result.content.educationInfo.title.string[0].content,
                      "id": result.content.educationInfo.identifier});
                  })

              })
          .then(function() {
              createEducations(titles);
          })
    }



    /**
    *
    * Creates element from education titles
    * Appends to
    * @param {array} titles
    *
    */
    var createEducations = function(titles) {
        let div = document.createElement("div");
        div.id = 'educations';
        // let search = document.querySelector(".rb_search");
        let selector_id = 'educations_list';
        let ul = helpers.arrToUl(titles, selector_id);
        // let educations = document.createTextNode(titles);
        div.appendChild(ul);
        window.mainContainer.appendChild(div);

        // let links = div.getElementsByTagName("a");
        let links = div.getElementsByTagName("a");
        console.log(div);
        console.log(links);
        // Make school names clickable
        for (var i = 0, len = links.length; i < len; i++) {
            links[i].onclick = function (e) {
                e.preventDefault();
                let id = e.target.attributes[0].nodeValue;
                console.log(id);
                education.buildEducationInfo(id);
            }
        }
    }

    /**
    * Creates elements and inserts into web page
    * @param {object} JSON-object
    * @return void
    */
    var createSchoolInfoElements = function(myJson) {
        helpers.clearMainContainer();
        if (window.mainContainer !== null) {
            let school = myJson.content.educationProvider;
            // create elements
            let content = document.createElement('div');
            content.id = 'school_info';
            // create name element
            let name_el = document.createElement('h3');
            let name = school.name.string[0].content;
            let name_text = document.createTextNode(name);
            name_el.appendChild(name_text);
            // create email element
            let email_el = document.createElement('div');
            let email = school.emailAddress;
            let email_text = document.createTextNode("Epost: " + email);
            email_el.appendChild(email_text);
            // create url element
            let url_el = document.createElement('div');
            let url = school.url[0].url[0].content;
            url = helpers.fixUrl(url);
            let url_text = document.createTextNode("URL: " + url);
            let url_link = document.createElement('a');
            url_link.setAttribute('href', url);
            url_link.appendChild(url_text);
            url_el.appendChild(url_link);
            // create address element
            let address_el = document.createElement('div');
            let address = school.visitAddress;
            let street = address.streetAddress;
            let address_text = document.createTextNode("Address: " + street);
            address_el.appendChild(address_text);
            // create town element
            let town_el = document.createElement('div');
            let town = address.town;
            let town_text = document.createTextNode("Stad: " + town);
            town_el.appendChild(town_text);

            // Append elements at the end of <div id='school_info'>
            content.appendChild(name_el);
            content.appendChild(email_el);
            content.appendChild(url_el);
            content.appendChild(address_el);
            content.appendChild(town_el);
            // Append #school_info at the end of .rb_container
            window.mainContainer.appendChild(content);
        }
    }

    return {
        buildEducations: buildEducations,
        createSchoolPage: createSchoolPage,
        createEducations: createEducations,
        createSchoolInfoElements: createSchoolInfoElements
    }


})(school);

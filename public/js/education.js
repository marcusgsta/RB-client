"use strict";

var education = (function() {

    /**
    * Fetches info about education from id
    *
    * @param education id
    *
    */
    var buildEducationInfo = function(id) {
        let url = "https://susanavet2.skolverket.se/api/1.1/infos/" + id;

        fetch(url)
        .then(function(response) {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function(myJson) {
            createEducationInfoElements(myJson);
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }


    /**
    * Creates elements and inserts into web page
    * @param {object} JSON-object
    * @return void
    */
    var createEducationInfoElements = function(myJson) {
        helpers.clearMainContainer();

        let education_name = myJson.content.educationInfo.title.string[0].content;
        main.globalNavElements.push({
            name: education_name, class: "rb_info", nav: {}
        });

        nav.buildNav(main.globalNavElements, "rb_info");

        if (window.mainContainer !== null) {
            let education = myJson.content.educationInfo;
            // create elements
            let content = document.createElement('div');
            content.id = 'education_info';
            // create name element
            console.log(myJson);
            let name = education.title.string[0].content;
            console.log(name);
            helpers.buildTitle(name);
            // create description element
            let myProp = 'description';
            if (education.hasOwnProperty(myProp)) {
                let description = education.description.string[0].content;
                content.innerHTML = description;
            } else {
                let message = "Det verkar inte finnas någon info om utbildningen i Skolverkets databas.";
                let m_text = document.createTextNode(message);
                let m_div = document.createElement("div");
                let par = document.createElement("p");
                par.appendChild(m_text);
                m_div.appendChild(par);
                content.appendChild(m_div);
            }

            // Append #education_info at the end of .rb_search
            // wrapper.appendChild(content);
            window.mainContainer.appendChild(content);
        }
    }


    return {
        buildEducationInfo: buildEducationInfo,
        createEducationInfoElements: createEducationInfoElements
    }

})(education);

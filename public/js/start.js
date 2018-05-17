
/* eslint-disable no-undef */
const start = (function startPageCreator() {
    /**
    * Creates elements from school array of objects
    *
    * @param {array} schools
    */
    const createSchoolsElements = function createSchoolsElements(schools) {
        const selectorId = 'school_list';
        const ul = helpers.arrToUl(schools, selectorId);
        // search_div.appendChild(ul);
        window.mainContainer.appendChild(ul);
        window.wrapper.appendChild(window.mainContainer);
        // let links = search_div.getElementsByTagName("a");
        const links = window.mainContainer.getElementsByTagName('a');

        // Make school names clickable
        const schoolClicked = function schoolIsClicked(e) {
            if (e !== undefined) {
                e.preventDefault();
                const id = e.target.attributes[0].nodeValue;
                school.createSchoolPage(id);
            }
        };

        for (let i = 0, len = links.length; i < len; i += 1) {
            links[i].addEventListener('click', schoolClicked);
        }
    };

    /**
    * Creates start page, fetches schools from api if needed
    * @param void
    */
    const startPage = function createStartPage() {
        const navElements = [{ name: 'Start', class: 'rb_start', nav: start.startPage }];

        const selected = 'rb_start';
        nav.buildNav(navElements, selected);
        // Check if the parent element exists, which means that the plugin is
        // activated and included in the document
        if (window.mainContainer !== null) {
            helpers.clearMainContainer();
            if (localStorage.getItem('saved_schools') === null) {
                // fetch schools
                const schools = [];

                fetch('https://susanavet2.skolverket.se/api/1.1/providers?municipality=1060%2C1080%2C1081%2C1082%2C1083&organisationForm=gymnasieskola&size=25')
                    .then(response => response.json())
                    .then((myJson) => {
                        myJson.content.map((result) => {
                            schools.push({
                                name: result.content.educationProvider.name.string[0].content,
                                id: result.content.educationProvider.identifier,
                            });
                            return result;
                        });

                        // add to saved_schools if no prev api call
                        // localStorage only takes strings, so convert array
                        localStorage.setItem('saved_schools', JSON.stringify(schools));
                    })
                    .then(() => {
                        createSchoolsElements(schools);
                    });
            } else {
                // use saved schools
                console.log("Using cached schools from local storage. To erase local storage and fetch new data from API, write localStorage.removeItem('saved_schools') in your console.");
                const savedSchools = JSON.parse(localStorage.getItem('saved_schools'));
                createSchoolsElements(savedSchools);
            }
        }
    };

    return {
        startPage,
    };
}());
/* eslint-enable no-undef */

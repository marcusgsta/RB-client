
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const school = (function schoolModule() {
    /**
    * Update nav elements
    *
    */
    function updateNavElements(name, id) {
        const navElements = [
            { name: 'Start', class: 'rb_start', nav: start.startPage },
            {
                name, class: 'rb_school', id, nav: {},
            },
        ];
        nav.buildNav(navElements, 'rb_school');
        main.globalNavElements = navElements;
    }

    /**
    *
    * Creates element from education titles
    * Appends to
    * @param {array} titles
    *
    */
    function createEducations(titles) {
        const div = document.createElement('div');
        div.id = 'educations';

        const selectorId = 'educations_list';
        const ul = helpers.arrToUl(titles, selectorId);

        div.appendChild(ul);
        window.mainContainer.appendChild(div);

        const links = div.getElementsByTagName('a');

        function educationClicked(e) {
            e.preventDefault();
            const id = e.target.attributes[0].nodeValue;
            education.buildEducationInfo(id);
        }
        // Make school names clickable
        for (let i = 0, len = links.length; i < len; i += 1) {
            // links[i].onclick = openEd(el);
            links[i].addEventListener('click', educationClicked);
        }
    }

    /**
    * Fetches educations from school id
    *
    * @param {string} id
    *
    */
    function buildEducations(id) {
        const restoredEducation = localStorage.getItem(`school_education${id}`);
        const parsedEducation = JSON.parse(restoredEducation);

        if (parsedEducation === null) {
            const url = `https://susanavet2.skolverket.se/api/1.1/infos?id=${id}`;
            const titles = [];

            fetch(url)
                .then(response => response.json())
                .then((myJson) => {
                    myJson.content.map((result) => {
                        titles.push({
                            name: result.content.educationInfo.title.string[0].content,
                            id: result.content.educationInfo.identifier,
                        });
                        return result;
                    });
                    const schoolEducation = titles;
                    localStorage.setItem(`school_education${id}`, JSON.stringify(schoolEducation));
                })
                .then(() => {
                    createEducations(titles);
                });
        } else {
            console.log('Using saved educations. To erase all memory in local storage, write: localStorage.clear(); in your console.');
            const restored = localStorage.getItem(`school_education${id}`);
            const parsed = JSON.parse(restored);
            createEducations(parsed);
        }
    }

    /**
    * Creates elements and inserts into web page
    * @param {object} JSON-object
    * @return void
    */
    function createSchoolInfoElements(myJson) {
        helpers.clearMainContainer();
        if (window.mainContainer !== null) {
            const thisSchool = myJson.content.educationProvider;
            // create elements
            const content = document.createElement('div');
            content.id = 'school_info';
            // create name element
            const nameEl = document.createElement('h3');
            const name = thisSchool.name.string[0].content;
            const nameText = document.createTextNode(name);
            nameEl.appendChild(nameText);
            // create email element
            const emailEl = document.createElement('div');
            const email = thisSchool.emailAddress;
            const emailText = document.createTextNode(`Epost: ${email}`);
            emailEl.appendChild(emailText);
            // create url element
            const urlEl = document.createElement('div');
            let url = thisSchool.url[0].url[0].content;
            url = helpers.fixUrl(url);
            const urlText = document.createTextNode(`URL: ${url}`);
            const urlLink = document.createElement('a');
            urlLink.setAttribute('href', url);
            urlLink.appendChild(urlText);
            urlEl.appendChild(urlLink);
            // create address element
            const addressEl = document.createElement('div');
            const address = thisSchool.visitAddress;
            const street = address.streetAddress;
            const addressText = document.createTextNode(`Address: ${street}`);
            addressEl.appendChild(addressText);
            // create town element
            const townEl = document.createElement('div');
            /* eslint-disable prefer-destructuring */
            const town = address.town;
            /* eslint-enable prefer-destructuring */
            const townText = document.createTextNode(`Stad: ${town}`);
            townEl.appendChild(townText);

            // Append elements at the end of <div id='school_info'>
            content.appendChild(nameEl);
            content.appendChild(emailEl);
            content.appendChild(urlEl);
            content.appendChild(addressEl);
            content.appendChild(townEl);
            // Append #school_info at the end of .rb_container
            window.mainContainer.appendChild(content);
        }
    }

    /**
    * Fetches info about school from id
    *
    * @param school id
    *
    */
    // var createSchoolPage = function(id, titles) {
    const createSchoolPage = function createSchoolPage(id) {
        const restoredInfo = localStorage.getItem(`saved_info${id}`);
        const parsedInfo = JSON.parse(restoredInfo);

        if (parsedInfo === null) {
            const url = `https://susanavet2.skolverket.se/api/1.1/providers/${id}`;

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((myJson) => {
                // create / update navElements
                    const name = myJson.content.educationProvider.name.string[0].content;
                    updateNavElements(name, id);
                    // update localStorage for this schools id
                    const schoolInfo = myJson;
                    localStorage.setItem(`saved_info${id}`, JSON.stringify(schoolInfo));

                    createSchoolInfoElements(myJson);
                    buildEducations(id);
                })
                .catch((error) => {
                    console.log('There has been a problem with your fetch operation: ', error.message);
                });
        } else {
            console.log('Using saved school info. To erase all memory in local storage, write: localStorage.clear(); in your console.');
            const parsed = JSON.parse(restoredInfo);

            const name = parsed.content.educationProvider.name.string[0].content;
            updateNavElements(name, id);

            createSchoolInfoElements(parsed);
            buildEducations(id);
        }
    };


    return {
        buildEducations,
        createSchoolPage,
        createEducations,
        createSchoolInfoElements,
    };
}());

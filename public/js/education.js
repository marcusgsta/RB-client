/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const education = (function educationModule() {
/* eslint-enable no-unused-vars */
    /**
    * Creates elements and inserts into web page
    * @param {object} JSON-object
    * @return void
    */
    const createEducationInfoElements = function createEducationInfoElements(myJson) {
        helpers.clearMainContainer();

        const educationName = myJson.content.educationInfo.title.string[0].content;
        main.globalNavElements.push({
            name: educationName, class: 'rb_info', nav: {},
        });

        nav.buildNav(main.globalNavElements, 'rb_info');

        if (window.mainContainer !== null) {
            const edu = myJson.content.educationInfo;
            // create elements
            const content = document.createElement('div');
            content.id = 'education_info';
            // create name element
            // const name = edu.title.string[0].content;
            // helpers.buildTitle(name);
            // create description element
            const myProp = 'description';
            if (Object.prototype.hasOwnProperty.call(edu, myProp)) {
                const description = edu.description.string[0].content;
                content.innerHTML = description;
            } else {
                const message = 'Det verkar inte finnas någon info om utbildningen i Skolverkets databas.';
                const mText = document.createTextNode(message);
                const mDiv = document.createElement('div');
                const par = document.createElement('p');
                par.appendChild(mText);
                mDiv.appendChild(par);
                content.appendChild(mDiv);
            }

            // Append #education_info at the end of .rb_search
            // wrapper.appendChild(content);
            window.mainContainer.appendChild(content);
        }
    };
    /**
    * Fetches info about education from id
    *
    * @param education id
    *
    */
    const buildEducationInfo = function buildEducationInfo(id) {
        const savedEdInfo = localStorage.getItem(`education_info${id}`);
        const parsed = JSON.parse(savedEdInfo);

        if (parsed === null) {
            const url = `https://susanavet2.skolverket.se/api/1.1/infos/${id}`;

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((myJson) => {
                // Save education info in local storage for quicker future retrieval
                    localStorage.setItem(`education_info${id}`, JSON.stringify(myJson));

                    createEducationInfoElements(myJson);
                })
                .catch((error) => {
                    console.log('There has been a problem with your fetch operation: ', error.message);
                });
        } else {
            console.log('Using saved education info. To erase all memory in local storage, write: localStorage.clear(); in your console.');
            const restoredEdInfo = localStorage.getItem(`education_info${id}`);
            const parsedEdInfo = JSON.parse(restoredEdInfo);
            createEducationInfoElements(parsedEdInfo);
        }
    };


    return {
        buildEducationInfo,
        createEducationInfoElements,
    };
}());

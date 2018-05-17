

const helpers = (function helpFunctions() {
    /**
    * Removes an DOM element by id
    * @param {string} id
    *
    */
    const removeElement = function removeElementWithId(id) {
        const elem = document.getElementById(id);
        return elem.parentNode.removeChild(elem);
    };
    /**
    * Clears all child elements of .rb_search
    *
    */
    const clearAll = function clearFirstChildrenOfWrapper() {
        const searchEl = document.querySelector('.rb_search');
        while (searchEl.firstChild) {
            searchEl.removeChild(searchEl.firstChild);
        }
    };

    /**
    * Removes element #school_list
    * Removes element #educations
    */
    const clearPage = function clearsIdSchoolListAndEducations() {
        //
        const schoolList = document.getElementById('school_list');
        if (schoolList !== null) {
            removeElement('school_list');
        }

        const el = document.getElementById('educations');
        if (el !== null) {
            removeElement('educations');
        }

        const title = document.getElementById('rb-title');
        if (title !== null) {
            removeElement('rb-title');
        }
    };

    /**
    * Removes children of #mainContainer
    *
    */
    const clearMainContainer = function clearMainsFirstChild() {
        if (window.mainContainer !== null) {
            const main = window.mainContainer;

            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
        }
    };

    /**
    * Creates h3 element for a title
    * Appends to the end of .rb_search
    * @param {string} title_string
    *
    */
    const buildTitle = function buildTitleInMain(titleString) {
        if (window.mainContainer !== null) {
            const title = document.createElement('h3');
            title.id = 'rb-title';
            const titleText = document.createTextNode(titleString);
            title.appendChild(titleText);
            window.mainContainer.appendChild(title);
        }
    };

    /**
    * Creates a ul from array of objects like {name: "", id:""}
    * @param {array} array of objects
    * @param {string} selector_id for wrapper element
    * @return DOM element UL
    */
    const arrToUl = function createUlFromArray(arr, selectorId) {
        const ul = document.createElement('ul');
        ul.id = selectorId;

        for (let i = 0; i < arr.length; i += 1) {
            if (Array.isArray(arr)) {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.setAttribute('href', arr[i].id);
                link.classList.add('school-id');
                link.appendChild(document.createTextNode(arr[i].name));
                li.appendChild(link);
                ul.appendChild(li);
            }
        }
        return ul;
    };


    /**
    * Creates a home button
    * Append to the end of .rb_search
    * Adds event listener which clears div and creates start page
    * on click
    */
    const createHomeButton = function createHomeButtonAndAppend() {
        // create Home Button
        const button = document.createElement('button');
        button.id = 'home-button';
        const buttonText = document.createTextNode('Visa alla skolor');
        button.appendChild(buttonText);

        const content = document.querySelector('.rb_search');
        content.appendChild(button);

        // Add event listener
        button.addEventListener('click', () => {
            // clearAll();
            helpers.clearAll();
            /* eslint-disable no-undef */
            start.startPage();
            /* eslint-enable no-undef */
        });
    };

    /**
    * If a url starts with 'www', add '//'
    * The browser will add either http or https
    * @param {string} url
    */
    const fixUrl = function fixPrefixOnUrl(url) {
        const prefix = '//';
        const www = 'www';
        let newUrl = '';
        if (url.substr(0, www.length) === www) {
            newUrl = prefix + url;
        }
        return newUrl;
    };

    return {
        clearAll,
        clearPage,
        clearMainContainer,
        buildTitle,
        arrToUl,
        createHomeButton,
        fixUrl,
        removeElement,
    };
}());

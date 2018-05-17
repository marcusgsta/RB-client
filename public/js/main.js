/* Main js module */
/* eslint-disable no-unused-vars */
const main = (function mainJSwithWrapper() {
// set content to start
    const saved = JSON.parse(localStorage.getItem('saved_schools'));
    /* eslint-enable no-unused-vars */

    /* eslint-disable no-undef */
    const globalNavElements = [{ name: 'Start', class: 'rb_start', nav: start.startPage }];

    window.wrapper = document.querySelector('.rb_search');
    window.mainContainer = document.createElement('main');
    window.mainContainer.className = 'rb_container';

    // Add navigation elements
    window.navigation = document.createElement('nav');
    window.navigation.className = 'top-nav';

    start.startPage();
    /* eslint-enable no-unused-vars */
    return {
        saved,
        globalNavElements,
    };
}());

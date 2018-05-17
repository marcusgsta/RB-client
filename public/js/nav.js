
/* eslint-disable no-unused-vars */
const nav = (function navModule() {
    let schoolId = '';

    const buildNav = function buildNav(navElements, selected) {
        window.navigation.innerHTML = '';

        const ul = document.createElement('ul');

        navElements.forEach((element) => {
            const li = document.createElement('li');
            const navElement = document.createElement('a');

            if (selected === element.class) {
                navElement.className = 'active';
            }
            /* eslint-disable no-param-reassign */
            /* eslint-disable no-undef */
            if (element.class === 'rb_school') {
                schoolId = element.id;
                element.nav = function openPage() {
                    school.createSchoolPage(schoolId);
                };
            }

            navElement.addEventListener('click', element.nav);

            const text = document.createElement('span');
            text.className = element.class;
            text.textContent = element.name;
            navElement.appendChild(text);
            li.appendChild(navElement);

            if (element.class !== 'rb_info' && navElements.length > 1) {
                const arrow = document.createElement('span');
                arrow.className = 'rb_arrow';
                arrow.textContent = '–>';
                li.appendChild(arrow);
            }

            ul.appendChild(li);
        });
        window.navigation.appendChild(ul);
        window.wrapper.insertBefore(window.navigation, window.wrapper.childNodes[0]);
    };

    return {
        buildNav,
        schoolId,
    };
}());

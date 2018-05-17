"use strict";
var helpers = (function() {

    /**
    * Clears all child elements of .rb_search
    *
    */
        var clearAll = function() {
        let search_el = document.querySelector('.rb_search');
        while (search_el.firstChild) {
            search_el.removeChild(search_el.firstChild);
        }
    }

    /**
    * Removes element #school_list
    * Removes element #educations
    */
    var clearPage = function() {
        //
        let school_list = document.getElementById('school_list');
        if (school_list !== null) {
            removeElement('school_list');
        }

        let el = document.getElementById('educations');
        if (el !== null) {
            removeElement('educations');
        }

        let title = document.getElementById('rb-title');
        if (title !== null) {
            removeElement('rb-title');
        }
    }

    /**
    * Removes children of #mainContainer
    *
    */
    var clearMainContainer = function() {
        if (window.mainContainer !== null) {

            let main = window.mainContainer;

            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
        }
    }

    /**
    * Creates h3 element for a title
    * Appends to the end of .rb_search
    * @param {string} title_string
    *
    */
    var buildTitle = function(title_string) {
        if (window.mainContainer !== null) {
            let title = document.createElement('h3');
            title.id = "rb-title";
            let title_text = document.createTextNode(title_string);
            title.appendChild(title_text);
            window.mainContainer.appendChild(title);
        }
    }

    /**
    * Creates a ul from array of objects like {name: "", id:""}
    * @param {array} array of objects
    * @param {string} selector_id for wrapper element
    * @return DOM element UL
    */
    var arrToUl = function(arr, selector_id) {

          var ul = document.createElement('ul'), li, link;
          ul.id = selector_id;

          for (var i = 0; i < arr.length; i++) {
             if (Array.isArray(arr)) {
                li = document.createElement('li');
                link = document.createElement('a');
                link.setAttribute('href', arr[i].id);
                link.classList.add('school-id');
                link.appendChild(document.createTextNode(arr[i].name));
                li.appendChild(link);
                ul.appendChild(li);
            }
          }
          return ul;
        }



    /**
    * Creates a home button
    * Append to the end of .rb_search
    * Adds event listener which clears div and creates start page
    * on click
    */
    var createHomeButton = function() {
        // create Home Button
        let button = document.createElement('button');
        button.id = "home-button";
        let button_text = document.createTextNode('Visa alla skolor');
        button.appendChild(button_text);

        let content = document.querySelector('.rb_search');
        content.appendChild(button);

        // Add event listener
        button.addEventListener('click', function() {
          // clearAll();
          helpers.clearAll();
          start.startPage();
      });
    }

    /**
    * If a url starts with 'www', add '//'
    * The browser will add either http or https
    * @param {string} url
    */
    var fixUrl = function(url) {
      var prefix = '//';
      var www = 'www';
      if (url.substr(0, www.length) === www)
      {
          url = prefix + url;
      }
      return url;
    }

    /**
    * Removes an DOM element by id
    * @param {string} id
    *
    */
    var removeElement = function(id) {
      var elem = document.getElementById(id);
      return elem.parentNode.removeChild(elem);
  }

    return {
        clearAll: clearAll,
        clearPage: clearPage,
        clearMainContainer: clearMainContainer,
        buildTitle: buildTitle,
        arrToUl: arrToUl,
        createHomeButton: createHomeButton,
        fixUrl: fixUrl,
        removeElement: removeElement
    }

})(helpers);

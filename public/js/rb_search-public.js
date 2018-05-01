// (function( $ ) {
(function() {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 // Städer i Blekinge: Karlskrona, Ronneby, Karlshamn
	 // Kommuner / municipalities i Blekinge:
	 // Karlshamn, Karlskrona, Olofström, Ronneby, Sölvesborg
	 // Kommunkoder (municipality codes)
	 /*	1060 Olofström
		1080 Karlskrona
		1081 Ronneby
		1082 Karlshamn
		1083 Sölvesborg
		1060,1080,1081,1082,1083
		Söka på 'providers'/skolor, och kommun:


		Söka på namn på skola:
		https://susanavet2.skolverket.se/api/1.1/providers?name=af%20chapmangymnasiet
		p.sv.78839208,
		p.sv.30530571
		Sök på skolans id för att få utb.programmen där (infos):
		https://susanavet2.skolverket.se/api/1.1/infos?id=p.sv.78839208

		Söka på id efter utbildning, för att visa info
		https://susanavet2.skolverket.se/api/1.1/infos/i.sv.HUSPR


	*/

	// need to include polyfills for fetch and for promises
	// https://medium.com/@wisecobbler/using-the-javascript-fetch-api-f92c756340f0

	// Define global variables
	// let saved_schools = [];
    //
	// // START PAGE
    //
	// // set content to start
	// let saved = JSON.parse(localStorage.getItem("saved_schools"));
    //
	// createStartPage();
    //
    //
	// /**
	// * Creates start page, fetches schools from api if needed
	// * @param void
	// */
	// function createStartPage() {
	// 	// Check if the parent element exists, which means that the plugin is activated and included in the document
	// 	let search_el = document.querySelector('.rb_search');
    //
	// 	if (search_el !== null) {
    //
	// 		if (localStorage.getItem('saved_schools') === null) {
	// 			// fetch schools
	// 			let schools = [];
    //
	// 			 fetch('https://susanavet2.skolverket.se/api/1.1/providers?municipality=1060%2C1080%2C1081%2C1082%2C1083&organisationForm=gymnasieskola&size=25')
	// 			  .then(function(response) {
	// 					return response.json();
	// 			  })
	// 			 .then(function(myJson) {
    //
	// 				myJson.content.map(function(result) {
    //
	// 					schools.push({
	// 						"name": result.content.educationProvider.name.string[0].content,
	// 						"id": result.content.educationProvider.identifier});
	// 					})
    //
	// 					// add to saved_schools if no prev api call
	// 					// localStorage only takes strings, so convert array
	// 					localStorage.setItem('saved_schools', JSON.stringify(schools));
    //
	// 				 })
	// 				.then(function() {
	// 					// buildSchools(schools);
	// 					createSchoolsElements(schools);
	// 			  });
    //
	// 		  } else {
	// 			  // use saved schools
	// 			  console.log("Using cached schools from local storage. To erase local storage and fetch new data from API, write localStorage.removeItem('saved_schools') in your console.");
	// 			  let saved_schools = JSON.parse(localStorage.getItem("saved_schools"));
	// 			  // buildSchools(saved_schools);
	// 			  createSchoolsElements(saved_schools);
	// 		  }
	// 	  }
	// }

	// /**
	// * Creates elements from school array of objects
	// *
	// * @param {array} schools
	// */
	// function createSchoolsElements(schools) {
	// 	var search_div = document.querySelector('.rb_search')
	// 	buildTitle("Alla skolor");
    //
	// 	let selector_id = 'school_list';
	// 	var ul = arrToUl(schools, selector_id);
	// 	search_div.appendChild(ul);
    //
	// 	let links = search_div.getElementsByTagName("a");
    //
	// 	// Make school names clickable
	// 	for (var i = 0, len = links.length; i < len; i++) {
	// 		links[i].onclick = function (e) {
	// 			e.preventDefault();
	// 			let id = e.target.attributes[0].nodeValue;
	// 			// testing this:
	// 			var stateObj = { foo: "schools" };
	// 			history.pushState(stateObj, "page 2", "schools/" + id);
	// 			console.log(history);
	// 			// end of test
    //
    //
	// 			buildEducations(id);
	// 			//createSchoolPage(id);
	// 		}
	// 	}
	// }

	window.onpopstate = function (event) {
  		console.log('state: ' + JSON.stringify(event.state));
	};


	// /**
	// * Creates h2 element for a title
	// * Appends to the end of .rb_search
	// * @param {string} title_string
	// *
	// */
	// function buildTitle(title_string) {
	// 	let search_el = document.querySelector('.rb_search')
	// 	let title = document.createElement('h2');
	// 	title.id = "rb-title";
	// 	let title_text = document.createTextNode(title_string);
	// 	title.appendChild(title_text);
	// 	search_el.appendChild(title);
	// }

	  // /**
	  // * Fetches info about school from id
  	  // *
	  // * @param school id
	  // *
	  // */
	  // function createSchoolPage(id) {
		//   let url = "https://susanavet2.skolverket.se/api/1.1/providers/" + id;
      //
		//   fetch(url)
		//   .then(function(response) {
		// 	  if (response.ok) {
		// 		return response.json();
		// 	  }
		// 	  throw new Error('Network response was not ok.');
		//   })
		//   .then(function(myJson) {
		// 	  createSchoolInfoElements(myJson);
		//   })
		//   .catch(function(error) {
		// 	  console.log('There has been a problem with your fetch operation: ', error.message);
		//   });
	  // }

	  // /**
	  // * Creates elements and inserts into web page
	  // * @param {object} JSON-object
	  // * @return void
	  // */
	  // function createSchoolInfoElements(myJson) {
      //
		//   let wrapper = document.querySelector('.rb_search');
		//   if (wrapper !== null) {
		// 	  let school = myJson.content.educationProvider;
		// 	  // create elements
		// 	  let content = document.createElement('div');
		// 	  content.id = 'school_info';
		// 	  // create name element
		// 	  let name_el = document.createElement('h2');
		// 	  let name = school.name.string[0].content;
		// 	  let name_text = document.createTextNode(name);
		// 	  name_el.appendChild(name_text);
		// 	  // create email element
		// 	  let email_el = document.createElement('div');
		// 	  let email = school.emailAddress;
		// 	  let email_text = document.createTextNode("Epost: " + email);
		// 	  email_el.appendChild(email_text);
		// 	  // create url element
		// 	  let url_el = document.createElement('div');
		// 	  let url = school.url[0].url[0].content;
		// 	  url = fixUrl(url);
		// 	  let url_text = document.createTextNode("URL: " + url);
		// 	  let url_link = document.createElement('a');
		// 	  url_link.setAttribute('href', url);
		// 	  url_link.appendChild(url_text);
		// 	  url_el.appendChild(url_link);
		// 	  // create address element
		// 	  let address_el = document.createElement('div');
		// 	  let address = school.visitAddress;
		// 	  let street = address.streetAddress;
		// 	  let address_text = document.createTextNode("Address: " + street);
		// 	  address_el.appendChild(address_text);
		// 	  // create town element
		// 	  let town_el = document.createElement('div');
		// 	  let town = address.town;
		// 	  let town_text = document.createTextNode("Stad: " + town);
		// 	  town_el.appendChild(town_text);
      //
		// 	  // Append elements at the end of <div id='school_info'>
		// 	  content.appendChild(name_el);
		// 	  content.appendChild(email_el);
		// 	  content.appendChild(url_el);
		// 	  content.appendChild(address_el);
		// 	  content.appendChild(town_el);
		// 	  // Append #school_info at the end of .rb_search
		// 	  wrapper.appendChild(content);
		//   }
	  // }

	  // /**
	  // * If a url starts with 'www', add '//'
	  // * The browser will add either http or https
	  // * @param {string} url
	  // */
	  // function fixUrl(url) {
		// var prefix = '//';
		// var www = 'www';
		// if (url.substr(0, www.length) === www)
		// {
		//     url = prefix + url;
		// }
		// return url;
	  // }


	  // /**
	  // * Fetches educations from school id
	  // *
	  // * @param {string} id
	  // *
	  // */
	  // function buildEducations(id) {
      //
		//  let url = "https://susanavet2.skolverket.se/api/1.1/infos?id=" + id;
		//  let titles = [];
      //
		//  fetch(url)
	  // 	  .then(function(response) {
	  // 	    return response.json();
	  // 	  })
	  // 	  .then(function(myJson) {
		//   		myJson.content.map(function(result) {
		// 			titles.push({
		// 				"name": result.content.educationInfo.title.string[0].content,
		// 				"id": result.content.educationInfo.identifier});
		// 			})
      //
	  // 			})
		// 	.then(function() {
		// 		createSchoolPage(id);
		// 	})
		// 	.then(function() {
		// 		createEducations(titles);
		// 	})
		// 	.then(function() {
		// 		createHomeButton();
		// 	})
	  // }


	  // /**
	  // * Creates a home button
	  // * Append to the end of .rb_search
	  // * Adds event listener which clears div and creates start page
	  // * on click
	  // */
	  // function createHomeButton() {
		//   // create Home Button
		//   let button = document.createElement('button');
		//   button.id = "home-button";
		//   let button_text = document.createTextNode('Visa alla skolor');
		//   button.appendChild(button_text);
      //
		//   let content = document.querySelector('.rb_search');
		//   content.appendChild(button);
      //
		//   // Add event listener
		//   button.addEventListener('click', function() {
		// 	// clearAll();
		// 	helpers.clearAll();
		// 	createStartPage();
		// });
	  // }

	  // /**
	  // * Clears all child elements of .rb_search
	  // *
	  // */
	  // function clearAll() {
		//   let search_el = document.querySelector('.rb_search');
		//   while (search_el.firstChild) {
		// 	  search_el.removeChild(search_el.firstChild);
		//   }
	  // }

	  // /**
	  // * Removes element #school_list
	  // * Removes element #educations
	  // */
	  // function clearPage() {
		//   //
		//   let school_list = document.getElementById('school_list');
		//   if (school_list !== null) {
		// 	  removeElement('school_list');
		//   }
      //
		//   let el = document.getElementById('educations');
		//   if (el !== null) {
		// 	  removeElement('educations');
		//   }
      //
		//   let title = document.getElementById('rb-title');
		//   if (title !== null) {
		// 	  removeElement('rb-title');
		//   }
	  // }

	  // /**
	  // *
	  // * Creates element from education titles
	  // * Appends to
	  // * @param {array} titles
	  // *
	  // */
	  // function createEducations(titles) {
		//   clearPage();
		//   //clearAll();
      //
		//   let div = document.createElement("div");
		//   div.id = 'educations';
		//   let search = document.querySelector(".rb_search");
		//   let selector_id = 'educations_list';
		//   let ul = arrToUl(titles, selector_id);
		//   // let educations = document.createTextNode(titles);
		//   div.appendChild(ul);
		//   search.appendChild(div);
      //
		//   //createHomeButton();
	  // }


	//   /**
	//   * Removes an DOM element by id
	//   * @param {string} id
	//   *
	//   */
	//   function removeElement(id) {
    // 	var elem = document.getElementById(id);
    // 	return elem.parentNode.removeChild(elem);
	// }


	// /**
	// * Creates a ul from array of objects like {name: "", id:""}
	// * @param {array} array of objects
	// * @param {string} selector_id for wrapper element
	// * @return DOM element UL
	// */
	// function arrToUl(arr, selector_id) {
    //
	// 	  var ul = document.createElement('ul'), li, link;
	// 	  ul.id = selector_id;
    //
	// 	  for (var i = 0; i < arr.length; i++) {
	// 		 if (Array.isArray(arr)) {
	// 		    li = document.createElement('li');
	// 			link = document.createElement('a');
	// 			link.setAttribute('href', arr[i].id);
	// 			link.classList.add('school-id');
	// 			link.appendChild(document.createTextNode(arr[i].name));
	// 		    li.appendChild(link);
	// 		    ul.appendChild(li);
	// 		}
	// 	  }
	// 	  return ul;
	// 	}


// })( jQuery );
})();

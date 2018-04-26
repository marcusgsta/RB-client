(function( $ ) {
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

	// Definer global variables
	let saved_schools = [];

	// START PAGE

	// set content to start

	createStartPage();

	// function fetchAllSchools() {
	// 	var apiRequest = fetch('https://susanavet2.skolverket.se/api/1.1/providers?municipality=1060%2C1080%2C1081%2C1082%2C1083&organisationForm=gymnasieskola&size=25')
	// 	 .then(function(response) {
	// 	   return response.json();
	//    });
	//    return apiRequest;
	// }

	function buildTitle(title_string) {
		let search_el = document.querySelector('.rb_search')
		let title = document.createElement('h2');
		title.id = "rb-title";
		let title_text = document.createTextNode(title_string);
		title.appendChild(title_text);
		search_el.appendChild(title);
	}

	function createStartPage() {
		// Check if the parent element exists, which means that the plugin is activated and included in the document
		let search_el = document.querySelector('.rb_search');

		if (search_el !== null) {

			// Check if schools already saved
			if ((saved_schools === undefined || saved_schools.length == 0)) {

				let schools = [];

				 fetch('https://susanavet2.skolverket.se/api/1.1/providers?municipality=1060%2C1080%2C1081%2C1082%2C1083&organisationForm=gymnasieskola&size=25')
				  .then(function(response) {
						return response.json();
				  })
				 .then(function(myJson) {

					myJson.content.map(function(result) {

						schools.push({
							"name": result.content.educationProvider.name.string[0].content,
							"id": result.content.educationProvider.identifier});
						})

						// add to saved_schools if no prev api call
						saved_schools = schools;

						console.log("saved_schools:", saved_schools);

					 })
					.then(function() {
						buildSchools(schools);
				  });

			  } else {
				  // use saved schools
				  buildSchools(saved_schools);
			  }

		  }
	}





	function buildSchools(schools) {
		var search_div = document.querySelector('.rb_search')
		buildTitle("Alla skolor");
		// search_div.appendChild(title);
		var ul = arrToUl(schools);
		search_div.appendChild(ul);

		let links = search_div.getElementsByTagName("a");

		for (var i = 0, len = links.length; i < len; i++) {
			links[i].onclick = function (e) {
				e.preventDefault();
				let id = e.target.attributes[0].nodeValue;
				console.log(id);

				let titles = getEducations(id);
				getSchoolInfo(id);
				// .then(function(schoolInfo){
				// 	createSchoolInfoElements(schoolInfo);
				// })

				//createEducations(titles);
			}
		}
	}

	  /*
	  * @param school id
	  * @return information
	  *
	  */
	  function getSchoolInfo(id) {
		  let url = "https://susanavet2.skolverket.se/api/1.1/providers/" + id;

		  fetch(url)
		  .then(function(response) {
			  return response.json();
		  })
		  .then(function(myJson) {
			  createSchoolInfoElements(myJson);
		  });
	  }

	  /*
	  * @param school id
	  * @return void
	  *
	  */
	  function createSchoolInfoElements(myJson) {

		  let wrapper = document.querySelector('.rb_search');
		  if (wrapper !== null) {
			  let school = myJson.content.educationProvider;
			  // create elements
			  let content = document.createElement('div');
			  content.id = 'school_info';
			  // create name element
			  let name_el = document.createElement('h2');
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
			  url = fixUrl(url);
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

			  content.appendChild(name_el);
			  content.appendChild(email_el);
			  content.appendChild(url_el);
			  content.appendChild(address_el);
			  content.appendChild(town_el);
			  wrapper.appendChild(content);
		  }


	  }

	  function fixUrl(url) {
		var prefix = '//';
		var www = 'www';
		if (url.substr(0, www.length) === www)
		{
		    url = prefix + url;
		}
		return url;
	  }


	  /*
	  * @param school id
	  * @return educations
	  *
	  */
	  function getEducations(id) {
		 // get educations
		 let educations = [];
		 let url = "https://susanavet2.skolverket.se/api/1.1/infos?id=" + id;
		 let titles = [];

		 fetch(url)
	  	  .then(function(response) {
	  	    return response.json();
	  	  })
	  	  .then(function(myJson) {
		  		myJson.content.map(function(result) {

					titles.push(result.content.educationInfo.title.string[0].content);
	  			})
			// async await bättre?

			createEducations(titles);
			//console.log(titles);
			// return titles;
			})
	  }

	  function createHomeButton() {
		  // create Home Button
		  let button = document.createElement('button');
		  button.id = "home-button";
		  let button_text = document.createTextNode('Visa alla skolor');
		  button.appendChild(button_text);

		  let content = document.querySelector('.rb_search');
		  content.appendChild(button);

		  // Add event listener
		  button.addEventListener('click', function() {
			clearAll();
			createStartPage();

		});
	  }

	  function clearAll() {

		  let search_el = document.querySelector('.rb_search');
		  while (search_el.firstChild) {
			  search_el.removeChild(search_el.firstChild);
		  }
	  }

	  function clearPage() {
		  let school_list = document.getElementById('school_list');
		  if (school_list !== null) {
			  removeElement('school_list');
		  }

		  let el = document.getElementById('educations');
		  if (el !== null) {
			  removeElement('educations');
		  }
	  }

	  function createEducations(titles) {
		  clearPage();
		  //clearAll();

		  let div = document.createElement("div");
		  div.id = 'educations';
		  let search = document.querySelector(".rb_search");

		  let educations = document.createTextNode(titles);
		  div.appendChild(educations);
		  search.appendChild(div);

		  createHomeButton();
	  }

	  function removeElement(id) {
    	var elem = document.getElementById(id);
    	return elem.parentNode.removeChild(elem);
	}


	  function arrToUl(arr) {

		  var ul = document.createElement('ul'), li, link;
		  ul.id = 'school_list';

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


})( jQuery );

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


	*/
	let schools = [];

	 fetch('https://susanavet2.skolverket.se/api/1.1/providers?municipality=1060%2C1080%2C1081%2C1082%2C1083&organisationForm=gymnasieskola&size=25')
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(myJson) {
	    // console.log(myJson);
		myJson.content.map(function(result) {

			schools.push({
				"name": result.content.educationProvider.name.string[0].content,
				"id": result.content.educationProvider.identifier});


		})
		})
		.then(function() {
			var divv = document.querySelector('.rb_search')

			var ul = arrToUl(schools);
			divv.appendChild(ul);

	  });

	  console.log(schools);

	  function arrToUl(arr) {

		  var ul = document.createElement('ul'), li, link;

		  for (var i = 0; i < arr.length; i++) {

			 if (Array.isArray(arr)) {
			    li = document.createElement('li');
				link = document.createElement('a');
				link.setAttribute('href', arr[i].id);
				link.appendChild(document.createTextNode(arr[i].name));
			    li.appendChild(link);
			    ul.appendChild(li);
			}
		  }
		  return ul;
		}


})( jQuery );

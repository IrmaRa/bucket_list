/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(1);
var countries = __webpack_require__(2);

var state = {
  countries: null,
  bucketList: []
}


var app = function() {
  countries.makeRequest( 'https://restcountries.eu/rest/v1', function( countries )  {
    state.countries = countries;
    // Object.assign( {}, state, { countries: countries } )
    UI.populateList( state.countries )
    UI.submitCountry(state.countries);
  });
 
}



window.addEventListener('load', app);




/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var countries = __webpack_require__(2);

var UI = {
  // attachFormOnSubmit: function() {
  //   var form = document.getElementById('new-film-form');
  //   form.addEventListener('submit', function(event) {
  //     event.preventDefault();

  //     var title = form['title-field'].value;
  //     var genre = form['genre-field'].value;
  //     var actors = form['actors-field'].value;

  //     var actorsArray = actors.split(', ');

  //     var filmToAdd = {
  //       title: title,
  //       genre: genre,
  //       actors: actorsArray
  //     }

  //     var films = new Films();
  //     films.add(filmToAdd, function(newData) {

  //     });

  //   });
  // },

  handleChange: function(countries, event){
    var pTag = document.querySelector('#country-info');


    var selectedIndex = event.target.value;
    var country = countries[selectedIndex];

    pTag.innerText = "Name: " + country.name;
    
    this.save(country);
  },


  save: function(newCountry){
    localStorage.setItem('country', JSON.stringify(newCountry));
  },

  populateList: function(countries){
    var select = document.querySelector('#countries-select');


    countries.forEach(function(country, index){
      var option = document.createElement('option');
      option.innerText = country.name;

      option.value = index;
      
      select.appendChild(option);
    });

    select.addEventListener("change", function(event) {
      this.handleChange(countries, event)
    }.bind(this));
  },

  submitCountry: function(countriesArray) {
    var form = document.querySelector('#new-country-form');
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      
      var index = form['countries-select'].value;
      var country = countriesArray[index];
      var countryToAdd = {
        name: country.name
      }

      countries.add(countryToAdd, function(newData) {

      });
    });
  }


}

module.exports = UI;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__(3);

var countries = {
    makeRequest: function(url, onRequestComplete) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.addEventListener('load', function() {
        if(request.status !== 200) return;
        var jsonString = request.responseText;
        var resultsData = JSON.parse(jsonString);
        onRequestComplete(resultsData);
      });
      request.send();
    },

   makePostRequest: function(url, onRequestComplete, payload) {
     var request = new XMLHttpRequest();
     request.open('POST', url);
     request.setRequestHeader('Content-Type', 'application/json');
     request.addEventListener('load', function() {
       var jsonString = request.responseText;
       var updatedCountries = JSON.parse(jsonString);
       onRequestComplete(updatedCountries);
     });
     request.send(payload);
   },

    all: function(onCountriesReady) {
      this.makeRequest('https://restcountries.eu/rest/v1', onCountriesReady);
    },

    add: function(newCountry, callback) {
      var jsonString = JSON.stringify(newCountry);
      this.makePostRequest('http://localhost:3000/api/countries', callback, jsonString);
    }
}

module.exports = countries;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Country = function(options) {
  this.name = options.name;
}

module.exports = Country;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
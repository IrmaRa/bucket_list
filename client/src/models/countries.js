var Country = require('./country');

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
var UI = require("./views/ui");
var countries = require('./models/countries');

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



var countries = require('../models/countries');

var UI = {

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

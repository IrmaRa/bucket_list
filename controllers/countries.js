var express = require('express');
var app = express();
var countryRouter = express.Router();

var Country = require("../client/src/models/country");

var CountryQuery = require('../db/country_query.js');
var query = new CountryQuery();


// index
countryRouter.get('/', function(req, res) {
  query.all(function(countries) {
    res.json(countries);
  });
});

countryRouter.post("/", function(req, res) {
  var newCountry = new Country({
    name: req.body.name
  });
  query.add( newCountry, function(allCountries){
    res.json(allCountries);
  })
})

module.exports = countryRouter;
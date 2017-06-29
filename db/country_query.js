var MongoClient = require('mongodb').MongoClient;

var CountryQuery = function() {
  this.url = 'mongodb://localhost:27017/bucket_list';
}

CountryQuery.prototype = {
  all: function(onQueryFinished) { //index
    MongoClient.connect(this.url, function(err, db) {
      if(err) return;
      var collection = db.collection('countries');
      collection.find().toArray(function(err, docs) {
        if(err) return;
        onQueryFinished(docs);
      });
    });
  },


  add: function(countryToAdd, onQueryFinished) {
    MongoClient.connect(this.url, function( err,db) {
      if( db ) {
        var collection = db.collection( "countries" );
        collection.insert( countryToAdd );
        collection.find().toArray(function(err, docs) {
          if ( docs ) {
            onQueryFinished( docs );
          }
        });
      }
    });
  }
}

module.exports = CountryQuery;
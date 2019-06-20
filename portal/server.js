var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/donorschoose';

MongoClient.connect(url, function(err, db) {

	console.log("Connected");
	db.close()

});

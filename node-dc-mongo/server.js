// modules =================================================
const express        = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
var ObjectID = require('mongodb').ObjectID;
const app = express();
var mongoose       = require('mongoose');
var methodOverride = require('method-override');

// configuration ===========================================
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));


const JSON = require('circular-json');
//const json = JSON.stringify(obj);

/*

MongoClient.connect('mongodb://localhost/local', (err, db) => {
  if (err) return console.log(err)


  app.listen(3000, () => {
    console.log('app working on 3000')
  });

  let dbase = db.db("local");

  app.post('/name/add', (req, res, next) => {

    let name = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };

    dbase.collection("name").save(name, (err, result) => {
      if(err) {
        console.log(err);
      }

      res.send('name added successfully');
    });

  });

  app.get('/name', (req, res, next) => {
    dbase.collection('name').find().toArray( (err, results) => {
      res.send(results)
    });
  });
});
*/


/*
MongoClient.connect('mongodb://localhost/donorchoose', (err, db) => {
  var dbase = db.db("donorchoose");
  if (err) return console.log(err)
  app.listen(3003, () => {
    console.log('app working on 3003')
  })
  app.get('/name', (req, res) => {
    dbase.collection('projects').find().limit(10).toArray( (err, results) => {
      res.send(results)
  	})
  })
});
*/

/*
// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
*/

// configuration ===========================================
	

MongoClient.connect('mongodb://localhost/donorchoose', (err, db) => {
  var dbase = db.db("donorchoose");
  if (err) return console.log(err)
  app.listen(3003, () => {
    console.log('app working on 3003')
  })

	// get all data/stuff of the body (POST) parameters
	app.use(bodyParser.json()); // parse application/json 
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

	app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
	app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes

  app.get('/api/data', (req, res) => {
    dbase.collection('projects').find().limit(10000).toArray( (err, results) => {
   // if there is an error retrieving, send the error. 
       // nothing after res.send(err) will execute
   if (err) 
   res.send(err);
    res.json(results); // return all nerds in JSON format
   });
  });

  // frontend routes =========================================================
 app.get('*', function(req, res) {
  res.sendfile('./public/login.html');
 });
});


// start app ===============================================
//app.listen(port);	
//console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/animal_farm';
var number = require('../modules/numbergen.js');

app.use(express.static('public'));

//establish server
app.listen( '3000', 'localhost', function(req, res){
  console.log('listening on 3000');
});

//base URL
app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});

//inserts animal entered from dom, via client.js into DB 'zoo'
app.post('/postAnimals', urlencodedParser, function(req, res){
  console.log('Animal is sent to DB');
  pg.connect(connectionString, function(err, client, done){
    client.query( 'INSERT INTO zoo (animal, num_of_animal) VALUES ($1, $2)', [req.body.animal, number(1, 100)]);
    done();
  });
  res.end();
});

//return route for DOM
app.get('/getAnimal', function(req, res){
  console.log('sending animal back');
  var results = [];
  pg.connect(connectionString, function(err, client, done){
  var animalRequest=client.query('SELECT * FROM zoo ORDER BY id DESC;');
  animalRequest.on('row', function(row){
    results.push(row);
  });//end grabbing DB row
  animalRequest.on('end', function(){
    return res.json(results);
  });
    if(err){
      console.log(err);
    }
  });//end pg.connect
});//end retrieveChore route

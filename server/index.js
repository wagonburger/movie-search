var express = require('express');
var bodyParser = require('body-parser');
var dataRepository = require('./dataRepository');

var app = express();

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/movies', function(req, res) {
	console.log(req.body);
	
	var skip = req.body.hasOwnProperty('skip') ? req.body.skip : null;
	var limit = req.body.hasOwnProperty('limit') ? req.body.limit : null;
	var filter = req.body.hasOwnProperty('filter') ? req.body.filter : null;

	dataRepository.getMovies(filter, skip, limit).then(data => {
		res.json(data);
	}, (ex) => {
		res.status(500).json({ error: ex.message });
	});
});

var server = app.listen(8000, function(){
  	var port = server.address().port;
	console.log('App started listening on %s',  port);
});
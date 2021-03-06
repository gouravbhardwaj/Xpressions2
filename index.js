var express = require('express');
var app = express();

var pg = require('pg');
pg.defaults.ssl = true;

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {
	// ejs render automatically looks in the views folder
    res.render('public/index');
});

// get products lists
app.get('/productList', function(req, res) {
	// ejs render automatically looks in the views folder
		products = getProductsList(req, res);
		
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});


//DB Code - move to another class
var getProductsList = function(req,res){
	
	pg.connect('postgres://imqmgjnybedxon:5f95ca15ec9ac46554439ee8a888488c1d4d40b047fa5292eb5fe09865413ae0@ec2-107-20-255-96.compute-1.amazonaws.com:5432/d3aucv4f9mnpes', function(err, client) {
	if (err) throw err;
	console.log('Connected to postgres! Getting schemas...');

	client.query('SELECT "ProductName","UnitPrice","Picture","Featured","Latest" FROM "Products" LIMIT 50',
	
	 function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    ///console.log(result);
					
					res.send(result.rows);
                }

            });
	
	});//pg.connect
}
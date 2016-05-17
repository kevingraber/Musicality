// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var User = require("../model/user.js"); // Pulls out the User Model

// Routes
// =============================================================
module.exports = function(app){

	app.get('/something', function(req, res){

		var info = req.user;
		res.json(info);
		
	});

	app.post('/create', 
	function(req, res){
		console.log('post request recieved')
	});

	// Will return a JSON based on the URL that the path is targeting.
	app.get('/api/', function(req, res){

		console.log('===== req.query =====')
		console.log(req.query)
		console.log('=====================')

		// If the URL has parameters...
		if( Object.keys(req.query).length != 0 ){

			// We are building an object of search parameters which will be used by sequelize as search criteria for users. 
			var searchParameters = {}

			// If the URL has an instrument parameter add that to the search criteria, etc...
			if (req.query.instrument) {
				searchParameters.instrument = req.query.instrument
			}
		
			if (req.query.genre) {
				searchParameters.genre = req.query.genre
			}

			if (req.query.skilllevel) {
				searchParameters.skilllevel = req.query.skilllevel
			}

			if (req.query.city) {
				searchParameters.city = req.query.city
			}

			if (req.query.zipcode) {
				searchParameters.zipcode = req.query.zipcode
			}

			console.log('===== search parameters =====')
			console.log(searchParameters)
			console.log('=============================')

			// Return all users that meet the search criteria, minus some bits of sensitive information. 
			User.findAll({
				where: searchParameters,
				attributes: { exclude: ['username', 'password', 'email'] }
			}).then(function(result){
				res.json(result);
			})
		}

		// If no search parameters are entered, return all users (minus sensitive information).
		else {
				User.findAll({
					attributes: { exclude: ['username', 'password', 'email'] }
				})
					.then(function(result){
						res.json(result);
				})
			};
	});

	// This is the path that will create a new user. 
	app.post('/api/create', function(req, res){

		console.log(req.body)
		console.log(req.body.registername)

		// Adds the user to the database. 
		User.create({
			name: req.body.registername,
			username: req.body.registerusername,
			password: req.body.registerpassword,
			email: req.body.registeremail,
			city: req.body.registercity,
			state: req.body.registerstate,
			zipcode: req.body.registerzipcode,
			instrument: req.body.registerinst,
			genre: req.body.registergenre,
			skilllevel: req.body.registerskill,
			sample: req.body.registeryoutube,
			photo: req.body.registerphoto,
			about: req.body.registerabout
		});
		
		// Redirects them to the login page so that they can login!
		res.redirect('/login');

	})
}
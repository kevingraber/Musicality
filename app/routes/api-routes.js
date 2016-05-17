// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var User 	= require("../model/user.js"); // Pulls out the Character Model

// Routes
// =============================================================
module.exports = function(app){

	app.get('/something', function(req, res){

		var info = req.user;
		res.json(info);
		
	});

	// // Search for Specific Character (or all characters) then provides JSON
	// app.get('/api/:characters?', function(req, res){

	// 	console.log(req.query)
	// 	console.log(req.query.length)

	// 	// If the user provides a specific character in the URL...
	// 	if(req.params.characters){

	// 		// Then display the JSON for ONLY that character.
	// 		// (Note how we're using the ORM here to run our searches)
	// 		Character.findAll({
	// 			where: {
	// 				routeName: req.params.characters
	// 			}
	// 		}).then(function(result){
	// 			res.json(result);
	// 		})
	// 	}

	// 	// Otherwise...
	// 	else{
	// 		// Otherwise display the data for all of the characters. 
	// 		// (Note how we're using Sequelize here to run our searches)
	// 			Character.findAll({})
	// 				.then(function(result){
	// 					res.json(result);
	// 			})
	// 		};

	// });

	// Search for Specific Character (or all characters) then provides JSON
	app.get('/api/', function(req, res){

		console.log(req.query)

		// If the user provides a specific character in the URL...
		if(req.query){

			var searchParameters = {}

			if (req.query.instrument) {
				searchParameters.instrument = req.query.instrument
			}
		
			if (req.query.genre) {
				searchParameters.genre = req.query.genre
			}

			if (req.query.skill) {
				searchParameters.skill = req.query.skill
			}

			if (req.query.genre) {
				searchParameters.genre = req.query.genre
			}
			if (req.query.zipcode) {
				searchParameters.zipcode = req.query.zipcode
			}

			// Then display the JSON for ONLY that character.
			// (Note how we're using the ORM here to run our searches)
			// Character.findAll({
			// 	where: {
			// 		role: req.query.role
			// 	}
			// }).then(function(result){
			// 	res.json(result);
			// })

			User.findAll({
				where: searchParameters
			}).then(function(result){
				res.json(result);
			})
		}

		// Otherwise...
		else{
			// Otherwise display the data for all of the characters. 
			// (Note how we're using Sequelize here to run our searches)
				User.findAll({})
					.then(function(result){
						res.json(result);
				})
			};

	});

	// If a user sends data to add a new character...
	app.post('/api/create', function(req, res){

		// Take the request...
		// var character = req.body;

		// Create a routeName 
		// var routeName = character.name.replace(/\s+/g, '').toLowerCase();
		console.log(req.body)
		console.log(req.body.registername)

		// Then add the character to the database using sequelize
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
		
		res.redirect('/');

	})
}
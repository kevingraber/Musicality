// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');
var passport = require('passport')


// Routes
// =============================================================
module.exports = function(app){

	app.get('/',
	function(req, res){
		res.sendFile(path.join(__dirname+'/../public/index.html'));
	});

	app.get('/login', 
	function(req, res){
		res.sendFile(path.join(__dirname+'/../public/login.html'));
	});

	app.post('/create', 
	function(req, res){
		console.log('post request recieved')
	});

	app.post('/login', 
	passport.authenticate('local', { failureRedirect: '/login' }),
 	function(req, res) {
 			res.redirect('/content');
  	});

	app.get('/content',
	require('connect-ensure-login').ensureLoggedIn(), 
	function(req, res){
		res.sendFile(path.join(__dirname+'/../public/content.html'));
	});

	app.get('/logout',
  	function(req, res){
		req.logout();
    	res.redirect('/');
 	});
	

	// Each of the below routes just handles the HTML page that the user gets sent to.
	// app.get('/', function(req, res){
	// 	res.sendFile(path.join(__dirname + '/../public/index.html'));
	// });

	// app.get('/add', function(req, res){
	// 	res.sendFile(path.join(__dirname + '/../public/add.html'));
	// });

	// app.get('/all', function(req, res){
	// 	res.sendFile(path.join(__dirname + '/../public/all.html'));
	// });

}

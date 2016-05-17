// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


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

	app.post('/login', 
	passport.authenticate('local', { failureRedirect: '/login' }),
 	function(req, res) {
 			res.redirect('/content');
  	});

	app.get('/content',
	ensureLoggedIn(),
	function(req, res){
		res.sendFile(path.join(__dirname+'/../public/content.html'));
	});

	app.get('/logout',
  	function(req, res){
		req.logout();
    	res.redirect('/');
 	});

}

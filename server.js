// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express 	= require('express');
var bodyParser 	= require('body-parser');

var mysql = require('mysql');
var morgan = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./app/model/user.js');

// ========== PASSPORT STUFF ================
passport.use(new LocalStrategy(
  	function(username, password, done) {
    	User.findOne({ 
    		where: {
    			username: username
    		}
    	}).then(function(user) {
	      	if (!user) { 
	      		return done(null, false, { message: 'Incorrect credentials.' })
	      	}
	      	if (user.password != password) { 
	      		return done(null, false, { message: 'Incorrect credentials.' }) 
	      	}
	      	return done(null, user);
    	});
  	}
));

passport.serializeUser(function(user, done) {
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  	User.findOne({
  		where: {
  			id: id
  		}
  	}).then(function (user) {
	    if (user == null) {
	    	done(new Error('Wrong user id.'))
	    }
		done(null, user);
 	});
});


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
// app.use(express.static('public'));

app.use(express.static(__dirname + '/app/public'));


app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initializes passport.
app.use(passport.initialize());
// Required for persistent login sessions.
app.use(passport.session());



// Routes
// =============================================================

require("./app/routes/api-routes.js")(app)
require("./app/routes/html-routes.js")(app)




// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})
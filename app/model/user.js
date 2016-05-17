// *********************************************************************************
//USER.JS - THIS FILE CREATES A MODELED OF INDIVIDUAL CHARACTERS IN DB
// *********************************************************************************

// Dependency

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize"); 
// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js"); 

// Creates a "Character" model that matches up with DB
var User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING(50),
	},
	password: {
		type: Sequelize.STRING(50)
	},
	name: {
		type: Sequelize.STRING(50),
	},
	email: {
		type: Sequelize.STRING(50),
	},
	city: {
		type: Sequelize.STRING(50),
	},
	state: {
		type: Sequelize.STRING(50),
	},
	zipcode: {
		type: Sequelize.STRING(5),
	},
	instrument: {
		type: Sequelize.STRING(50),
	},
	genre: {
		type: Sequelize.STRING(50),
	},
	skilllevel: {
		type: Sequelize.STRING(50),
	},
	sample: {
		type: Sequelize.STRING,
	},
	photo: {
		type: Sequelize.STRING,
	},
	about: {
		type: Sequelize.STRING,
	}
},{timestamps: false
});

// Syncs with DB
User.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = User;
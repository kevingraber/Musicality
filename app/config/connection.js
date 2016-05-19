// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Lists out connection options
var source = {

    // localhost: {
    //     port: 3306,
    //     host: 'localhost',
    //     user: 'root',
    //     password: passwords.local,
    //     database: "musicality"
    // },

    jawsDB: {
        port: 3306,
        host: 'g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'fut034mn7fon2a8g',
        password: process.env.PASSWORD,
        database: "lghowl35ljxl5vao" 
    }
}

// Selects a connection (can be changed quickly as needed)
var selectedSource = source.jawsDB;

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize(selectedSource.database, selectedSource.user, selectedSource.password, {
  host: selectedSource.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

// Exports the connection for other files to use
module.exports = sequelize;
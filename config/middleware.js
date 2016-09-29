var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser')

module.exports = function ( app, express ) {
	//Configure middleware
	app.use(bodyParser.urlencoded( {extended: true} ));
	app.use(bodyParser.json());
	app.use(cookieParser('tweeting'));
	//Prevent error from appearing in console
	app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))
	app.use(morgan('dev'));
	app.use(express.static('client'));
};
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser')

module.exports = function ( app, express ) {
	app.use(bodyParser.urlencoded( {extended: true} ));
	app.use(bodyParser.json());
	app.use(cookieParser('tweet much?'));
	app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))
	//Enable cross-orgin access
	app.use(morgan('dev'));
	app.use(express.static('client'));
};
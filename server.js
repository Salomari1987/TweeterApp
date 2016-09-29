var express 	= require('express');
var app 		= express();
var server 		= require('http').createServer(app);

var PORT = 8000;

require('./config/APIKeys.js');
require ('./config/middleware.js')(app, express);
require ('./config/routeHandler.js')(app, express);

app.listen(PORT, function serverListen() {
  console.log('Listening on port ' + PORT);
});

//On crash
app.on ( 'uncaughtException', function () {
  //Close connection
  server.close();
});

// On kill
app.on('SIGTERM', function() {
  server.close();
});

//On exit
app.on('exit', function() {
  server.close();
});

module.exports = app;


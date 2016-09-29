var postTweet = require('./../requestHandlers/postTweet.js');
var signInToTwitter = require('./../requestHandlers/signInToTwitter.js');

module.exports = function (app, express) {
  app.post('/api/sendTweet', postTweet.postTweet);
  app.get('/login', signInToTwitter.login);
  app.get('/callback', signInToTwitter.callback);
};  

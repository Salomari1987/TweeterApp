var Twitter = require('twitter');
var oauth = require('oauth').OAuth;
var callbackURL = "http://127.0.0.1:8000/callback";
var request = require('request');
var oa = new oauth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	process.env.TWITTER_CONSUMER_KEY,
	process.env.TWITTER_CONSUMER_SECRET,
	"1.0",
	callbackURL,
	"HMAC-SHA1"
);
module.exports = function (app, express) {
  app.post('/api/sendTweet', function (req, res, next) {
  console.log(req.session)
  	var tweetBody =  req.body.text;
	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: req.session.oauth.access_token,
		access_token_secret: req.session.oauth.oauth_access_token_secret
	});
	console.log("before post", client)
	client.post('statuses/update', {status:  tweetBody},  function(error, tweet, response) {
		console.log("sent", error)
	  if(error) {
	  	next(error)
	  } else {
		res.json(tweet)
	  }
	});
  });
  app.get('/login', function (req, res) {
  	  	console.log("login called..");
  	  	console.log(req.session)
		oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
		if (error) {
			console.log(error);
			res.send("Error returned: "+error);

		} else {
			console.log("login", error, oauth_token, oauth_token_secret, results)
			req.session.oauth = {};
			req.session.oauth.token = oauth_token;
			req.session.oauth.token_secret = oauth_token_secret;
			res.redirect('https://twitter.com/oauth/authorize?oauth_token='+oauth_token);
		}
	});
  });
  app.get('/callback', function (req, res) {
  	if (req.session.oauth !== undefined) {
		req.session.oauth.verifier = req.query.oauth_verifier;
		var oauth = req.session.oauth;
		console.log("callback", oauth)
		oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier, function(error, oauth_access_token, oauth_access_token_secret, results){
			console.log("callback2", error, oauth_access_token, oauth_access_token_secret, results)
			if (error) {
				console.log("Error: Twitter login failed: ", error);
				res.end("Error occured with callback: "+ error);
			} else {
				req.session.oauth.access_token = oauth_access_token;
				req.session.oauth.oauth_access_token_secret = oauth_access_token_secret;
				req.session.oauth.screen_name = results.screen_name;
        
				console.log("Logged in to Twitter");
        
				var output = '<html><head></head><body onload="window.close();">Close this window</body></html>';
				res.writeHead(200, {'Content-Type': 'text/html'});
        		res.end(output);
			}
		});
	} else {
		res.redirect('/');
	}
  });
};  

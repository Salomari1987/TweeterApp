
var oauth = require('oauth').OAuth;
var callbackURL = "http://127.0.0.1:8000/callback";
var oa = new oauth(
	"https://api.twitter.com/oauth/request_token", //Request URL
	"https://api.twitter.com/oauth/access_token", //Access token URL
	process.env.TWITTER_CONSUMER_KEY,
	process.env.TWITTER_CONSUMER_SECRET,
	"1.0",
	callbackURL, //Callback url, see above
	"HMAC-SHA1"
);
module.exports = {
	login : function (req, res, next) {
		console.log("enter login . . . ");
		oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
			if (error) {
				console.log(error);
				res.send("Error returned: "+error);

			} else {
				req.session.oauth = {};
				req.session.oauth.token = oauth_token;
				req.session.oauth.token_secret = oauth_token_secret;
				res.redirect('https://twitter.com/oauth/authorize?oauth_token='+oauth_token);
			}
		});
	},
	callback: function (req, res, next) {
		if (req.session.oauth !== undefined) {
			req.session.oauth.verifier = req.query.oauth_verifier;
			var oauth = req.session.oauth;
			
			oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier, function (error, oauth_access_token, oauth_access_token_secret, results) {
				if (error) {
					console.log("Error: Twitter login failed: ", error);
					next("Error occured with callback: "+ error);
				} else {
					req.session.oauth.access_token = oauth_access_token;
					req.session.oauth.oauth_access_token_secret = oauth_access_token_secret;
					req.session.oauth.screen_name = results.screen_name;
					
					console.log("Logged in to Twitter");
					
					//Close authorization window
					var closeWindow = '<html><head></head><body onload="window.close();">Close this window</body></html>';
					res.send(closeWindow);
				}
			});
		} else {
			res.redirect('/');
		}
	}
}

//Use twitter library to send tweets
var Twitter = require('twitter');

module.exports = {
	postTweet: function (req, res, next) {
	  	var tweetBody =  req.body.text;
		var client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: req.session.oauth.access_token,
			access_token_secret: req.session.oauth.oauth_access_token_secret
		});
		client.post('statuses/update', {status:  tweetBody},  function (error, tweet, response) {
			if (error) {
				next(error)
			} else {
				res.json(tweet)
			}
		});
	}
}
var Twitter = require('twitter');

module.exports = function (app, express) {
  //center routes
  app.post('/api/sendTweet', function (req, res, next) {
  	var tweetBody =  req.body.text;
  	console.log(process.env)
	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});	
	client.post('statuses/update', {status:  tweetBody},  function(error, tweet, response) {
	  if(error) {
	  	next(error)
	  } else {
		res.json(tweet)
	  }
	});
  });
};  

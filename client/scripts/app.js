var app = {
  text: 'Hello',
};
app.send = function(tweet){
	$.ajax({
	  url: 'http://127.0.0.1:8000/api/sendTweet',
	  type: 'POST',
	  data: JSON.stringify(tweet),
	  contentType: 'application/json',
	  success: function (data) {
	  	$('#status').text("success" + " Tweet is: " + data.text)
	    console.log(data)
	  },
	  error: function (data) {
	  	$('#status').text('failure')
	    console.error('tweet: Failed to send tweet. Error');
	  }
	});
}
app.handleSubmit = function (){
	var text = $('#tweet').val() || (app.text + String.fromCharCode(Math.floor(200000000 * Math.random()) + 32));
	app.send({text:text})
}
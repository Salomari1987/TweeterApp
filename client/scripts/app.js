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
	  	$('#status').text('success')
	    console.log('send success')
	  },
	  error: function (data) {
	  	$('#status').text('failure')
	    console.error('tweet: Failed to send tweet. Error');
	  }
	});
}
app.handleSubmit = function (){
	var text = $('#tweet').val()||app.text
	app.send({text:text})
}
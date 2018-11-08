$(function(){
	"use strict";

	var chatBox = $('#chatBox'); // where the chat log is displayed
	var chatInput = $('#chatInput'); // where user inputs messages
	var username = false; // client's username

	// ensure that mozilla's proprietary websocket is used on firefox
	window.WebSocket = window.WebSocket || window.MozWebSocket;

	// if client's browser doesn't support websocket, display an error and prevent input
	if (!window.WebSocket){
		chatBox.html($('<p>', { text:"This browser doesn\'t support WebSocket." }));
		chatInput.hide();
		$('span').hide();
		return;
	}

	// create connection to server
	var connection = new WebSocket('ws://localhost:9000');
	connection.onopen = function(){
		var nameInput = prompt("Enter desired username");
		username = nameInput;

		connection.send(username);
		chatInput.removeAttr('disabled').focus();
	};

	// if there's an error with connecting
	connection.onerror = function(error){
		chatBox.html($('<p>', { text: "Error with connection or server is down." }));
	};

	// process received messages
	connection.onmessage = function(message){
		// attempt to parse messageJSON
		try {
			var messageJSON = JSON.parse(message.data);
		} catch (e) { console.log("Error parsing JSON: ", message.data); return; }

		// has recieved the chat log
		if (messageJSON.type === 'chatLog'){
			for (var i = 0; i < messageJSON.data.length; i++){
				pushMessage(messageJSON.data[i].author, messageJSON.data[i].bodyText, new Date(messageJSON.data[i].timeStamp));
			}
		// has received an actual message
		} else if (messageJSON.type === 'message'){
			chatInput.removeAttr('disabled').focus();
			pushMessage(messageJSON.data.author, messageJSON.data.bodyText, new Date(messageJSON.data.timeStamp));
		} else { console.log("Error with JSON: ", messageJSON); }
	};

	// send message when enter key is pressed
	chatInput.keydown(function(e){
		if (e.keyCode === 13){
			var sentMessage = $(this).val();
			if (!sentMessage){ return; }
			connection.send(sentMessage);
			$(chatInput).val('');
		}
	});

	// send message when 'send' button is clicked
	$('#sendButton').click(function(){
		var sentMessage = $(chatInput).val();
		if (!sentMessage){ return; }
		connection.send(sentMessage);
		$(chatInput).val('');
	});

	// push message to the chatbox
	function pushMessage(author, message, timeStamp){
		chatBox.prepend(
				'<p>[' + (timeStamp.getHours() < 10 ? '0'
					+ timeStamp.getHours() : timeStamp.getHours()) + ':'
					+ (timeStamp.getMinutes() < 10 ? '0'
					+ timeStamp.getMinutes() : timeStamp.getMinutes())
					+ '] ' + author + ': ' + message + '</p>');
	}
});
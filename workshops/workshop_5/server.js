// import modules
var WebSocketServer = require('websocket').server;
var http = require('http');

var port = 9000;
var chatLog = [ ];
var clients = [ ];

// setting up http server and start listening
var server = http.createServer(function(request, response){

});
server.listen(port, function(){
	console.log((new Date()) + " listening on port " + port + ".\t");
});

// function for escaping input strings
function htmlEntities(str){
	return String(str)
		.replace(/&/g, '&amp;').replace(/</g, '&lt;')
		.replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// setting up websocket server
var wsServer = new WebSocketServer({
	httpServer: server
});
wsServer.on('request', function(request){
	// upon new connection attempt
	console.log((new Date()) + " incoming connection (" + request.origin + ")...\t");
	var connection = request.accept(null, request.origin);
	var clientID = clients.push(connection) - 1;
	var username = false;
	console.log((new Date()) + ' ...connection established.');

	// send new client the chat log
	if (chatLog.length > 0){ connection.sendUTF(JSON.stringify({ type:'chatLog', data: chatLog }));}

	// event listener for this client's messages
	connection.on('message', function(message){
		// ensure only UTF8 messages
		if (message.type === 'utf8'){
			// first message will be the prompt for a username
			if (username === false){
				username = htmlEntities(message.utf8Data);
				console.log((new Date()) + " new user '" + username + "' joined.");
			// log message and send to all clients
			} else {
				console.log((new Date()) + " [" + username + "]: " + message.utf8Data);

				// create message object, store in chat log, and send to all connected clients
				var msgObj = {
					timeStamp: (new Date()).getTime(),
					bodyText: htmlEntities(message.utf8Data),
					author: username
				};
				chatLog.push(msgObj);
				chatLog = chatLog.slice(-100);

				var msgJSON = JSON.stringify({ type: 'message', data: msgObj });
				for (var i = 0; i < clients.length; i++){
					clients[i].sendUTF(msgJSON);
				}
			}
		}
	});

	// when client disconnects
	connection.on('close', function(connection){
		if (username !== false){
			console.log((new Date()) + " user '" + username + "' (" + connection.remoteAddress + ") disconnected.");
			clients.splice(clientID, 1);
		}
	})
});
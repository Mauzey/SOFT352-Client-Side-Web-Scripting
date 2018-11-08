// import modules
var http = require('http');
var url = require('url');

var port = 9000;

// create server object
var server = http.createServer(function(request, response){
	// allow reading of remote resource
	response.writeHead(200, ("Access-Control-Allow-Origin": "*"));

	var url = url.parse(request.url, true);
	response.write("<p>Path Requested: " + url.path + "</p>");

	// respond to the url
	switch(url.path){
		case '/red':
			response.end("<p>Have some <span style=\"color:red\">RED</span>.</p>");
			break;
		case '/blue':
			response.end("<p>Have some <span style=\"color:blue\">BLUE</span>.</p>");
			break;
		case '/green':
			response.end("<p>Have some <span style=\"color:green\">GREEN</span>.</p>");
			break;
		case '/time':
			response.end("<p>" + new Date() + "</p>");
			break;
		default:
			response.end("<p>Have some default text</p>");
			break;
	}
});

server.listen(port, function(){ console.log("Server listening on port " + port); });
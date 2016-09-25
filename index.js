var app = require('express')();
var http = require('http').Server(app);

app.get("/", function(req, res){
	res.send("<h1>SpareChange</h1>");
});

app.get("/", function(req, res){
	res.send("<h1>SpareChange</h1>");
});

http.listen(8080, function(){
	console.log("Listening on *:8080");
});
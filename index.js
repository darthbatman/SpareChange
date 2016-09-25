var app = require('express')();
var http = require('http').Server(app);

app.get("/", function(req, res){
	res.send("<h1>SpareChange</h1>");
});

app.get("/change/:quarters/:dimes/:nickels/:pennies", function(req, res){
	res.send("Spare change data delivered.");
	var quarters = parseInt(req.params.quarters);
	var dimes = parseInt(req.params.dimes);
	var nickels = parseInt(req.params.nickels);
	var pennies = parseInt(req.params.pennies);
	console.log(quarters);
	console.log(dimes);
	console.log(nickels);
	console.log(pennies);
});

http.listen(8080, function(){
	console.log("Listening on *:8080");
});
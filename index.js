var app = require('express')();
var http = require('http').Server(app);
var twilio = require('twilio');
var client = new twilio.RestClient('AC1855c5ea38c7b8de45e1ce3d85e2caf7','acd884dff899531302bdbd4767b9300e');

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

var totalValue = 0;

app.get("/", function(req, res){
	res.send("<h1>SpareChange</h1>");
});

app.get("/change/:quarters/:dimes/:nickels/:pennies", function(req, res){
	res.send("Spare change data delivered.");
	var quarters = parseInt(req.params.quarters);
	var dimes = parseInt(req.params.dimes);
	var nickels = parseInt(req.params.nickels);
	var pennies = parseInt(req.params.pennies);

	var addedChangeValue = quarters * 0.25 + dimes * 0.10 + nickels * 0.05 + pennies * 0.01;

	client.messages.create({
		to: '+17327427351',
		from: '+17324918329',
		body: "Added $" + round(addedChangeValue, 2) + " in spare change!"
	});
});

http.listen(8080, function(){
	console.log("Listening on *:8080");
});
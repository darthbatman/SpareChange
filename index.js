var app = require('express')();
var http = require('http').Server(app);
var twilio = require('twilio');
var client = new twilio.RestClient('AC1855c5ea38c7b8de45e1ce3d85e2caf7','acd884dff899531302bdbd4767b9300e');

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

var totalValue = 0;
var numQuarters = 5;
var numDimes = 4;
var numNickels = 3;
var numPennies = 12;

app.get("/", function(req, res){
	res.send("<h1>SpareChange</h1>");
});

app.get("/change/:quarters/:dimes/:nickels/:pennies", function(req, res){

	res.send("Spare change data delivered.");

	var quarters = parseInt(req.params.quarters);
	var dimes = parseInt(req.params.dimes);
	var nickels = parseInt(req.params.nickels);
	var pennies = parseInt(req.params.pennies);

	numQuarters += quarters;
	numDimes += dimes;
	numNickels += nickels;
	numPennies += pennies;

	var addedChangeValue = quarters * 0.25 + dimes * 0.10 + nickels * 0.05 + pennies * 0.01;
	totalValue += addedChangeValue;

	client.messages.create({
		to: '+17327427351',
		from: '+17324918329',
		body: "Added $" + round(addedChangeValue, 2) + " in spare change!"
	});
});

app.get("/purchase/:value", function(req, res){
	var purchaseAmount = parseFloat(req.params.value);
	var purchaseCents = parseInt(purchaseAmount.toString().split(".")[1]);

	var numPenniesToUse = 0;
	var numNickelsToUse = 0;
	var numDimesToUse = 0;
	var numQuartersToUse = 0;

	var changeSum = 0;

	var leastCoinsUsed = 101;
	var changeCombo = "";

	for (var q = 1; q < numQuarters + 1; q++){
		changeSum = (q * 25);
					if (changeSum == purchaseCents){
						numQuartersToUse = q;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
		for (var d = 1; d < numDimes + 1; d++){
			changeSum = (d * 10 + q * 25);
					if (changeSum == purchaseCents){
						numQuartersToUse = q;
						numDimesToUse = d;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
			for (var n = 1; n < numNickels + 1; n++){
				changeSum = (n * 5 + d * 10 + q * 25);
					if (changeSum == purchaseCents){
						numQuartersToUse = q;
						numDimesToUse = d;
						numNickelsToUse = n;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
				for (var p = 1; p < numPennies + 1; p++){
					changeSum = (p * 1 + n * 5 + d * 10 + q * 25);
					if (changeSum == purchaseCents){
						numQuartersToUse = q;
						numDimesToUse = d;
						numNickelsToUse = n;
						numPenniesToUse = p;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
				}
			}
		}
	}

	if (changeSum != purchaseCents){
		numQuartersToUse = 0;
		numDimesToUse = 0;
		numNickelsToUse = 0;
		numPenniesToUse = 0;
		for (var d = 1; d < numDimes + 1; d++){
			changeSum = (d * 10);
					if (changeSum == purchaseCents){
						numDimesToUse = d;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
			for (var n = 1; n < numNickels + 1; n++){
				changeSum = (n * 5 + d * 10);
					if (changeSum == purchaseCents){
						numDimesToUse = d;
						numNickelsToUse = n;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
				for (var p = 1; p < numPennies + 1; p++){
					changeSum = (p * 1 + n * 5 + d * 10);
					if (changeSum == purchaseCents){
						numDimesToUse = d;
						numNickelsToUse = n;
						numPenniesToUse = p;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
				}
			}
		}
		if (changeSum != purchaseCents){
			numQuartersToUse = 0;
			numDimesToUse = 0;
			numNickelsToUse = 0;
			numPenniesToUse = 0;
			for (var n = 1; n < numNickels + 1; n++){
				changeSum = (n * 5);
					if (changeSum == purchaseCents){
						numNickelsToUse = n;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
				for (var p = 1; p < numPennies + 1; p++){
					changeSum = (p * 1 + n * 5);
					if (changeSum == purchaseCents){
						numNickelsToUse = n;
						numPenniesToUse = p;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
				}
			}
			if (changeSum != purchaseCents){
				numQuartersToUse = 0;
				numDimesToUse = 0;
				numNickelsToUse = 0;
				numPenniesToUse = 0;
				for (var p = 1; p < numPennies + 1; p++){
					changeSum = (p * 1);
					if (changeSum == purchaseCents){
						numPenniesToUse = p;
						console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
						if ((numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse) < leastCoinsUsed){
							leastCoinsUsed = (numQuartersToUse + numDimesToUse + numNickelsToUse + numPenniesToUse);
							changeCombo = (numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse).toString();
						}
						break;
					}
				}
			}
			else {
				//console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
			}
		}
		else {
			//console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
		}
	}
	else {
		//console.log(numQuartersToUse + ", " + numDimesToUse + ", " + numNickelsToUse + ", " + numPenniesToUse);
	}

	console.log("Best Combination: " + changeCombo);

	// if (purchaseCents == 0){
	// 	//use no coins
	// }
	// else if (purchaseCents < 5){
	// 	if (numPennies >= purchaseCents){
	// 		numPenniesToUse = purchaseCents;
	// 	}
	// 	else if (numNickels >= 1) {
	// 		numNickelsToUse = 1;
	// 	}
	// 	else if (numDimes >= 1) {
	// 		numDimesToUse = 1;
	// 	}
	// 	else if (numQuarters >= 1) {
	// 		numQuartersToUse = 1;
	// 	}
	// 	else {
	// 		//use no coins
	// 	}
	// }
	// else if (purchaseCents == 5){
	// 	if (numNickels >= 1){
	// 		numNickelsToUse = 1;
	// 	}
	// 	else if (numPennies >= 5){
	// 		numPenniesToUse = 5;
	// 	}
	// 	else if (numDimes >= 1){
	// 		numDimesToUse = 1;
	// 	}
	// 	else if (numQuarters >= 1){
	// 		numQuartersToUse = 1;
	// 	}
	// 	else {
	// 		//use no coins
	// 	}
	// }
	// else if (purchaseCents > 5 && purchaseCents < 10){
	// 	if (numNickels >= 1){
	// 		numNickelsToUse = 1;

	// 	}
	// }

});

http.listen(8080, function(){
	console.log("Listening on *:8080");
});
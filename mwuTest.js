// written by Siyuan to test the MWURobot
var _ = require("underscore");
var MWURobot = require("./mwuRobot");

// In the Sunscreen / Umbrella example
var robot = new MWURobot(2, 0.1);

var trueWeathers = [1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
var robotMoves = [];

for (var i = 0; i < trueWeathers.length; i++) {
	// Your move
	var move = robot.move(); // 0 == Sunscreen, 1 == Umbrella
	robotMoves.push(move);

	// The weather object is not defined by you, given to you
	var trueWeather = trueWeathers[i];

	console.log("Iteration "+ i + ": " + move+" "+trueWeather);
	// Ternary operator: if trueWeather is 0, cost is 0, otherwise 1
	var costSunscreen = (trueWeather == 0 ? 0 : 1);
	var costUmbrella = (trueWeather == 1 ? 0 : 1);
	var costs = [costSunscreen, costUmbrella];
	robot.receiveCosts(costs);
}

var bestFixedAction = _.max(_.pairs(_.countBy(trueWeathers, function(d) {
	return d;
})), function(d) {
	return d[1];
});
bestFixedAction = parseInt(bestFixedAction[0])
costBestFixedAction = trueWeathers.reduce(function(a, b) {
	return a + ((b != bestFixedAction) ? 1 : 0);
}, 0)
costRobot = robotMoves.reduce(function(a, b, i) {
	return a + ((b != trueWeathers[i]) ? 1 : 0);
}, 0);
regret = (costRobot - costBestFixedAction) / trueWeathers.length;
console.log(regret);

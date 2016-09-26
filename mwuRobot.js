var _ = require("underscore");

var MWURobot = function(N, epsilon) {
    this.weights = _.range(N).map(function(d) { return 1; });
    this.epsilon = epsilon;
}

MWURobot.prototype.receiveCosts = function(costs) {
    for (var i = 0; i < costs.length; i++) {
        this.weights[i] = this.weights[i] * Math.pow(1-this.epsilon, costs[i]);
    }
}

MWURobot.prototype.move = function() {
    // To implement
    var totalWeight = this.weights.reduce(function(a, b) {
        return a+b;
    }, 0);
    var randomNumber = Math.random() * totalWeight;
    var move = 0;
    var tempSum = 0;
    for (var i = 0; i < this.weights.length; i++) {
        tempSum += this.weights[i];
        if (tempSum > randomNumber) {
            move = i;
            break;
        }
    }
    return move;
}

module.exports = MWURobot;

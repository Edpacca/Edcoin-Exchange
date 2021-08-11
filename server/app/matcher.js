const Order = require("./order");
class Matcher {

    buyOrders = [];
    sellOrders = [];

    matchNewOrder = function(newOrder) {
        
        if (newOrder instanceof Order) return false;
        if (newOrder.action !== "BUY" || newOrder.action !== "SELL") return false;

        let potentialMatches;

        if (newOrder.action == "BUY") {
            potentialMatches = compareWithExistingOrders(newOrder, sellOrders);
        } else {
            potentialMatches = compareWithExistingOrders(newOrder, buyOrders);
        };
    };

    getPotentialMatches = function(newOrder, existingOrders) {

        if (newOrder.action == existingOrders[0].action) return false;

        let potentialMatches = [];
        let compareFunction = newOrder.action == "BUY" ? compareBuyOrder : compareSellOrder;

        for (let existingOrder of existingOrders) {
            if (compareFunction(newOrder, existingOrder)) {
                potentialMatches.push(existingOrder);
            }
        }

        return potentialMatches;
    };

    compareBuyOrder = function(newBuyOrder, existingSellOrder) {
        return newBuyOrder.price >= existingSellOrder.price;
    };

    compareSellOrder = function(newSellOrder, existingBuyOrder) {
        return newSellOrder.price <= existingBuyOrder.price;
    };
    
};

module.exports = Matcher;
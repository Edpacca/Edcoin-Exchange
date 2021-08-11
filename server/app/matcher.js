const Order = require("./order");
const MockOrders = require("./mockOrders");
class Matcher {

    constructor(sellOrdersDb, buyOrdersDb) {
        this.sellOrders = sellOrdersDb;
        this.buyOrders = buyOrdersDb;
    };

    matchNewOrder(newOrder) {
        
        if (!(newOrder instanceof Order)) return false;
        if (newOrder.action !== "BUY" && newOrder.action !== "SELL") return false;

        console.log("new order: ");
        console.log(newOrder);

        let existingOrders = newOrder.action == "BUY" ? this.sellOrders : this.buyOrders;
        let potentialMatches = this.getPotentialMatches(newOrder, existingOrders);
        // console.log(potentialMatches);
    };

    getPotentialMatches(newOrder, existingOrders) {

        if (newOrder.action == existingOrders[0].action) return false;

        let potentialMatches;

        if (newOrder.action == "BUY") {
            potentialMatches = existingOrders.filter(order => order.price <= newOrder.price);
        } else {
            potentialMatches = existingOrders.filter(order => order.price >= newOrder.price);
        }
        
        console.log("matches: ")
        console.log(potentialMatches);
        
        return potentialMatches;
    };

    compareBuyOrder(newBuyOrder, existingSellOrder) {
        return newBuyOrder.price >= existingSellOrder.price;
    };

    compareSellOrder(newSellOrder, existingBuyOrder) {
        return newSellOrder.price <= existingBuyOrder.price;
    };
    
};

module.exports = Matcher;
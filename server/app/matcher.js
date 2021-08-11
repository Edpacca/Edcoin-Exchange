const Order = require("./order");
const MockOrders = require("./mockOrders");
class Matcher {

    constructor(sellOrdersDb, buyOrdersDb) {
        this.sellOrders = sellOrdersDb;
        this.buyOrders = buyOrdersDb;
    };

    matchNewOrder(newOrder) {

        if (!this.validateOrder(newOrder)) return false;

        console.log("\n new order: ");
        console.log(newOrder);

        let existingOrders = newOrder.action == "BUY" 
            ? this.sellOrders 
            : this.buyOrders;
        
        let potentialMatches = this.getPotentialMatches(newOrder, existingOrders);
        
        console.log("\n matches: ")
        console.log(potentialMatches);
    };

    validateOrder(newOrder) {

        if (!(newOrder instanceof Order)) return false;
        if (newOrder.action !== "BUY" && newOrder.action !== "SELL") return false;

        return true;
    }

    getPotentialMatches(newOrder, existingOrders) {

        if (newOrder.action == existingOrders[0].action) return false;

        let potentialMatches;

        if (newOrder.action == "BUY") {
            potentialMatches = existingOrders.filter(order => order.price <= newOrder.price);
        } else {
            potentialMatches = existingOrders.filter(order => order.price >= newOrder.price);
        }

        return potentialMatches;
    };
};

module.exports = Matcher;
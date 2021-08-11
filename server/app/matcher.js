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

        let potentialMatches = this.getPotentialMatches(newOrder);
        
        console.log("\n matches: ")
        console.log(potentialMatches);
    };

    validateOrder(newOrder) {

        if (!(newOrder instanceof Order)) return false;
        if (newOrder.action !== "BUY" && newOrder.action !== "SELL") return false;

        return true;
    }

    getPotentialMatches(newOrder) {

        let potentialMatches;

        if (newOrder.action == "BUY") {

            potentialMatches = this.sellOrders.filter(order => order.price <= newOrder.price);
            potentialMatches.sort((a, b) => (a.price > b.price) ? 1: -1);

        } else if (newOrder.action == "SELL") {

            potentialMatches = this.buyOrders.filter(order => order.price >= newOrder.price);
            potentialMatches.sort((a, b) => (a.price < b.price) ? 1: -1);

        } else {

            return false;
        }

        return potentialMatches;
    };
};

module.exports = Matcher;
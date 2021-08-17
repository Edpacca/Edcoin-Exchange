const Order = require("./order");
class Matcher {

    constructor(ordersDb) {
        this.orders = ordersDb;
    };

    matchNewOrder(newOrder) {

        if (!this.validateOrder(newOrder)) return false;
        if (this.orders.length === 0) return false;
        return this.getPotentialMatches(newOrder);
    };

    validateOrder(newOrder) {

        if (!(newOrder instanceof Order)) return false;
        if (newOrder.action !== "BUY" && newOrder.action !== "SELL") return false;
        
        return true;
    }

    getPotentialMatches(newOrder) {

        let potentialMatches = this.filterOrders(newOrder.action);

        if (newOrder.action === "BUY") {

            potentialMatches = potentialMatches.filter(o => o.price <= newOrder.price);
            potentialMatches.sort((a, b) => (b.price - a.price));

        } else if (newOrder.action === "SELL") {

            potentialMatches = potentialMatches.filter(o => o.price >= newOrder.price);
            potentialMatches.sort((a, b) => (a.price - b.price));

        } else {
            return false;
        }

        return potentialMatches;
    };

    filterOrders(action) {

        const opposingAction = action === "BUY" 
            ? "SELL" 
            : "BUY";

        return this.orders.filter(o => o.action == opposingAction);
    }
};

module.exports = Matcher;
class Matcher {

    constructor(ordersDb) {
        this.orders = ordersDb;
    };

    matchNewOrder(newOrder) {
        if (this.orders.length === 0) return false;
        return this.getPotentialMatches(newOrder);
    };

    getPotentialMatches(newOrder) {
        let potentialMatches = this.filterOrders(newOrder.action);

        if (newOrder.action === "BUY") {
            potentialMatches = potentialMatches.filter(o => o.price <= newOrder.price);
            potentialMatches.sort((a, b) => (b.price - a.price));
        } else if (newOrder.action === "SELL") {
            potentialMatches = potentialMatches.filter(o => o.price >= newOrder.price);
            potentialMatches.sort((a, b) => (a.price - b.price));
        }

        return potentialMatches.length === 0 ? false : potentialMatches;
    };

    filterOrders(action) {
        const opposingAction = action === "BUY" 
            ? "SELL" 
            : "BUY";

        return this.orders.filter(o => o.action == opposingAction);
    };
};

module.exports = Matcher;
function Matcher() {

    let buyOrders = [];
    let sellOrders = [];

    function matchNewOrder(newOrder) {
        
        if (typeof newOrder !== Order) return false;
        if (newOrder.action !== "BUY" || newOrder.action !== "SELL") return false;

        let potentialMatches;

        if (newOrder.action == "BUY") {
            potentialMatches = compareWithExistingOrders(newOrder, sellOrders);
        } else {
            potentialMatches = compareWithExistingOrders(newOrder, buyOrders);
        };

    }

    function compareWithExistingOrders(newOrder, existingOrders) {

        if (newOrder.action == existingOrders[0].action) return false;

        let potentialMatches = [];
        let compareFunction = newOrder.action == "BUY" ? compareBuyOrder : compareSellOrder;

        for (let existingOrder of existingOrders) {
            if (compareFunction(newOrder, existingOrder)) {
                potentialMatches.push(existingOrder);
            }
        }

        return potentialMatches;
    }

    function compareBuyOrder(newBuyOrder, existingSellOrder) {
        
        return newBuyOrder.price >= existingSellOrder ? true : false;
    }

    function compareSellOrder(newSellOrder, existingBuyOrder) {
        
        return newSellOrder.price <= existingBuyOrder ? true : false;
    }
    
}

module.exports = Matcher;
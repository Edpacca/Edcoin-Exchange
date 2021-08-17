const Matcher = require("../app/matcher");
const Order = require("../app/order");

describe("Matcher", () => {

    const orders = [
        new Order(0, 20, 1, "BUY"),
        new Order(1, 30, 1, "BUY"),
        new Order(2, 40, 1, "BUY"),
        new Order(3, 20, 1, "SELL"),
        new Order(4, 30, 1, "SELL"),
        new Order(5, 40, 1, "SELL"),
    ];

    const matcher = new Matcher(orders);
 
    describe("filter orders", () => {

        it("returns an array of SELL orders if passed a BUY order", () => {
        
            let isOnlySellActions;
            matcher.filterOrders("BUY").forEach(order => {
                isOnlySellActions = (order.action == "SELL")
            });
            expect(isOnlySellActions).toBe(true);
        });
    
        it("returns an array of BUY orders if passed a SELL order", () => {
            
            let isOnlyBuyActions;
            matcher.filterOrders("SELL").forEach(order => {
                isOnlyBuyActions = (order.action == "BUY")
            });

            expect(isOnlyBuyActions).toBe(true);
        });

    });

    describe("matchNewOrder", () => {

        it("returns empty array if no matches are found", () => {
            // all sell orders are above 10
            let order = new Order(1, 10, 1, "BUY");
            expect(matcher.matchNewOrder(order)).toBe(false);
        });
    
        it("returns an array if passed a valid Order with matches", () => {
            let order = new Order(1, 30, 1, "BUY");
            expect(Array.isArray(matcher.matchNewOrder(order))).toBe(true);
        });
    
        if("returns false if passed an empty database", () => {
            matcher = new Matcher([]);
            expect(matcher.matchNewOrder(new Order(1, 1, 1, "SELL"))).toBe(false);    
        });
    
    });

    describe("getPotentialMatches", () => {

        it("returns false if there are no potential matches", () => {
            expect(matcher.getPotentialMatches(new Order(1, 100, 1, "SELL"))).toBe(false);
        });

        it("returns an array of orders in descending price when passed a BUY order", () => {
            const potentialMatches = matcher.getPotentialMatches(new Order(1, 50, 1, "BUY"));
            expect(potentialMatches[0].price > potentialMatches[1].price).toBe(true);
        });

        it("returns an array of orders in ascending price when passed a BUY order", () => {
            const potentialMatches = matcher.getPotentialMatches(new Order(1, 10, 1, "SELL"));
            expect(potentialMatches[0].price < potentialMatches[1].price).toBe(true);
        });
    });
});
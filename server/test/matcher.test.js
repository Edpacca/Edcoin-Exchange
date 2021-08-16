const Matcher = require("../app/matcher");
const Order = require("../app/order");

describe("Matcher", () => {
    let matcher;
    let orders = [
        new Order(0, 20, 1, "BUY"),
        new Order(1, 30, 1, "BUY"),
        new Order(2, 40, 1, "BUY"),
        new Order(3, 20, 1, "SELL"),
        new Order(4, 30, 1, "SELL"),
        new Order(5, 40, 1, "SELL"),
    ]
    
    beforeEach(() => {
        matcher = new Matcher(orders);
    });

    describe("validate order", () => {

        it("validateOrder returns false if matchNewOrder is passed an invalid order object", () => {
            expect(matcher.validateOrder("badOrder")).toBe(false);
        });
    
        it("validateOrder returns false if the order object has invalid action", () => {
            expect(matcher.validateOrder(new Order(1, 1, 1, "INVALID_ACTION"))).toBe(false);
        });
    
        it("validateOrder returns true if the order object has valid SELL action", () => {
            expect(matcher.validateOrder(new Order(1, 1, 1, "SELL"))).toBe(true);
        });
    
        it("validateOrder returns true if the order object has valid BUY action", () => {
            expect(matcher.validateOrder(new Order(1, 1, 1, "BUY"))).toBe(true);
        });
    });

    it("getPotentialMatches returns false if the order object has invalid action", () => {
        expect(matcher.getPotentialMatches(new Order(1, 1, 1, "INVALID_ACTION"))).toBe(false);
    });

    it("filterOrders returns an array of SELL orders if passed a BUY order", () => {
        
        let isOnlySellActions;

        matcher.filterOrders("BUY").forEach(order => {
            isOnlySellActions = (order.action == "SELL")
        });

        expect(isOnlySellActions).toBe(true);
    });

    it("filterOrders returns an array of BUY orders if passed a SELL order", () => {
        
        let isOnlyBuyActions;

        matcher.filterOrders("SELL").forEach(order => {
            isOnlyBuyActions = (order.action == "BUY")
        });

        expect(isOnlyBuyActions).toBe(true);
    });

    it("matchNewOrder returns empty array if no matches are found", () => {
        // all sell orders are above 10
        let order = new Order(1, 10, 1, "BUY");

    
        expect(matcher.matchNewOrder(order).length).toBe(0);
    });

    it("matchNewOrder returns an array if passed a valid Order with matches", () => {
        
        let order = new Order(1, 30, 1, "BUY");
        expect(Array.isArray(matcher.matchNewOrder(order))).toBe(true);

    });

    it("matchNewOrder returns an array of valid Orders if passed a valid Order with matches", () => {
        
        let newOrder = new Order(1, 30, 1, "BUY");
        let isOrder;

        matcher.matchNewOrder(newOrder).forEach(order => {
            isOrder = matcher.validateOrder(order);
        });

        expect(isOrder).toBe(true);
    });

    if("matchNewOrder returns false if passed an empty database", () => {
        
        matcher = new Matcher([]);
        expect(matcher.matchNewOrder(new Order(1, 1, 1, "SELL"))).toBe(false);    
            
    });

});
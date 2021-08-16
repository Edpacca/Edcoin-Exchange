const tradeManager = require("../app/tradeManager");
const Order = require("../app/order");

describe("TradeManager", () => {

    beforeEach(() => {

    });

    it("makes multiple trades if newOrder is not fulfilled by first trade", () => {
        
        let newOrder = new Order(0, 9, 15, "BUY");

        let matchedOrders = [
            new Order(1, 10, 10, "SELL"),
            new Order(2, 8, 10, "SELL"),
            new Order(3, 6, 10, "SELL"),
        ]

        let numOfPreviousTrades = new tradeManager.getTradeData().trades.length;

        tradeManager.makeTrades(newOrder, matchedOrders);

        expect(tradeManager.getTradeData().trades.length)
            .toBe(numOfPreviousTrades + 2);
    });

    it("throws an error if a matched order has the same action as the newOrder", () => {
        
        let newOrder = new Order(0, 9, 15, "BUY");

        let matchedOrders = [
            new Order(1, 10, 10, "SELL"),
            new Order(2, 8, 10, "BUY"),
            new Order(3, 6, 10, "SELL"),
        ]

        expect(() => 
        {tradeManager.makeTrades(newOrder, matchedOrders)})
        .toThrow("cannot perform trade between orders with same action");
    });

    it("reduces the new order by the correct amount", () => {

        let newOrder = new Order(0, 10, 15, "BUY");

        let matchedOrders = [
            new Order(1, 5, 10, "SELL"),
        ]

        let tm = new tradeManager.makeTrades(newOrder, matchedOrders);

        expect(newOrder.quantity).toBe(5);
    });

    it("reduces the matched order by the correct amount", () => {

        let newOrder = new Order(0, 10, 10, "BUY");

        let matchedOrders = [
            new Order(1, 5, 15, "SELL"),
        ]

        let tm = new tradeManager.makeTrades(newOrder, matchedOrders);

        expect(matchedOrders[0].quantity).toBe(5);
    });

});
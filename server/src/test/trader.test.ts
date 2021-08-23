import { Order } from "../app/order";
import { Trade } from "../app/trade";
import { makeTrades } from "../app/trader";

describe("TradeManager", () => {

    it("throws an error if trading two orders with the same action", () => {
        const newOrder = new Order(0, 9, 15, "BUY");
        const matchedOrders = [
            new Order(1, 10, 10, "SELL"),
            new Order(2, 8, 10, "BUY"),
            new Order(3, 6, 10, "SELL"),
        ];

        expect(() => {makeTrades(newOrder, matchedOrders)})
        .toThrow("cannot perform trade between orders with same action");
    });

    it("returns expected Trade", () => {
        const newOrder = new Order(0, 9, 15, "BUY");
        const matchedOrders = [
            new Order(2, 8, 10, "SELL"),
        ];

        const trades = makeTrades(newOrder, matchedOrders);

        const expectedResults = {
            price: 8,
            quantity: 10
        }

        expect(trades[0].price).toBe(expectedResults.price);
        expect(trades[0].quantity).toBe(expectedResults.quantity);
    });

    it("makes multiple trades if newOrder is not fulfilled by first trade", () => {
        const newOrder = new Order(0, 9, 15, "BUY");
        const matchedOrders = [
            new Order(1, 10, 10, "SELL"),
            new Order(2, 8, 10, "SELL"),
            new Order(3, 6, 10, "SELL")
        ];

        expect(makeTrades(newOrder, matchedOrders).length).toBe(2);
    });

    it("reduces the new order by the correct amount", () => {
        const newOrder = new Order(0, 10, 15, "BUY");
        const matchedOrders = [ new Order(1, 5, 10, "SELL") ];
        makeTrades(newOrder, matchedOrders);

        expect(newOrder.quantity).toBe(5);
    });

    it("reduces the matched order by the correct amount", () => {
        const newOrder = new Order(0, 10, 10, "BUY");
        const matchedOrders = [ new Order(1, 5, 15, "SELL") ];
        makeTrades(newOrder, matchedOrders);

        expect(matchedOrders[0].quantity).toBe(5);
    });
});
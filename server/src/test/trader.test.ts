import { Order } from "../app/order";
import { Trade } from "../app/trade";
import { makeTrades } from "../app/trader";
import { AccountType } from "../models/accountType";
import { DirectionType } from "../models/directionType";

describe("TradeManager", () => {

    it("throws an error if trading two orders with the same direction", () => {
        const newOrder = new Order("id", AccountType.USD, 9, 15, DirectionType.Buy);
        const matchedOrders = [
            new Order("id", AccountType.USD, 10, 10, DirectionType.Sell),
            new Order("id", AccountType.USD, 8, 10, DirectionType.Buy),
            new Order("id", AccountType.USD, 6, 10, DirectionType.Sell),
        ];

        expect(() => {makeTrades(newOrder, matchedOrders)})
        .toThrow("cannot perform trade between orders with same direction");
    });

    it("returns expected Trade", () => {
        const newOrder = new Order("id", AccountType.USD, 9, 15, DirectionType.Buy);
        const matchedOrders = [
            new Order("id", AccountType.USD, 8, 10, DirectionType.Sell),
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
        const newOrder = new Order("id", AccountType.USD, 9, 15, DirectionType.Buy);
        const matchedOrders = [
            new Order("id", AccountType.USD, 10, 10, DirectionType.Sell),
            new Order("id", AccountType.USD, 8, 10, DirectionType.Sell),
            new Order("id", AccountType.USD, 6, 10, DirectionType.Sell)
        ];

        expect(makeTrades(newOrder, matchedOrders).length).toBe(2);
    });

    it("reduces the new order by the correct amount", () => {
        const newOrder = new Order("id", AccountType.USD, 10, 15, DirectionType.Buy);
        const matchedOrders = [ new Order("id", AccountType.USD, 5, 10, DirectionType.Sell) ];
        makeTrades(newOrder, matchedOrders);

        expect(newOrder.quantity).toBe(5);
    });

    it("reduces the matched order by the correct amount", () => {
        const newOrder = new Order("id", AccountType.USD, 10, 10, DirectionType.Buy);
        const matchedOrders = [ new Order("id", AccountType.USD, 5, 15, DirectionType.Sell) ];
        makeTrades(newOrder, matchedOrders);

        expect(matchedOrders[0].quantity).toBe(5);
    });
});
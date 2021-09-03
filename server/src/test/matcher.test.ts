import { Matcher } from "../app/matcher";
import { Order } from "../app/order";
import { AccountType } from "../models/accountType";
import { DirectionType } from "../models/directionType";

describe("Matcher", () => {

    const orders = [
        new Order("id", AccountType.USD, 20, 1, DirectionType.Buy),
        new Order("id", AccountType.USD, 30, 1, DirectionType.Buy),
        new Order("id", AccountType.USD, 40, 1, DirectionType.Buy),
        new Order("id", AccountType.USD, 20, 1, DirectionType.Sell),
        new Order("id", AccountType.USD, 30, 1, DirectionType.Sell),
        new Order("id", AccountType.USD, 40, 1, DirectionType.Sell),
    ];

    const matcher = new Matcher(orders);
 
    describe("filter orders", () => {

        it("returns an array of SELL orders if passed a BUY order", () => {
        
            let isOnlySellDirections;
            matcher.filterOrders(DirectionType.Buy).forEach(order => {
                isOnlySellDirections = (order.direction === DirectionType.Sell)
            });
            expect(isOnlySellDirections).toBe(true);
        });
    
        it("returns an array of BUY orders if passed a SELL order", () => {
            
            let isOnlyBuyDirections;
            matcher.filterOrders(DirectionType.Sell).forEach(order => {
                isOnlyBuyDirections = (order.direction === DirectionType.Buy)
            });

            expect(isOnlyBuyDirections).toBe(true);
        });

    });

    describe("matchNewOrder", () => {

        it("returns an empty array if no matches are found", () => {
            // all sell orders are above 10
            let order = new Order("id", AccountType.USD, 10, 1, DirectionType.Buy);
            expect(matcher.matchNewOrder(order)).toEqual([]);
        });
    
        it("returns the correct matches if passed a valid Order", () => {
            let order = new Order("id", AccountType.USD, 30, 1, DirectionType.Buy);
            let matches = matcher.matchNewOrder(order);
            expect(matches[0]).toBe(orders[4]);
            expect(matches[1]).toBe(orders[3]);
            expect(matches[2]).toBe(undefined);

        });
    
        it("returns an empty array if passed an empty database", () => {
            expect(new Matcher([]).matchNewOrder(new Order("id", AccountType.USD, 1, 1, DirectionType.Sell))).toEqual([]);    
        });
    
    });

    describe("getPotentialMatches", () => {

        it("returns empty array if there are no potential matches", () => {
            expect(matcher.getPotentialMatches(new Order("id", AccountType.USD, 100, 1, DirectionType.Sell))).toEqual([]);
        });

        it("returns an array of orders in descending price when passed a BUY order", () => {
            const potentialMatches = matcher.getPotentialMatches(new Order("id", AccountType.USD, 50, 1, DirectionType.Buy));
            expect(potentialMatches[0].price > potentialMatches[1].price).toBe(true);
        });

        it("returns an array of orders in ascending price when passed a BUY order", () => {
            const potentialMatches = matcher.getPotentialMatches(new Order("id", AccountType.USD, 10, 1, DirectionType.Sell));
            expect(potentialMatches[0].price < potentialMatches[1].price).toBe(true);
        });
    });
});
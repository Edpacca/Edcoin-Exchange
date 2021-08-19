import { Matcher } from "../app/matcher";
import { Order } from "../app/order";
import { Trade } from "../app/trade";
import { ServiceManager } from "../service/ServiceManager";

describe("ServiceManager", () => {
 
    describe("validate order", () => {

        const serviceManager = new ServiceManager([], [], new Matcher([]));
    
        it("validateOrder returns false if the order object has invalid action", () => {
            expect(serviceManager.validateOrder(new Order(1, 1, 1, "INVALID_ACTION"))).toBe(false);
        });
    
        it("validateOrder returns true if the order object has valid SELL action", () => {
            expect(serviceManager.validateOrder(new Order(1, 1, 1, "SELL"))).toBe(true);
        });
    
        it("validateOrder returns true if the order object has valid BUY action", () => {
            expect(serviceManager.validateOrder(new Order(1, 1, 1, "BUY"))).toBe(true);
        });
    });

    describe("handleNewOrder", () => {

        const createMatcher = (orders: Order[]) => (<Matcher><unknown>{ matchNewOrder: (order: Order) => orders });

        it("adds the new order to the database if no matches are found", () => {
            const orders: Order[] = [];
            const newOrder = new Order(1, 10, 1, "BUY");
            const serviceManager = new ServiceManager(orders, [], createMatcher(orders));
            serviceManager.handleNewOrder(newOrder);
            expect(orders.includes(newOrder)).toBe(true);
        });

        it("adds the new order to the database if it is partially completed", () => {
            const orders = [
                new Order(0, 20, 1, "SELL"),
                new Order(1, 30, 1, "SELL"),
            ];

            const serviceManager = new ServiceManager(orders, [], createMatcher(orders));
            const newOrder = new Order(1, 30, 10, "BUY");
            serviceManager.handleNewOrder(newOrder);
            expect(newOrder.quantity === 8 && orders.includes(newOrder)).toBe(true);
        });

        it("does not add a new order to the database if it is fulfilled", () => {
            const orders = [
                new Order(1, 30, 10, "SELL"),
            ];

            const serviceManager = new ServiceManager(orders, [], createMatcher(orders));
            const newOrder = new Order(1, 30, 1, "BUY");
            serviceManager.handleNewOrder(newOrder);
            expect(newOrder.quantity === 0 && orders.includes(newOrder)).toBe(false);
        });

        it("removes completed orders from the database", () => {
            const existingOrder = new Order(0, 20, 1, "SELL");
            const orders = [
                existingOrder
            ];

            const serviceManager = new ServiceManager(orders, [], createMatcher(orders));
            const newOrder = new Order(1, 30, 10, "BUY");
            serviceManager.handleNewOrder(newOrder);
            expect(orders.includes(existingOrder)).toBe(false);
        });

        it("removes orders with 0 remaining quantity from the database", () => {
            const orders = [
                new Order(0, 20, 1, "SELL"),
                new Order(0, 20, 0, "SELL"),
                new Order(0, 20, 0, "SELL"),
                new Order(0, 20, 0, "SELL"),
            ];

            const serviceManager = new ServiceManager(orders, [], createMatcher(orders));
            const newOrder = new Order(1, 30, 10, "BUY");
            serviceManager.handleNewOrder(newOrder);
            expect(orders.filter(o => o.quantity === 0).length).toBe(0);
        });

        it("adds each trade to the tradesDb after successful trade", () => {
            const trades: Trade[] = []
            const orders = [
                new Order(0, 20, 1, "SELL"),
                new Order(1, 30, 1, "SELL"),
            ];

            const serviceManager = new ServiceManager(orders, trades, createMatcher(orders));
            const newOrder = new Order(1, 30, 10, "BUY");
            serviceManager.handleNewOrder(newOrder);
            expect(trades.length).toBe(2);
        });
    });
});
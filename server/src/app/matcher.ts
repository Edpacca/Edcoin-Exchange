import { Order } from "./order";

export class Matcher {

    constructor(readonly orders: Order[]) {
    }

    matchNewOrder(newOrder: Order): Order[] {
        if (this.orders.length === 0) return [];
        return this.getPotentialMatches(newOrder);
    }

    getPotentialMatches(newOrder: Order): Order[] {
        let potentialMatches = this.filterOrders(newOrder.action);

        if (newOrder.action === "BUY") {
            potentialMatches = potentialMatches.filter(o => o.price <= newOrder.price);
            potentialMatches.sort((a, b) => (b.price - a.price));
        } else if (newOrder.action === "SELL") {
            potentialMatches = potentialMatches.filter(o => o.price >= newOrder.price);
            potentialMatches.sort((a, b) => (a.price - b.price));
        }

        return potentialMatches;
    }

    filterOrders(action: string): Order[] {
        const opposingAction = action === "BUY" 
            ? "SELL" 
            : "BUY";

        return this.orders.filter(o => o.action == opposingAction);
    }
}
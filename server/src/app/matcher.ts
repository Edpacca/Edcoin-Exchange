import { DirectionType } from "../models/directionType";
import { Order } from "./order";

export class Matcher {

    constructor(readonly orders: Order[]) {
    }

    matchNewOrder(newOrder: Order): Order[] {
        if (this.orders.length === 0) return [];
        return this.getPotentialMatches(newOrder);
    }

    getPotentialMatches(newOrder: Order): Order[] {
        const account = newOrder.account;
        let potentialMatches = this.filterOrders(newOrder.direction).filter(o => o.account === newOrder.account);

        if (newOrder.direction === DirectionType.Buy) {
            potentialMatches = potentialMatches.filter(o => o.price <= newOrder.price);
            potentialMatches.sort((a, b) => (b.price - a.price));
        } else if (newOrder.direction === DirectionType.Sell) {
            potentialMatches = potentialMatches.filter(o => o.price >= newOrder.price);
            potentialMatches.sort((a, b) => (a.price - b.price));
        }

        return potentialMatches;
    }

    filterOrders(direction: DirectionType): Order[] {
        const opposingDirection = direction === DirectionType.Buy 
            ? DirectionType.Sell 
            : DirectionType.Buy;

        return this.orders.filter(o => o.direction == opposingDirection);
    }
}
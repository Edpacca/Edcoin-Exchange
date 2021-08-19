import { Order } from './order';

export class Trade {

    time = new Date();
    price: number;
    quantity: number;
    // more specific name
    action: string;
    orderId1: string;
    orderId2: string;

    constructor(existingOrder: Order, newOrder: Order) {
        this.price = existingOrder.price;
        this.quantity = Math.min(
            existingOrder.quantity, newOrder.quantity);
        this.action = existingOrder.action;
        this.orderId1 = existingOrder.id;
        this.orderId2 = newOrder.id;

        this.#makeTrade(existingOrder, newOrder);
    }

    #makeTrade(existingOrder: Order, newOrder: Order): void {
        existingOrder.quantity -= this.quantity;
        newOrder.quantity -= this.quantity;
    }
}
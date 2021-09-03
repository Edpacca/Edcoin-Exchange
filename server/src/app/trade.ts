import { AccountType } from '../models/accountType';
import { Order } from './order';

export class Trade {

    time = new Date();
    price: number;
    quantity: number;
    orderId1: string;
    orderId2: string;
    userId1: string;
    userId2: string;
    account: AccountType;

    constructor(existingOrder: Order, newOrder: Order) {
        this.price = existingOrder.price;
        this.quantity = Math.min(
            existingOrder.quantity, newOrder.quantity);
        this.orderId1 = existingOrder.id;
        this.orderId2 = newOrder.id;
        this.userId1 = existingOrder.userId;
        this.userId2 = newOrder.userId;
        this.account = existingOrder.account;

        this.#makeTrade(existingOrder, newOrder);
    }

    #makeTrade(existingOrder: Order, newOrder: Order): void {
        existingOrder.quantity -= this.quantity;
        newOrder.quantity -= this.quantity;
    }
}
import { AccessorDeclaration } from 'typescript';
import { AccountType } from '../models/accountType';
import { DirectionType } from '../models/directionType';
import { Order } from './order';

export class Trade {

    time = new Date();
    price: number;
    quantity: number;
    orderId1: string;
    orderId2: string;
    account: AccountType;

    constructor(existingOrder: Order, newOrder: Order) {
        this.price = existingOrder.price;
        this.quantity = Math.min(
            existingOrder.quantity, newOrder.quantity);
        this.orderId1 = existingOrder.id;
        this.orderId2 = newOrder.id;
        this.account = existingOrder.account;

        this.#makeTrade(existingOrder, newOrder);
    }

    #makeTrade(existingOrder: Order, newOrder: Order): void {
        existingOrder.quantity -= this.quantity;
        newOrder.quantity -= this.quantity;
    }
}
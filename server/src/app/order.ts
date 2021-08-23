import { v4 as uuid } from 'uuid';

export class Order {

    orderTime = new Date();
    id = uuid();
    quantity: number;
    account: number;
    price: number;
    action: string;

    constructor(account: number, price: number, quantity: number, action: string) {
        this.account = account;
        this.quantity = quantity;
        this.price = price;
        this.action = action;
    }
}

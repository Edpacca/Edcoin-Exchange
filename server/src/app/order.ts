import { v4 as uuid } from 'uuid';
import { DirectionType } from '../models/directionType';
import { AccountType } from '../models/accountType';
export class Order {

    time = new Date();
    id = uuid();
    userId: string;
    quantity: number;
    account: AccountType;
    price: number;
    direction: DirectionType;

    constructor(userId: string, account: AccountType, price: number, quantity: number, direction: DirectionType) {
        this.userId = userId;
        this.account = account;
        this.quantity = quantity;
        this.price = price;
        this.direction = direction;
    }
}

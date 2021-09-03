import { Order } from "../app/order";
import { AccountType } from "../models/accountType";
import { DirectionType } from "../models/directionType";
import { UserAccount } from "../models/userAccount";
import { userAccounts } from "./mockUsers";

export function getMockOrder(direction: DirectionType = DirectionType.Buy ): boolean | Order {
    return new Order(
        getRandomUserId(),
        getRandomAccount(), 
        getRandomArbitrary(10, 80), 
        getRandomInt(1, 50), direction);
}

// generates an equal amount of orders with opposing directions
export function getMockOrders(maxOrders: number = 15): Order[] {
    let orders: Order[] = [];
    for (let i = 0; i < maxOrders * 2; i++) {
        let direction = i < maxOrders ? DirectionType.Sell : DirectionType.Buy;
        let newOrder = new Order(
            getRandomUserId(),
            getRandomAccount(), 
            getRandomArbitrary(10, 80), 
            getRandomInt(1, 50), direction);

        orders.push(newOrder);
    }
    return orders;
}

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const accounts = [
    AccountType.CAD,
    AccountType.CHF,
    AccountType.EUR,
    AccountType.GBP,
    AccountType.JPY,
    AccountType.USD
]

function getRandomAccount():AccountType {
    const index = getRandomInt(0, accounts.length);
    return accounts[index];
}

function getRandomUserId():string {
    const index = getRandomInt(0, userAccounts.length);
    return userAccounts[index].id;
}
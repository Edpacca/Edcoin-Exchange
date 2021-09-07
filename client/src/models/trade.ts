import { AccountType } from './accountType';
export interface Trade {
    readonly time: Date,
    readonly id: string,
    readonly price: number;
    readonly quantity: number;
    readonly orderId1: string;
    readonly orderId2: string;
    readonly userId1: string;
    readonly userId2: string;
    readonly account: AccountType;
}
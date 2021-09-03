import { AccountType } from "./accountType";
import { DirectionType } from "./directionType";
export interface Order {
    readonly time: Date;
    readonly id: string;
    readonly userId: string;
    readonly account: AccountType;
    readonly quantity: number;
    readonly price: number;
    readonly direction: DirectionType;
}
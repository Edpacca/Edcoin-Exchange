import { AccountType } from "./accountType";
import { DirectionType } from "./directionType";

export interface OrderRequest {
    readonly account: AccountType,
    readonly quantity: number,
    readonly price: number,
    readonly direction: DirectionType,
}
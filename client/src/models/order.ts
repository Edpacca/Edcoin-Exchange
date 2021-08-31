import { DirectionType } from "./directionType";

export interface Order {
    readonly orderTime: Date,
    readonly id: string,
    readonly account: number,
    readonly quantity: number,
    readonly price: number,
    readonly direction: DirectionType,
}
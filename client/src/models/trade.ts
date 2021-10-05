import { MarketType } from './marketType';
export interface Trade {
    readonly time: Date,
    readonly id: string,
    readonly price: number;
    readonly quantity: number;
    readonly buyOrderId: string;
    readonly sellOrderId: string;
    readonly buyUserId: string;
    readonly sellUserId: string;
    readonly market: MarketType;
}
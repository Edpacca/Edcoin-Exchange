import { MarketType } from './marketType';
import { ExchangeType } from './exchangeType';
export interface Order {
    readonly time: Date;
    readonly id: string;
    readonly userId: string;
    readonly market: MarketType;
    readonly quantity: number;
    readonly price: number;
    readonly exchange: ExchangeType;
}
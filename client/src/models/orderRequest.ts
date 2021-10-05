import { MarketType } from './marketType';
import { ExchangeType } from './exchangeType';
export interface OrderRequest {
    readonly market: MarketType;
    readonly quantity: number;
    readonly price: number;
    readonly exchange: ExchangeType;
    readonly userId: string;
    readonly token: string;
}
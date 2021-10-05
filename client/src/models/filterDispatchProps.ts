import { MarketType } from './marketType';
import { ExchangeType } from './exchangeType';

export interface FilterDispatchProps {
    filterPrice: (range: number[]) => void;
    filterQuantity: (range: number[]) => void;
    changeAccountType: (account: MarketType) => void;
    changeDirectionType:(direction: ExchangeType) => void;
}
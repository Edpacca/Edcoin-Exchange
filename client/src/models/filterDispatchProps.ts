import { AccountType } from './accountType';
import { DirectionType } from './directionType';

export interface FilterDispatchProps {
    filterPrice: (range: number[]) => void;
    filterQuantity: (range: number[]) => void;
    changeAccountType: (account: AccountType) => void;
    changeDirectionType:(direction: DirectionType) => void;
}
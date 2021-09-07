import { ActionReducerMapBuilder, createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Trade } from '../../models/trade';
import { FilterState, selectPublicFilters, selectPrivateFilters } from '../filters/filterSlice';
import { rangeFilter } from '../../utilities/filterHelpers';
import { AccountType } from '../../models/accountType';
export interface TradesState {
    value: Trade[];
    status: 'idle' | 'loading' | 'failed';
}

export const initialState: TradesState = {
    value: [],
    status: 'idle'
};

export const fetchTrades = createAsyncThunk(
    'trades/fetchTrades',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/trades`)
        .then(response => response.json())
        return response;
    }
);

export const tradeSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<TradesState>) => {
        builder
            .addCase(fetchTrades.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrades.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload
            });
    }
})

export const selectTrades = (state: RootState): Trade[] => state.trades.value;

export const selectFilteredPublicTrades = createSelector(
    selectTrades,
    selectPublicFilters,
    (trades, typeFilters) => filterTrades(trades, typeFilters)
)

const selectFilteredPrivateTrades = createSelector(
    selectTrades,
    selectPrivateFilters,
    (trades, typeFilters) => filterTrades(trades, typeFilters)
)

export const selectFilteredTradesByUser = createSelector(
    selectFilteredPrivateTrades,
    state => state.users.activeUser,
    (trades, activeUser) => {
        if (!activeUser) return [];
        return trades.filter(
            trade => trade.userId1 === activeUser.id ||
                trade.userId2 === activeUser.id);
    }
)

function filterTrades(trades: Trade[], typeFilters: FilterState) {
    const { accountFilter, priceFilter, quantityFilter } = typeFilters;

    const tradesByType = (trades: Trade[]): Trade[] => {
        return accountFilter === AccountType.All
        ? trades
        : trades.filter(trade => trade.account === accountFilter);
    }

    const tradesByRange = (trades: Trade[]): Trade[] => {
        return trades.filter(trade =>
            rangeFilter(trade.price, priceFilter[0], priceFilter[1]) &&
            rangeFilter(trade.quantity, quantityFilter[0], quantityFilter[1]));
    }

    return tradesByRange(tradesByType(trades));
}

export default tradeSlice.reducer;
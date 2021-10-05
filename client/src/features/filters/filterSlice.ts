import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MarketType } from '../../models/marketType';
import { ExchangeType } from '../../models/exchangeType';
export interface FilterState {
    directionFilter: ExchangeType;
    accountFilter: MarketType,
    priceFilter: number[],
    quantityFilter: number[]
}

const initialState = {
    public: {
        directionFilter: ExchangeType.All,
        accountFilter: MarketType.All,
        priceFilter: [0, 100],
        quantityFilter: [0, 100]
    },
    private: {
        directionFilter: ExchangeType.All,
        accountFilter: MarketType.All,
        priceFilter: [0, 100],
        quantityFilter: [0, 100]
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        directionTypeChangedPublic: (state, action: {type: string, payload: ExchangeType}) => {
            state.public.directionFilter = action.payload;
        },
        accountFilterChangedPublic: (state, action) => {
            state.public.accountFilter = action.payload;
        },
        priceFilterChangedPublic: (state, action) => {
            state.public.priceFilter[0] = action.payload[0];
            state.public.priceFilter[1] = action.payload[1];
        },
        quantityFilterChangedPublic: (state, action) => {
            state.public.quantityFilter[0] = action.payload[0];
            state.public.quantityFilter[1] = action.payload[1];
        },
        directionTypeChangedPrivate: (state, action: {type: string, payload: ExchangeType}) => {
            state.private.directionFilter = action.payload;
        },
        accountFilterChangedPrivate: (state, action) => {
            state.private.accountFilter = action.payload;
        },
        priceFilterChangedPrivate: (state, action) => {
            state.private.priceFilter[0] = action.payload[0];
            state.private.priceFilter[1] = action.payload[1];
        },
        quantityFilterChangedPrivate: (state, action) => {
            state.private.quantityFilter[0] = action.payload[0];
            state.private.quantityFilter[1] = action.payload[1];
        }
    }
});

export const { 
    directionTypeChangedPublic,
    accountFilterChangedPublic,
    priceFilterChangedPublic,
    quantityFilterChangedPublic,
    directionTypeChangedPrivate,
    accountFilterChangedPrivate,
    priceFilterChangedPrivate,
    quantityFilterChangedPrivate,
} = filterSlice.actions;

export const selectPublicFilters = (state: RootState): FilterState => state.filters.public;
export const selectPrivateFilters = (state: RootState): FilterState => state.filters.private;

export default filterSlice.reducer;
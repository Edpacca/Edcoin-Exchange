import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { AccountType } from "../../models/accountType";
import { DirectionType } from '../../models/directionType';

export interface FilterState {
    directionFilter: DirectionType;
    accountFilter: AccountType,
    priceFilter: number[],
    quantityFilter: number[]
}

const initialState: FilterState = {
    directionFilter: DirectionType.All,
    accountFilter: AccountType.All,
    priceFilter: [0, 100],
    quantityFilter: [0, 100]
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        directionTypeChanged: (state, action: {type: string, payload: DirectionType}) => {
            state.directionFilter = action.payload;
        },
        accountFilterChanged: (state, action) => {
            state.accountFilter = action.payload;
        },
        priceFilterChanged: (state, action) => {
            state.priceFilter[0] = action.payload[0];
            state.priceFilter[1] = action.payload[1];
        },
        quantityFilterChanged: (state, action) => {
            state.quantityFilter[0] = action.payload[0];
            state.quantityFilter[1] = action.payload[1];
        }
    }
});

export const { 
    directionTypeChanged,
    accountFilterChanged,
    priceFilterChanged,
    quantityFilterChanged
} = filterSlice.actions;

export const selectFilters = (state: RootState): FilterState => state.filters;

export default filterSlice.reducer;
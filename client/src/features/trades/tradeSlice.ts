import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { Trade } from "../../models/trade";

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

export default tradeSlice.reducer;
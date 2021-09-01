import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { OrderRequest } from '../../models/orderRequest';
import { Order } from "../../models/order";
import { fetchTrades } from '../trades/tradeSlice';

export interface OrdersState {
    value: Order[];
    status: 'idle' | 'loading' | 'failed';
}

export const initialState: OrdersState = {
    value: [],
    status: 'idle',
};

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/orders`)
        .then(response => response.json())
        return response;
    }
);

export const createOrder = createAsyncThunk(
    'orders/orderCreated', async (order: OrderRequest) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/order`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(response => response.json());
        return response;
    }
)

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<OrdersState>) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                const order: Order = action.payload;
                state.value.push(order);
                fetchTrades();
            });
    },
});

export const selectOrders = (state: RootState): Order[] => state.orders.value;
// temporarily selecting all orders
export const selectOrdersById = (state: RootState): Order[] => state.orders.value;

export default orderSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";
import { Order } from "../models/order";
import { DirectionType } from '../models/directionType';
export interface OrdersState {
    orders: Order[];
    status: 'idle' | 'loading' | 'failed';
}

export const initialState: OrdersState = {
    orders: [
        {
            orderTime: new Date(),
            id: "f9a40020-2e52-473b-92de-2d65d3c6d774",
            account: 0,
            quantity: 46,
            price: 39.548511672746095,
            direction: DirectionType.Sell
        },  
        {   
            orderTime: new Date(),
            id: "ba8a32b9-2e68-4db2-89d8-74994ab2887e",
            account: 1,
            quantity: 12,
            price: 44.94696969930247,
            direction: DirectionType.Sell
        },  
        {   
            orderTime: new Date(),
            id: "5ab0ecdc-9ca5-471e-9c06-09560dc2ab7a",
            account: 2,
            quantity: 30,
            price: 77.09042122916647,
            direction: DirectionType.Buy
        },  
        {   
            orderTime: new Date(),
            id: "8423076d-10d3-46ff-a2b7-d6ebe715b532",
            account: 3,
            quantity: 32,
            price: 39.84791285233185,
            direction: DirectionType.Buy
        },
    ],
    status: 'idle',
};

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        createOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
            state.status = 'idle';
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            state.orders.filter(o => o.id !== action.payload);
        }
    }
});

export const { createOrder, deleteOrder } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;

export default orderSlice.reducer;

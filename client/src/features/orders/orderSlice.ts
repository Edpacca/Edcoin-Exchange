import { ActionReducerMapBuilder, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { OrderRequest } from '../../models/orderRequest';
import { Order } from '../../models/order';
import { FilterState, selectPublicFilters, selectPrivateFilters } from '../filters/filterSlice';
import { rangeFilter } from '../../utilities/filterHelpers';
import { DirectionType } from '../../models/directionType';
import { AccountType } from '../../models/accountType';
export interface OrdersState {
    value: Order[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: OrdersState = {
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
    'orders/orderCreated', 
    async (order: OrderRequest): Promise<Order> => {
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
            .addCase(fetchOrders.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(createOrder.rejected, (state) => {
                state.status = 'failed'
            });
    },
});

export const selectOrders = (state: RootState): Order[] => state.orders.value;

// returns a list of order ids
export const selectOrderIds = createSelector(
    selectOrders,
    orders => orders.map(order => order.id)
);

export const selectFilteredPublicOrders = createSelector(
    selectOrders,
    selectPublicFilters,
    (orders, typeFilters) => filterOrders(orders, typeFilters)
)

const selectFilteredPrivateOrders = createSelector(
    selectOrders,
    selectPrivateFilters,
    (orders, typeFilters) => filterOrders(orders, typeFilters)
)

export const selectFilteredOrdersByUser = createSelector(
    selectFilteredPrivateOrders,
    state => state.users.activeUser,
    (orders, activeUser) => {
        if (!activeUser) return [];
        return orders.filter(
            order => order.userId === activeUser.id);
    }
)

export default orderSlice.reducer;

export function filterOrders(orders: Order[], typeFilters: FilterState) {
    const { directionFilter, accountFilter, priceFilter, quantityFilter } = typeFilters;
    
    const ordersByType = (orders: Order[]): Order[] => {
        const ordersByDirection: Order[] = 
            directionFilter === DirectionType.All 
                ? orders 
                : orders.filter(order => order.direction === directionFilter);

            return accountFilter === AccountType.All 
               ? ordersByDirection 
               : ordersByDirection.filter(order => order.account === accountFilter);
    }

    const ordersByRange = (orders: Order[]): Order[] => {
        return orders.filter(order => 
            rangeFilter(order.price, priceFilter[0], priceFilter[1]) &&
            rangeFilter(order.quantity, quantityFilter[0], quantityFilter[1]));
    }

    return ordersByRange(ordersByType(orders));
}
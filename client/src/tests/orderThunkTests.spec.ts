import { OrderRequest } from '../models/orderRequest';
import reducer, { createOrder, fetchOrders, OrdersState } from '../features/orders/orderSlice';
import { Dispatch } from 'redux';
import { AccountType } from '../models/accountType';
import { DirectionType } from '../models/directionType';
require ('jest-fetch-mock').enableMocks();

describe('createOrder async thunk', () => {

    const orderRequest: OrderRequest = { userId: '0', account: AccountType.CAD, 
        direction: DirectionType.Buy, price: 10, quantity: 60 }
    const orderResponse = { id: '0', userId: '0',
        account: AccountType.CAD, direction: DirectionType.Buy, price: 10, quantity: 60 };
    
    let dispatch: Dispatch;

    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify([ orderResponse ]));
        dispatch = jest.fn();
    });

    describe('internal fetch behaviour', () => {

        const request = [[
            `${process.env.REACT_APP_SERVER}/order`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderRequest)
            }
        ]];

        it('only calls fetch once', async () => {
            await createOrder(orderRequest)(dispatch, jest.fn(), orderRequest);
            expect(fetchMock.mock.calls.length).toEqual(1);
        });

        it('calls fetch with the correct request data', async () => {
            await createOrder(orderRequest)(dispatch, jest.fn(), orderRequest);
            expect(fetchMock.mock.calls).toEqual(request);
         })
    });

    describe('resulting dispatch', () => {
        it('calls dispatch only twice', async () => {
            await createOrder(orderRequest)(dispatch, jest.fn(), orderRequest);
            expect(dispatch).toHaveBeenCalledTimes(2);
        });
        it('first dispatches a pending action with no payload', async () => {
            const expectedPending = { type: 'orders/orderCreated/pending', payload: undefined }
            await createOrder(orderRequest)(dispatch, jest.fn(), orderRequest);
            expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining(expectedPending));
        });
        it('secondly dispatches a fulfilled action with a payload containing an order array', async () => {
            const expectedFulfilled = { type: 'orders/orderCreated/fulfilled', payload: [ orderResponse ] }
            await createOrder(orderRequest)(dispatch, jest.fn(), orderRequest);
            expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining(expectedFulfilled));
        });
    });

});

describe('fetchOrders async thunk', () => {

    // no Date because json returns a string and can't compare to date
    const order0 = { id: '0', userId: '0',
        account: AccountType.CAD, direction: DirectionType.Buy, price: 10, quantity: 60 };
    
    let dispatch: Dispatch;

    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify([ order0 ]));
        dispatch = jest.fn();
    })

    describe('internal fetch behaviour', () => {

        it('only calls fetch once', async () => {
            await fetchOrders()(dispatch, jest.fn(), undefined);
            expect(fetchMock.mock.calls.length).toEqual(1);
        });

        it('calls fetch with the correct URL', async () => {
            await fetchOrders()(dispatch, jest.fn(), undefined);
            expect(fetchMock.mock.calls).toEqual([[`${process.env.REACT_APP_SERVER}/orders`]]);
         })
    })

    describe('resulting dispatch', () => {
        it('calls dispatch only twice', async () => {
            await fetchOrders()(dispatch, jest.fn(), undefined);
            expect(dispatch).toHaveBeenCalledTimes(2);
        });
        it('first dispatches a pending action with no payload', async () => {
            const expectedPending = { type: 'orders/fetchOrders/pending', payload: undefined }
            await fetchOrders()(dispatch, jest.fn(), undefined);
            expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining(expectedPending));
        });
        it('secondly dispatches a fulfilled action with a payload containing an order array', async () => {
            const expectedFulfilled = { type: 'orders/fetchOrders/fulfilled', payload: [ order0 ] }
            await fetchOrders()(dispatch, jest.fn(), undefined);
            expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining(expectedFulfilled));
        });
    });

    it('should set loading state when pending API call', async () => {
        const newState: OrdersState = await reducer(undefined, fetchOrders.pending);
        expect(newState.status).toEqual('loading');
    });


    describe('when the request is rejected', () => {
        it('dispatches the failed status', async () => {
            const newState: OrdersState = await reducer(undefined, fetchOrders.rejected);
            expect(newState.status).toEqual('failed');
        });
    }); 
});


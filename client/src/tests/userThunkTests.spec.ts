
import { UserAccount } from '../models/userAccount';
import fetchMock from 'jest-fetch-mock'
import reducer, { UserState, fetchUsers } from '../features/users/userSlice';
import { Dispatch } from 'redux';
require ('jest-fetch-mock').enableMocks();

describe('fetchUsers async thunk', () => {

    let dispatch: Dispatch;
    const user0: UserAccount = { id: "0", name: "test0", balanceCrypto: 0, balanceCash: 0 }

    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify([user0]));
        dispatch = jest.fn();
    })

    describe('internal fetch behaviour', () => {

        it('only calls fetch once', async () => {
            await fetchUsers()(dispatch, jest.fn(), undefined);
            expect(fetchMock.mock.calls.length).toEqual(1);
        });

        it('calls fetch with the correct URL', async () => {
            await fetchUsers()(dispatch, jest.fn(), undefined);
            expect(fetchMock.mock.calls).toEqual([[`${process.env.REACT_APP_SERVER}/users`]]);
         })
    })


    describe('resulting dispatch', () => {
        it('calls dispatch only twice', async () => {
            await fetchUsers()(dispatch, jest.fn(), undefined);
            expect(dispatch).toHaveBeenCalledTimes(2);
        });
        it('first dispatches a pending action with no payload', async () => {
            const expectedPending = {type: 'users/fetchUsers/pending', payload: undefined}
            await fetchUsers()(dispatch, jest.fn(), undefined);
            expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining(expectedPending));
        });
        it('secondly dispatches a fulfilled action with a payload containing a UserAccount array', async () => {
            const expectedFulfilled = {type: 'users/fetchUsers/fulfilled', payload: [ user0 ]}
            await fetchUsers()(dispatch, jest.fn(), undefined);
            expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining(expectedFulfilled));
        });
    });

    it('should set loading state when pending API call', async () => {
        const newState: UserState = await reducer(undefined, fetchUsers.pending);
        expect(newState.status).toEqual('loading');
    });


    describe('when the request is rejected', () => {
        it('dispatches the failed status', async () => {
            const newState: UserState = await reducer(undefined, fetchUsers.rejected);
            expect(newState.status).toEqual('failed');
        });
    }); 
});

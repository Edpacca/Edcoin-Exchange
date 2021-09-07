import reducer, { newUserSelected, UserState } from "../features/users/userSlice";
import { UserAccount } from '../models/userAccount';

test('should return initial state', () => {
    expect(reducer(undefined, {type: ""})).toEqual(
        {
            value: [],
            activeUser: undefined,
            status: 'idle'
        });
});

test('should change the active user', () => {
    const user0: UserAccount = { id: "0", name: "test0", balanceCrypto: 0, balanceCash: 0 }
    const user1: UserAccount = { id: "1", name: "test1", balanceCrypto: 1, balanceCash: 1 }
    const user2: UserAccount = { id: "2", name: "test2", balanceCrypto: 2, balanceCash: 2 }
    
    const initalState: UserState =  {
        value: [
            user0,
            user1,
            user2,
        ],
        activeUser: undefined,
        status: 'idle'
    }

    expect(reducer(initalState, newUserSelected(user0))).toEqual(
        {
            value: [
                user0,
                user1,
                user2,
            ],
            activeUser: user0,
            status: 'idle'
        });
});

test('should change the active user to undefined', () => {
    const user0: UserAccount = { id: "0", name: "test0", balanceCrypto: 0, balanceCash: 0 }
    const user1: UserAccount = { id: "1", name: "test1", balanceCrypto: 1, balanceCash: 1 }
    const user2: UserAccount = { id: "2", name: "test2", balanceCrypto: 2, balanceCash: 2 }
    
    const initalState: UserState =  {
        value: [
            user0,
            user1,
            user2,
        ],
        activeUser: user0,
        status: 'idle'
    }

    expect(reducer(initalState, newUserSelected(undefined))).toEqual(
        {
            value: [
                user0,
                user1,
                user2,
            ],
            activeUser: undefined,
            status: 'idle'
        });
});
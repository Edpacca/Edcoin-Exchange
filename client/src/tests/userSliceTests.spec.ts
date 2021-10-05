import reducer, { logout, UserState } from "../features/users/userSlice";
import { UserAccount } from '../models/userAccount';

describe('userSlice reducer actions', () => {

    it('should return initial state when passed an empty action', () => {
        expect(reducer(undefined, {type: ""})).toEqual(
            {
                value: [],
                activeUser: undefined,
                status: 'idle'
            });
    });

    // FIX can set an active user who doesn't exist in the user list
    // describe(`on ${logout.type}`, () => {
    //     it('should set the active user', () => {
    //         const newUser: UserAccount = { 
    //             id: "0", name: "test0", balanceCrypto: 0, balanceCash: 0 };
    //         const { activeUser } = reducer(undefined, logout(newUser));
    //         expect(activeUser).toEqual(newUser);
    //     });

    //     it('should set the active user to undefined', () => {
    //         const user0: UserAccount = { id: "0", name: "test0", balanceCrypto: 0, balanceCash: 0 }
    //         const user1: UserAccount = { id: "1", name: "test1", balanceCrypto: 1, balanceCash: 1 }
    //         const user2: UserAccount = { id: "2", name: "test2", balanceCrypto: 2, balanceCash: 2 }
            
    //         const initalState: UserState =  {
    //             value: [
    //                 user0,
    //                 user1,
    //                 user2,
    //             ],
    //             activeUser: user0,
    //             status: 'idle'
    //         }
    
    //         expect(reducer(initalState, logout(undefined))).toEqual(
    //             {
    //                 value: [
    //                     user0,
    //                     user1,
    //                     user2,
    //                 ],
    //                 activeUser: undefined,
    //                 status: 'idle'
    //             });
    //     });
    // });
});
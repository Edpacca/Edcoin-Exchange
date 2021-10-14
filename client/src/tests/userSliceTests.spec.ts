import reducer, { logout, UserState } from "../features/users/userSlice";
import { UserAccount } from '../models/userAccount';

describe('userSlice reducer actions', () => {

    it('should return initial state when passed an empty action', () => {
        expect(reducer(undefined, {type: ""})).toEqual(
            {
                activeUser: undefined,
                status: 'idle'
            });
    });

});
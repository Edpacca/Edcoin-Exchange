import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AuthenticationRequest } from '../../models/authenticationRequest';
import { AuthenticationResponse } from '../../models/authenticationResponse';
import { Status } from '../../models/status';
import { UserAccount } from '../../models/userAccount';
import { delay } from '../../utilities/asyncHelpers';

export interface UserState {
    activeUser?: UserAccount,
    status: Status;
}

export const initialState: UserState = {
    activeUser: undefined,
    status: 'idle',
};

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (authenticationRequest: AuthenticationRequest): Promise<AuthenticationResponse> => {
        const response: Promise<any> = await fetch(
            `${process.env.REACT_APP_SERVER}/users/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authenticationRequest)})
        .then(response => response.json());
        return await delay(1000).then(() => response);
    }
)

export const createUser = createAsyncThunk(
    'users/createUser',
    async (authenticationRequest: AuthenticationRequest): Promise<AuthenticationResponse> => {
        const response: Promise<any> = await fetch(
            `${process.env.REACT_APP_SERVER}/users/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authenticationRequest)})
        .then(response => response.json());
        return await delay(1000).then(() => response);
    }
)

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.activeUser = undefined;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.jwt) {
                    state.status = 'idle';
                    state.activeUser = {
                        id: action.payload.id,
                        name: action.payload.username,
                        token: action.payload.jwt
                    }
                } else {
                    state.status ='failed';
                    state.activeUser = undefined;
                }
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = 'failed';
                state.activeUser = undefined;
            })
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                if (action.payload.jwt) {
                    state.status = 'idle';
                    state.activeUser = {
                        id: action.payload.id,
                        name: action.payload.username,
                        token: action.payload.jwt
                    }
                } else {
                    state.status ='failed';
                    state.activeUser = undefined;
                }
            })
            .addCase(createUser.rejected, (state) => {
                state.status = 'failed';
                state.activeUser = undefined;
            });
    }
})

export const { logout } = userSlice.actions;

export const selectLoginStatus = (state: RootState): Status => state.users.status;
export const selectActiveUser = (state: RootState): UserAccount | undefined => state.users.activeUser;

export default userSlice.reducer;
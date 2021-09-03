import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { UserAccount } from '../../models/userAccount';

export interface UserState {
    value: UserAccount[];
    activeUser?: UserAccount,
    status: 'idle' | 'loading' | 'failed';
}

export const initialState: UserState = {
    value: [],
    activeUser: undefined,
    status: 'idle'
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users`)
        .then(response => response.json())
        return response;
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        newUserSelected: (state, action) => {
            state.activeUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload
            });
    }
})

export const { newUserSelected } = userSlice.actions;

export const selectUsers = (state: RootState): UserAccount[] => state.users.value;

export default userSlice.reducer;
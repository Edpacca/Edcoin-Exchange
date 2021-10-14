import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthenticationRequest } from "../models/authenticationRequest";
import { AuthenticationResponse } from "../models/authenticationResponse";
import { Status } from "../models/status";
import { RootState } from "./store";

interface InitialisationState {
    siteToken?: string
    status: Status
}

const initialState: InitialisationState = {
    siteToken: undefined,
    status: 'loading'
}

export const fetchSiteToken = createAsyncThunk(
    'initialisation/fetchToken',
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
        return response;
    }
);

export const initialisationSlice = createSlice({
    name: 'initialisation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSiteToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSiteToken.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchSiteToken.fulfilled, (state, action) => {
                if (action.payload.jwt) {
                    state.siteToken = action.payload.jwt;
                    state.status = 'idle'
                } else {
                    state.status = 'failed'
                }
            })
    }
});

export const selectInitialisationStatus = (state: RootState): Status => state.initialisation.status;

export default initialisationSlice.reducer;
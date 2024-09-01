import { createSlice } from '@reduxjs/toolkit';

interface IAuthenticationInitialState {
    authenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    expires: number | null;
}

const authenticationInitialState: IAuthenticationInitialState = {
    authenticated: true,
    accessToken: null,
    refreshToken: null,
    expires: null,
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: authenticationInitialState,
    reducers: {},
});

export default authenticationSlice;

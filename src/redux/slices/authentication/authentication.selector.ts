import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../constants/store';

export const getAuthState = (state: RootState) => state.authentication;

export const getIsAuthenticated = createSelector(
    getAuthState,
    (auth) => auth.authenticated,
);

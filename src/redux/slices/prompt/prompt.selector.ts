import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../constants/store';

export const getPromptState = (state: RootState) => state.prompt;

export const getPromptsOrdered = createSelector(
    getPromptState,
    (promptState) => promptState.ordered,
);

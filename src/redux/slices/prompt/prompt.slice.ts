import { createSlice } from '@reduxjs/toolkit'

import { iPrompt } from '../../../types/prompt'

interface iPromptState {
    all: iPrompt[],
    ordered: {
        [year: string]: {
            [month: string]: iPrompt[],
        },
    },
}

const today = new Date()
today.setHours(1)
today.setMinutes(0)
today.setSeconds(0)
today.setMilliseconds(0)

export const promptSliceInitialState: iPromptState = {
    all: [
        {
            date: today.toISOString(),
            title: 'Some test prompt',
            defaultDeferQuantity: 1,
            defaultDeferPeriod: 'month',
        },
    ],
    ordered: {
        [String(today.getFullYear())]: {
            [String(today.getMonth())]: [
                {
                    date: today.toISOString(),
                    title: 'Some test prompt',
                    defaultDeferQuantity: 1,
                    defaultDeferPeriod: 'month',
                },
            ],
        },
    },
}

const promptSlice = createSlice({
    name: 'prompt',
    initialState: promptSliceInitialState,
    reducers: {},
})

export default promptSlice

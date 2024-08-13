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

const createPrompt = (): iPrompt => ({
    date: today.toISOString(),
    title: 'Some test prompt',
    defaultDeferQuantity: 1,
    defaultDeferPeriod: 'month',
    id: 'djslghjkdsgbjhbndg',
    description: null,
    checklist: null,
    links: [],
    createdOn: today.toISOString(),
    updatedOn: null,
    deletedOn: null,
    deleted: false,
    status: 'open',
    deferredCount: 0,
    criticality: 'default',
})

export const promptSliceInitialState: iPromptState = {
    all: [createPrompt()],
    ordered: {
        [String(today.getFullYear())]: {
            [String(today.getMonth())]: [
                createPrompt()
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

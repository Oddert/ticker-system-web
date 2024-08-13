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

const normaliseDate = (date: Date | string) => {
    const newDate = new Date(date)
    newDate.setHours(1)
    newDate.setMinutes(0)
    newDate.setSeconds(0)
    newDate.setMilliseconds(0)
    return newDate
}

const today = normaliseDate(new Date())
const plus3Days = normaliseDate(new Date(Date.now() + 86400000 * 3))
const plus1Month = normaliseDate(new Date(Date.now() + 86400000 * 30))
const plus1Year = normaliseDate(new Date(Date.now() + 86400000 * 200))

const createPrompt = (date: Date): iPrompt => ({
    date: date.toISOString(),
    title: 'Some test prompt',
    defaultDeferQuantity: 1,
    defaultDeferPeriod: 'month',
    id: 'djslghjkdsgbjhbndg',
    description: null,
    checklist: null,
    links: [],
    createdOn: date.toISOString(),
    updatedOn: null,
    deletedOn: null,
    deleted: false,
    status: 'open',
    deferredCount: 0,
    criticality: 'default',
})

const testValues = [
    createPrompt(today),
    createPrompt(plus3Days),
    createPrompt(plus1Month),
    createPrompt(plus1Year),
]

const testOrdered = testValues.reduce(
    (acc: iPromptState['ordered'], prompt: iPrompt) => {
        const date = new Date(prompt.date)
        const year = date.getFullYear()
        const month = date.getMonth()
        if (!(year in acc)) {
            acc[date.getFullYear()] = {}
        }
        if (!(month in acc[year])) {
            acc[year][month] = []
        }
        acc[year][month].push(prompt)
        return acc
    },
    {}
)

export const promptSliceInitialState: iPromptState = {
    all: testValues,
    ordered: testOrdered,
}

const promptSlice = createSlice({
    name: 'prompt',
    initialState: promptSliceInitialState,
    reducers: {},
})

export default promptSlice

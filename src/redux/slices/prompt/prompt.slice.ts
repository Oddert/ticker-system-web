import { createSlice } from '@reduxjs/toolkit'

import { iPrompt } from '../../../types/prompt'

interface iPromptState {
    all: iPrompt[],
    ordered: {
        [year: string]: {
            [month: string]: {
                [day: string]: iPrompt[]
            },
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

const createPrompt = (date: Date, title: string = 'Some test prompt'): iPrompt => ({
    title,
    date: date.toISOString(),
    deferQuantity: 1,
    deferPeriod: 'month',
    promptId: 'djslghjkdsgbjhbndg',
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
    userId: 'nope',
})

const testValues = [
    createPrompt(today, 'Create handover notes'),
    createPrompt(plus3Days, 'Notes for check-in meeting'),
    createPrompt(plus1Month, 'Consider next planting season'),
    createPrompt(plus1Year, 'Perform GSD alignment session'),
]

const testOrdered = testValues.reduce(
    (acc: iPromptState['ordered'], prompt: iPrompt) => {
        const date = new Date(prompt.date)
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        if (!(year in acc)) {
            acc[date.getFullYear()] = {}
        }
        if (!(month in acc[year])) {
            acc[year][month] = {}
        }
        if (!(day in acc[year][month])) {
            acc[year][month][day] = []
        }
        acc[year][month][day].push(prompt)
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

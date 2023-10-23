import { createSlice } from '@reduxjs/toolkit'

export const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        stats: {
            totalComp: 0,
            highestComp: 0,
            highComp: 0,
            highestPer: 0,
            highPer: 0,
        }
    },
    reducers: {
        // Set totals on page load
        setTotal: (state, action) => {
            state.stats.totalComp = action.payload
        },
        setHighest: (state, action) => {
            state.stats.highestComp = action.payload
        },
        setHigh: (state, action) => {
            state.stats.highComp = action.payload
        },
        setHighestPer: (state, action) => {
            state.stats.highestPer = action.payload
        },
        setHighPer: (state, action) => {
            state.stats.highPer = action.payload
        },
        // Increment counters
        incrementTotal: (state, action) => {
            state.stats.totalComp += action.payload
        },
        incrementHighest: (state, action) => {
            state.stats.highestComp += action.payload
        },
        incrementHigh: (state, action) => {
            state.stats.highComp += action.payload
        },
        // Edit Percentages
        // editHighestPer: (state, action) => {
        //     state.stats.highestPer = action.payload
        // }
    }
})

export const { setTotal, setHighest, setHigh, setHighestPer, setHighPer, incrementTotal, incrementHighest, incrementHigh } = statsSlice.actions;

export default statsSlice.reducer
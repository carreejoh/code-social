import { createSlice } from '@reduxjs/toolkit'

export const routineSlice = createSlice({
    name: 'routines',
    initialState: {
        routines: []
    },
    reducers: {
        addRoutine: (state, action) => {
            state.routines.push(action.payload)
        },
        editRoutine: (state, action) => {
            // Find the index of the routine by ID
            const index = state.routines.findIndex(
              routine => routine?.id === action.payload.id
            );
      
            if (index !== -1) {
              // Update the routine at the found index with the new data
              state.routines[index] = action.payload;
            }
          },
    }
})

export const { addRoutine, editRoutine } = routineSlice.actions;

export default routineSlice.reducer
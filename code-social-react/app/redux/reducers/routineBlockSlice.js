import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routines: [],
};

const routinesSlice = createSlice({
  name: 'routines',
  initialState,
  reducers: {
    addRoutine: (state, action) => {
      state.routines.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
      });
    },
    updateRoutine: (state, action) => {
      const index = state.routines.findIndex(
        (routine) => routine.id === action.payload.id
      );
      if (index !== -1) {
        state.routines[index] = action.payload;
      }
    },
    removeRoutine: (state, action) => {
      const index = state.routines.findIndex(
        (routine) => routine.id === action.payload.id
      );
      if (index !== -1) {
        state.routines.splice(index, 1);
      }
    },
  },
});

export const { addRoutine, updateRoutine, removeRoutine } = routinesSlice.actions;
export default routinesSlice.reducer;
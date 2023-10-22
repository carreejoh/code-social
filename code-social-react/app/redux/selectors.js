import { createSelector } from '@reduxjs/toolkit';

export const selectRoutines = state => state.routines.routines;

export const selectRoutineById = createSelector(
  [selectRoutines, (state, routineId) => routineId],
  (routines, routineId) => routines.find(routine => routine?.id === routineId)
);
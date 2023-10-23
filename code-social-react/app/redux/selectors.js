import { createSelector } from '@reduxjs/toolkit';

export const selectRoutines = state => state.routines.routines;
export const selectStats = state => state.stats.stats;

export const selectRoutineById = createSelector(
  [selectRoutines, (state, routineId) => routineId],
  (routines, routineId) => routines.find(routine => routine?.id === routineId)
);

export const selectTotal = (state) => state.stats.stats.totalComp;
export const selectHighestComp = (state) => state.stats.stats.highestComp;
export const selectHighComp = (state) => state.stats.stats.highComp;
export const selectHighestPer = (state) => state.stats.stats.highestPer;
export const selectHighPer = (state) => state.stats.stats.highPer;

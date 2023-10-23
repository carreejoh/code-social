import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './reducers/counterSlice'
// import routineReducer from "./reducers/routineBlockSlice"
import routineReducer from "./reducers/counterSlice"
import statsReducer from "./reducers/statsSlice"

export default configureStore({
  reducer: {
    stats: statsReducer,
    routines: routineReducer
  },
})
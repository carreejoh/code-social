import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './reducers/counterSlice'
// import routineReducer from "./reducers/routineBlockSlice"
import routineReducer from "./reducers/counterSlice"

export default configureStore({
  reducer: {
    // counter: counterReducer,
    routines: routineReducer
  },
})
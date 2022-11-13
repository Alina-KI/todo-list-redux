// import { createStore } from 'redux'
import todosSlice from './todos'
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
  reducer: todosSlice
})
// createStore(todosReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
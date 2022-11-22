import todosSlice from './todos'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


export const store = configureStore({
  reducer: todosSlice
})

type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
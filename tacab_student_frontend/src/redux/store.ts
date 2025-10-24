import { configureStore } from '@reduxjs/toolkit'
import { resultSlice } from './result.slice'

export const store = configureStore({
  reducer: {
    student: resultSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

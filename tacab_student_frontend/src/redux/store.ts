import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './auth/login.slice'

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
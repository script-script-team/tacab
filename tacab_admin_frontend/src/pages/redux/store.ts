import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './auth/login.slice'
import { uploadDialogSlice } from './uploadDialog.slice'
import { whoImLoading } from './loading.slice'

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    uploadDialog: uploadDialogSlice.reducer,
    whoImLoading: whoImLoading.reducer
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

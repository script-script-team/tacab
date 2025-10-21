import type { IAdminProp } from '@/pages/types/admin.types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  admin: {} as IAdminProp,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IAdminProp>) {
      state.admin = action.payload
    },
    logout(state) {
      state.admin = {} as IAdminProp
    },
  },
})

export const { login, logout } = loginSlice.actions

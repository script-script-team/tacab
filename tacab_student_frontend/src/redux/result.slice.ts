import type { IGetResultRes } from '@/types/login.type'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  result: {} as IGetResultRes,
}

export const resultSlice = createSlice({
  name: 'result slice',
  initialState,
  reducers: {
    setResult(state, action: PayloadAction<IGetResultRes>) {
      state.result = action.payload
    },
    clearResult(state) {
      state.result = {} as IGetResultRes
    },
  },
})

export const { setResult, clearResult } = resultSlice.actions

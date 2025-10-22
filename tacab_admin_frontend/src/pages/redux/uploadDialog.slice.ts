import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  selectedFile: null as File | null,
}

export const uploadDialogSlice = createSlice({
  name: 'upload dialog slice',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setSelectedFile(state, action: PayloadAction<File | null>) {
      state.selectedFile = action.payload
    },
  },
})

export const { setIsOpen, setSelectedFile } = uploadDialogSlice.actions

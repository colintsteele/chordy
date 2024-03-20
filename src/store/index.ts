import { configureStore } from '@reduxjs/toolkit'
import { keypressSlice } from './slices/keypressSlice'

export default configureStore({
  reducer: {
    keyPresser: keypressSlice.reducer
  }
})
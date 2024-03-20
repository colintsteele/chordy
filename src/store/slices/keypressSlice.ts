import { createSlice } from '@reduxjs/toolkit'

export interface keypressSliceType {
  notesPressed: number[];
}

const initialState: keypressSliceType = {
  notesPressed: []
}

export const keypressSlice = createSlice({
  name: 'pressedNotes',
  initialState: initialState,

  reducers: {
    pressNote: (state, action) => {
      state.notesPressed.push(action.payload)
      console.log('pressing note')
    },
    liftNote: (state, action) => {
      state.notesPressed.push(action.payload)
      console.log('"lifting" note')
    },
    incrementByAmount: (state, action) => {
    }
  }
})

// Action creators are generated for each case reducer function
export const { pressNote, liftNote, incrementByAmount } = keypressSlice.actions

export default keypressSlice.reducer
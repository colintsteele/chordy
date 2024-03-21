import { createSlice } from '@reduxjs/toolkit'

export interface keypressSliceType {
  notesPressed: number[];
}

const initialState: keypressSliceType = {
  notesPressed: []
}

export const keypressSlice = createSlice({
  name: "pressedNotes",
  initialState: initialState,

  reducers: {
    pressNote: (state, action) => {
      state.notesPressed.push(action.payload);
    },

    liftNote: (state, action) => {
      state.notesPressed = state.notesPressed.filter(
        (note) => action.payload !== note
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { pressNote, liftNote } = keypressSlice.actions;

export default keypressSlice.reducer
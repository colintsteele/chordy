import { createSlice } from '@reduxjs/toolkit'
import ToneService from "../../services/ToneService";

export interface keypressSliceType {
  notesPressed: {};
}

const initialState: keypressSliceType = {
  notesPressed: {}
}

export const keypressSlice = createSlice({
  name: "pressedNotes",
  initialState: initialState,

  reducers: {
    pressNote: (state, action) => {
      state.notesPressed[action.payload] = true;
      ToneService.playNote(action.payload);
    },

    liftNote: (state, action) => {
      state.notesPressed[action.payload] = false;
    },
  },
});

export const { pressNote, liftNote } = keypressSlice.actions;

export default keypressSlice.reducer
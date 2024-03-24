import { createSlice } from '@reduxjs/toolkit'
import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import ToneService from "../../services/ToneService";

export interface keypressSliceType {
  notesPressed: {};
}

const initialState: keypressSliceType = {
  notesPressed: {}
}

export const notesPressedSlice = createSlice({
  name: "pressedNotes",
  initialState: initialState,

  reducers: {
    liftNote: (state, action) => {
      state.notesPressed[action.payload] = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pressNote, (state, action) => {
      state.notesPressed[action.payload] = true;
      ToneService.playNote(action.payload);
    }); 

    builder.addCase(liftNote, (state, action) => {
      state.notesPressed[action.payload] = false;
    }); 
  }
});

export default notesPressedSlice.reducer
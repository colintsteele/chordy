import { createSlice } from '@reduxjs/toolkit'
import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import ToneService from "../../services/ToneService";
import { produce } from 'immer';

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
      produce(state, (draftState) => {
        draftState.notesPressed[action.payload] = false;
        return draftState;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pressNote, (state, action) => {
      produce(state, (draftState) => {
        draftState.notesPressed[action.payload] = true;
        ToneService.playNote(action.payload);
        return draftState; 
      })
    }); 

    builder.addCase(liftNote, (state, action) => {
      produce(state, (draftState) => {
        draftState.notesPressed[action.payload] = false;
        return draftState;
      });
    }); 
  }
});

export default notesPressedSlice.reducer;
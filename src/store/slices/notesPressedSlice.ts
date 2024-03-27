import { createSlice } from '@reduxjs/toolkit'
import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import ToneService from "../../services/ToneService";
import { produce } from 'immer';

export interface keypressSliceType {
  notesPressed: {},
  notePressTime: {}
}

const initialState: keypressSliceType = {
  notesPressed: {},
  notePressTime: {}
}

export const notesPressedSlice = createSlice({
  name: "pressedNotes",
  initialState: initialState,

  reducers: {
    liftNote: (state, action) => {
      return produce(state, (draftState) => {
        draftState.notesPressed[action.payload] = false;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(pressNote, (state, action) => {
      return produce(state, (draftState) => {
        draftState.notesPressed[action.payload] = true;
        
        // if the note has not been played yet, play it
        if(!draftState.notePressTime[action.payload]) {
          ToneService.playNote(action.payload);
          draftState.notePressTime[action.payload] = Date.now();
        } else if(Date.now() - draftState.notePressTime[action.payload] > 450) {
          Object.keys(draftState.notesPressed).forEach((note) => {
            if(draftState.notesPressed[note]) {
              ToneService.playNote(Number(note));
              draftState.notePressTime[note] = Date.now();
            }
          });
          ToneService.playNote(action.payload);
          draftState.notePressTime[action.payload] = Date.now();
        }
      })
    }); 

    builder.addCase(liftNote, (state, action) => {
      return produce(state, (draftState) => {
        draftState.notesPressed[action.payload] = false;
      });
    }); 
  }
});

export default notesPressedSlice.reducer;
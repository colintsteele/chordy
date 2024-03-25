import { sample } from 'lodash';
import { produce } from 'immer';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import { Note, midiToNote, randomChord, randomNote, randomScale } from '../../Theory';
import Objective from '../../objectives/Objective';
import NoteObjective from '../../objectives/NoteObjective';
import ScaleObjective from '../../objectives/ScaleObjective';
import ChordObjective from '../../objectives/ChordObjective';

export interface objectiveSliceType {
  name: string;
  progressed?: boolean;
  description?: string;
  progress: Note[];
  complete: boolean;
  notes: Note[];
}

const initialState: objectiveSliceType = {
  name: "first",
  progressed: false,
  description: "Play a C4 note",
  progress: [],
  complete: false,
  notes: [{ noteName: "C", octave: 4, index: 0 }],
};

export const objectiveSlice = createSlice({
  name: "objective",
  initialState: initialState,

  reducers: {
    setObjective: (state, action: PayloadAction<{scales: string[], types: string[]}>) => {

      return produce(state, (draft) => {

        console.log("I am setting a new objective"); 
        let objective = generateObjective(
          action.payload.scales,
          action.payload.types
        );
        draft.name = "something";
        draft.progressed = false;
        draft.complete = false;
        draft.progress = [];
        draft.notes = objective.objectives;
        draft.description =
          objective.description || `Play a ${objective.objectives[0].noteName}`;
      });
    }
  },

  extraReducers: (builder) => { 
    builder.addCase(pressNote, (state, action) => {
      let note = midiToNote(action.payload);
      
      return produce(state, (draft) => {
        if (noteInObjective(note, state.notes)) {
          // apply progress
          draft.progress.push(note);
          draft.progressed = true;
        } else {
          //reset progress
          draft.progress = [];
          draft.progressed = false;
          draft.complete = false;
        }

        if (checkComplete(state.progress, state.notes) || checkComplete(draft.progress, draft.notes)) {
          console.log('marked complete')
          draft.progress = [];
          draft.progressed = false;
          draft.complete = true;
        }
      });
    }); 

    builder.addCase(liftNote, (state, action) => {
      // if the objective must be consecutively held, then we need to reset the progress
      // however if the objective is simply to press the notes in sequence, we can leave the progress as is
    }); 
  }
});

const checkComplete = (progress: Note[], objectiveNotes: Note[]) => {
  if(progress.length === objectiveNotes.length) {
    let complete = true;
    for(let i = 0; i < progress.length; i++) {
      if(progress[i].noteName !== objectiveNotes[i].noteName) {
        complete = false;
        break;
      }
    }

    return complete;
  }
}

const noteInObjective = (note: Note, objectiveNotes: Note[]) => {
  let onlyNotesMustMatch = true; //should set this to a toggle

  return objectiveNotes.some((objectiveNote) => {
    let noteMatch = objectiveNote.noteName === note.noteName
    if(onlyNotesMustMatch) return noteMatch

    let octaveMatch = objectiveNote.octave === note.octave
    return noteMatch && octaveMatch
  });
}

const generateObjective = (selectedScales: string[], selectedTypes: string[]) => {
  let objective: Objective;
  let type = sample(selectedTypes);

  switch(type) {
    case 'Note':
      let note = randomNote();
      objective = new NoteObjective(note);
      break;
    case 'Scale':
      let scale = randomScale(selectedScales);
      objective = new ScaleObjective(scale);
      break;
    case 'Chord':
      let chord = randomChord(selectedScales);
      objective = new ChordObjective(chord);
      break;
    default:
      let defaultScale = randomScale(selectedScales);
      objective = new ScaleObjective(defaultScale);
  }

  return objective;
}

export const { setObjective } = objectiveSlice.actions;

export default objectiveSlice.reducer
import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import { createSlice } from '@reduxjs/toolkit'
import Objective from '../../objectives/Objective';
import ObjectiveManager from '../../objectives/ObjectiveManager';
import { Note, midiToNote, randomChord, randomNote, randomScale } from '../../Theory';
import NoteObjective from '../../objectives/NoteObjective';
import { isBarline } from 'vexflow';
import { sample } from 'lodash';
import ScaleObjective from '../../objectives/ScaleObjective';
import ChordObjective from '../../objectives/ChordObjective';

export interface objectiveSliceType {
  objective: {
    name: string,
    progressed?: boolean,
    selectedScales: string[],
    selectedTypes: string[],
    description?: string,
    progress: Note[],
    notes: Note[],
  };
}

const initialState: objectiveSliceType = {
  objective: {
    name: 'first',
    progressed: false,
    selectedScales: ['Major'],
    selectedTypes: ['Note'],
    description: 'Play a C4 note',
    progress: [],
    notes: [{ noteName: 'C', octave: 4, index: 0}] 
  }
}

export const objectiveSlice = createSlice({
  name: "objective",
  initialState: initialState,

  reducers: {
    setObjective: (state, action) => {
      state.objective = action.payload;
    },

    checkObjective: (state, action) => {
      // console.log('I am checking the objective')
    },

    progressObjective: (state, action) => {
      // console.log('I am progressing the objective')
    }
  },
  extraReducers: (builder) => { 
    builder.addCase(pressNote, (state, action) => {
      let note = midiToNote(action.payload);
      
      if (noteInObjective(note, state.objective.notes)) {
        state.objective.progress.push(note);
        state.objective.progressed = true;
      } else {
        state.objective.progress = []; 
        state.objective.progressed = false;
        return;
      }

      let objectiveComplete = checkComplete(state.objective.progress, state.objective.notes);

      if(objectiveComplete) {
        let newObjective = generateObjective(state.objective.selectedScales, state.objective.selectedTypes);
        state.objective.notes = newObjective.objectives;
        state.objective.progress = [];
        state.objective.progressed = false;
        state.objective.description = newObjective.description || `Play a ${newObjective.objectives[0].noteName}`;
      }

    }); 

    builder.addCase(liftNote, (state, action) => {
      // console.log('objective: I"m listning to liftNote action');
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

    if(complete) {
      console.log('Objective complete');
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

  console.log(objective)
  return objective;
}

export const { setObjective, checkObjective, progressObjective } = objectiveSlice.actions;

export default objectiveSlice.reducer
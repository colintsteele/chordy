import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import { createSlice } from '@reduxjs/toolkit'
import Objective from '../../objectives/Objective';
import { Note, midiToNote, randomChord, randomNote, randomScale } from '../../Theory';
import NoteObjective from '../../objectives/NoteObjective';
import { sample } from 'lodash';
import ScaleObjective from '../../objectives/ScaleObjective';
import ChordObjective from '../../objectives/ChordObjective';

export interface objectiveSliceType {
  objective: {
    name: string,
    progressed?: boolean,
    selectedScales: {},
    selectedTypes: {},
    description?: string,
    progress: Note[],
    notes: Note[],
  };
}

const initialState: objectiveSliceType = {
  objective: {
    name: "first",
    progressed: false,
    selectedScales: { Major: true, Minor: false },
    selectedTypes: { Note: true, Scale: false, Chord: false },
    description: "Play a C4 note",
    progress: [],
    notes: [{ noteName: "C", octave: 4, index: 0 }],
  },
};

export const objectiveSlice = createSlice({
  name: "objective",
  initialState: initialState,

  reducers: {
    toggleScale: (state, action) => {
      if(!willEmptyScalesSelected(state, action.payload)) {
        state.objective.selectedScales[action.payload] = !state.objective.selectedScales[action.payload];
      }
    },

    toggleObjectiveType: (state, action) => {
      if(!willEmptyObjectiveTypesSelected(state, action.payload)) {
        state.objective.selectedTypes[action.payload] = !state.objective.selectedTypes[action.payload];
      }
    },

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
        let newObjective = generateObjective(scalesEnabled(state), objectiveTypesEnabled(state));
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

  return objective;
}

const scalesEnabled = (state: any) => { 
  return Object.keys(state.objective.selectedScales).filter(
    (key) => state.objective.selectedScales[key]
  );
}

const objectiveTypesEnabled = (state: any) => {
  return Object.keys(state.objective.selectedTypes).filter(
    (key) => state.objective.selectedTypes[key]
  );
}

const willEmptyScalesSelected = (state: any, toggling: string) => {
  if(state.objective.selectedScales[toggling] === false) 
    return false

  let anyTrue = false;
  Object.keys(state.objective.selectedScales).forEach((key) => {
    if(key !== toggling && state.objective.selectedScales[key]) {
      anyTrue = true;
    }
  });

  return !anyTrue;
}

const willEmptyObjectiveTypesSelected = (state: any, toggling: string) => {
  if(state.objective.selectedTypes[toggling] === false) 
    return false

  let anyTrue = false;
  Object.keys(state.objective.selectedTypes).forEach((key) => {
    if(key !== toggling && state.objective.selectedTypes[key]) {
      anyTrue = true;
    }
  });

  return !anyTrue;
}

export const { toggleObjectiveType, toggleScale, setObjective, checkObjective, progressObjective } = objectiveSlice.actions;

export default objectiveSlice.reducer
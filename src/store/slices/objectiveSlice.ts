import { sample } from 'lodash';
import { produce } from 'immer';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import { Note, midiToNote, randomChord, randomNote, randomScale } from '../../Theory';
import Objective, { Completable } from '../../objectives/Objective';
import NoteObjective from '../../objectives/NoteObjective';
import ScaleObjective from '../../objectives/ScaleObjective';
import ChordObjective from '../../objectives/ChordObjective';

const initialState: Completable = {
  name: "first",
  progressed: false,
  description: "Play a C4 note",
  complete: false,
  objectives: [{ noteName: "C", octave: 4, index: 0 }],
  type: 'note',
  completedNotes: [],
  holdConsecutive: false
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
        draft.name = objective.name;
        draft.progressed = false;
        draft.complete = false;
        draft.objectives = objective.objectives;
        draft.holdConsecutive = objective.holdConsecutive;
        draft.description =
          objective.description || `Play a ${objective.objectives[0].noteName}`;
      });
    }
  },

  extraReducers: (builder) => { 
    builder.addCase(pressNote, (state, action) => {
      let note = midiToNote(action.payload);

      return produce(state, (draft) => {
        if (noteInObjective(note, state.objectives)) {
          console.log('note is in objective')
          draft.completedNotes.push(note); //TODO too many pushes here
          draft.progressed = true;
        } else {
          draft.completedNotes = [];
          draft.progressed = false;
          draft.complete = false;
        }

        if (checkComplete(draft.objectives, draft.completedNotes)) {
          draft.completedNotes = [];
          draft.progressed = false;
          draft.complete = true;
        }
      });
    }); 

    builder.addCase(liftNote, (state, _action) => {
      if (state.holdConsecutive) {
        return produce(state, (draft) => {
          draft.completedNotes = [];
          draft.progressed = false;
          draft.complete = false;
        });
      }
    }); 
  }
});

const checkComplete = (objectiveNotes: Note[], progress: Note[]) => {
  return objectiveNotes.every((note) => {
    return progress.some((pNote) => pNote.noteName === note.noteName);
  });
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
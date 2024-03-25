import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { produce } from 'immer';

export interface ObjectiveSettingsState {
  selectedScales: {};
  selectedTypes: {};
}

const initialState: ObjectiveSettingsState = {
  selectedScales: { Major: true, Minor: false },
  selectedTypes: { Note: true, Scale: false, Chord: false },
};

export const objectiveSettingsSlice = createSlice({
  name: "objectiveSettings",
  initialState,
  reducers: {
    toggleScale: (state, action) => {
      if (willEmptyScalesSelected(state, action.payload)) return state;

      return produce(state, (draft) => {
        draft.selectedScales[action.payload] =
          !state.selectedScales[action.payload];
      });
    },

    toggleObjectiveType: (state, action) => {
      if (willEmptyObjectiveTypesSelected(state, action.payload)) return state;

      return produce(state, (draft) => {
        debugger;
        draft.selectedTypes[action.payload] =
          !state.selectedTypes[action.payload];
      });
    },
  },
});

export const selectSelectedScales = createSelector(
  (state) => state.objectiveSettings,
  (objectiveSettings) => objectiveSettings.selectedScales
);

export const selectSelectedTypes = createSelector(
  (state) => state.objectiveSettings,
  (objectiveSettings) => objectiveSettings.selectedTypes
);

const willEmptyScalesSelected = (state: any, toggling: string) => {
  if(state.selectedScales[toggling] === false) 
    return false

  let anyTrue = false;
  Object.keys(state.selectedScales).forEach((key) => {
    if(key !== toggling && state.selectedScales[key]) {
      anyTrue = true;
    }
  });

  return !anyTrue;
}

const willEmptyObjectiveTypesSelected = (state: any, toggling: string) => {
  if(state.selectedTypes[toggling] === false) 
    return false

  let anyTrue = false;
  Object.keys(state.selectedTypes).forEach((key) => {
    if(key !== toggling && state.selectedTypes[key]) {
      anyTrue = true;
    }
  });

  return !anyTrue;
}

export const { toggleScale, toggleObjectiveType } = objectiveSettingsSlice.actions;

export default objectiveSettingsSlice.reducer;
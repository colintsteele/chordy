import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { produce } from 'immer';

export interface ObjectiveSettingsState {
  selectedScales: {};
  selectedTypes: {};
}

const initialState: ObjectiveSettingsState = {
  selectedScales: { major: true, minor: false },
  selectedTypes: { Note: true, Scale: false, Chord: false },
};

export const objectiveSettingsSlice = createSlice({
  name: "objectiveSettings",
  initialState,
  reducers: {
    toggleScale: (state, action) => {
      if (willEmptyEnabled(state.selectedScales, action.payload)) return state;

      return produce(state, (draft) => {
        draft.selectedScales[action.payload] =
          !state.selectedScales[action.payload];
      });
    },

    toggleObjectiveType: (state, action) => {
      if (willEmptyEnabled(state.selectedTypes, action.payload)) return state;

      return produce(state, (draft) => {
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

const willEmptyEnabled = (enabled: any, toggling: string) => {
  if(enabled[toggling] === false) 
    return false

  let anyTrue = false;
  Object.keys(enabled).forEach((key) => {
    if(key !== toggling && enabled[key]) {
      anyTrue = true;
    }
  });

  return !anyTrue;
}

export const { toggleScale, toggleObjectiveType } = objectiveSettingsSlice.actions;

export default objectiveSettingsSlice.reducer;
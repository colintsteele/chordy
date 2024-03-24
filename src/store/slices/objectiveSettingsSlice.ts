import { createSlice } from '@reduxjs/toolkit';

export interface ObjectiveSettingsState {
  objectiveSettings: {
    selectedScales: {},
    selectedTypes: {},
  };
}

const initialState: ObjectiveSettingsState = {
  objectiveSettings: {
    selectedScales: { Major: true, Minor: false },
    selectedTypes: { Note: true, Scale: false, Chord: false },
  }
};

export const objectiveSettingsSlice = createSlice({
  name: "objectiveSettings",
  initialState,
  reducers: {
    toggleScale: (state, action) => {
      console.log('toggling scale form ')
      if (!willEmptyScalesSelected(state, action.payload)) {
        state.objectiveSettings.selectedScales[action.payload] =
          !state.objectiveSettings.selectedScales[action.payload];
      }
    },

    toggleObjectiveType: (state, action) => {
      if (!willEmptyObjectiveTypesSelected(state, action.payload)) {
        state.objectiveSettings.selectedTypes[action.payload] =
          !state.objectiveSettings.selectedTypes[action.payload];
      }
    },
  },
});

// const selectedScales = state => state.objectiveSettings.selectedScales;

// export const enabledScales = createSelector(
//   [selectedScales],
//   (scale) => {
//     return Object.keys(scale).filter((key) => scale[key]);
//   }
// );

const willEmptyScalesSelected = (state: any, toggling: string) => {
  if(state.objectiveSettings.selectedScales[toggling] === false) 
    return false

  let anyTrue = false;
  Object.keys(state.objectiveSettings.selectedScales).forEach((key) => {
    if(key !== toggling && state.objectiveSettings.selectedScales[key]) {
      anyTrue = true;
    }
  });

  return !anyTrue;
}

const willEmptyObjectiveTypesSelected = (state: any, toggling: string) => {
  if(state.objectiveSettings.selectedTypes[toggling] === false) 
    return false

  let anyTrue = false;
  Object.keys(state.objectiveSettings.selectedTypes).forEach((key) => {
    if(key !== toggling && state.objectiveSettings.selectedTypes[key]) {
      anyTrue = true;
    }
  });

  return !anyTrue;
}

export const { toggleScale, toggleObjectiveType } = objectiveSettingsSlice.actions;

export default objectiveSettingsSlice.reducer;
import { pressNote }  from '../actions/pressNote';
import { liftNote } from '../actions/liftNote';
import { createSlice } from '@reduxjs/toolkit'

export interface objectiveSliceType {
  objective: {};
}

const initialState: objectiveSliceType = {
  objective: {} 
}

export const objectiveSlice = createSlice({
  name: "objective",
  initialState: initialState,

  reducers: {
    setObjective: (state, action) => {
      state.objective = action.payload;
    },

    checkObjective: (state, action) => {
      console.log('I am checking the objective')
    },

    progressObjective: (state, action) => {
      console.log('I am progressing the objective')
    }
  },
  extraReducers: (builder) => { 
    builder.addCase(pressNote, (state, action) => {
      console.log('objective: I"m listning to pressNote action');
    }); 

    builder.addCase(liftNote, (state, action) => {
      console.log('objective: I"m listning to liftNote action');
    }); 
  }
});

export const { setObjective, checkObjective, progressObjective } = objectiveSlice.actions;

export default objectiveSlice.reducer
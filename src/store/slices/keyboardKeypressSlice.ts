import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

export interface KeyboardKeypressSliceType {
  keysPressed: {};
}

const initialState: KeyboardKeypressSliceType = {
  keysPressed: {},
};

export const keyboardKeypressSlice = createSlice({
  name: "keyboardKeypressedNotes",
  initialState: initialState,

  reducers: {
    pressKey: (state, action: PayloadAction<string>) => {
      produce(state, (draftState) => {
        draftState.keysPressed[action.payload] = true;
        return draftState;
      })
    },

    liftKey: (state, action: PayloadAction<string>) => {
      state.keysPressed[action.payload] = false;
      produce(state, (draftState) => {
        draftState.keysPressed[action.payload] = false;
        return draftState;
      });
    },
  },
});

export const { pressKey, liftKey } = keyboardKeypressSlice.actions;
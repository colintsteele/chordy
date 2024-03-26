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
      return produce(state, (draftState) => {
        draftState.keysPressed[action.payload] = true;
      })
    },

    liftKey: (state, action: PayloadAction<string>) => {
      state.keysPressed[action.payload] = false;
      return produce(state, (draftState) => {
        draftState.keysPressed[action.payload] = false;
      });
    },
  },
});

export const { pressKey, liftKey } = keyboardKeypressSlice.actions;
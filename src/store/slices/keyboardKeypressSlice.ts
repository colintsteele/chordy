import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import KeyMap from '../../KeyboardKeyMap';
import ToneService from "../../services/ToneService";

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
      state.keysPressed[action.payload] = true;
    },

    liftKey: (state, action: PayloadAction<string>) => {
      state.keysPressed[action.payload] = false;
    },
  },
});

export const { pressKey, liftKey } = keyboardKeypressSlice.actions;

export default keyboardKeypressSlice.reducer;

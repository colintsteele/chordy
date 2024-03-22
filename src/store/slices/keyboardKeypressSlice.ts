import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import KeyMap from '../../KeyboardKeyMap';
import ToneService from "../../services/ToneService";

export interface KeyboardKeypressSliceType {
  keysPressed: string[];
}

const initialState: KeyboardKeypressSliceType = {
  keysPressed: [],
};

export const keyboardKeypressSlice = createSlice({
  name: "keyboardKeypressedNotes",
  initialState: initialState,

  reducers: {
    pressKey: (state, action: PayloadAction<string>) => {
      state.keysPressed.push(action.payload);
    },

    liftKey: (state, action: PayloadAction<string>) => {
      state.keysPressed = state.keysPressed.filter(
        (key) => action.payload !== key
      );
    },
  },
});

export const { pressKey, liftKey } = keyboardKeypressSlice.actions;

export default keyboardKeypressSlice.reducer;

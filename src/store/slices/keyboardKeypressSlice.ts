import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      console.log('payload:' + action.payload);
      state.keysPressed.push(action.payload);
      console.log('state:' + state.keysPressed);
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

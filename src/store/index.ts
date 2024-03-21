import { configureStore } from "@reduxjs/toolkit";
import { keypressSlice } from "./slices/keypressSlice";
import { keyboardKeypressSlice } from "./slices/keyboardKeypressSlice";

const rootReducer = {
  keyPresser: keypressSlice.reducer,
  keyboardKeypress: keyboardKeypressSlice.reducer,
};

export default configureStore({
  reducer: rootReducer,
});

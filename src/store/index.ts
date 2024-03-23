import { configureStore } from "@reduxjs/toolkit";
import { notesPressedSlice } from "./slices/notesPressedSlice";
import { keyboardKeypressSlice } from "./slices/keyboardKeypressSlice";
import { objectiveSlice } from "./slices/objectiveSlice";

const rootReducer = {
  keyPresser: notesPressedSlice.reducer,
  keyboardKeypress: keyboardKeypressSlice.reducer,
  objective: objectiveSlice.reducer,
};

export default configureStore({
  reducer: rootReducer,
});

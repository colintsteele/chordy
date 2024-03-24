import Keyboard from "./components/Keyboard";
import "./App.css";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useDispatch } from "react-redux";
import FunctionKeyboard from "./components/FunctionKeyboard";
import Sheet from "./components/Sheet";
import Selectors from "./components/Selectors";
import { liftKey, pressKey } from "./store/slices/keyboardKeypressSlice";
import KeyMap from "./KeyboardKeyMap";
import { pressNote } from "./store/actions/pressNote";
import { liftNote } from "./store/actions/liftNote";

function App() {
  const dispatch = useDispatch();

  const mappedKey = (key) => {
    return KeyMap[key];
  };

  const handleKeyDown = (keyPress) => {
    dispatch(pressKey(keyPress.key));
    dispatch(pressNote(mappedKey(keyPress.key)));
  };

  const handleKeyUp = (keyPress) => {
    dispatch(liftKey(keyPress.key));
    dispatch(liftNote(mappedKey(keyPress.key)));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown]);

  return (
    <div style={{ display: "inline-block" }}>
      <Grid
        container
        display="flex"
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >

        <Grid item xs={3}>
          <Selectors />
        </Grid>
        <Grid item xs={5}>
          <Sheet />
        </Grid>
        <Grid item xs={3}>
          <div>
            <span>something else</span>
          </div>
        </Grid>

        <FunctionKeyboard />
      </Grid>
    </div>
  );
}

export default App;

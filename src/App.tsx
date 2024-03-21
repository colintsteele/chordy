import Keyboard from "./components/Keyboard";
import "./App.css";
import { Grid } from "@mui/material";
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { useDispatch } from 'react-redux'
import FunctionKeyboard from "./components/FunctionKeyboard";
import { liftKey, pressKey } from "./store/slices/keyboardKeypressSlice";

function App() {
  const dispatch = useDispatch();

  const handleKeyDown = (keyPress) => {
    dispatch(pressKey(keyPress.key))
  };

  const handleKeyUp = (keyPress) => {
    dispatch(liftKey(keyPress.key))
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <div id="Keyboard">
          <Keyboard
            progressed={undefined}
            completed={false}
            activeNotes={[]}
            midiMounted={false}
            soundOn={false}
          />
        </div>
        <div id="NewKeyboard">
        </div>
        <FunctionKeyboard/>
      </Grid>
  );
}

export default App;

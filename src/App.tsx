import Keyboard from "./components/Keyboard";
import "./App.css";
import { Grid } from "@mui/material";
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import FunctionKeyboard from "./components/FunctionKeyboard";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

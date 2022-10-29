import React from "react";
import Keyboard from "./components/Keyboard";
import "./App.css";
import { Grid } from "@mui/material";

function App() {
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
    </Grid>
  );
}

export default App;

import React from "react";
import Keyboard from "./components/Keyboard";
import "./App.css";

function App() {
  return (
    <div id="Keyboard">
      <Keyboard progressed={undefined} completed={false} />
    </div>
  );
}

export default App;

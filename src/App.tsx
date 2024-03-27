import "./css/App.css";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import "./css/index.css";
import { useDispatch } from "react-redux";
import Piano from "./components/Piano";
import Sheet from "./components/Sheet";
import Selectors from "./components/Selectors";
import { liftKey, pressKey } from "./store/slices/keyboardKeypressSlice";
import KeyMap from "./KeyboardKeyMap";
import { pressNote } from "./store/actions/pressNote";
import { liftNote } from "./store/actions/liftNote";
import "../src/css/CenterAlign.css"

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
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Selectors />
          {/* Only listens to ObjectiveSettings slice */}
        </Grid>
        <Grid item xs={5} display='flex' justifyContent="center">
          <Sheet />
          {/* Listens to Objective slice */}
          {/* When objective is complete, fetches settings */}
        </Grid>
        <Grid item xs={3}>
          <div>
            <span style={{ color: "white" }}>sdjhglkjsdhgklsdjgh</span>
          </div>
        </Grid>

        <Piano />
      </Grid>
    </div>
  );
}

export default App;

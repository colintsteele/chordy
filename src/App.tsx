import "./css/App.css";
import { Grid } from "@mui/material";
import "./css/index.css";
import Piano from "./components/Piano";
import Sheet from "./components/Sheet";
import Selectors from "./components/Selectors";
import "../src/css/CenterAlign.css"

function App() {
  return (
    <div style={{ display: "inline-block" }}>
      <Grid
        container
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
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
            <span style={{ color: "white" }}>secret</span>
          </div>
        </Grid>
        <Piano />
      </Grid>
    </div>
  );
}

export default App;

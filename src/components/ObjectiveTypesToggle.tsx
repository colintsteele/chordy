import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";

export default function ObjectiveTypesToggle(props) {
  //   let toggleType = props.toggleType;

  const [chordsEnabled, setChordsEnabled] = React.useState(
    props.objectiveTypesEnabled.includes("chord")
  );
  const [scalesEnabled, setScalesEnabled] = React.useState(
    props.objectiveTypesEnabled.includes("scale")
  );
  const [notesEnabled, setNotesEnabled] = React.useState(
    props.objectiveTypesEnabled.includes("note")
  );

  const toggleType = (t) => {
    switch (t) {
      case "chord":
        if (props.toggleType("chord")) setChordsEnabled(!chordsEnabled);
        break;
      case "scale":
        if (props.toggleType("scale")) setScalesEnabled(!scalesEnabled);
        break;
      case "note":
        if (props.toggleType("note")) setNotesEnabled(!notesEnabled);
        break;
      default:
        break;
    }
  };

  //we can probably pretty easily reduce the amount of lines and duplication here
  // since each FormControlLabel is almost exactly the same, with only the
  // checked property and toggle function changing
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={notesEnabled}
            onChange={() => toggleType("note")}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Note"
      />
      <FormControlLabel
        key={"chord"}
        control={
          <Switch
            checked={chordsEnabled}
            onChange={() => toggleType("chord")}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Chord"
      />
      <FormControlLabel
        control={
          <Switch
            checked={scalesEnabled}
            onChange={() => toggleType("scale")}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Scale"
      />
    </FormGroup>
  );
}

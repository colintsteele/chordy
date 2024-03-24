import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { forEach } from "lodash";
import "../css/CenterAlign.css";
import { useDispatch, useSelector } from "react-redux";
import { scale } from "../Theory";
import { toggleObjectiveType, toggleScale } from "../store/slices/objectiveSlice";

const Selectors = () => {
  const dispatch = useDispatch();
  const objective = useSelector((state: any) => state.objective.objective);

  const handleScaleChange = (key: string) => {
    dispatch(toggleScale(key));
  }

  const handleTypeChange = (key: string) => {
    dispatch(toggleObjectiveType(key));
  }

  return (
  <>
    <FormGroup className={"centerAlignItem"}>
      <h4>Scales</h4>
      {scaleSwitches(objective, handleScaleChange)}
    </FormGroup>
    <FormGroup className={"centerAlignItem"}>
      <h4>Objectives</h4>
      {objectiveTypeSwitches(objective, handleTypeChange)}
    </FormGroup>
</>
  );
}

const scaleSwitches = (state: any, handleChange: Function) => {
  return Object.keys(state.selectedScales).map((key) => {
    return (
      <FormControlLabel
        checked={state.selectedScales[key]}
        key={`${key}ScaleSwitch`}
        control={
          <Switch
            onChange={() => handleChange(key)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={`${key} Scale`}
      ></FormControlLabel>
    );
  });
};

const objectiveTypeSwitches = (state: any, handleChange: Function) => {
  return Object.keys(state.selectedTypes).map((key) => {
    return (
      <FormControlLabel
        key={`${key}ObjectiveTypeSwitch`}
        checked={state.selectedTypes[key]}
        control={
          <Switch
            onChange={() => handleChange(key)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={`${key}s`}
      ></FormControlLabel>
    );
  });
}

const handleTypeChange = (state: any, key: string) => {
  state.selectedTypes[key] = !state.selectedTypes[key];
}

export default Selectors;
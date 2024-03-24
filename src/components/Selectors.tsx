import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import "../css/CenterAlign.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleObjectiveType, toggleScale } from "../store/slices/objectiveSettingsSlice";

const Selectors = () => {
  const dispatch = useDispatch();
  const { scales, types } = useSelector((state: any) => ({
    scales: state.objectiveSettings.objectiveSettings.selectedScales,
    types: state.objectiveSettings.objectiveSettings.selectedTypes,
  }));

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
      {scaleSwitches(scales, handleScaleChange)}
    </FormGroup>
    <FormGroup className={"centerAlignItem"}>
      <h4>Objectives</h4>
      {objectiveTypeSwitches(types, handleTypeChange)}
    </FormGroup>
</>
  );
}

const scaleSwitches = (scales: any, handleChange: Function) => {
console.log(scales);
  return Object.keys(scales).map((key) => {
    return (
      <FormControlLabel
        checked={scales[key]}
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

const objectiveTypeSwitches = (types: any, handleChange: Function) => {
  return Object.keys(types).map((key) => {
    return (
      <FormControlLabel
        key={`${key}ObjectiveTypeSwitch`}
        checked={types[key]}
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

export default Selectors;
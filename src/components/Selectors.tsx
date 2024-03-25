import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import {
  selectSelectedScales,
  selectSelectedTypes,
} from "../store/slices/objectiveSettingsSlice";
import "../css/CenterAlign.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleObjectiveType,
  toggleScale,
} from "../store/slices/objectiveSettingsSlice";

// Component in charge of displaying the selectors for scales and objective types
const Selectors = () => {
  const dispatch = useDispatch();
  const scales = useSelector(selectSelectedScales);
  const types = useSelector(selectSelectedTypes);

  const handleScaleChange = (key: string) => {
    dispatch(toggleScale(key));
  };

  const handleTypeChange = (key: string) => {
    dispatch(toggleObjectiveType(key));
  };

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
};

const scaleSwitches = (scales: any, handleChange: Function) => {
  return Object.keys(scales).map((key) => {
    return (
      <FormControlLabel
        checked={scales[key]}
        key={`${key}ScaleSwitch`}
        control={
          <Switch
            onChange={() => handleChange(key, scales)}
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
};

export default Selectors;

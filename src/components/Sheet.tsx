import { useDispatch, useSelector, useStore } from "react-redux";
import "../css/CenterAlign.css"
import { useEffect } from "react";
import { setObjective } from "../store/slices/objectiveSlice";
import { shallowEqual } from "react-redux";

// Component in charge of displaying the current objective
// Updates the objective if it has been completed
const Sheet = () => {
  const store: any = useStore();
  const dispatch = useDispatch();
  const complete: boolean = useSelector((state: any) => state.objective.complete);
  const objective = useSelector((state: any) => state.objective, shallowEqual);

  useEffect(() => {
    if (complete) {
      const state = store.getState();
      const enabledScales = Object.keys(state.objectiveSettings.scales).filter(
        (key: string) => state.objectiveSettings.scales[key]
      );
      const enabledTypes = Object.keys(state.objectiveSettings.types).filter(
        (key: string) => state.objectiveSettings.types[key]
      );

      dispatch(setObjective({ scales: enabledScales, types: enabledTypes }));
    }
  }, [complete]);

  return (
    <div className={"centerAlignItem"} style={{ border: "1px solid black" }}>
      <span>{objective.description}</span>
    </div>
  );
};

type SheetPropsType = {};

export default Sheet;

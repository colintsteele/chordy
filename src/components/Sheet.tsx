import { useDispatch, useSelector, useStore } from "react-redux";
import "../css/CenterAlign.css"
import { useEffect } from "react";
import { setObjective } from "../store/slices/objectiveSlice";
import { shallowEqual } from "react-redux";
import Objective from "./Objective";

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
      const enabledScales = Object.keys(state.objectiveSettings.selectedScales).filter(
        (key: string) => state.objectiveSettings.selectedScales[key]
      );
      const enabledTypes = Object.keys(state.objectiveSettings.selectedTypes).filter(
        (key: string) => state.objectiveSettings.selectedTypes[key]
      );

      dispatch(setObjective({ scales: enabledScales, types: enabledTypes }));
    }
  }, [complete]);

  return (
    <div className={"centerAlignItem"}>
      <Objective
        name={objective.name}
        progressed={objective.progressed}
        completed={objective.complete}
        octave={objective.octave}
        description={objective.description}
        type={objective.type}
        objectives={objective.objectives}
      />
    </div>
  );
};

type SheetPropsType = {};

export default Sheet;

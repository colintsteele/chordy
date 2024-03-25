import { useDispatch, useSelector, useStore } from "react-redux";
import { Note } from "../Theory";
import "../css/CenterAlign.css"
import { enabledScales, enabledTypes } from "../store/slices/objectiveSettingsSlice"; 
import { useEffect } from "react";
import { setObjective } from "../store/slices/objectiveSlice";
import { shallowEqual } from "react-redux";

const Sheet = () => {
  const store: any = useStore();
  const scales = useSelector(enabledScales);
  const types = useSelector(enabledTypes);
  const complete: boolean = useSelector((state: any) => state.objective.complete);
  const objective = useSelector((state: any) => state.objective, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('use effect run');
    if (complete) {
      dispatch(setObjective({scales: scales, types: types}));
    }
  }, [complete]);

  console.log('Sheet rendered')
  console.dir(objective)
  return (
    <div className={"centerAlignItem"} style={{ border: "1px solid black" }}>
      <span>{objective.description}</span>
    </div>
  );
};

type SheetPropsType = {};

export default Sheet;

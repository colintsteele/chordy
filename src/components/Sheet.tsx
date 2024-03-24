import { useDispatch, useSelector, useStore } from "react-redux";
import { Note } from "../Theory";
import "../css/CenterAlign.css"

const Sheet = () => {
  const store: any = useStore();
  const state: any = store.getState();
  const objective = useSelector((state: any) => state.objective.objective);
  const dispatch = useDispatch();

  const fetchNewObjective = () => {
    // {selectedScales, selectedtypes} = state.objectiveSettings.objectiveSettings;
    // dispatch(generateObjective(state.objectiveSettings.objectiveSettings)
    dispatch({ type: "generateObjective", payload: {}})
  }

  const objectiveNoteStrings = (notes: Note[]) => {
    return notes.map((note) => {
      return note.noteName + note.octave;
    });
  };


  if(objective.complete) {
    fetchNewObjective();
  }

  return (
    <div className={"center-align"} style={{ border: "1px solid black" }}>
      <span>{objective.description}</span>
    </div>
  );
};

type SheetPropsType = {};

export default Sheet;

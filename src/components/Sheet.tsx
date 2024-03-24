import { useSelector, useStore } from "react-redux";
import { Note } from "../Theory";
import "../css/CenterAlign.css"

const Sheet = () => {
  const store: any = useStore();
  const objective = useSelector((state: any) => state.objective.objective);
  const state: any = store.getState();

  const fetchNewObjective = () => {
    console.log('fetching new objective')
    console.dir(state.objectiveSettings.objectiveSettings);
    // dispatch(generateObjective(state.objectiveSettings.objectiveSettings)
    // dispatch(setObjective({}));
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

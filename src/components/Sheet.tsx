import { useSelector } from "react-redux";
import Objective from "./Objective";
import { Note } from "../Theory";
// import Objective from "../objectives/Objective";

const Sheet = () => {
  const objective = useSelector((state: any) => state.objective.objective);

  const objectiveNoteStrings = (notes: Note[]) => {
    return notes.map((note) => {
      return note.noteName + note.octave;
    });
  }


  return (
    <div style={{border: '1px solid black'}}>
      <span>sheet</span>
    </div>
  );
};

type SheetPropsType = {
};

export default Sheet;

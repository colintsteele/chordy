import { useSelector } from "react-redux";
import Objective from "./Objective";
import { Note } from "../Theory";
import "../css/CenterAlign.css"
// import Objective from "../objectives/Objective";

const Sheet = () => {
  const objective = useSelector((state: any) => state.objective.objective);

  const objectiveNoteStrings = (notes: Note[]) => {
    return notes.map((note) => {
      return note.noteName + note.octave;
    });
  };

  return (
    <div className={"center-align"} style={{ border: "1px solid black" }}>
      <span>{objective.description}</span>
    </div>
  );
};

type SheetPropsType = {};

export default Sheet;

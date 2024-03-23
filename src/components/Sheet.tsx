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
    <div>
      <Objective
        name={objective.name}
        progressed={objective.progressed}
        completed={objective.completed}
        objectives={objectiveNoteStrings(objective.notes)}
        description={objective.description}
        type={objective.type}
      />
    </div>
  );
};

type SheetPropsType = {
};

export default Sheet;

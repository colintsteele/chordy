import { Note } from "../Theory";
import { Vex } from "vexflow";
const { StaveNote, Accidental } = Vex.Flow;

class VexFlowNotes {
  notes: Note[];
  objectiveType: string;

  constructor(notes: Note[], objectiveType: string) {
    this.notes = notes;
    this.objectiveType = objectiveType;
  }
}

export default VexFlowNotes;

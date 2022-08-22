import { Note, Scale } from "../Theory";
import { isEqual, uniqWith } from "lodash";
import Objective from "./Objective";

class ScaleObjective extends Objective {
  completedNotes: Note[];
  objectives: Note[];
  name: string;

  constructor(scale: Scale) {
    super();
    this.name = `${scale.name} scale`;
    this.objectives = scale.notes;
    this.completedNotes = [];
  }

  //returns false if one of the notesPressed is not in the objective
  pressNotes(notesPressed: Note[]): boolean {
    let allValid = notesPressed.every((note: Note) => {
      return this.objectives.some((pNote) => {
        return isEqual(pNote, note);
      });
    });

    if (allValid === true) {
      this.completedNotes.push(...notesPressed);
      this.completedNotes = uniqWith(this.completedNotes, isEqual);
      return true;
    } else {
      this.completedNotes = [];
      return false;
    }
  }

  isComplete(): boolean {
    return this.completedNotes.length === this.objectives.length;
  }
}

export default ScaleObjective;

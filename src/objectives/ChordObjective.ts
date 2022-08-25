import { Note, Chord } from "../Theory";
import { isEqual, spread } from "lodash";
import Objective from "./Objective";

class ChordObjective extends Objective {
  objectiveNotes: Note[];

  constructor(chord: Chord) {
    super();
    this.objectiveNotes = chord.notes;
  }

  isComplete(notesPressed: Note[]): Boolean {
    return this.objectiveNotes.every((note) => {
      return notesPressed.some((pNote) => {
        return isEqual(pNote, note);
      });
    });
  }
}

export default ChordObjective;

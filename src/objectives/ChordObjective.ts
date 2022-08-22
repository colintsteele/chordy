import { Note, Chord } from "../Theory";
import { isEqual } from "lodash";

class ChordObjective {
  objectiveNotes: Note[];

  constructor(chord: Chord) {
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

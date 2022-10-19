import { Note } from "../Theory";
import Objective from "./Objective";

class NoteObjective extends Objective {
  constructor(note: Note) {
    super({ notes: [note], name: note.noteName});
    this.name = `${note.noteName}${note.octave}`;
  }
}

export default NoteObjective;

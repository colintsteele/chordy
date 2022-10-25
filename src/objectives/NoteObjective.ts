import { Note } from "../Theory";
import Objective from "./Objective";

const TYPE = "note";
class NoteObjective extends Objective {
  constructor(note: Note) {
    super({ notes: [note], name: note.noteName });
    this.name = `${note.noteName}${note.octave}`;
    this.type = TYPE;
  }
}

export default NoteObjective;

import { Note } from "../Theory";
interface Completable {
  isComplete(): boolean;
}

interface Progressable {
  PressNote(notes: Note[]): boolean;
}

class NewObjective {
  name!: string;
  objectives!: Note[] | NewObjective[];
}

export default NewObjective;

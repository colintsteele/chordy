import { Note } from "../Theory";
export interface Completable {
  isComplete(): boolean;
  pressNotes(notes: Note[]): boolean;
}
abstract class Objective implements Completable {
  name!: string;
  objectives!: Objective[] | Note[];
  completedNotes: any;
  progressed: boolean;
  complete: boolean;

  constructor() {
    this.progressed = false;
    this.complete = false;
  }

  isComplete(): boolean {
    console.error("objective.isComplete not implemented");
    return false;
  }

  pressNotes(notes: Note[]): boolean {
    console.error("objective.pressNotes not implemented");
    return false;
  }
}

export default Objective;

import { isEqual, remove, uniqWith } from "lodash";
import { Note } from "../Theory";

export interface Completable {
  name: string;
  objectives: Note[];
  completedNotes: Note[];
  progressed: boolean;
  complete: boolean;
  description?: string;
  type: string;
  holdConsecutive: boolean;
}

abstract class Objective implements Completable {
  name: string;
  objectives: Note[];
  completedNotes: Note[];
  progressed: boolean;
  complete: boolean;
  description?: string;
  type: string;
  holdConsecutive: boolean;

  constructor(objective: { notes: Note[]; name: string }) {
    this.objectives = objective.notes;
    this.completedNotes = [];
    this.progressed = false;
    this.complete = false;
    this.holdConsecutive = false;
  }

  pressNotes(notesPressed: Note[]): boolean {
    //needs to stay as boolean to immediately return false in case note is wrong
    let allValid: boolean = notesPressed.every((note: Note) => {
      return this.objectives.some((pNote) => {
        return pNote.noteName === note.noteName;
      });
    });

    if (allValid === true) {
      this.completedNotes.push(...notesPressed);
      this.completedNotes = uniqWith(this.completedNotes, isEqual);
      this.progressed = true;
      this.complete = this.isComplete();
    }
    return allValid;
  }

  liftNotes(notesLifted: Note[]): void {
    remove(this.completedNotes, (note) => notesLifted.includes(note));
  }

  isComplete(): boolean {
    return this.completedNotes.length === this.objectives.length;
  }

  checkSuccess(): void {}
}

export default Objective;

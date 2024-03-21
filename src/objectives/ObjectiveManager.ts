import Objective from "./Objective";
import ChordObjective from "./ChordObjective";
import ScaleObjective from "./ScaleObjective";
import NoteObjective from "./NoteObjective";
import * as theory from "../Theory";
import { sample } from "lodash";

class ObjectiveManager {
  scalesEnabled: string[] = ["major"];
  objectiveTypesEnabled: string[] = ["scale"];
  progressed!: boolean;
  currentObjective: Objective;
  progressUpdater: Function;
  completed: boolean;

  constructor(
    availableScales: string[],
    objectiveTypes: string[],
    progressUpdater: Function,
    objective?: Objective
  ) {
    this.scalesEnabled = availableScales;
    this.objectiveTypesEnabled = objectiveTypes;
    this.currentObjective = objective || this.randomObjective();
    this.progressUpdater = progressUpdater;
    this.completed = false;
  }

  randomObjective(): Objective {
    let objective: Objective;
    let objectiveType = sample(this.objectiveTypesEnabled);

    switch (objectiveType) {
      case "scale":
        let scale = theory.randomScale(this.scalesEnabled);
        objective = new ScaleObjective(scale);
        break;
      case "chord":
        let chord = theory.randomChord(this.scalesEnabled);
        objective = new ChordObjective(chord);
        break;
      case "note":
        let note = theory.randomNote();
        objective = new NoteObjective(note);
        break;
      default:
        scale = theory.randomScale(this.scalesEnabled);
        objective = new ScaleObjective(scale);
    }

    return objective;
  }

  pressNotes(notes: theory.Note[]): boolean {
    let progressed = this.currentObjective.pressNotes(notes);
    let completed = this.currentObjective.complete;
    this.progressed = progressed;
    this.completed = completed;

    this.progressUpdater({
      progressed: this.progressed,
      completed: this.completed,
    });

    if (this.completed) {
      this.currentObjective = this.randomObjective();
      this.progressUpdater({
        completed: false,
      });
    }

    return progressed;
  }

  liftNotes(notes: theory.Note[]): void {
    this.currentObjective.liftNotes(notes);
  }

  updateTypesEnabled(toggleType: string): boolean {
    if (this.objectiveTypesEnabled.includes(toggleType)) {
      this.objectiveTypesEnabled = this.objectiveTypesEnabled.filter(
        (type) => type !== toggleType
      );
    } else {
      this.objectiveTypesEnabled.push(toggleType);
    }

    // reject change if it renders objectiveTypesEnabld empty
    if (this.objectiveTypesEnabled.length === 0) {
      this.objectiveTypesEnabled.push(toggleType);
      return false;
    } else {
      return true;
    }
  }
}

export default ObjectiveManager;

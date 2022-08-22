import Objective from "./Objective";
import ChordObjective from "./ChordObjective";
import ScaleObjective from "./ScaleObjective";
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
    let scale = theory.randomScale(this.scalesEnabled);
    let objective: Objective;

    let objectiveType = sample(this.objectiveTypesEnabled);
    switch (objectiveType) {
      case "scale":
        scale = theory.randomScale(this.scalesEnabled);
        objective = new ScaleObjective(scale);
    }

    // BAD MAKE INTO DEFAULT CASE
    scale = theory.randomScale(this.scalesEnabled);
    objective = new ScaleObjective(scale);

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
    return progressed;
  }
}

export default ObjectiveManager;

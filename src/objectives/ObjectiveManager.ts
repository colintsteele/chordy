import Objective from "./Objective";
import ChordObjective from "./ChordObjective";
import ScaleObjective from "./ScaleObjective";
import * as theory from "../Theory";
import { sample } from "lodash";

class ObjectiveManager {
  scalesEnabled: string[] = ["major"];
  objectiveTypesEnabled: string[] = ["scale"];
  currentObjective: Objective;

  constructor(
    availableScales: string[],
    objectiveTypes: string[],
    objective?: Objective
  ) {
    this.scalesEnabled = availableScales;
    this.objectiveTypesEnabled = objectiveTypes;
    this.currentObjective = objective || this.randomObjective();
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
    return this.currentObjective.pressNotes(notes);
  }
}

export default ObjectiveManager;

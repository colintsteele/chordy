import NewObjective from "./Objective";
import ChordObjective from "./ChordObjective";
import ScaleObjective from "./ScaleObjective";
import * as theory from "../Theory";
import { scale } from "../Theory";
import { sample } from "lodash";

class ObjectiveManager {
  scalesEnabled: string[] = ["major"];
  objectiveTypesEnabled: string[] = ["scale"];

  constructor(availableScales: string[], objectiveTypes: string[]) {
    this.scalesEnabled = availableScales;
    this.objectiveTypesEnabled = objectiveTypes;
  }

  randomObjective(): NewObjective {
    let note = theory.newRandomNote();
    let scale = theory.newRandomScale(this.scalesEnabled);
    let objective: NewObjective;

    let objectiveType = sample(this.objectiveTypesEnabled);
    switch (objectiveType) {
      case "scale":
        scale = theory.newRandomScale(this.scalesEnabled);
        objective = new ScaleObjective(scale);
    }

    // BAD MAKE INTO DEFAULT CASE
    scale = theory.newRandomScale(this.scalesEnabled);
    objective = new ScaleObjective(scale);

    return objective;
  }
}

export default ObjectiveManager;

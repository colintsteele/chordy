import { Note, Scale } from "../Theory";
import Objective from "./Objective";

const TYPE = "scale";
class ScaleObjective extends Objective {
  constructor(scale: Scale) {
    super(scale);
    this.name = `${scale.name} scale`;
    this.description = this.name;
    this.type = TYPE;
  }

  liftNotes(_notes: Note[]): void {}
}

export default ScaleObjective;

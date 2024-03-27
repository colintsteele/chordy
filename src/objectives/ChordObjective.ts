import { Chord } from "../Theory";
import Objective from "./Objective";

const TYPE = "chord";
class ChordObjective extends Objective {
  constructor(chord: Chord) {
    super(chord);
    this.name = `${chord.name} chord`;
    this.description = this.name;
    this.type = TYPE;
    this.holdConsecutive = true;
  }
}

export default ChordObjective;

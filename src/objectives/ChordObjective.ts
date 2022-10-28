import { Note, Chord } from "../Theory";
import { isEqual, spread, uniqWith } from "lodash";
import Objective from "./Objective";

const TYPE = "chord";
class ChordObjective extends Objective {
  constructor(chord: Chord) {
    super(chord);
    this.name = `${chord.name} chord`;
    this.description = this.name;
    this.type = TYPE;
  }
}

export default ChordObjective;

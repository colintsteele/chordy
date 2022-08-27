import { Note, Chord } from "../Theory";
import { isEqual, spread, uniqWith } from "lodash";
import Objective from "./Objective";

class ChordObjective extends Objective {
  constructor(chord: Chord) {
    super(chord);
    this.name = `${chord.name} chord`;
  }
}

export default ChordObjective;

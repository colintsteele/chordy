import * as theory from "../Theory";
import { Note, twoOctaves } from "../Theory";

export class MidiNote {
  midiNumber: number;
  note: Note;

  constructor(midiNumber: number) {
    this.midiNumber = midiNumber;
    this.note = this.midiNumberToNote(midiNumber);
  }

  midiNumberToNote(midiNumber: number) {
    var num = midiNumber % 24;
    // var octave = num > 11 ? 3 : 4;
    var noteName = twoOctaves[num] as theory.NoteName;
    var note = theory.note(noteName);

    return note;
  }
}

export default MidiNote;

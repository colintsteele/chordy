import * as theory from "../Theory";
import { Note, NoteName, twoOctaves } from "../Theory";

export class MidiNote {
  midiNumber: number;
  note: Note;
  octaveNote: Note;

  constructor(midiNumber: number) {
    this.midiNumber = midiNumber;
    this.note = this.midiNumberToNote(midiNumber);
    this.octaveNote = this.fullMidiMap(midiNumber);
  }

  midiNumberToNote(midiNumber: number) {
    var num = midiNumber % 24;
    // var octave = num > 11 ? 3 : 4;
    var noteName = twoOctaves[num] as theory.NoteName;
    var note = theory.note(noteName);

    return note;
  }

  fullMidiMap(midiNumber: number) {
    let notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']
    let base = midiNumber - 21
    let note = notes[base % 12];
    let octave = Math.floor(midiNumber / 12);
    return theory.note(note as NoteName, octave);
  }
}

export default MidiNote;

import * as Tone from "tone";
import PianoMp3 from "tonejs-instrument-piano-mp3";
import MidiNote from "../midi/MidiNote";

const instrument = new PianoMp3();
instrument.toMaster();

class ToneService {
  static playSound() {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    instrument.toMaster();
    instrument.triggerAttackRelease("C3", "4n");
    instrument.triggerAttackRelease("C4", "4n");
  }

  static playNote(midiNumber: number) {
    let note = new MidiNote(midiNumber).octaveNote;
    let noteArg = `${note.noteName}${note.octave}`;

    instrument.triggerAttackRelease(noteArg, "4n");
  }

  static pressNote(midiNumber: number) {
    let note = new MidiNote(midiNumber).octaveNote;
    let noteArg = `${note.noteName}${note.octave}`;

    instrument.triggerAttack(noteArg);
  }

  static liftNote(midiNumber: number) {
    let note = new MidiNote(midiNumber).octaveNote;
    let noteArg = `${note.noteName}${note.octave}`;

    instrument.triggerRelease(noteArg);
  }
}

export default ToneService;

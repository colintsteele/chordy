
import * as Tone from 'tone';
import PianoMp3 from 'tonejs-instrument-piano-mp3';
import MidiNote from '../midi/MidiNote';

const BufferUnsetError = "buffer is either not set or not loaded";
let instrument = new PianoMp3;
let oldInstrument = null;
instrument.toMaster();

class ToneService {
  static playSound() {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    // instrument.toMaster();
    instrument.triggerAttackRelease("C3", "4n");
    instrument.triggerAttackRelease("C4", "4n");
  }

  static playNote(midiNumber: number) {
    let note = new MidiNote(midiNumber).octaveNote;
    let noteArg = `${note.noteName}${note.octave}`;

    try {
      instrument.triggerAttackRelease(noteArg, "4n");
    } catch (error: any) {
      // play notes on the old buffer if the new one is not available
      if (error?.message === BufferUnsetError) {
        try {
          oldInstrument.triggerAttackRelease(noteArg, "4n");
        } catch (_e: any) {
          
        } // if it still doesn't work, just no-op
      }
    }
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

  static cleanup() {
    let secondInstrument = new PianoMp3();
    oldInstrument = instrument;

    secondInstrument.toMaster();
    instrument = secondInstrument;

    setTimeout(async () => {
      await oldInstrument.dispose();
    }, 200);
  }
}

export default ToneService;
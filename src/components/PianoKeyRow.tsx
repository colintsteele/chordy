import * as theory from "../Theory";
import PianoKey from "./PianoKey";

// component responsible for collecting and organizing irregular note clusters
// e.g. A set of notes from Midi 41 to 53 (F to E) and all appropriately placed accidentals
const PianoKeyRow = ({ startMidi, endMidi }: PianoKeyProps) => {
  const pianoKeyProps = (midi: number, xOffset: number) => {
    let note = theory.midiToNote(midi);
    let accidental = note.noteName.match(/b|#$/) !== null;

    return {
      key: midi,
      accidental: accidental,
      noteName: note.noteName,
      midiNumber: midi,
      xOffset: accidental === true ? xOffset : 0,
      showMeta: true,
    };
  };

  const pianoKeysToRender = (start: number, end: number) => {
    let keys = [];
    let midis = [];

    for (let i = start; i <= end; i++) {
      midis.push(i);
    }

    let offsets = testCalculateOffset(midis).reverse();

    for (let i = start; i <= end; i++) {
      let keyProps = pianoKeyProps(i, offsets.pop());

      keys.push(<PianoKey {...keyProps} />);
    }

    return keys;
  };

  return (
    <>
      <div className="KeyContainer">
        {pianoKeysToRender(startMidi, endMidi)}
      </div>
    </>
  );
};

export const testCalculateOffset = (keys: number[]) => {
  const initial = 0.7;
  const offset = 1.5;

  let currentOffset = 0.7;
  let previousNote = null;
  let offsets = [];

  keys.forEach((midi) => {
    let note = theory.midiToNote(midi)
    let accidental = note.noteName.endsWith("b");

    if (accidental === true) {
      // when starting with an accidental
      if (offsets.length === 0) {
        offsets.push(initial * -1);
      }
    } else {
      // when starting with a natural
      if (offsets.length === 0) {
      } else {
        // check for double naturals
        if (!previousNote.noteName.endsWith("b") && !accidental) {
          currentOffset += offset; // push a double offset if both keys were naturals
        }
      }
    }

    offsets.push(currentOffset);
    currentOffset += offset;
    previousNote = note;
  });

  return offsets;
};

type PianoKeyProps = {
  startMidi: number;
  endMidi: number;
  pressedNotes?: [];
};
export default PianoKeyRow;

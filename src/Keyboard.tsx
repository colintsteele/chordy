import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

function Keyboard() {
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber: Number) => {
        // Play a given note - see notes below
        console.log(midiNumber);
      }}
      stopNote={(midiNumber: Number) => {
        // Stop playing a given note - see notes below
        console.log(midiNumber);
      }}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
}

export default Keyboard;

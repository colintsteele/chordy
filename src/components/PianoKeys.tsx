import "../App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import ObjectiveManager from "../objectives/ObjectiveManager";
import MidiNote from "../midi/MidiNote";

class PianoKeys extends Component<
  { activeNotes: any[]; objectiveManager: ObjectiveManager },
  {}
> {
  activeNotes: any[];
  firstNote: any;
  lastNote: any;
  keyboardShortcuts: any;
  objectiveManager: ObjectiveManager;

  constructor(props) {
    super(props);
    this.firstNote = MidiNumbers.fromNote("F0"); //43
    this.lastNote = MidiNumbers.fromNote("E2"); //66
    this.activeNotes = [];
    this.objectiveManager = props.objectiveManager;

    this.keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: this.firstNote,
      lastNote: this.lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
  }

  render(): ReactNode {
    return (
      <Piano
        activeNotes={this.activeNotes}
        noteRange={{ first: this.firstNote, last: this.lastNote }}
        playNote={(midiNumber) => {
          let note = this.midiToNote(midiNumber);
          this.objectiveManager.pressNotes([note]);
          console.log(midiNumber);
        }}
        stopNote={(midiNumber) => {}}
        width={1000}
        keyboardShortcuts={this.keyboardShortcuts}
      />
    );
  }

  midiToNote(midiNumber: number): theory.Note {
    return new MidiNote(midiNumber).note;
  }
}

export default PianoKeys;

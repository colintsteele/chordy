import "../App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import ObjectiveManager from "../objectives/ObjectiveManager";
import MidiNote from "../midi/MidiNote";
import "../PianoKey.css";
import NewKeys from "./NewKeys";

type PianoKeysSate = {
  objectiveManager: ObjectiveManager;
  activeNotes: number[];
};

type PianoKeysProps = {
  activeNotes: number[];
};
class PianoKeys extends Component<PianoKeysSate, PianoKeysProps> {
  firstNote: any;
  lastNote: any;
  keyboardShortcuts: any;
  objectiveManager: ObjectiveManager;
  state = {
    activeNotes: [],
  };

  constructor(props) {
    super(props);
    this.firstNote = MidiNumbers.fromNote("F0"); //43
    this.lastNote = MidiNumbers.fromNote("E2"); //66
    this.objectiveManager = props.objectiveManager;

    this.keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: this.firstNote,
      lastNote: this.lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
  }

  static getDerivedStateFromProps(props: PianoKeysProps, state: PianoKeysSate) {
    if (props.activeNotes !== state.activeNotes) {
      return {
        activeNotes: props.activeNotes,
      };
    }

    return null;
  }

  listActiveNotes() {
    if (this.state.activeNotes.length === 0) return null;

    return `active notes include: ${this.state.activeNotes}`;
  }

  render(): ReactNode {
    return (
      <>
        {/* <Piano
          activeNotes={this.state.activeNotes}
          noteRange={{ first: this.firstNote, last: this.lastNote }}
          playNote={(midiNumber: number) => {
            let note = this.midiToNote(midiNumber);
            this.objectiveManager.pressNotes([note]);
          }}
          stopNote={(midiNumber: number) => {
            let note = this.midiToNote(midiNumber);
            this.objectiveManager.liftNotes([note]);
          }}
          width={1000}
          keyboardShortcuts={this.keyboardShortcuts}
        /> */}
        <span hidden>{this.listActiveNotes()}</span>

        <NewKeys startingNote={41} activeKeys={this.state.activeNotes} />
        <NewKeys startingNote={41 + 12} activeKeys={this.state.activeNotes} />
      </>
    );
  }

  midiToNote(midiNumber: number): theory.Note {
    return new MidiNote(midiNumber).note;
  }
}

export default PianoKeys;

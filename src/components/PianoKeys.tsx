import "../App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import Objective from "../objectives/Objective";
import ScaleObjective from "../objectives/ScaleObjective";
import * as React from "react";
import { keys } from "lodash";
import { KeyExportOptions } from "crypto";
import ObjectiveManager from "../objectives/ObjectiveManager";

class PianoKeys extends Component<{ activeNotes: any[] }, {}> {
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
        playNote={(midiNumber) => {}}
        stopNote={(midiNumber) => {}}
        width={1000}
        keyboardShortcuts={this.keyboardShortcuts}
      />
    );
  }
}

export default PianoKeys;

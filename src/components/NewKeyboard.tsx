import "../App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import NewObjective from "../objectives/Objective";
import ScaleObjective from "../objectives/ScaleObjective";
import React from "react";
import PianoKeys from "./PianoKeys";

class NewKeyboard extends Component {
  activeNotes: any[];

  constructor(props) {
    super(props);
    this.activeNotes = [];

    this.state = {
      // objective: scaleObjective,
    };
  }

  render(): ReactNode {
    return <PianoKeys activeNotes={this.activeNotes} />;
  }
}

export default NewKeyboard;

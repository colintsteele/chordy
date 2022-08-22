import "../App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import Objective from "../objectives/Objective";
import ScaleObjective from "../objectives/ScaleObjective";
import React from "react";
import PianoKeys from "./PianoKeys";
import ObjectiveManager from "../objectives/ObjectiveManager";

class NewKeyboard extends Component {
  activeNotes: any[];
  scalesEnabled: string[];
  objectiveTypesEnabled: string[];
  objectiveManager: ObjectiveManager;

  constructor(props) {
    super(props);
    this.activeNotes = [];
    this.scalesEnabled = ["major"];
    this.objectiveTypesEnabled = ["scale"];
    this.objectiveManager = new ObjectiveManager(this.scalesEnabled, this.objectiveTypesEnabled);

    this.state = {
      // objective: scaleObjective,
    };
  }

  render(): ReactNode {
    return <PianoKeys activeNotes={this.activeNotes} />;
  }
}

export default NewKeyboard;

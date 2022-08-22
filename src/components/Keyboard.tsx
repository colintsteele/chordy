import "../App.css";
import "react-piano/dist/styles.css";
// import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import React from "react";
import PianoKeys from "./PianoKeys";
import ObjectiveManager from "../objectives/ObjectiveManager";

class Keyboard extends Component {
  activeNotes: any[];
  scalesEnabled: string[];
  objectiveTypesEnabled: string[];
  objectiveManager: ObjectiveManager;

  constructor(props) {
    super(props);
    this.activeNotes = [];
    this.scalesEnabled = ["major"];
    this.objectiveTypesEnabled = ["scale"];
    this.objectiveManager = new ObjectiveManager(
      this.scalesEnabled,
      this.objectiveTypesEnabled
    );

    this.state = {
      // objective: scaleObjective,
    };
  }

  render(): ReactNode {
    return (
      <PianoKeys
        activeNotes={this.activeNotes}
        objectiveManager={this.objectiveManager}
      />
    );
  }
}

export default Keyboard;

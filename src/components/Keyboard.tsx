import "../App.css";
import "react-piano/dist/styles.css";
// import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import React from "react";
import PianoKeys from "./PianoKeys";
import ObjectiveManager from "../objectives/ObjectiveManager";
import Objective from "../components/Objective";
//for testing
import * as theory from "../Theory";
import ScaleObjective from "../objectives/ScaleObjective";

type KeyboardState = {
  progressed: boolean | undefined;
  completed: boolean;
};
type KeyboardProps = {};

class Keyboard extends Component<KeyboardState, KeyboardProps> {
  activeNotes: any[];
  scalesEnabled: string[];
  objectiveTypesEnabled: string[];
  objectiveManager: ObjectiveManager;
  state: KeyboardState = {
    progressed: undefined,
    completed: false,
  };

  constructor(props) {
    super(props);
    this.activeNotes = [];
    this.scalesEnabled = ["major"];
    this.objectiveTypesEnabled = ["scale"];
    //forced C for testing
    let scale = theory.scale(theory.note("C"), "major");
    let objective = new ScaleObjective(scale);

    this.objectiveManager = new ObjectiveManager(
      this.scalesEnabled,
      this.objectiveTypesEnabled,
      this.progressUpdater
    );
  }

  progressUpdater = (progression: KeyboardState) => {
    this.setState({
      progressed: progression.progressed,
      completed: progression.completed,
    });
  };

  render(): ReactNode {
    return (
      <>
        <PianoKeys
          activeNotes={this.activeNotes}
          objectiveManager={this.objectiveManager}
        />
        <Objective
          name={this.objectiveManager.currentObjective.name}
          progressed={this.state.progressed}
          completed={this.state.completed}
          objectives={this.objectiveNotes()}
        />
      </>
    );
  }

  objectiveNotes(): string[] {
    return this.objectiveManager.currentObjective.objectives.map(
      (objective: any) => {
        return `${objective.noteName}, `;
      }
    );
  }
}

export default Keyboard;

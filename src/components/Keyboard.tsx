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
import MidiController from "../midi/MidiController";
import { uniq, remove } from "lodash";

type KeyboardState = {
  progressed: boolean | undefined;
  completed: boolean;
  activeNotes: number[];
};
type KeyboardProps = {};

class Keyboard extends Component<KeyboardState, KeyboardProps> {
  scalesEnabled: string[];
  objectiveTypesEnabled: string[];
  objectiveManager: ObjectiveManager;
  state: KeyboardState = {
    progressed: undefined,
    completed: false,
    activeNotes: [],
  };

  constructor(props) {
    super(props);
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

  componentDidMount() {
    new MidiController(this.midiMessageHandler.bind(this));
  }

  //TODO clean up signature
  midiMessageHandler = (event, onOff, midiNote, velocity) => {
    console.dir(event);
    var [pressOn, midiNumber, _something] = [...event.data];

    // if (pressOn == 144) {
    if (onOff) {
      this.pressNote(midiNote);
    } else {
      this.liftNote(midiNote);
    }
  };

  pressNote(midiNumber: number) {
    let currentNotes = this.state.activeNotes;
    let newNotes = uniq([...currentNotes, midiNumber]);

    this.setState({
      activeNotes: newNotes,
    });
  }

  liftNote(midiNumber: number) {
    let currentNotes = this.state.activeNotes;
    let newNotes = remove(currentNotes, midiNumber);

    this.setState({
      activeNotes: newNotes,
    });
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
        <Objective
          name={this.objectiveManager.currentObjective.name}
          progressed={this.state.progressed}
          completed={this.state.completed}
          objectives={this.objectiveNotes()}
        />
        <PianoKeys
          activeNotes={this.state.activeNotes}
          objectiveManager={this.objectiveManager}
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

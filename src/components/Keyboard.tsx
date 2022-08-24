import "../App.css";
import "react-piano/dist/styles.css";
// import * as theory from "../Theory";
import { Component, ReactNode } from "react";
import React from "react";
import PianoKeys from "./PianoKeys";
import ObjectiveManager from "../objectives/ObjectiveManager";
import Objective from "../components/Objective";
//for testing
import ScaleObjective from "../objectives/ScaleObjective";
import MidiController from "../midi/MidiController";
import { uniq, remove } from "lodash";
import { Box } from "@mui/material";

type KeyboardState = {
  progressed: boolean | undefined;
  completed: boolean;
  activeNotes: number[];
  midiMounted?: boolean;
  lastAction?: string;
};

type KeyboardProps = {};

class Keyboard extends Component<KeyboardState, KeyboardProps> {
  scalesEnabled: string[];
  objectiveTypesEnabled: string[];
  objectiveManager: ObjectiveManager;
  state: KeyboardState = {
    progressed: undefined,
    completed: false,
    midiMounted: false,
    activeNotes: [],
    lastAction: "",
  };

  constructor(props) {
    super(props);
    this.scalesEnabled = ["major"];
    this.objectiveTypesEnabled = ["scale"];

    //forced C for testing
    // let scale = theory.scale(theory.note("C"), "major");
    // let objective = new ScaleObjective(scale);

    this.objectiveManager = new ObjectiveManager(
      this.scalesEnabled,
      this.objectiveTypesEnabled,
      this.progressUpdater
    );
  }

  componentDidMount() {
    new MidiController(
      this.midiMessageHandler.bind(this),
      this.mountMidi.bind(this)
    );
  }

  //TO-DO clean up signature
  midiMessageHandler = (event, onOff, midiNote, velocity) => {
    //can't test midi Events yet
    console.dir(event);
    var [pressOn, midiNumber, _something] = [...event.data];

    // if (pressOn == 144) {
    if (onOff) {
      this.pressNote(midiNote);
    } else {
      this.liftNote(midiNote);
    }
  };

  mountMidi = (mounted: boolean) => {
    this.setState({ midiMounted: mounted });
  };

  pressNote(midiNumber: number) {
    let currentNotes = this.state.activeNotes;
    let newNotes = uniq([...currentNotes, midiNumber]);
    let action = `pressed${midiNumber}`;

    this.setState({
      lastAction: action,
      activeNotes: newNotes,
    });
  }

  liftNote(midiNumber: number) {
    let currentNotes = this.state.activeNotes;
    remove(currentNotes, (num) => num === midiNumber);
    let action = `lifted${midiNumber}`;

    this.setState({
      lastAction: action,
      activeNotes: currentNotes,
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
        <span hidden>
          {this.state.midiMounted ? "midiMounted" : "midiUnmounted"}
        </span>
        <span hidden>{this.state.lastAction}</span>
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

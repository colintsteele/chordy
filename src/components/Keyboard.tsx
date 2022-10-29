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
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import MidiNote from "../midi/MidiNote";
import { Note, note } from "../Theory";
import ObjectiveTypesToggle from "./ObjectiveTypesToggle";
import ToneService from "../services/ToneService";

type KeyboardState = {
  progressed: boolean | undefined;
  completed: boolean;
  activeNotes: number[];
  midiMounted?: boolean;
  lastAction?: string;
  soundOn: boolean;
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
    soundOn: false,
    activeNotes: [],
    lastAction: "",
  };

  constructor(props) {
    super(props);
    this.scalesEnabled = ["major"];
    this.objectiveTypesEnabled = ["note"];

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

  toggleSound() {
    this.setState({soundOn: !this.state.soundOn})
    console.log(this.state.soundOn);
    ToneService.playSound();
  }

  pressNote(midiNumber: number) {
    let currentNotes = this.state.activeNotes;
    let newNotes = uniq([...currentNotes, midiNumber]);
    let action = `pressed${midiNumber}`;
    this.objectiveManager.pressNotes([new MidiNote(midiNumber).note]);

    this.setState({
      lastAction: action,
      activeNotes: newNotes,
    });
  }

  liftNote(midiNumber: number) {
    let currentNotes = this.state.activeNotes;
    let newNotes = currentNotes.filter((num) => num != midiNumber);
    remove(currentNotes, (num) => num === midiNumber);
    this.objectiveManager.liftNotes([new MidiNote(midiNumber).note]);
    let action = `lifted${midiNumber}`;

    this.setState({
      lastAction: action,
      activeNotes: newNotes,
    });
  }

  progressUpdater = (progression: KeyboardState) => {
    this.setState({
      progressed: progression.progressed,
      completed: progression.completed,
    });
  };

  objectiveNotes(): string[] {
    return this.objectiveManager.currentObjective.objectives.map(
      (objective: Note) => {
        return `${objective.noteName}${objective.octave || ""}`;
      }
    );
  }

  render(): ReactNode {
    return (
      <>
        <span hidden>
          {this.state.midiMounted ? "midiMounted" : "midiUnmounted"}
        </span>
        <span hidden>{this.state.lastAction}</span>
        <Objective
          name={this.objectiveManager.currentObjective.name}
          type={this.objectiveManager.currentObjective.type}
          progressed={this.state.progressed}
          completed={this.state.completed}
          objectives={this.objectiveNotes()}
          description={this.objectiveManager.currentObjective.description}
          // objectives={this.objectiveManager.currentObjective.objectives}
        />

        <ObjectiveTypesToggle
          objectiveTypesEnabled={this.objectiveManager.objectiveTypesEnabled}
          toggleType={this.objectiveManager.updateTypesEnabled.bind(
            this.objectiveManager
          )}
        />

        <PianoKeys
          activeNotes={this.state.activeNotes}
          objectiveManager={this.objectiveManager}
        // updateKeys={}
        />

        <Switch
          defaultChecked={false}
          onChange={() => this.toggleSound()}
        />

      </>
    );
  }
}

export default Keyboard;

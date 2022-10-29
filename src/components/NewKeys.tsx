import { Component, ReactNode } from "react";
import ObjectiveManager from "../objectives/ObjectiveManager";
import "../PianoKey.css";
import * as theory from "../Theory";
import ToneService from "../services/ToneService";

type NewKeysState = {
  activeKeys: number[];
  startingNote: number;
  objectiveManager: ObjectiveManager;
};

type NoteDivProps = {
  key: number;
  noteName: string;
  accidental: string;
  pressed: string;
};
class NewKeys extends Component<NewKeysState, {}> {
  activeKeys: any;
  startingNote: any;
  noteProps: NoteDivProps[];
  objectiveManager: ObjectiveManager;
  state: NewKeysState = {
    startingNote: 41,
    activeKeys: [],
    objectiveManager: null,
  };

  clickKey(e) {
    this.objectiveManager.pressNotes([theory.note(e)]);
  }

  playNote(e) {
    console.log(e.key)
    ToneService.playNote(e.key)
  }

  constructor(props) {
    super(props);
    this.activeKeys = props.activeKeys;
    this.startingNote = props.startingNote;
    this.objectiveManager = props.objectiveManager;
    let cCluster = theory.octave.slice(0, 5);
    this.noteProps = [];
    let fCluster = theory.octave.slice(5);

    fCluster.forEach((note) => {
      let midiNote = this.startingNote++;
      let accidental = note.match(/b$/) == null;

      this.noteProps.push({
        key: midiNote,
        noteName: note,
        accidental: accidental ? "Natural" : "Accidental",
        pressed: this.state.activeKeys.includes(midiNote) ? "Pressed" : "",
      });
    });

    cCluster.forEach((note) => {
      let midiNote = this.startingNote++;
      let accidental = note.match(/b$/) == null;

      this.noteProps.push({
        key: midiNote,
        noteName: note,
        accidental: accidental ? "Natural" : "Accidental",
        pressed: this.state.activeKeys.includes(midiNote) ? "Pressed" : "",
      });
    });
  }

  static getDerivedStateFromProps(
    props: { activeKeys: number[] },
    state: { activeKeys: number[] }
  ) {
    if (props.activeKeys !== state.activeKeys) {
      return {
        activeKeys: props.activeKeys,
      };
    }

    return null;
  }

  render(): ReactNode {
    return (
      <>
        <div className="NewKeys Octave">
          <div className="NewKeys F-B">
            {this.noteProps.slice(0, 7).map((props) => {
              return (
                <div
                  key={props.key}
                  className={`NewKey${props.accidental} ${props.noteName} ${
                    props.accidental
                  }${
                    this.state.activeKeys.includes(props.key) ? "Pressed" : ""
                  }`}
                  // onClick={this.clickKey.bind(this)}
                  onClick={() => {
                    this.clickKey(props.noteName);
                    this.playNote(props);
                  }}
                ></div>
              );
            })}
          </div>
          <div className="NewKeys C-E">
            {this.noteProps.slice(7).map((props) => {
              return (
                <div
                  key={props.key}
                  className={`NewKey${props.accidental} ${props.noteName} ${
                    props.accidental
                  }${
                    this.state.activeKeys.includes(props.key) ? "Pressed" : ""
                  }`}
                  onClick={() => {
                    this.clickKey(props.noteName);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default NewKeys;

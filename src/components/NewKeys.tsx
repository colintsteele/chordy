import { Component, ReactNode } from "react";
import "../PianoKey.css";
import * as theory from "../Theory";

type NewKeysState = {
  activeKeys: number[];
  startingNote: number;
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
  state: NewKeysState = {
    startingNote: 41,
    activeKeys: [],
  };

  constructor(props) {
    super(props);
    this.activeKeys = props.activeKeys;
    // this.activeKeys = [27, 28, 43, 44];
    this.startingNote = props.startingNote;
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
                >
                  {props.key}
                </div>
              );
            })}
          </div>
          <div className="NewKeys C-E">
            {this.noteProps.slice(7).map(function (props) {
              return (
                <div
                  key={props.key}
                  className={`NewKey${props.accidental} ${props.noteName} ${
                    props.accidental
                  }s${props.pressed || ""}`}
                ></div>
              );
            })}
          </div>
        </div>
        {/* <div className="NewKeys Octave">
          <div className="NewKeys F-B">
            <div className={"NewKeyNatural F"}></div>
            <div className={"NewKeyAccidental Gb"}></div>
            <div className={"NewKeyNatural G"}></div>
            <div className={"NewKeyAccidental Ab"}></div>
            <div className={"NewKeyNatural A"}></div>
            <div className={"NewKeyAccidental Bb"}></div>
            <div className={"NewKeyNatural B"}></div>
          </div>
          <div className="NewKeys C-E">
            <div className={"NewKeyNatural C"}></div>
            <div className={"NewKeyAccidental Db"}></div>
            <div className={"NewKeyNatural D"}></div>
            <div className={"NewKeyAccidental Eb"}></div>
            <div className={"NewKeyNatural E"}></div>
          </div>
        </div> */}
      </>
    );
  }
}

export default NewKeys;

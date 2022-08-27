import { Component, ReactNode } from "react";
import "../PianoKey.css";

class NewKeys extends Component {
  render(): ReactNode {
    return (
      <>
        <div className="NewKeys Octave">
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
        </div>
      </>
    );
  }
}

export default NewKeys;

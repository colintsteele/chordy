import { Component, ReactNode } from "react";
import ObjectiveManager from "../objectives/ObjectiveManager";
import "../PianoKey.css";
import * as theory from "../Theory";
import ToneService from "../services/ToneService";
import FunctionPianoKey from "./FunctionPianoKey";

type FunctionKeysProps = {

}

// component responsible for collecting and organizing irregular note clusters
// e.g. A set of notes from Midi 41 to 53 (F to E) and all appropriately placed accidentals 
const FunctionKeys = ({  }: FunctionKeysProps) => (
  <>
    <span>Hello from key</span>
    <div className="NewKeys Octave">
      <div className="NewKeys F-B">
        <FunctionPianoKey 
          accidental={false}
          pressed={false}
          noteName={'F'}
          midiNumber={44}
        />
      </div>
      <div className="NewKeys C-E"></div>
    </div>
  </>
);

export default FunctionKeys;
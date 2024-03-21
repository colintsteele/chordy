import { Component, ReactNode } from "react";
import ObjectiveManager from "../objectives/ObjectiveManager";
// import "../PianoKey.css";
import * as theory from "../Theory";
import ToneService from "../services/ToneService";
import FunctionPianoKey from "./FunctionPianoKey";
import { useSelector } from 'react-redux';

// component responsible for collecting and organizing irregular note clusters
// e.g. A set of notes from Midi 41 to 53 (F to E) and all appropriately placed accidentals 
const FunctionKeys = ({startMidi, endMidi}: FunctionKeysProps) => {
  const pressedNotes = useSelector((state: any) => state.keyPresser.notesPressed);

  // returns Redux pressed state for note
  const isNotePressed = (note: number) => {
    return pressedNotes.some((pNote: number) => pNote === note );
  };

  const isKeyboardKeyPressed = (key: any) => {
    // fill in with modifiers for showMeta 
  }



  const pianoKeyProps = (midi: number, xOffset: number) => {
    let note = theory.midiToNote(midi);
    let accidental = note.noteName.match(/b|#$/) !== null;

    return {
      key: midi,
      accidental: accidental,
      pressed: isNotePressed(midi),
      noteName: note.noteName,
      midiNumber: midi,
      xOffset: accidental === true ? xOffset : 0,
      showMeta: false
    }
  }

  const pianoKeysToRender = (start: number, end: number) => {
    let keys = [];
    let midis = [];
    let keyCount = 0;

    for (let i = start; i <= end; i++) {
      midis.push(i);
    }
    let offsets = testCalculateOffset(midis).reverse();

    for (let i = start; i <= end; i++ ) {
      let keyProps = pianoKeyProps(i, offsets.pop());
      keyCount++

      keys.push(<FunctionPianoKey {...keyProps}/>) 
    }

    return keys
  };

  return (
    <>
      <div className="KeyContainer">
        {pianoKeysToRender(startMidi, endMidi)}
      </div>
    </>
  );
};

export const testCalculateOffset = (keys: number[]) => {
  const initial = 0.7;
  const offset = 1.5;

  let currentOffset = 0.7;
  let previousNote = null;
  let offsets = [];

  keys.forEach((midi) => {
    let note = theory.midiToNote(midi)
    let accidental = note.noteName.endsWith('b');
    
    if (accidental === true) {
      // when starting with an accidental
      if (offsets.length === 0) {
        offsets.push(initial * -1);
      }
    } else {
      // when starting with a natural
      if (offsets.length === 0) {
      } else { // check for double naturals
        if(!previousNote.noteName.endsWith('b') && !accidental) {
          currentOffset += offset; // push a double offset if both keys were naturals
        }
      }
    }

    offsets.push(currentOffset);    
    currentOffset += offset;
    previousNote = note;
  });

  return offsets
}

type FunctionKeysProps = {
  startMidi: number;
  endMidi: number;
// we actually need to figure out how
// to get the viewport size here to find out
// how many keys to render
}
export default FunctionKeys;
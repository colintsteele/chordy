import "../App.css";
import { KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as theory from "../Theory";
import { Component, ReactNode, useEffect, useState } from "react";
import ObjectiveManager from "../objectives/ObjectiveManager";
import MidiNote from "../midi/MidiNote";
// import "../PianoKey.css";
import NewKeys from "./NewKeys";
import FunctionKeys from "./FunctionKeys";
import { useSelector } from "react-redux";


type FunctionPianoKeysProps = {};

// component responsible for housing all playable piano keys rendered
// Honestly this may be a middle man that isn't necessary
// If we have a piano key component
// and a component to house key clusters and manage their irregular nature
// This may be a very simple and potentially even unnecssary component

// On the flip side, it may be necessary to simply have this logic housed within a component here
// to keep the growing Keyboard component more clean
const FunctionPianoKeys = ({}: FunctionPianoKeysProps) => {
  const screenKeyRatio = 38;
  const baseMidi = 36;
  const [width, setWidth] = useState(window.innerWidth);
  const pressedNotes = useSelector((state: any) => state.keyPresser.notesPressed);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const keyCount = (width) => {
    return Math.floor(width) / screenKeyRatio;
  };

  console.log(keyCount(Math.floor(width)));

  return (
    <>
      <FunctionKeys
        startMidi={baseMidi}
        endMidi={baseMidi + keyCount(width)}
      />
    </>
  );
};

export default FunctionPianoKeys;
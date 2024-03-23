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
// Determines how many keys to show based on the viewport's current size
const FunctionPianoKeys = ({}: FunctionPianoKeysProps) => {
  const screenKeyRatio = 38;
  const baseMidi = 36;
  const [width, setWidth] = useState(window.innerWidth);

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
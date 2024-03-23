import "../App.css";
import "react-piano/dist/styles.css";
import { Component, ReactNode } from "react";
import PianoKeys from "./PianoKeys";
import ObjectiveManager from "../objectives/ObjectiveManager";
import Objective from "../components/Objective";
import MidiController from "../midi/MidiController";
import { uniq, remove } from "lodash";
import { Switch } from "@mui/material";
import MidiNote from "../midi/MidiNote";
import { Note } from "../Theory";
import ObjectiveTypesToggle from "./ObjectiveTypesToggle";
import ToneService from "../services/ToneService";
import { useSelector, useDispatch } from 'react-redux'
import FunctionPianoKeys from "./FunctionPianoKeys";

type FunctionKeyboardState = {
  progressed: boolean | undefined;
  completed: boolean;
  activeNotes: number[];
  midiMounted?: boolean;
  lastAction?: string;
  soundOn: boolean;
};

type FunctionKeyboardProps = {}

const FunctionKeyboard = ({}: FunctionKeyboardProps) => (
  <div>
    <FunctionPianoKeys />
  </div>
);

export default FunctionKeyboard;
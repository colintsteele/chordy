import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { keypressSlice } from "../store/slices/keypressSlice";
import "../css/FunctionPianoKey.css";
import KeyInfo from "./KeyInfo";
const { pressNote, liftNote } = keypressSlice.actions;

// Component's responsibility is to be a piano key
// Pressing it and releasing it alters application state via dispatch actions
// Also represents the visual state of notesSpressed
// If note is pressed by a keyboard key press or midi keypress, note should show as pressed
const PianoKey = ({
  accidental,
  midiNumber,
  noteName,
  xOffset,
}: PianoKeyType) => {
  const dispatch = useDispatch();
  const isPressed = useSelector(
    (state: any) => state.keyPresser.notesPressed[midiNumber], shallowEqual
  );

  const handlePress = () => {
    dispatch(pressNote(midiNumber));
  };

  const handleLift = () => {
    dispatch(liftNote(midiNumber));
  };

  return (
    <div
      data-testid={`${noteName}:${midiNumber}`}
      key={midiNumber}
      className={computeClassName(accidental, isPressed, noteName)}
      style={accidental === true ? { left: xOffset + "em" } : {}}
      onMouseDown={() => {
        handlePress();
      }}
      onMouseUp={() => {
        handleLift();
      }}
    >
      <KeyInfo
        noteName={noteName}
        midi={midiNumber}
      />
    </div>
  );
};

const computeClassName = (accidental, pressed, noteName) => {
  let accidentalString = accidental ? "Accidental" : "Natural";
  return `FunctionKey ${accidentalString} ${noteName} ${accidentalString} ${
    pressed ? "Pressed" : ""
  }`;
};

export type PianoKeyType = {
  accidental: boolean;
  midiNumber: number;
  noteName: string;
  xOffset: number;
};

export default PianoKey;

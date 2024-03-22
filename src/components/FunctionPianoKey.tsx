import { useDispatch, useSelector } from "react-redux";
import { keypressSlice } from "../store/slices/keypressSlice";
import "../css/FunctionPianoKey.css";
import KeyInfo from "./KeyInfo";

const { pressNote, liftNote } = keypressSlice.actions;
// Component's responsibility is simply to be a piano key
// Pressing it and releasing it alters application state via dispatch actions
const PianoKey = ({
  accidental,
  pressed,
  midiNumber,
  noteName,
  xOffset,
}: PianoKeyType) => {
  const pressedKeys = useSelector(
    (state: any) => state.keyboardKeypress.keysPressed
  );

  const pressedNotes = useSelector(
    (state: any) => state.keyPresser.notesPressed
  );

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(pressNote(midiNumber));
  };

  const handleLift = () => {
    dispatch(liftNote(midiNumber));
  };

  const isPressed = () => {
    let statePressed = pressedNotes.some((note: number) => note === midiNumber);  
    console.log(`prop: ${pressed}, but function: ${statePressed}`)
    return pressed || statePressed
  }

  return (
    <div
      data-testid={`${noteName}:${midiNumber}`}
      key={midiNumber}
      className={computeClassName(accidental, isPressed(), noteName)}
      style={accidental === true ? { left: xOffset + "em" } : {}}
      onMouseDown={() => {
        handlePress();
      }}
      onMouseUp={() => {
        handleLift();
      }}
    >
      <KeyInfo
        shiftMod={pressedKeys.some((key: string) => key === "Shift")}
        ctrlMod={pressedKeys.some((key: string) => key === "Control")}
        noteName={noteName}
        midi={midiNumber}
        altMod={false}
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
  pressed: boolean;
  midiNumber: number;
  noteName: string;
  xOffset: number;
};

export default PianoKey;

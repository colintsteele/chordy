import { useDispatch } from "react-redux";
import { keypressSlice } from "../store/slices/keypressSlice";
// import "../PianoKey.css";
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
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(pressNote(midiNumber));
  };

  const handleLift = () => {
    dispatch(liftNote(midiNumber));
  };

  return (
    <div
      style={accidental === true ? { left: xOffset + "em" } : {}}
      key={midiNumber}
      className={computeClassName(accidental, pressed, noteName)}
      onMouseDown={() => {
        handlePress();
      }}
      onMouseUp={() => {
        handleLift();
      }}
      data-testid={`${noteName}:${midiNumber}`}
    >
    <KeyInfo noteName={noteName} midi={midiNumber}/>
    </div>
  );
};

const computeClassName = (accidental, pressed, noteName) => {
  let accidentalString = accidental ? "Accidental" : "Natural";
  return `FunctionKey ${accidentalString} ${noteName} ${accidentalString} ${
    pressed ? "Pressed" : ""
  }`;
};

type PianoKeyType = {
  accidental: boolean;
  pressed: boolean;
  midiNumber: number;
  noteName: string;
  xOffset: number;
};

export default PianoKey;

import { useDispatch } from 'react-redux';
import { keypressSlice } from '../store/slices/keypressSlice';
// import "../PianoKey.css";
import "../css/FunctionPianoKey.css"

const { pressNote, liftNote } = keypressSlice.actions;
// Component's responsibility is simply to be a piano key
// Pressing it and releasing it alters application state via dispatch actions
const PianoKey = ({
  accidental,
  pressed,
  midiNumber,
  noteName,
  xOffset,
  showMeta, //show meta properties like Note Name and MidiNumber
}: PianoKeyType) => {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(pressNote(midiNumber));
  };

  const handleLift = () => {
    dispatch(liftNote(midiNumber));
  };

  const leftOffset = () => {
  }

  return (
    <div
      style={{ left: xOffset + "em" }}
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
      <span>{showMeta ? noteName : ''}</span>
    </div>
  );
};

const computeClassName = ( accidental, pressed, noteName ) => {
  let accidentalString = accidental ? 'Accidental' : 'Natural'
  return `FunctionKey ${accidentalString} ${noteName} ${accidentalString} ${ pressed ? "Pressed" : "" }`
}

type PianoKeyType = {
  accidental: boolean;
  pressed: boolean;
  midiNumber: number;
  noteName: string;
  xOffset: number;
  showMeta: boolean;
};


export default PianoKey;

const startF = { F: null, Gb: 2.2, G: null, Ab: 5.2, A: null, Bb: 8.2, B: null, C: null, Db: 14.2, D: null, Eb: 17.2, E: null };
const startE = { E: null, F: null, Gb: 5.2, G: null, Ab: 8.2, A: null, Bb: 11.2, B: null, C: null, Db: 17.2, D: null, Eb: 20.2 };
const startGb = { Gb: -0.7, G: null, Ab: 2.2, A: null, Bb: 5.2, B: null, C: null, Db: 11.2, D: null, Eb: 14.2, E: null, F: null };
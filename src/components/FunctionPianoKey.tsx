type PianoKeyType = {
  accidental: boolean;
  pressed: boolean;
  midiNumber: number;
  noteName: string;
};

const computeClassName = ( accidental, pressed, noteName ) => {
  let accidentalString = accidental ? 'Accidental' : 'Natural'
  return `NewKey${accidentalString} ${noteName} ${accidentalString}${ pressed ? "Pressed" : "" }`
}

const PianoKey = ({
  accidental,
  pressed,
  midiNumber,
  noteName,
}: PianoKeyType) => (
  <div
    key={midiNumber}
    className={computeClassName(accidental, pressed, noteName)}
    onClick={() => {
      console.log('clicked a new key in a new world')
    }}
  />
);

export default PianoKey;

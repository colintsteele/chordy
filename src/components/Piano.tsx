import "../css/App.css";
import "react-piano/dist/styles.css";
import { useEffect, useState } from "react";
import PianoKeyRow from "./PianoKeyRow";
import { useDispatch } from "react-redux";
import KeyMap from "../KeyboardKeyMap";
import { liftKey, pressKey } from "../store/slices/keyboardKeypressSlice";
import { pressNote } from "../store/actions/pressNote";
import { liftNote } from "../store/actions/liftNote";
import mountMidiMessageHandler from "../midi/MidiController";


type PianoProps = {};

// component responsible for housing all playable piano keys rendered
// Determines how many keys to show based on the viewport's current size
// Listens to Keyboard and Viewport changes
const Piano = ({}: PianoProps) => {
  const dispatch = useDispatch();
  const screenKeyRatio = 38;
  const baseMidi = 36;
  const [width, setWidth] = useState(window.innerWidth);

  const midiMessageHandler = (_event, onOff, midiNote, _velocity) => {
    if (onOff) {
      dispatch(pressNote(midiNote));
    } else {
      dispatch(liftNote(midiNote));
    }
  };

  const mappedKey = (key) => {
    return KeyMap[key];
  };

  const handleKeyDown = (keyPress) => {
    dispatch(pressKey(keyPress.key));
    dispatch(pressNote(mappedKey(keyPress.key)));
  };

  const handleKeyUp = (keyPress) => {
    dispatch(liftKey(keyPress.key));
    dispatch(liftNote(mappedKey(keyPress.key)));
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  mountMidiMessageHandler(midiMessageHandler);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const keyCount = (width) => {
    return Math.floor(width) / screenKeyRatio;
  };

  return (
    <>
      <PianoKeyRow
        startMidi={baseMidi}
        endMidi={baseMidi + keyCount(width)}
      />
    </>
  );
};

export default Piano;

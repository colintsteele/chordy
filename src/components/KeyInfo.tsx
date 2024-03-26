import { shallowEqual, useSelector } from "react-redux";
import KeyMap from "../KeyboardKeyMap";
import React from "react";

// Component in charge of displaying relevant key information
// conditionally displays midi number and NoteName
// If not displaying either midi or note, display the key's mapped key (asdfghjkl or ;)
const KeyInfo = ({ noteName, midi }: KeyInfoPropsType) => {
  const { shiftMod, ctrlMod } = useSelector(
    (state: any) => ({
      shiftMod: state.keyboardKeypress.keysPressed["Shift"],
      ctrlMod: state.keyboardKeypress.keysPressed["Control"],
    }),
    shallowEqual
  );

  const getKey = (midi: number) => {
    return Object.keys(KeyMap).find((key) => KeyMap[key] === midi);
  };

  return (
    <>
      <span className={"KeyboardKeyMappedKey"}>
        {!shiftMod && !ctrlMod && getKey(midi)}
      </span>

      <span>{shiftMod && noteName}</span>
      <span>{ctrlMod && midi}</span>
    </>
  );
};

type KeyInfoPropsType = {
  noteName: string;
  midi: number;
};

export default React.memo(KeyInfo);

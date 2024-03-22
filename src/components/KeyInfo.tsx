import KeyMap from "../KeyboardKeyMap"
// write a function that takes a midi number and returns the key with that number in the KeyMap

const KeyInfo = ({ shiftMod, ctrlMod, noteName, midi }: KeyInfoPropsType) => {
  const getKey = (midi: number) => {
    return Object.keys(KeyMap).find((key) => KeyMap[key] === midi);
  };

  return (
    <>
      <span className={'KeyboardKeyMappedKey'}>
        {!shiftMod && !ctrlMod && getKey(midi)}
      </span>
      <span>{shiftMod && noteName}</span>
      <span>{ctrlMod && midi}</span>
    </>
  );
};

type KeyInfoPropsType = {
  noteName: string,
  midi: number,
  shiftMod: boolean,
  ctrlMod: boolean,
  altMod: boolean
};

export default KeyInfo;
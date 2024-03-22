const KeyInfo = ({shiftMod, ctrlMod, noteName, midi}: KeyInfoPropsType) => {

  return (
    <>
      <span>{shiftMod ? noteName : ""}</span>
      <span>{ctrlMod ? midi : ""}</span>
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
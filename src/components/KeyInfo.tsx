import { useSelector } from "react-redux";

const KeyInfo = ({noteName, midi}: KeyInfoPropsType) => {
  const pressedKeys = useSelector((state: any) => state.keyboardKeypress.keysPressed);

  const shiftModOn = () => {
    let on = pressedKeys.some((key: string) =>  key === 'Shift') 
    return on
  }

  const ctrlModOn = () => {
    let on = pressedKeys.some((key: string) =>  key === 'Control') 
    return on
  }

  return (
    <>
      <span>{shiftModOn() ? noteName : ""}</span>
      <span>{ctrlModOn() ? midi : ""}</span>
    </>
  );
};

type KeyInfoPropsType = {
  noteName: string,
  midi: number,
};

export default KeyInfo;
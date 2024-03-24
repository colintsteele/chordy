import "../App.css";
import "react-piano/dist/styles.css";
import { useEffect, useState } from "react";
import FunctionKeys from "./FunctionKeys";


type FunctionPianoKeysProps = {};

// component responsible for housing all playable piano keys rendered
// Determines how many keys to show based on the viewport's current size
const FunctionPianoKeys = ({}: FunctionPianoKeysProps) => {
  const screenKeyRatio = 38;
  const baseMidi = 36;
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const keyCount = (width) => {
    return Math.floor(width) / screenKeyRatio;
  };

  return (
    <>
      <FunctionKeys
        startMidi={baseMidi}
        endMidi={baseMidi + keyCount(width)}
      />
    </>
  );
};

export default FunctionPianoKeys;
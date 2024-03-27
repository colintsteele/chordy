import "../css/App.css";
import "react-piano/dist/styles.css";
import { useEffect, useState } from "react";
import PianoKeyRow from "./PianoKeyRow";


type PianoProps = {};

// component responsible for housing all playable piano keys rendered
// Determines how many keys to show based on the viewport's current size
const Piano = ({}: PianoProps) => {
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
      <PianoKeyRow
        startMidi={baseMidi}
        endMidi={baseMidi + keyCount(width)}
      />
    </>
  );
};

export default Piano;

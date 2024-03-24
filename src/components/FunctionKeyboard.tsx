import "../css/App.css";
import "react-piano/dist/styles.css";
import FunctionPianoKeys from "./FunctionPianoKeys";

type FunctionKeyboardProps = {}

const FunctionKeyboard = ({}: FunctionKeyboardProps) => (
  <div>
    <FunctionPianoKeys />
  </div>
);

export default FunctionKeyboard;
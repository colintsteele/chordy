import { useSelector } from "react-redux";
import Objective from "../objectives/Objective";

const Sheet = () => {
  const objective = useSelector((state: any) => state.objective.objective);

  return (
    <div>
      <h1>{objective.description}</h1>
    </div>
  );
};

type SheetPropsType = {
  objective: Objective;
};

export default Sheet;

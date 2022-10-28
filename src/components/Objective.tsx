import { Box, Chip, Container } from "@mui/material";
import ObjectiveGraphic from "./ObjectiveGraphic";
import "../css/ObjectiveGraphic.css";

function hidden(description) {}

type ObjectiveProps = {
  name: string;
  progressed?: boolean;
  completed?: boolean;
  octave?: number;
  description?: string;
  type: string;
  objectives: string[]; //TODO test and remove
};

const Objective = ({
  name,
  progressed,
  completed,
  objectives,
  description,
  type,
}: ObjectiveProps) => (
  <Container id="objectiveContainer">
    <ObjectiveGraphic
      name={name}
      type={type}
      progressed={progressed}
      completed={completed}
      objectives={objectives}
    />

    <Box sx={{ mb: 2 }} display="flex" justifyContent="center">
      <div hidden={description == null}>
        <Chip label={description} color={progressed ? "success" : "primary"}/>
      </div>
      {/* <Chip label={name} color={progressed ? "success" : "primary"} /> */}
    </Box>
  </Container>
);

export default Objective;

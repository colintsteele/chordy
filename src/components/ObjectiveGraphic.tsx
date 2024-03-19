import "../css/MusicalNotation.css";
import { Box } from "@mui/material";
import Staff from "./Staff";

const ObjectiveGraphic = ({
  name,
  progressed,
  completed,
  objectives,
  type,
}) => (
  //I think I need to drop the CSS and just do Canvas drawing bit by bit
  <>
    <Box key={name} sx={{ mb: 2 }} display="block" justifyContent="center">
      <Staff
        noteProps={[name]}
        objectives={objectives}
        objectiveType={type}
      ></Staff>
    </Box>
  </>
);

export default ObjectiveGraphic;

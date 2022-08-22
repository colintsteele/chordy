import { Component, ReactNode } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";

type ObjectiveProps = {
  name: string;
  progressed?: boolean;
  completed?: boolean;
  objectives: string[]; //TODO test and remove
};

const Objective = ({
  name,
  progressed,
  completed,
  objectives,
}: ObjectiveProps) => (
  <Container>
    <Box display="flex" justify-center justifyContent="center">
      <Chip label={name} color={progressed ? "success" : "primary"} />
    </Box>
  </Container>

  // {/* <span style={{ color: completed ? "green" : "black" }}>{name}</span>
  // <br></br>
  // <span>{progressed ? "keep going!" : "Wrong!"}</span>
  // <br></br>
  // <span>{completed ? "TADA!" : ""}</span>
  // <br></br>
  // <span>{objectives}</span> */}
);

export default Objective;

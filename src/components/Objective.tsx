import { Component, ReactNode } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
import ObjectiveGraphic from "./ObjectiveGraphic";
import { off } from "process";

type ObjectiveProps = {
  name: string;
  progressed?: boolean;
  completed?: boolean;
  octave?: number;
  objectives: string[]; //TODO test and remove
};

function topOffset(octave): number {
  return (5 - octave) * 28;
}

function top(noteName): number {
  let note = noteName.match(/^[A-G]/)[0];
  let octave = noteName.match(/\d$/)[0];
  let n = ["E", "D", "C", "B", "A", "G", "F"].indexOf(note);
  let top = topOffset(octave) - n * 4;
  return top;
}

const Objective = ({
  name,
  progressed,
  completed,
  objectives,
}: ObjectiveProps) => (
  <Container style={{ width: '128px' }}>
    <ObjectiveGraphic name={name} />
    <Box sx={{ mb: 2 }} display="flex" justifyContent="center">
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

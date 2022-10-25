import "../css/MusicalNotation.css";
import { Component, ReactNode } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
import { Vex } from "vexflow";
import Staff from "./Staff";

const ObjectiveGraphic = ({ name, progressed, completed, objectives, type }) => (
  //I think I need to drop the CSS and just do Canvas drawing bit by bit
  <>
    <Box key={name} sx={{ mb: 2 }} display="block" justifyContent="center">
      <Staff noteProps={[name]} objectives={objectives} objectiveType={type}></Staff>

      <span>objectives: {`${objectives}`}</span>
      <br></br>
      <span>progressed: {`${progressed}`}</span>
      <br></br>
      <span>completed: {`${completed}`}</span>
    </Box>
  </>
);

export default ObjectiveGraphic;

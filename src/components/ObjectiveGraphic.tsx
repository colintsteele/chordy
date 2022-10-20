import "../css/MusicalNotation.css";
import { Component, ReactNode } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
import { Vex } from "vexflow";
import Staff from "./Staff";

const ObjectiveGraphic = ({ name }) => (
  //I think I need to drop the CSS and just do Canvas drawing bit by bit
  <>
    <Box sx={{ mb: 2 }} display="block" justifyContent="center">
      <Staff noteProps={[name]}></Staff>
    </Box>
  </>
);

export default ObjectiveGraphic;

import "../css/MusicalNotation.css";
import { Component, ReactNode } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";

function noteOffset(note: string): number {
  let n = ["A", "B", "C", "D", "E", "F", "G"].indexOf(note) * 4;
  return n;
}

function octaveOffset(octave: number): number {
  return (octave - 1) * 28;
}

function top(noteName): number {
  let note = noteName.match(/^[A-G]/)[0];
  let octave = noteName.match(/\d$/)[0];
  let top = 128 - (noteOffset(note) + octaveOffset(+octave));
  return top;
}

function lowStaff(noteName): boolean {
  return +noteName.match(/\d$/)[0] <= 3;
}

const ObjectiveGraphic = ({ name }) => (
  <>
    <Box sx={{ mb: 2 }} display="block" justifyContent="center">
      <div className="staff">
        {/* <div className={`flat ${name}`} style={{ top: top(name) }} /> */}
        <div className={`quarter note flat ${name}`} style={{ top: top(name) }} />

        <div hidden>{top(name)}</div>
        <span>hello</span>
      </div>
      <div className="bottomStaff" style={{display: lowStaff(name) ? 'block' : 'none'}}>
        <span>x</span>
      </div>
    </Box>
  </>
);

export default ObjectiveGraphic;

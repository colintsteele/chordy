import { Component, ReactNode, useEffect, useRef } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
import { Vex } from "vexflow";
import VexFlowNotes from "../services/VexFlowNote";

//for potentially creating sharops from flats
function accidentalMap(note: string) {
  let map = {
    Ab: "G#",
    Bb: "A#",
    Db: "C#",
    Eb: "D#",
    Gb: "F#",
  };
}

const Staff = ({ noteProps, objectives, objectiveType }) => {
  const { Renderer, Stave, Voice, Formatter } = Vex.Flow;

  useEffect(() => {
    //render staff
    const div = document.getElementById("canvasId") as HTMLCanvasElement;
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    const context = renderer.getContext().resize(200, 200);
    const stave = new Stave(10, 40, 400)
      .addClef("treble")
      .setContext(context)
      .draw();

    // add notes
    let notes;

    if (objectiveType == "scale") {
      notes = new VexFlowNotes(objectives, objectiveType).scaleVisual();
    } else {
      // notes = vexifyNotes(objectives, "chord");
      notes = new VexFlowNotes(objectives, objectiveType).chordVisual();
    }

    const voice = new Voice({ num_beats: 4, beat_value: 4 })
      .setStrict(false)
      .addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], 160);

    // draw notes
    voice.draw(context, stave);
  }, []);

  return (
    <>
      <div key={noteProps}>
        <div id="canvasId" />
      </div>
    </>
  );
};

export default Staff;

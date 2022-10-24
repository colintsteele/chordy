import { Component, ReactNode, useEffect, useRef } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
import { Vex } from "vexflow";

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

function vexifyNotes(notes: string[], type?: string) {
  const { StaveNote, Accidental } = Vex.Flow;
  let accidentals = [];

  if (type == "chord") {
    let staveNotes = notes.map((note) => {
      const match = note.match(/(?<n>[a-zA-Z])(?<acci>b)?(?<octave>.$)?/)!;
      let g = match.groups;
      if (g?.acci) {
        accidentals.push(g?.acci);
      } else {
        accidentals.push(null);
      }

      return `${g?.n}${g?.acci || ""}/${g?.octave || 5}`;
    });

    let staveNote = new StaveNote({
      keys: staveNotes,
      duration: "q",
    });

    accidentals.map((fos, i) => {
      if (fos != null) {
        staveNote.addModifier(new Accidental(fos), i);
      }
    });

    return [staveNote];
  }

  return notes.map((note) => {
    const match = note.match(/(?<n>[a-zA-Z])(?<acci>b)?(?<octave>.$)?/)!;
    let g = match.groups;
    let name = `${g?.n}${g?.acci || ""}/${g?.octave || 5}`;

    let staveNote = new StaveNote({
      keys: [name],
      duration: "q",
    });

    if (g?.acci) {
      staveNote.addModifier(new Accidental("b"));
    }

    return staveNote;
  });
}

const Staff = ({ noteProps, objectives }) => {
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
    const notes = vexifyNotes(objectives, "chord");
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

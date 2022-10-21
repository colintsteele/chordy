import { Component, ReactNode, useEffect, useRef } from "react";
import React from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
import { Vex } from "vexflow";

function accidentalMap(note: string) {
  let map = {
    Ab: "G#",
    Bb: "A#",
    Db: "C#",
    Eb: "D#",
    Gb: "F#",
  };
}

function vexifyNotes(notes: string[]) {
  const { StaveNote } = Vex.Flow;

  return notes.map((note) => {
    const match = note.match(/(?<n>[a-zA-Z])(?<acci>b)?(?<octave>.$)/)!;
    let g = match.groups;
    let name = `${g?.n}${g?.acci || ""}/${g?.octave}`;
    return name;
  });
}

function vexifyNotes2(notes: string[]) {
  const { StaveNote, Accidental } = Vex.Flow;

  return notes.map((note) => {
    const match = note.match(/(?<n>[a-zA-Z])(?<acci>b)?(?<octave>.$)/)!;
    let g = match.groups;
    let name = `${g?.n}${g?.acci || ""}/${g?.octave}`;

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

let drawn = false;
const Staff = ({ noteProps, completed }) => {
  const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

  useEffect(() => {
    console.log('useEffect')
      const div = document.getElementById("canvasId2") as HTMLCanvasElement;
      const renderer = new Renderer(div, Renderer.Backends.SVG);
      renderer.resize(200, 200);
      const context = renderer.getContext();

      const stave = new Stave(10, 40, 400);
      stave.addClef("treble");
      stave.setContext(context).draw();

      //   score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),

      //note example for accidental
      new StaveNote({
        keys: ["eb/5"],
        duration: "16",
      }).addModifier(new Accidental("b"));

      const keys = ["C#/4"];
      const notes = [new StaveNote({ keys: keys, duration: "q" })];
      const notes2 = [
        new StaveNote({ keys: [...vexifyNotes(noteProps)], duration: "q" }),
      ];
      const notes3 = vexifyNotes2(noteProps);

      const voice = new Voice({ num_beats: 4, beat_value: 4 });
      voice.setStrict(false);
      voice.addTickables(notes3);

      // Format and justify the notes to 400 pixels.
      new Formatter().joinVoices([voice]).format([voice], 350);

      // Render voice
      voice.draw(context, stave);
      drawn = true;
  }, []);

  return (
    <>
      <div key={noteProps}>
        <div id="canvasId2" />
      </div>
      {/* <canvas id="canvasId1" ref={canvasRef} /> */}
      {/* <canvas id="canvasId2" ref={canvasRef} /> */}
    </>
  );
};

export default Staff;

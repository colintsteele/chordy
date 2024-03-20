import { useEffect } from "react";
import { Vex } from "vexflow";
import VexFlowNotes from "../services/VexFlowNote";

const Staff = ({ noteProps, objectives, objectiveType }) => {
  const { Renderer, Stave, Voice, Formatter } = Vex.Flow;

  useEffect(() => {
    const div = document.getElementById("canvasId") as HTMLCanvasElement;
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    const context = renderer.getContext().resize(200, 200);
    const stave = new Stave(10, 40, 400)
      .addClef("treble")
      .setContext(context)
      .draw();

    // add notes
    let notes;

    if (objectiveType === "scale") {
      notes = new VexFlowNotes(objectives, objectiveType).scaleVisual();
    } else {
      notes = new VexFlowNotes(objectives, objectiveType).chordVisual();
      // A note-type objective is effectively just a chord with 1 note.
    }

    const voice = new Voice({ num_beats: 4, beat_value: 4 })
      .setStrict(false)
      .addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], 160);

    // draw notes
    voice.draw(context, stave);
  }, [Formatter, Renderer, Stave, Voice, objectiveType]); 
  // TODO add objectives here as dependency
  // Adding objectives to the dependency list above causes the staff to redraw a new SVG each time

  return (
    <>
      <div key={noteProps}>
        <div id="canvasId" />
      </div>
    </>
  );
};

export default Staff;

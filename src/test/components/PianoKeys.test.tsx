import * as theory from "../../Theory";
import { render, screen } from "@testing-library/react";
import PianoKeys from "../../components/PianoKeys";
import Keyboard from "../../Keyboard";
import ObjectiveManager from "../../objectives/ObjectiveManager";
import UserEvent from "@testing-library/user-event";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import ScaleObjective from "../../objectives/ScaleObjective";

describe("Piano's Objective Manager", () => {
  test("responds to keypresses", () => {
    let note = theory.note("C");
    let scale = theory.scale(note, "major");
    let objective = new ScaleObjective(scale);
    var objectiveManager = new ObjectiveManager(
      ["major"],
      ["scale"],
      objective
    );

    render(
      <PianoKeys
        activeNotes={[]}
        objectiveManager={objectiveManager}
      ></PianoKeys>
    );
    //simulate C note keypress
    keyboard("g");
    let notes = objectiveManager.currentObjective.completedNotes;

    expect(notes).toEqual(expect.arrayContaining([theory.note("C")]));
  });
});

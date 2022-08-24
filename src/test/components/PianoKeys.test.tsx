import * as theory from "../../Theory";
import { render, screen } from "@testing-library/react";
import PianoKeys from "../../components/PianoKeys";
import ObjectiveManager from "../../objectives/ObjectiveManager";
import UserEvent from "@testing-library/user-event";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import ScaleObjective from "../../objectives/ScaleObjective";
import React from "react";

describe("Piano's Objective Manager", () => {
  let note = theory.note("C");
  let scale = theory.scale(note, "major");
  let objective = new ScaleObjective(scale);
  var objectiveManager = new ObjectiveManager(
    ["major"],
    ["scale"],
    () => {},
    objective
  );

  beforeEach(async () => {
    render(
      <PianoKeys
        activeNotes={[]}
        objectiveManager={objectiveManager}
      ></PianoKeys>
    );
  });

  test("responds to keypresses", () => {
    keyboard("g");
    let notes = objectiveManager.currentObjective.completedNotes;

    expect(notes).toEqual(expect.arrayContaining([theory.note("C")]));
  });

  test("responds to midi Inputs", () => {});
});

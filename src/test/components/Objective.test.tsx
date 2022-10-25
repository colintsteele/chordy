import * as theory from "../../Theory";
import { act, render } from "@testing-library/react";
import ObjectiveManager from "../../objectives/ObjectiveManager";
import Objective from "../../components/Objective";
import NoteObjective from "../../objectives/NoteObjective";

describe("base test", () => {
  let note = theory.note("C", 4);
  let objective = new NoteObjective(note);
  let manager = new ObjectiveManager(["major"], ["note"], () => {}, objective);

  beforeEach(() => {});

  test("top()", () => {
    act(() => {
      render(
        <Objective
          name={manager.currentObjective.name}
          type={''}
          progressed={false}
          completed={false}
          objectives={[note.noteName]}
        />
      );
    });
  });
});

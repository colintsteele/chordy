import * as theory from "../Theory";
import ObjectiveManager from "../objectives/ObjectiveManager";
import ScaleObjective from "../objectives/ScaleObjective";

describe("With a preset objective", () => {
  test("will use the given objective", () => {
    let note = theory.note("C");
    let scale = theory.scale(note, "major");
    let objective = new ScaleObjective(scale);
    let manager = new ObjectiveManager(
      ["major"],
      ["scale"],
      () => {},
      objective
    );

    expect(manager.currentObjective.name).toMatch(/C major scale$/);
  });
});

describe("randomObjective()", () => {
  describe("With major scales", () => {
    test("will generate a random major scale objective", () => {
      let manager = new ObjectiveManager(["major"], ["scale"], () => {});
      let objective = manager.currentObjective;

      expect(objective.name).toMatch(/major scale$/);
    });
  });
});

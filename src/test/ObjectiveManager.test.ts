import * as theory from "../Theory";
import ObjectiveManager from "../objectives/ObjectiveManager";
import ScaleObjective from "../objectives/ScaleObjective";

describe("randomObjective()", () => {
  describe("With major scales", () => {
    test("will generate a random major scale objective", () => {
      let manager = new ObjectiveManager(["major"], ["scale"]);
      let objective = manager.currentObjective;

      expect(objective.name).toMatch(/major scale$/);
    });
  });
});

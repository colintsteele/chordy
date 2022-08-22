import * as theory from "../Theory";
import ObjectiveManager from "../objectives/ObjectiveManager";
import ScaleObjective from "../objectives/ScaleObjective";

describe("randomObjective()", () => {
  describe("With major scales", () => {
    let manager = new ObjectiveManager(["major"], ["scale"]);

    // test("can make a Scale objective", () => {
    //   expect(manager.randomObjective().name).toEqual(
    //     expect.stringMatching(/scale$/)
    //   );
    // });
  });
});

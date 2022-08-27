import * as theory from "../Theory";
import ObjectiveManager from "../objectives/ObjectiveManager";
import ScaleObjective from "../objectives/ScaleObjective";
import ChordObjective from "../objectives/ChordObjective";

let cNote = theory.note("C");
let dbNote = theory.note("Db");
let dNote = theory.note("D");
let eNote = theory.note("E");
let gNote = theory.note("G");

describe("With a preset chord objective", () => {
  let chord = theory.chord(cNote, "major");
  let objective = new ChordObjective(chord);
  let manager = new ObjectiveManager(["major"], ["scale"], () => {}, objective);

  test("will use the given objective", () => {
    expect(manager.currentObjective.name).toMatch(/C major chord$/);
  });

  describe("when a note is lifted", () => {
    test("objective is not complete", () => {
      manager.pressNotes([cNote, eNote]);
      manager.liftNotes([eNote]);
      manager.pressNotes([gNote]);

      expect(manager.currentObjective.completedNotes).not.toContain(eNote);
      expect(manager.completed).toBe(false);
      expect(manager.currentObjective).toBe(objective);
    });
  });
});

describe("When the objective is completed", () => {
  test("A new currentObjective is set", () => {
    let note = theory.note("C");
    let chord = theory.chord(note, "major");
    let objective = new ChordObjective(chord);
    let manager = new ObjectiveManager(
      ["major"],
      ["scale"],
      () => {},
      objective
    );

    manager.pressNotes([cNote, eNote, gNote]);
    expect(manager.completed).toBe(true);
    expect(manager.currentObjective).not.toBe(objective);
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

import * as theory from "../Theory";
import ChordObjective from "../objectives/ChordObjective";
import ScaleObjective from "../objectives/ScaleObjective";

const noteRegex = /[A(b)?-G(b)?]/;

describe("Chord Objective", () => {
  var objective: ChordObjective;

  beforeEach(async () => {
    let c = theory.note("C");
    let cChord = theory.chord(c, "major");
    objective = new ChordObjective(cChord);
  });

  describe("when all notes in chord are pressed", () => {
    test("isComplete() is true", () => {
      let notes = [theory.note("C"), theory.note("E"), theory.note("G")];
      expect(objective.isComplete(notes)).toBe(true);
    });
  });

  describe("when some notes in chord are pressed", () => {
    test("isComplete() is false", () => {
      let notes = [theory.note("C"), theory.note("G")];
      expect(objective.isComplete(notes)).toBe(false);
    });
  });

  describe("when the chord is a 7 chord", () => {
    beforeEach(async () => {
      let c = theory.note("C");
      let c7Chord = theory.chord(c, "major7");
      objective = new ChordObjective(c7Chord);
    });
    describe("when a chord is pressed but the 7th note is missing", () => {
      test("isComplete() is false", () => {
        let notes = [theory.note("C"), theory.note("E"), theory.note("G")];
        expect(objective.isComplete(notes)).toBe(false);
      });
    });

    describe("and all notes in the chord are pressed", () => {
      test("isComplete() is false", () => {
        let notes = [
          theory.note("C"),
          theory.note("E"),
          theory.note("G"),
          theory.note("B"),
        ];
        expect(objective.isComplete(notes)).toBe(true);
      });
    });
  });
});

describe("Scale Objective", () => {
  var objective: ScaleObjective;

  beforeEach(async () => {
    let c = theory.note("C");
    let cScale = theory.scale(c, "major");
    objective = new ScaleObjective(cScale);
  });

  describe("When a correct note is played", () => {
    test("progressed() is true", () => {
      let c = theory.note("C");
      expect(objective.pressNotes([c])).toBe(true);
      expect(objective.progressed).toBe(true);
    });

    test("complete() is false", () => {
      let c = theory.note("C");
      expect(objective.pressNotes([c])).toBe(true);
      expect(objective.complete).toBe(false);
    });
  });

  describe("When an incorrect note is played", () => {
    test("progressed() is false", () => {
      let Bb = theory.note("Bb");
      expect(objective.pressNotes([Bb])).toBe(false);
    });
  });

  describe("When an 7 correct notes are played", () => {
    var notes = [
      theory.note("C"),
      theory.note("D"),
      theory.note("E"),
      theory.note("F"),
      theory.note("G"),
      theory.note("A"),
    ];

    describe("some are duplicates", () => {
      test("progressed() is false", () => {
        notes.push(theory.note("C"));
        objective.pressNotes(notes);
        expect(objective.isComplete()).toBe(false);
      });
    });

    describe("all notes are unique", () => {
      describe("When a correct note is played", () => {
        test("progressed() is true", () => {
          let b = theory.note("B");
          expect(objective.pressNotes([b])).toBe(true);
        });
      });
    });
  });
});

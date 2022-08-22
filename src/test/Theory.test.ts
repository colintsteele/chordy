import * as theory from "../Theory";

const noteRegex = /[A(b)?-G(b)?]/;

describe("note()", () => {
  test("can correctly make a C", () => {
    let note = theory.note("C");

    expect(note.index).toBe(0);
    expect(note.noteName).toBe("C");
  });

  test("can correctly make a flat", () => {
    let note = theory.note("Bb");

    expect(note.index).toBe(10);
    expect(note.noteName).toBe("Bb");
  });

  test("can correctly make a B", () => {
    let note = theory.note("B");

    expect(note.index).toBe(11);
    expect(note.noteName).toBe("B");
  });
});

describe("scale()", () => {
  test("can Make a C major", () => {
    let c = theory.note("C");
    let cMajor = theory.scale(c, "major");

    expect(cMajor.root).toBe("C");
    expect(cMajor.name).toBe("C major");
    expect(cMajor.notes[0]).toEqual(
      expect.objectContaining({
        index: 0,
        noteName: "C",
      })
    );

    expect(cMajor.notes[1]).toEqual(
      expect.objectContaining({
        index: 2,
        noteName: "D",
      })
    );

    expect(cMajor.notes[2]).toEqual(
      expect.objectContaining({
        index: 4,
        noteName: "E",
      })
    );

    expect(cMajor.notes[3]).toEqual(
      expect.objectContaining({
        index: 5,
        noteName: "F",
      })
    );

    expect(cMajor.notes[4]).toEqual(
      expect.objectContaining({
        index: 7,
        noteName: "G",
      })
    );

    expect(cMajor.notes[5]).toEqual(
      expect.objectContaining({
        index: 9,
        noteName: "A",
      })
    );

    expect(cMajor.notes[6]).toEqual(
      expect.objectContaining({
        index: 11,
        noteName: "B",
      })
    );
  });

  test("can Make a C minor", () => {
    let c = theory.note("C");
    let cMinor = theory.scale(c, "minor");
    expect(cMinor.root).toBe("C");
    expect(cMinor.name).toBe("C minor");

    expect(cMinor.notes[0]).toEqual(
      expect.objectContaining({
        index: 0,
        noteName: "C",
      })
    );

    expect(cMinor.notes[1]).toEqual(
      expect.objectContaining({
        index: 2,
        noteName: "D",
      })
    );

    expect(cMinor.notes[2]).toEqual(
      expect.objectContaining({
        index: 3,
        noteName: "Eb",
      })
    );
  });

  test("Can make a Db minor", () => {
    let Db = theory.note("Db");
    let DbMinor = theory.scale(Db, "minor");
    expect(DbMinor.root).toBe("Db");
    expect(DbMinor.name).toBe("Db minor");

    expect(DbMinor.notes[0]).toEqual(
      expect.objectContaining({
        index: 1,
        noteName: "Db",
      })
    );

    expect(DbMinor.notes[1]).toEqual(
      expect.objectContaining({
        index: 3,
        noteName: "Eb",
      })
    );

    expect(DbMinor.notes[2]).toEqual(
      expect.objectContaining({
        index: 4,
        noteName: "E",
      })
    );
  });

  test("Can make a G Major", () => {
    let g = theory.note("G");
    let gMajor = theory.scale(g, "major");
    expect(gMajor.root).toBe("G");
    expect(gMajor.name).toBe("G major");

    expect(gMajor.notes[0]).toEqual(
      expect.objectContaining({
        index: 7,
        noteName: "G",
      })
    );

    expect(gMajor.notes[1]).toEqual(
      expect.objectContaining({
        index: 9,
        noteName: "A",
      })
    );

    expect(gMajor.notes[2]).toEqual(
      expect.objectContaining({
        index: 11,
        noteName: "B",
      })
    );

    expect(gMajor.notes[5]).toEqual(
      expect.objectContaining({
        index: 16,
        noteName: "E",
      })
    );
  });
});

describe("randomScale()", () => {
  describe("with a root note", () => {
    test("Can construct a major scale", () => {
      let scale = theory.randomScale(["major"]);
      let note = scale.root;

      expect(scale.name).toMatch(new RegExp(`^${note}`));
      expect(scale.name).toMatch(/major$/);
    });

    test("Can construct a minor scale", () => {
      let scale = theory.randomScale(["minor"]);
      let note = scale.root;

      expect(scale.name).toMatch(new RegExp(`^${note}`));
      expect(scale.name).toMatch(/minor$/);
    });
  });
});

describe("chord()", () => {
  test("can make a C Major chord", () => {
    let c = theory.note("C");
    let cMajor = theory.chord(c, "major");

    expect(cMajor.root).toBe("C");
    expect(cMajor.name).toBe("C major");
    expect(cMajor.notes[0]).toEqual(
      expect.objectContaining({
        index: 0,
        noteName: "C",
      })
    );

    expect(cMajor.notes[1]).toEqual(
      expect.objectContaining({
        index: 4,
        noteName: "E",
      })
    );

    expect(cMajor.notes[2]).toEqual(
      expect.objectContaining({
        index: 7,
        noteName: "G",
      })
    );
  });

  test("can make a C Minor chord", () => {
    let c = theory.note("C");
    let cMinor = theory.chord(c, "minor");

    expect(cMinor.root).toBe("C");
    expect(cMinor.name).toBe("C minor");

    expect(cMinor.notes[0]).toEqual(
      expect.objectContaining({
        index: 0,
        noteName: "C",
      })
    );

    expect(cMinor.notes[1]).toEqual(
      expect.objectContaining({
        index: 3,
        noteName: "Eb",
      })
    );

    expect(cMinor.notes[2]).toEqual(
      expect.objectContaining({
        index: 7,
        noteName: "G",
      })
    );
  });

  test("can make a B Major chord", () => {
    let b = theory.note("B");
    let bMajor = theory.chord(b, "major");

    expect(bMajor.root).toBe("B");
    expect(bMajor.name).toBe("B major");
    expect(bMajor.notes[0]).toEqual(
      expect.objectContaining({
        index: 11,
        noteName: "B",
      })
    );

    expect(bMajor.notes[1]).toEqual(
      expect.objectContaining({
        index: 15,
        noteName: "Eb",
      })
    );

    expect(bMajor.notes[2]).toEqual(
      expect.objectContaining({
        index: 18,
        noteName: "Gb",
      })
    );
  });

  test("can make a C Major 7 chord", () => {
    let c = theory.note("C");
    let cMajor = theory.chord(c, "major7");

    expect(cMajor.root).toBe("C");
    expect(cMajor.name).toBe("C major7");
    expect(cMajor.notes[0]).toEqual(
      expect.objectContaining({
        index: 0,
        noteName: "C",
      })
    );

    expect(cMajor.notes[1]).toEqual(
      expect.objectContaining({
        index: 4,
        noteName: "E",
      })
    );

    expect(cMajor.notes[2]).toEqual(
      expect.objectContaining({
        index: 7,
        noteName: "G",
      })
    );

    expect(cMajor.notes[3]).toEqual(
      expect.objectContaining({
        index: 11,
        noteName: "B",
      })
    );
  });
});

describe("randomNote()", () => {
  test("randomNote returns an object with a .index and a .note", () => {
    var note = theory.randomNote();
    expect(note.index).not.toBeNull();
    expect(note.noteName).toMatch(noteRegex);
  });
});

test("midiToNote to take a number and produce a Note", () => {
  expect(theory.midiToNote(40)).toBe("E3");
});

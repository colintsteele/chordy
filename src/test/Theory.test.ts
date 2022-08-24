import * as theory from "../Theory";

describe("note()", () => {
  test("can correctly make a C", () => {
    let note = theory.note("C");

    expect(note.index).toBe(0);
    expect(note.noteName).toBe("C");
  });

  test("can correctly make a flat note", () => {
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
  test("can Make a C major scale", () => {
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

  test("can Make a C minor scale", () => {
    let c = theory.note("C");
    let cMinor = theory.scale(c, "minor");
    expect(cMinor.root).toBe("C");
    expect(cMinor.name).toBe("C minor");

    //C
    expect(cMinor.notes[0]).toEqual(
      expect.objectContaining({
        index: 0,
        noteName: "C",
      })
    );

    //D
    expect(cMinor.notes[1]).toEqual(
      expect.objectContaining({
        index: 2,
        noteName: "D",
      })
    );

    //E flat
    expect(cMinor.notes[2]).toEqual(
      expect.objectContaining({
        index: 3,
        noteName: "Eb",
      })
    );

    //F
    expect(cMinor.notes[3]).toEqual(
      expect.objectContaining({
        index: 5,
        noteName: "F",
      })
    );

    //G
    expect(cMinor.notes[4]).toEqual(
      expect.objectContaining({
        index: 7,
        noteName: "G",
      })
    );

    expect(cMinor.notes[5]).toEqual(
      expect.objectContaining({
        index: 8,
        noteName: "Ab",
      })
    );

    expect(cMinor.notes[6]).toEqual(
      expect.objectContaining({
        index: 10,
        noteName: "Bb",
      })
    );
  });

  test("Can make a flat major scale", () => {
    let Gb = theory.note("Gb");
    let GbMinor = theory.scale(Gb, "major");
    expect(GbMinor.root).toBe("Gb");
    expect(GbMinor.name).toBe("Gb major");

    expect(GbMinor.notes[0]).toEqual(
      expect.objectContaining({
        noteName: "Gb",
      })
    );
    expect(GbMinor.notes[1]).toEqual(
      expect.objectContaining({
        noteName: "Ab",
      })
    );
    expect(GbMinor.notes[2]).toEqual(
      expect.objectContaining({
        noteName: "Bb",
      })
    );
    expect(GbMinor.notes[3]).toEqual(
      expect.objectContaining({
        noteName: "B",
      })
    );
    expect(GbMinor.notes[4]).toEqual(
      expect.objectContaining({
        noteName: "Db",
      })
    );
    expect(GbMinor.notes[5]).toEqual(
      expect.objectContaining({
        noteName: "Eb",
      })
    );
    expect(GbMinor.notes[6]).toEqual(
      expect.objectContaining({
        noteName: "F",
      })
    );
  });

  test("Can make a flat major scale", () => {
    let Gb = theory.note("Gb");
    let GbMinor = theory.scale(Gb, "minor");
    expect(GbMinor.root).toBe("Gb");
    expect(GbMinor.name).toBe("Gb minor");

    expect(GbMinor.notes[0]).toEqual(
      expect.objectContaining({
        noteName: "Gb",
      })
    );
    expect(GbMinor.notes[1]).toEqual(
      expect.objectContaining({
        noteName: "Ab",
      })
    );
    expect(GbMinor.notes[2]).toEqual(
      expect.objectContaining({
        noteName: "A",
      })
    );
    expect(GbMinor.notes[3]).toEqual(
      expect.objectContaining({
        noteName: "B",
      })
    );
    expect(GbMinor.notes[4]).toEqual(
      expect.objectContaining({
        noteName: "Db",
      })
    );
    expect(GbMinor.notes[5]).toEqual(
      expect.objectContaining({
        noteName: "D",
      })
    );
    expect(GbMinor.notes[6]).toEqual(
      expect.objectContaining({
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

describe("randomChord()", () => {
  test("Can construct a major chord", () => {
    let scale = theory.randomChord(["major"]);
    let note = scale.root;

    expect(scale.name).toMatch(new RegExp(`^${note}`));
    expect(scale.name).toMatch(/major$/);
  });

  test("Can construct a minor chord", () => {
    let scale = theory.randomChord(["minor"]);
    let note = scale.root;

    expect(scale.name).toMatch(new RegExp(`^${note}`));
    expect(scale.name).toMatch(/minor$/);
  });
});

describe("randomNote()", () => {
  test("randomNote returns a note", () => {
    const noteRegex = /[A(b)?-G(b)?]/;
    var note = theory.randomNote();
    expect(note.index).not.toBeNull();
    expect(note.noteName).toMatch(noteRegex);
  });
});
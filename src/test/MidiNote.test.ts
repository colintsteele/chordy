import MidiNote from "../midi/MidiNote";

describe("MidiNote", () => {
  it("identifes midi number 16 as E", () => {
    var midiNote = new MidiNote(16);
    expect(midiNote.note.noteName).toBe('E');
  });

  it("identifes midi number 17 as F", () => {
    var midiNote = new MidiNote(17);
    expect(midiNote.note.noteName).toBe('F');
  });
});

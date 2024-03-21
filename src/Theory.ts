import { sample } from "lodash";
import { MidiNote } from "./midi/MidiNote";

export type NoteName =
  | "C"
  | "Db"
  | "D"
  | "Eb"
  | "E"
  | "F"
  | "Gb"
  | "G"
  | "Ab"
  | "A"
  | "Bb"
  | "B";

export type Note = {
  noteName: NoteName;
  index: number;
  octave?: number;
};

export type Scale = {
  root: NoteName;
  notes: Note[];
  name: string;
  type: string;
};

export type Chord = {
  root: NoteName;
  notes: Note[];
  scale: string;
  name: string;
  type: string;
};

export const octave = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export const scales = {
  // 0 W 2 W 4 H 5 W 7 W 9 W 10 H
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};

export const twoOctaves = [...octave, ...octave];

export const chords = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
};

export function note(noteName: NoteName, noteOctave?: number): Note {
  return {
    noteName: noteName,
    index: octave.indexOf(noteName),
    octave: noteOctave,
  };
}

export function randomNote(): Note {
  var noteName = sample(octave) as NoteName;
  return {
    noteName: noteName,
    index: octave.indexOf(noteName),
    octave: Math.floor(Math.random() * 3) + 3,
  };
}

export function scale(rootNote: Note, scale: string): Scale {
  let notes = scales[scale].map(function (i: number) {
    var index = i + rootNote.index;

    return {
      index: index,
      noteName: twoOctaves[index],
    } as Note;
  });

  let name = `${rootNote.noteName} ${scale}`;
  return { root: rootNote.noteName, notes: notes, name: name, type: "scale" };
}

export function randomScale(scalesEnabled: string[]) {
  var rootNote = randomNote();
  return scale(rootNote, sample(scalesEnabled) as string);
}

export function chord(rootNote: Note, scale: string): Chord {
  let notes = chords[scale].map(function (i: number) {
    let index = i + rootNote.index;

    return {
      index: index,
      noteName: twoOctaves[index],
    } as Note;
  });

  let name = `${rootNote.noteName} ${scale}`;
  return {
    root: rootNote.noteName,
    notes: notes,
    name: name,
    type: "chord",
    scale: scale,
  };
}

export function randomChord(scalesEnabled: string[]) {
  var rootNote = randomNote();
  return chord(rootNote, sample(scalesEnabled) as string);
}

export function notesEqual(note1: Note, note2: Note): boolean {
  let namesEqual = note1.noteName === note2.noteName;
  let notesNumbers = note1.index === note2.index;

  return namesEqual && notesNumbers;
}

export function midiToNote(midiNumber: number): Note {
  return new MidiNote(midiNumber).note;
}
import { sample, sampleSize } from "lodash";
var _ = require("lodash");

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
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 6, 7, 9],
};

export const twoOctaves = [...octave, ...octave];

export const chords = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
};

export function note(noteName: NoteName): Note {
  return {
    noteName: noteName,
    index: octave.indexOf(noteName),
  };
}

export function randomNote(): Note {
  var noteName = sample(octave) as NoteName;
  return {
    noteName: noteName,
    index: octave.indexOf(noteName),
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

export function midiToNote(midiNumber) {
  var num = midiNumber % 24;
  var octave = num > 11 ? 3 : 4;
  return `${twoOctaves[num]}${octave}`;
}

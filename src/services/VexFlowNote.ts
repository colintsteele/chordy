import { Vex } from "vexflow";
const { StaveNote, Accidental } = Vex.Flow;

class VexFlowNotes {
  notes: any;
  objectiveType: string;
  accidentals: any[];

  constructor(notes: any, objectiveType: string) {
    this.notes = notes;
    this.objectiveType = objectiveType;
    this.accidentals = [];
  }

  randomAccidental = () => {
    return Math.random() >= 0.5 ? "b" : "#";
  };

  chordVisual = () => {
    let staveNotes = this.notes.map((note) => {
      const match = note.noteName.match(/(?<n>[a-zA-Z])(?<acci>b)?(?<octave>.$)?/)!;
      let g = match.groups;

      if (g?.acci) {
        // let acci = this.randomAccidental();
        this.accidentals.push(g?.acci);
      } else {
        let acci = null;
        this.accidentals.push(acci);
      }

      return `${g?.n}${g?.acci || ""}/${g?.octave || 5}`;
    });

    let staveNote = new StaveNote({
      keys: staveNotes,
      duration: "q",
    });

    staveNote.keyProps.map((props, i) => {
      if (props.accidental) {
        staveNote.addModifier(new Accidental(props.accidental), i);
      }
      return null;
    });

    return [staveNote];
  };

  scaleVisual = () => {
    return this.notes.map((note) => {
      const match = note.match(/(?<n>[a-zA-Z])(?<acci>b)?(?<octave>.$)?/)!;
      let g = match.groups;
      let name = `${g?.n}${g?.acci || ""}/${g?.octave || 5}`;

      let staveNote = new StaveNote({
        keys: [name],
        duration: "q",
      });

      if (g?.acci) {
        staveNote.addModifier(new Accidental("b"));
      }

      return staveNote;
    });
  };
}

export default VexFlowNotes;

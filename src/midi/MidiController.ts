const requestMIDIAccess = navigator["requestMIDIAccess"];

class MidiController {
  constructor(midiMessageHandler: Function) {
    if (navigator["requestMIDIAccess"]) {
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          var inputs = midiAccess.inputs;
          inputs.forEach((input) => {
            input.onmidimessage = function (event) {
              var deviceKey, onOff, midiNote, velocity;

              onOff = event.data[0] === 144;
              midiNote = event.data[1];
              velocity = event.data[2];

              //need condition for excessive calls to handler
              if (onOff || midiNote) {
                midiMessageHandler(event, onOff, midiNote, velocity);
              }
            };
          });
        },
        () => {
          console.warn("Midi access failure");
        }
      );
    }
  }
}

export default MidiController;

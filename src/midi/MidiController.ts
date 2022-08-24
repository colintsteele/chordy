// const requestMIDIAccess = navigator["requestMIDIAccess"];
/* istanbul ignore file */

class MidiController {
  constructor(midiMessageHandler: Function, mountMidi: Function) {
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
          mountMidi(true);
          console.log("inputs assigned");
        },
        () => {
          mountMidi(false);
          console.warn("Midi access failure");
        }
      );
    } else {
      console.info("navigator[requestMIDIAccess'] is not available");
    }
  }
}

export default MidiController;

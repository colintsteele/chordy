// const requestMIDIAccess = navigator["requestMIDIAccess"];
/* istanbul ignore file */

const mountMidiMessageHandler = (midiMessageHandler: Function) => {
    if (navigator.requestMIDIAccess) {
      console.log('requesting access');
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          console.log('gained access');
          var inputs = midiAccess.inputs;

          inputs.forEach((input) => {
            input.onmidimessage = function (event) {
              var onOff, midiNote, velocity;

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
          console.log('midi Mounted')
        }
      );
    } else {
      console.info("navigator[requestMIDIAccess'] is not available");
    } 
}

export default mountMidiMessageHandler;
